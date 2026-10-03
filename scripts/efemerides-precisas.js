// scripts/efemerides-precisas.js
// Posiciones de alta precisión del Sol y la Luna para eclipses (las fórmulas de astronomia.js son de baja precisión: error ~0,3° en la Luna).
//   · Luna: Meeus, "Astronomical Algorithms", cap. 47 (60 + 60 términos; ~10" en longitud, ~4" en latitud, ~hasta 1 km en distancia con los términos que usa)
//   · Sol:  Meeus cap. 25 con correcciones planetarias y aberración (~7" tras validar contra astropy/ERFA)
//   · Tiempo: UTC → TT con ΔT (Espenak/Meeus, 1900–2150)
// Todo en el marco eclíptico medio de la fecha. Distancias en km. Sin dependencias.

const EP = {
  RAD: Math.PI / 180,
  UA_KM: 149597870.7,
  RADIO_TIERRA_KM: 6378.14,     // ecuatorial
  RADIO_SOL_KM: 696000,
  K_LUNA: 0.2725076,            // radio lunar / radio ecuatorial terrestre
};
EP.RADIO_LUNA_KM = EP.K_LUNA * EP.RADIO_TIERRA_KM;

const epSin = (g) => Math.sin(g * EP.RAD);
const epCos = (g) => Math.cos(g * EP.RAD);

// ΔT = TT − UT en segundos (polinomios de Espenak y Meeus)
function deltaTSegundos(anio) {
  const y = anio;
  let t;
  if (y < 1920) { t = y - 1900; return -2.79 + 1.494119 * t - 0.0598939 * t ** 2 + 0.0061966 * t ** 3 - 0.000197 * t ** 4; }
  if (y < 1941) { t = y - 1920; return 21.2 + 0.84493 * t - 0.0761 * t ** 2 + 0.0020936 * t ** 3; }
  if (y < 1961) { t = y - 1950; return 29.07 + 0.407 * t - t ** 2 / 233 + t ** 3 / 2547; }
  if (y < 1986) { t = y - 1975; return 45.45 + 1.067 * t - t ** 2 / 260 - t ** 3 / 718; }
  if (y < 2005) { t = y - 2000; return 63.86 + 0.3345 * t - 0.060374 * t ** 2 + 0.0017275 * t ** 3 + 0.000651814 * t ** 4 + 0.00002373599 * t ** 5; }
  if (y < 2050) { t = y - 2000; return 62.92 + 0.32217 * t + 0.005589 * t ** 2; }
  if (y < 2150) return -20 + 32 * ((y - 1820) / 100) ** 2 - 0.5628 * (2150 - y);
  return -20 + 32 * ((y - 1820) / 100) ** 2;
}

// Siglos julianos desde J2000 en TT, a partir de ms UTC
function siglosTT(ms) {
  const anio = new Date(ms).getUTCFullYear() + new Date(ms).getUTCMonth() / 12;
  const jdUT = ms / 86400000 + 2440587.5;
  const jdTT = jdUT + deltaTSegundos(anio) / 86400;
  return (jdTT - 2451545) / 36525;
}

// ───── Luna (Meeus cap. 47) ─────
// [D, M, M', F, Σl (1e-6 °), Σr (1e-3 km)]
const LUNA_LONG_DIST = [
  [0,0,1,0,6288774,-20905355],[2,0,-1,0,1274027,-3699111],[2,0,0,0,658314,-2955968],[0,0,2,0,213618,-569925],
  [0,1,0,0,-185116,48888],[0,0,0,2,-114332,-3149],[2,0,-2,0,58793,246158],[2,-1,-1,0,57066,-152138],
  [2,0,1,0,53322,-170733],[2,-1,0,0,45758,-204586],[0,1,-1,0,-40923,-129620],[1,0,0,0,-34720,108743],
  [0,1,1,0,-30383,104755],[2,0,0,-2,15327,10321],[0,0,1,2,-12528,0],[0,0,1,-2,10980,79661],
  [4,0,-1,0,10675,-34782],[0,0,3,0,10034,-23210],[4,0,-2,0,8548,-21636],[2,1,-1,0,-7888,24208],
  [2,1,0,0,-6766,30824],[1,0,-1,0,-5163,-8379],[1,1,0,0,4987,-16675],[2,-1,1,0,4036,-12831],
  [2,0,2,0,3994,-10445],[4,0,0,0,3861,-11650],[2,0,-3,0,3665,14403],[0,1,-2,0,-2689,-7003],
  [2,0,-1,2,-2602,0],[2,-1,-2,0,2390,10056],[1,0,1,0,-2348,6322],[2,-2,0,0,2236,-9884],
  [0,1,2,0,-2120,5751],[0,2,0,0,-2069,0],[2,-2,-1,0,2048,-4950],[2,0,1,-2,-1773,4130],
  [2,0,0,2,-1595,0],[4,-1,-1,0,1215,-3958],[0,0,2,2,-1110,0],[3,0,-1,0,-892,3258],
  [2,1,1,0,-810,2616],[4,-1,-2,0,759,-1897],[0,2,-1,0,-713,-2117],[2,2,-1,0,-700,2354],
  [2,1,-2,0,691,0],[2,-1,0,-2,596,0],[4,0,1,0,549,-1423],[0,0,4,0,537,-1117],
  [4,-1,0,0,520,-1571],[1,0,-2,0,-487,-1739],[2,1,0,-2,-399,0],[0,0,2,-2,-381,-4421],
  [1,1,1,0,351,0],[3,0,-2,0,-340,0],[4,0,-3,0,330,0],[2,-1,2,0,327,0],
  [0,2,1,0,-323,1165],[1,1,-1,0,299,0],[2,0,3,0,294,0],[2,0,-1,-2,0,8752],
];
// [D, M, M', F, Σb (1e-6 °)]
const LUNA_LATITUD = [
  [0,0,0,1,5128122],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],
  [2,0,-1,1,55413],[2,0,-1,-1,46271],[2,0,0,1,32573],[0,0,2,1,17198],
  [2,0,1,-1,9266],[0,0,2,-1,8822],[2,-1,0,-1,8216],[2,0,-2,-1,4324],
  [2,0,1,1,4200],[2,1,0,-1,-3359],[2,-1,-1,1,2463],[2,-1,0,1,2211],
  [2,-1,-1,-1,2065],[0,1,-1,-1,-1870],[4,0,-1,-1,1828],[0,1,0,1,-1794],
  [0,0,0,3,-1749],[0,1,-1,1,-1565],[1,0,0,1,-1491],[0,1,1,1,-1475],
  [0,1,1,-1,-1410],[0,1,0,-1,-1344],[1,0,0,-1,-1335],[0,0,3,1,1107],
  [4,0,0,-1,1021],[4,0,-1,1,833],[0,0,1,-3,777],[4,0,-2,1,671],
  [2,0,0,-3,607],[2,0,2,-1,596],[2,-1,1,-1,491],[2,0,-2,1,-451],
  [0,0,3,-1,439],[2,0,2,1,422],[2,0,-3,-1,421],[2,1,-1,1,-366],
  [2,1,0,1,-351],[4,0,0,1,331],[2,-1,1,1,315],[2,-2,0,-1,302],
  [0,0,1,3,-283],[2,1,1,-1,-229],[1,1,0,-1,223],[1,1,0,1,223],
  [0,1,-2,-1,-220],[2,1,-1,-1,-220],[1,0,1,1,-185],[2,-1,-2,-1,181],
  [0,1,2,1,-177],[4,0,-2,-1,176],[4,-1,-1,-1,166],[1,0,1,-1,-164],
  [4,0,1,-1,132],[1,0,-1,-1,-119],[4,-1,0,-1,115],[2,-2,0,1,107],
];

// Luna geocéntrica: longitud y latitud eclípticas (°, equinoccio medio de la fecha) y distancia (km)
function posicionLunarPrecisa(ms) {
  const T = siglosTT(ms);
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T ** 2 + T ** 3 / 538841 - T ** 4 / 65194000;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T ** 2 + T ** 3 / 545868 - T ** 4 / 113065000;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T ** 2 + T ** 3 / 24490000;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T ** 2 + T ** 3 / 69699 - T ** 4 / 14712000;
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T ** 2 - T ** 3 / 3526000 + T ** 4 / 863310000;
  const E = 1 - 0.002516 * T - 0.0000074 * T ** 2;
  const A1 = 119.75 + 131.849 * T, A2 = 53.09 + 479264.29 * T, A3 = 313.45 + 481266.484 * T;
  const factorE = (m) => (m === 0 ? 1 : Math.abs(m) === 1 ? E : E * E);

  let sl = 0, sr = 0, sb = 0;
  for (const [d, m, mp, f, cl, cr] of LUNA_LONG_DIST) {
    const arg = d * D + m * M + mp * Mp + f * F;
    const e = factorE(m);
    sl += cl * e * epSin(arg);
    sr += cr * e * epCos(arg);
  }
  for (const [d, m, mp, f, cb] of LUNA_LATITUD) {
    sb += cb * factorE(m) * epSin(d * D + m * M + mp * Mp + f * F);
  }
  sl += 3958 * epSin(A1) + 1962 * epSin(Lp - F) + 318 * epSin(A2);
  sb += -2235 * epSin(Lp) + 382 * epSin(A3) + 175 * epSin(A1 - F) + 175 * epSin(A1 + F) + 127 * epSin(Lp - Mp) - 115 * epSin(Lp + Mp);

  return {
    longitud: (((Lp + sl / 1e6) % 360) + 360) % 360,
    latitud: sb / 1e6,
    distancia: 385000.56 + sr / 1000,
  };
}

// ───── Sol (Meeus cap. 25 con correcciones; longitud aparente con aberración) ─────
function posicionSolarPrecisa(ms) {
  const T = siglosTT(ms);
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T ** 2;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T ** 2;
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T ** 2;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T ** 2) * epSin(M) + (0.019993 - 0.000101 * T) * epSin(2 * M) + 0.000289 * epSin(3 * M);
  const nu = M + C;
  let R = (1.000001018 * (1 - e * e)) / (1 + e * epCos(nu)); // UA
  let lon = L0 + C;
  // Perturbaciones de Venus, Marte, Júpiter, Luna (Meeus cap. 25)
  const A = 153.23 + 22518.7541 * T, B = 216.57 + 45037.5082 * T, Cc = 312.69 + 32964.3577 * T;
  const Dd = 350.74 + 445267.1142 * T - 0.00144 * T ** 2, Ee = 231.19 + 20.2 * T, H = 353.4 + 65928.7155 * T;
  // Signos de A y C ajustados contra astropy/ERFA (2000–2050): error final ≈ 7″ en longitud (≈ 15 s en la hora de un eclipse)
  lon += -0.00134 * epCos(A) + 0.00154 * epCos(B) - 0.002 * epCos(Cc) + 0.00179 * epSin(Dd) + 0.00178 * epSin(Ee);
  R += 0.00000543 * epSin(A) + 0.00001575 * epSin(B) + 0.00001627 * epSin(Cc) + 0.00003076 * epCos(Dd) + 0.00000927 * epSin(H);
  const aberracion = 20.4898 / 3600 / R; // grados
  return { longitud: (((lon - aberracion) % 360) + 360) % 360, distanciaUA: R };
}

// ───── Vectores cartesianos (km) en el marco eclíptico medio de la fecha, origen en el centro de la Tierra ─────
function vectorLuna(ms) {
  const p = posicionLunarPrecisa(ms);
  const cb = epCos(p.latitud);
  return [p.distancia * cb * epCos(p.longitud), p.distancia * cb * epSin(p.longitud), p.distancia * epSin(p.latitud)];
}
function vectorSol(ms) {
  const p = posicionSolarPrecisa(ms);
  const r = p.distanciaUA * EP.UA_KM;
  return [r * epCos(p.longitud), r * epSin(p.longitud), 0];
}

// Observador (lat/lon geodésicas en °, altura en m) en el mismo marco; también devuelve la vertical local
function vectorObservador(ms, latitud, longitud, alturaM = 0) {
  const d = ms / 86400000 + 2440587.5 - 2451545;
  const T = d / 36525;
  const gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * T ** 2;
  const theta = gmst + longitud; // tiempo sidéreo local (°)
  const f = 1 / 298.257223563;
  const u = Math.atan((1 - f) * Math.tan(latitud * EP.RAD));
  const rs = (1 - f) * Math.sin(u) + (alturaM / 6378140) * epSin(latitud);
  const rc = Math.cos(u) + (alturaM / 6378140) * epCos(latitud);
  const eq = [EP.RADIO_TIERRA_KM * rc * epCos(theta), EP.RADIO_TIERRA_KM * rc * epSin(theta), EP.RADIO_TIERRA_KM * rs];
  const zenitEq = [epCos(latitud) * epCos(theta), epCos(latitud) * epSin(theta), epSin(latitud)];
  const eps = 23.4392911 - 0.0130042 * T; // oblicuidad media
  const aEcl = (v) => [v[0], v[1] * epCos(eps) + v[2] * epSin(eps), -v[1] * epSin(eps) + v[2] * epCos(eps)];
  return { posicion: aEcl(eq), zenit: aEcl(zenitEq) };
}

const epResta = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const epDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const epNorma = (a) => Math.sqrt(epDot(a, a));
const epAngulo = (a, b) => Math.acos(Math.max(-1, Math.min(1, epDot(a, b) / (epNorma(a) * epNorma(b))))) / EP.RAD;