// scripts/planetas.js
// Posiciones heliocéntricas de los planetas por elementos keplerianos.
// Elementos del JPL (Standish, "Keplerian Elements for Approximate Positions
// of the Major Planets", Tabla 1, válidos 1800–2050 d.C.). Fuera de ese rango
// el error crece poco a poco: útil para ver configuraciones generales, no para
// efemérides de precisión.
// Cada elemento es [valor en J2000, variación por siglo juliano].
 
const PLANETAS = [
  { nombre: "Mercurio", color: "#b8b2a7", radioDibujo: 2.50, periodo: 0.2408467,
    a: [0.38709927, 0.00000037], e: [0.20563593, 0.00001906], I: [7.00497902, -0.00594749],
    L: [252.2503235, 149472.67411175], w: [77.45779628, 0.16047689], O: [48.33076593, -0.12534081] },
  { nombre: "Venus", color: "#e6c78a", radioDibujo: 3.10, periodo: 0.61519726,
    a: [0.72333566, 0.0000039], e: [0.00677672, -0.00004107], I: [3.39467605, -0.0007889],
    L: [181.9790995, 58517.81538729], w: [131.60246718, 0.00268329], O: [76.67984255, -0.27769418] },
  { nombre: "Tierra", color: "#5b93d1", radioDibujo: 3.16, periodo: 1.00001742, esTierra: true,
    a: [1.00000261, 0.00000562], e: [0.01671123, -0.00004392], I: [-0.00001531, -0.01294668],
    L: [100.46457166, 35999.37244981], w: [102.93768193, 0.32327364], O: [0.0, 0.0] },
  { nombre: "Marte", color: "#c96a4a", radioDibujo: 2.66, periodo: 1.88081632,
    a: [1.52371034, 0.00001847], e: [0.0933941, 0.00007882], I: [1.84969142, -0.00813131],
    L: [-4.55343205, 19140.30268499], w: [-23.94362959, 0.44441088], O: [49.55953891, -0.29257343] },
  { nombre: "Júpiter", color: "#d8a878", radioDibujo: 14.00, periodo: 11.862615,
    a: [5.202887, -0.00011607], e: [0.04838624, -0.00013253], I: [1.30439695, -0.00183714],
    L: [34.39644051, 3034.74612775], w: [14.72847983, 0.21252668], O: [100.47390909, 0.20469106] },
  { nombre: "Saturno", color: "#e3cf8f", radioDibujo: 12.13, periodo: 29.447498,
    a: [9.53667594, -0.0012506], e: [0.05386179, -0.00050991], I: [2.48599187, 0.00193609],
    L: [49.95424423, 1222.49362201], w: [92.59887831, -0.41897216], O: [113.66242448, -0.28867794] },
  { nombre: "Urano", color: "#8fd6d9", radioDibujo: 6.35, periodo: 84.016846,
    a: [19.18916464, -0.00196176], e: [0.04725744, -0.00004397], I: [0.77263783, -0.00242939],
    L: [313.23810451, 428.48202785], w: [170.9542763, 0.40805281], O: [74.01692503, 0.04240589] },
  { nombre: "Neptuno", color: "#6f86e8", radioDibujo: 6.21, periodo: 164.79132,
    a: [30.06992276, 0.00026291], e: [0.00859048, 0.00005105], I: [1.77004347, 0.00035372],
    L: [-55.12002969, 218.45945325], w: [44.96476227, -0.32241464], O: [131.78422574, -0.00508664] },
];
 
const PRECESION_GRADOS_POR_SIGLO = 1.3969713; // de equinoccio J2000 a equinoccio de la fecha
const GRAD = Math.PI / 180;
 
// ── Escala del dial ─────────────────────────────────────────────
// Radio dibujado = RADIO_TIERRA · (distancia en UA)^EXPONENTE. La Tierra queda en
// 175 (como antes) y el afelio de Neptuno (≈30,33 UA) justo en el borde (480).
const DIAL_RADIO_TIERRA = 175;
const DIAL_RADIO_MAXIMO = 480;
const DIAL_UA_MAXIMA = 30.33;
const DIAL_EXPONENTE =
  Math.log(DIAL_RADIO_MAXIMO / DIAL_RADIO_TIERRA) / Math.log(DIAL_UA_MAXIMA);

let vistaSistemaSolar = "xy";
 
function radioDelDial(distanciaUA) {
  return DIAL_RADIO_TIERRA * Math.pow(distanciaUA, DIAL_EXPONENTE);
}
 
// Longitud heliocéntrica -> ángulo del dial. Se suma 180° para coincidir con la
// Tierra, que el dial sitúa en la longitud del Sol (= la suya + 180°).
function anguloDelDial(longitudHeliocentrica) {
  return normalizarGrados(longitudHeliocentrica + 180);
}

function anguloEnVistaSistemaSolar(posicion) {
  if (vistaSistemaSolar === "xz") return Math.atan2(posicion.x, posicion.z) / GRAD;
  return Math.atan2(posicion.y, posicion.x) / GRAD;
}

function posicionEnVistaSistemaSolar(posicion) {
  if (vistaSistemaSolar === "xz") {
    const distancia = posicion.distancia ?? Math.hypot(posicion.x, posicion.y, posicion.z);
    const escala = radioDelDial(distancia) / distancia;
    return { x: CENTRO + posicion.x * escala, y: CENTRO - posicion.z * escala };
  }
  const componenteVertical = posicion.y;
  const radio = Math.hypot(posicion.x, componenteVertical);
  return polar(radioDelDial(radio), anguloDelDial(Math.atan2(componenteVertical, posicion.x) / GRAD));
}
 
// ── Cálculo ─────────────────────────────────────────────────────
function siglosDesdeJ2000(fecha) {
  return (fecha.getTime() / 86400000 + 2440587.5 - 2451545.0) / 36525;
}
 
function elementosEn(planeta, T) {
  const v = (par) => par[0] + par[1] * T;
  return {
    a: v(planeta.a), e: v(planeta.e), I: v(planeta.I) * GRAD,
    L: v(planeta.L), w: v(planeta.w), O: v(planeta.O) * GRAD,
  };
}
 
function resolverKepler(M, e) {
  let E = M + e * Math.sin(M);
  for (let i = 0; i < 15; i++) {
    const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= d;
    if (Math.abs(d) < 1e-10) break;
  }
  return E;
}
 
// Coordenadas eclípticas J2000 (UA) para una anomalía excéntrica E
function coordenadasOrbitales(el, E) {
  const xp = el.a * (Math.cos(E) - el.e);
  const yp = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E);
  const omega = (el.w - el.O / GRAD) * GRAD; // argumento del perihelio
  const cw = Math.cos(omega), sw = Math.sin(omega);
  const cO = Math.cos(el.O), sO = Math.sin(el.O);
  const cI = Math.cos(el.I), sI = Math.sin(el.I);
  return {
    x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    z: sw * sI * xp + cw * sI * yp,
  };
}
 
// Convierte coordenadas J2000 en distancia y longitud (equinoccio de la fecha)
function resumenHeliocentrico(c, T) {
  const precesion = PRECESION_GRADOS_POR_SIGLO * T * GRAD;
  const cosP = Math.cos(precesion), sinP = Math.sin(precesion);
  const x = c.x * cosP - c.y * sinP;
  const y = c.x * sinP + c.y * cosP;
  return {
    distancia: Math.hypot(c.x, c.y, c.z), // UA reales al Sol
    rho: Math.hypot(x, y), // distancia proyectada en la eclíptica
    longitud: normalizarGrados(Math.atan2(y, x) / GRAD),
    x,
    y,
    z: c.z,
  };
}
 
function posicionHeliocentrica(planeta, fecha) {
  const T = siglosDesdeJ2000(fecha);
  const el = elementosEn(planeta, T);
  const M = normalizarGrados(el.L - el.w) * GRAD;
  return resumenHeliocentrico(coordenadasOrbitales(el, resolverKepler(M, el.e)), T);
}
 
// Puntos de la órbita (para dibujarla) con los elementos de la fecha dada
function puntosDeOrbita(planeta, fecha, pasos = 180) {
  const T = siglosDesdeJ2000(fecha);
  const el = elementosEn(planeta, T);
  const puntos = [];
  for (let i = 0; i <= pasos; i++) {
    const r = resumenHeliocentrico(coordenadasOrbitales(el, (i / pasos) * 2 * Math.PI), T);
    puntos.push(posicionEnVistaSistemaSolar(r));
  }
  return puntos;
}
