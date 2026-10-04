// scripts/eclipse-vista.js
// Estado del eclipse "en curso" para el observador y la geometría que se dibuja (sin tocar el DOM).
//   estadoEclipse(ms, lat, lon) → null | { tipo: "solar" | "lunar", clase, vista, ... }
//   Solar: se considera en curso cuando la Luna tapa algo del Sol visto desde TU ubicación y el Sol está sobre el horizonte.
//   Lunar: en curso mientras la Luna esté dentro de la penumbra de la Tierra (es el mismo eclipse para todo el planeta).
// Las "vistas" se dan en unidades de radio del cuerpo eclipsado y con la orientación del observador (arriba = cenit).
// Depende de: efemerides-precisas.js, eclipses.js

const ECLIPSE_VISTA = {
  ELONGACION_MAX_SOLAR: 2.5,      // ° de elongación para considerar un eclipse solar posible
  ELONGACION_MIN_LUNAR: 177.5,    // ° para considerar uno lunar posible
  HORIZONTE_SOL: -0.8,            // ° de altura del centro del Sol por debajo de la cual ya no se ve
  DIA_MS: 86400000,
  HORA_MS: 3600000,
};
const eclipseCache = { cercano: null, solarLocal: null };

// Base del cielo vista por el observador: "arriba" = cenit (o norte eclíptico si no hay ubicación), "derecha" = u × arriba
function vistaBase(direccion, zenit) {
  const ref = zenit || [0, 0, 1];
  const d = epDot(ref, direccion);
  let arriba = [ref[0] - d * direccion[0], ref[1] - d * direccion[1], ref[2] - d * direccion[2]];
  const n = epNorma(arriba);
  arriba = arriba.map((v) => v / n);
  const derecha = [
    direccion[1] * arriba[2] - direccion[2] * arriba[1],
    direccion[2] * arriba[0] - direccion[0] * arriba[2],
    direccion[0] * arriba[1] - direccion[1] * arriba[0],
  ];
  return { arriba, derecha };
}

// Solar: posición y tamaño de la Luna sobre el disco solar (Sol = círculo de radio 1 en el origen; y hacia abajo, como en SVG)
function geometriaVistaSolar(ms, lat, lon) {
  const sol = vectorSol(ms), luna = vectorLuna(ms), obs = vectorObservador(ms, lat, lon);
  const s = epResta(sol, obs.posicion), l = epResta(luna, obs.posicion);
  const ns = epNorma(s), nl = epNorma(l);
  const u = s.map((v) => v / ns), lh = l.map((v) => v / nl);
  const { arriba, derecha } = vistaBase(u, obs.zenit);
  const rs = Math.asin(EP.RADIO_SOL_KM / ns), rl = Math.asin(EP.RADIO_LUNA_KM / nl);
  return { luna: { cx: epDot(lh, derecha) / rs, cy: -epDot(lh, arriba) / rs, r: rl / rs } };
}

// Lunar: umbra y penumbra de la Tierra sobre el disco lunar (Luna = círculo de radio 1 en el origen)
function geometriaVistaLunar(ms, lat, lon) {
  const luna = vectorLuna(ms);
  const obs = lat === null || lat === undefined ? null : vectorObservador(ms, lat, lon);
  const l = obs ? epResta(luna, obs.posicion) : luna;
  const nl = epNorma(l);
  const { arriba, derecha } = vistaBase(l.map((v) => v / nl), obs ? obs.zenit : null);
  const c = condicionesLunares(ms), rL = c.radioLuna;
  const sombra = c.proyeccion.map((v) => -v); // centro de la sombra respecto a la Luna (km)
  const cx = epDot(sombra, derecha) / rL, cy = -epDot(sombra, arriba) / rL;
  return {
    umbra: { cx, cy, r: c.radioUmbra / rL },
    penumbra: { cx, cy, r: c.radioPenumbra / rL },
    alturaLuna: obs ? Math.asin(epDot(l, obs.zenit) / nl) / EP.RAD : null,
  };
}

function eclipseGlobalCercano(ms, tipo) {
  const c = eclipseCache.cercano;
  if (!c || Math.abs(ms - c.centro) > 12 * ECLIPSE_VISTA.HORA_MS) {
    eclipseCache.cercano = { centro: ms, lista: buscarEclipses(ms - 3 * ECLIPSE_VISTA.DIA_MS, ms + 3 * ECLIPSE_VISTA.DIA_MS) };
  }
  return eclipseCache.cercano.lista.find((e) => e.tipo === tipo && Math.abs(e.maximo - ms) < 12 * ECLIPSE_VISTA.HORA_MS) || null;
}

// Máximo y tipo del eclipse solar PARA ESTE LUGAR (puede ser parcial aunque el eclipse global sea total)
function solarLocalMaximo(ms, lat, lon) {
  const c = eclipseCache.solarLocal;
  if (c && c.lat === lat && c.lon === lon && Math.abs(ms - c.maximo) < 4 * ECLIPSE_VISTA.HORA_MS) return c;
  const maximo = minimoAureo((t) => condicionesSolares(t, lat, lon).separacion, ms - 3 * ECLIPSE_VISTA.HORA_MS, ms + 3 * ECLIPSE_VISTA.HORA_MS, 2000);
  const m = condicionesSolares(maximo, lat, lon);
  let clase = "parcial";
  if (m.alturaSol >= ECLIPSE_VISTA.HORIZONTE_SOL && m.separacion <= Math.abs(m.radioSol - m.radioLuna)) {
    clase = m.radioLuna >= m.radioSol ? "total" : "anular";
  }
  eclipseCache.solarLocal = { lat, lon, maximo, clase, ocultacionMax: m.ocultacion, alturaMax: m.alturaSol };
  return eclipseCache.solarLocal;
}

function estadoEclipse(ms, lat, lon) {
  const sol = vectorSol(ms), luna = vectorLuna(ms);
  const elongacion = epAngulo(sol, luna);
  const tieneLugar = lat !== null && lat !== undefined;

  if (elongacion > ECLIPSE_VISTA.ELONGACION_MIN_LUNAR) {
    const c = condicionesLunares(ms);
    if (c.magPenumbral <= 0) return null;
    const global = eclipseGlobalCercano(ms, "lunar");
    const vista = geometriaVistaLunar(ms, lat, lon);
    return {
      tipo: "lunar",
      clase: global ? global.clase : claseLunar(c) || "penumbral",
      fase: c.magUmbral >= 1 ? "total" : c.magUmbral > 0 ? "parcial" : "penumbral",
      cobertura: c.magUmbral > 0 ? c.coberturaUmbra : c.coberturaPenumbra,
      maximo: global ? global.maximo : null,
      lunaBajoHorizonte: vista.alturaLuna !== null && vista.alturaLuna < 0,
      vista,
    };
  }

  if (elongacion < ECLIPSE_VISTA.ELONGACION_MAX_SOLAR && tieneLugar) {
    const s = condicionesSolares(ms, lat, lon);
    if (s.ocultacion <= 0 || s.alturaSol < ECLIPSE_VISTA.HORIZONTE_SOL) return null;
    const local = solarLocalMaximo(ms, lat, lon);
    return {
      tipo: "solar",
      clase: local.clase,
      fase: s.separacion <= Math.abs(s.radioSol - s.radioLuna) ? (s.radioLuna >= s.radioSol ? "total" : "anular") : "parcial",
      ocultacion: s.ocultacion,
      maximo: local.maximo,
      maximoBajoHorizonte: local.alturaMax < 0,
      vista: geometriaVistaSolar(ms, lat, lon),
    };
  }
  return null;
}