// scripts/eclipse-trayecto.js
// Dónde se ve un eclipse sobre el planeta (sin DOM; todo en ms UTC):
//   Solar:  línea central y franja de la umbra/antumbra (si el eje de la sombra toca la Tierra) y zona de eclipse parcial con la
//           ocultación máxima de cada punto (malla de TRAYECTO.MALLA_GRADOS).
//   Lunar:  zona desde donde la Luna está sobre el horizonte durante el eclipse (fracción de la ventana, malla).
// La Tierra se trata como elipsoide (WGS84). Depende de: efemerides-precisas.js, eclipses.js (areaInterseccion), eclipse-vista.js (eclipseGlobalCercano)

const TRAYECTO = {
  PASO_CENTRAL_MIN: 2,     // paso del cálculo de la línea central
  PASO_TIEMPO_MIN: 6,      // paso del tiempo al explorar la malla
  MALLA_GRADOS: 2.5,
  MITAD_VENTANA_H: 4.2,    // ventana solar: ±4,2 h del máximo
  VENTANA_LUNAR_H: [-2.7, -1.35, 0, 1.35, 2.7],
  A: 6378.137,
  F: 1 / 298.257223563,
};
const TR_RAD = Math.PI / 180;
const trCache = {};

function trGmst(ms) { return (((280.46061837 + 360.98564736629 * (ms / 86400000 + 2440587.5 - 2451545)) % 360) + 360) % 360; }
function trEps(ms) { return 23.4392911 - 0.0130042 * siglosTT(ms); }
function trEcAEq(v, eps) { const c = Math.cos(eps * TR_RAD), s = Math.sin(eps * TR_RAD); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; }
const trDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const trRes = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const trNorma = (a) => Math.hypot(a[0], a[1], a[2]);
const trUnit = (a) => { const n = trNorma(a) || 1; return [a[0] / n, a[1] / n, a[2] / n]; };
const trCruz = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// Rayo P + s·d contra el elipsoide terrestre (marco ecuatorial inercial); devuelve la intersección más cercana al origen del rayo
function trRayoElipsoide(P, d) {
  const a = TRAYECTO.A, k = 1 / (1 - TRAYECTO.F) ** 2;
  const A = d[0] * d[0] + d[1] * d[1] + k * d[2] * d[2];
  const B = 2 * (P[0] * d[0] + P[1] * d[1] + k * P[2] * d[2]);
  const C = P[0] * P[0] + P[1] * P[1] + k * P[2] * P[2] - a * a;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return null;
  const s = (-B - Math.sqrt(disc)) / (2 * A);
  return { s, p: [P[0] + s * d[0], P[1] + s * d[1], P[2] + s * d[2]] };
}
// Punto del elipsoide (marco ecuatorial inercial) → latitud geodésica y longitud geográfica (°)
function trALatLon(p, gmst) {
  const lon = ((((Math.atan2(p[1], p[0]) / TR_RAD - gmst) % 360) + 540) % 360) - 180;
  const lat = Math.atan(Math.tan(Math.atan2(p[2], Math.hypot(p[0], p[1]))) / (1 - TRAYECTO.F) ** 2) / TR_RAD;
  return { lat, lon };
}
// Dirección del astro (vector ecuatorial) → punto de la superficie bajo él
function trPuntoBajoAstro(v, ms) {
  return { lat: Math.atan2(v[2], Math.hypot(v[0], v[1])) / TR_RAD, lon: ((((Math.atan2(v[1], v[0]) / TR_RAD - trGmst(ms)) % 360) + 540) % 360) - 180 };
}

// ───── Solar: línea central y franja de la umbra ─────
function trCentralSolar(ev) {
  const H = TRAYECTO.MITAD_VENTANA_H * 3600000, paso = TRAYECTO.PASO_CENTRAL_MIN * 60000, muestras = [];
  for (let t = ev.maximo - H; t <= ev.maximo + H; t += paso) {
    const eps = trEps(t), S = trEcAEq(vectorSol(t), eps), M = trEcAEq(vectorLuna(t), eps);
    const dSM = trNorma(trRes(M, S)), u = trUnit(trRes(M, S)), hit = trRayoElipsoide(M, u);
    if (!hit || hit.s < 0) continue;
    const sinF2 = (EP.RADIO_SOL_KM - EP.RADIO_LUNA_KM) / dSM, tanF2 = sinF2 / Math.sqrt(1 - sinF2 * sinF2);
    const rho = Math.abs((EP.RADIO_LUNA_KM / sinF2 - hit.s) * tanF2);   // radio de la umbra (o antumbra) a esa profundidad, km
    const ll = trALatLon(hit.p, trGmst(t));
    muestras.push({ ms: t, lat: ll.lat, lon: ll.lon, rho, u, M, s: hit.s, p: hit.p, gmst: trGmst(t) });
  }
  if (muestras.length < 3) return null;
  const A = [], B = [];
  for (let i = 1; i < muestras.length - 1; i++) {
    const m = muestras[i], v0 = trRes(muestras[i + 1].p, muestras[i - 1].p);
    const v = trRes(v0, m.u.map((x) => x * trDot(v0, m.u)));             // dirección del movimiento en el plano perpendicular al eje
    if (trNorma(v) < 1e-6) continue;
    const n = trUnit(trCruz(m.u, v));
    for (const [signo, lista] of [[1, A], [-1, B]]) {
      const Q = [0, 1, 2].map((j) => m.M[j] + m.u[j] * m.s + signo * m.rho * n[j] - m.u[j] * 2000);
      const h = trRayoElipsoide(Q, m.u);
      if (h) { const ll = trALatLon(h.p, m.gmst); lista.push({ lat: ll.lat, lon: ll.lon }); }
    }
  }
  const idx = muestras.reduce((b, m, i) => (Math.abs(m.ms - ev.maximo) < Math.abs(muestras[b].ms - ev.maximo) ? i : b), 0);
  const mx = muestras[idx];
  return {
    central: muestras.map((m) => ({ ms: m.ms, lat: m.lat, lon: m.lon })),
    limiteA: A, limiteB: B,
    maximo: { ms: mx.ms, lat: mx.lat, lon: mx.lon, anchoKm: 2 * mx.rho },
  };
}

// ───── Malla de visibilidad ─────
function trMalla() {
  const g = TRAYECTO.MALLA_GRADOS, nLat = Math.floor(180 / g) + 1, nLon = Math.floor(360 / g) + 1;
  return { g, nLat, nLon, datos: new Float32Array(nLat * nLon) };
}
function trGeometriaMalla(malla) {
  const f = TRAYECTO.F, rc = new Float64Array(malla.nLat), rs = new Float64Array(malla.nLat), cphi = new Float64Array(malla.nLat), sphi = new Float64Array(malla.nLat);
  for (let i = 0; i < malla.nLat; i++) {
    const lat = (90 - i * malla.g) * TR_RAD, u = Math.atan((1 - f) * Math.tan(lat));
    rc[i] = TRAYECTO.A * Math.cos(u); rs[i] = TRAYECTO.A * (1 - f) * Math.sin(u); cphi[i] = Math.cos(lat); sphi[i] = Math.sin(lat);
  }
  return { rc, rs, cphi, sphi };
}

// Solar: ocultación máxima del Sol (0–1) de cada punto durante todo el eclipse, con el Sol sobre el horizonte
function trZonaSolar(ev) {
  const malla = trMalla(), geo = trGeometriaMalla(malla), H = TRAYECTO.MITAD_VENTANA_H * 3600000, paso = TRAYECTO.PASO_TIEMPO_MIN * 60000;
  const cosUmbral = Math.cos(0.62 * TR_RAD), senAltMin = Math.sin(-0.8 * TR_RAD), cosT = new Float64Array(malla.nLon), sinT = new Float64Array(malla.nLon);
  for (let t = ev.maximo - H; t <= ev.maximo + H; t += paso) {
    const eps = trEps(t), S = trEcAEq(vectorSol(t), eps), M = trEcAEq(vectorLuna(t), eps), gm = trGmst(t);
    for (let j = 0; j < malla.nLon; j++) { const th = (gm - 180 + j * malla.g) * TR_RAD; cosT[j] = Math.cos(th); sinT[j] = Math.sin(th); }
    for (let i = 0; i < malla.nLat; i++) for (let j = 0; j < malla.nLon; j++) {
      const ox = geo.rc[i] * cosT[j], oy = geo.rc[i] * sinT[j], oz = geo.rs[i];
      const sx = S[0] - ox, sy = S[1] - oy, sz = S[2] - oz, lx = M[0] - ox, ly = M[1] - oy, lz = M[2] - oz;
      const ns = Math.sqrt(sx * sx + sy * sy + sz * sz), nl = Math.sqrt(lx * lx + ly * ly + lz * lz), c = (sx * lx + sy * ly + sz * lz) / (ns * nl);
      if (c < cosUmbral) continue;
      if ((sx * geo.cphi[i] * cosT[j] + sy * geo.cphi[i] * sinT[j] + sz * geo.sphi[i]) / ns < senAltMin) continue;
      const sep = Math.acos(Math.min(1, c)), rS = Math.asin(EP.RADIO_SOL_KM / ns), rL = Math.asin(EP.RADIO_LUNA_KM / nl);
      if (sep >= rS + rL) continue;
      const ocu = areaInterseccion(rS, rL, sep) / (Math.PI * rS * rS), k = i * malla.nLon + j;
      if (ocu > malla.datos[k]) malla.datos[k] = ocu;
    }
  }
  return malla;
}

// Lunar: fracción de la ventana del eclipse (0–1) en que la Luna está sobre el horizonte
function trZonaLunar(ev) {
  const malla = trMalla(), geo = trGeometriaMalla(malla), cosT = new Float64Array(malla.nLon), sinT = new Float64Array(malla.nLon);
  const n = TRAYECTO.VENTANA_LUNAR_H.length;
  for (const h of TRAYECTO.VENTANA_LUNAR_H) {
    const t = ev.maximo + h * 3600000, M = trEcAEq(vectorLuna(t), trEps(t)), gm = trGmst(t);
    for (let j = 0; j < malla.nLon; j++) { const th = (gm - 180 + j * malla.g) * TR_RAD; cosT[j] = Math.cos(th); sinT[j] = Math.sin(th); }
    for (let i = 0; i < malla.nLat; i++) for (let j = 0; j < malla.nLon; j++) {
      const ox = geo.rc[i] * cosT[j], oy = geo.rc[i] * sinT[j], lx = M[0] - ox, ly = M[1] - oy, lz = M[2] - geo.rs[i];
      if ((lx * geo.cphi[i] * cosT[j] + ly * geo.cphi[i] * sinT[j] + lz * geo.sphi[i]) / Math.sqrt(lx * lx + ly * ly + lz * lz) > 0) malla.datos[i * malla.nLon + j] += 1 / n;
    }
  }
  return malla;
}

// Todo lo que necesita el mapa de un eclipse (se calcula una vez por evento)
function trayectoEclipse(ev) {
  const clave = `${ev.tipo}-${Math.round(ev.maximo / 60000)}`;
  if (trCache[clave]) return trCache[clave];
  let r;
  if (ev.tipo === "solar") {
    const c = trCentralSolar(ev), zona = trZonaSolar(ev);
    let maximo = c ? c.maximo : null;
    if (!maximo) { // eclipse parcial: el punto de mayor ocultación de la malla
      let k = 0; zona.datos.forEach((v, i) => { if (v > zona.datos[k]) k = i; });
      maximo = { ms: ev.maximo, lat: 90 - Math.floor(k / zona.nLon) * zona.g, lon: -180 + (k % zona.nLon) * zona.g, anchoKm: 0 };
    }
    r = { tipo: "solar", clase: ev.clase, central: c ? c.central : null, limiteA: c ? c.limiteA : [], limiteB: c ? c.limiteB : [], maximo, zona };
  } else {
    const eps = trEps(ev.maximo), M = trEcAEq(vectorLuna(ev.maximo), eps);
    r = { tipo: "lunar", clase: ev.clase, maximo: { ms: ev.maximo, ...trPuntoBajoAstro(M, ev.maximo) }, zona: trZonaLunar(ev) };
  }
  r.evento = ev;
  return (trCache[clave] = r);
}

// Punto de la línea central en un instante (solar central) o punto bajo la Luna (lunar)
function trMarcadorEn(tr, ms) {
  if (tr.tipo === "lunar") return trPuntoBajoAstro(trEcAEq(vectorLuna(ms), trEps(ms)), ms);
  if (!tr.central || !tr.central.length) return null;
  const ult = tr.central[tr.central.length - 1];
  if (ms < tr.central[0].ms || ms > ult.ms) return null;
  return tr.central.reduce((b, p) => (Math.abs(p.ms - ms) < Math.abs(b.ms - ms) ? p : b));
}