// scripts/lunario-geometria.js
// Geometría de la capa Lunario: una cámara oblicua mira el plano de la eclíptica y todo se proyecta a la pantalla del reloj.
// Marco 3D: eclíptico de la fecha (x hacia el equinoccio de marzo, y hacia longitud 90°, z hacia el norte eclíptico).
// Cámara: situada en el lado +x, elevada LUNARIO.elevacion grados sobre el plano; en pantalla "derecha" = +y, "arriba" = proyección de z.
// Escala: las DISTANCIAS son reales (el apogeo lunar, 406 800 km, queda en el radio 780); los TAMAÑOS de la Tierra y la Luna se exageran
// con el mismo factor (≈31×), así que su proporción real 3,67 : 1 se conserva.
// Depende de: efemerides-precisas.js (EP)

const LUNARIO = {
  centro: 600,
  elevacion: 30,           // ° de la cámara sobre la eclíptica (cambia solo el aspecto)
  radioTierra: 380,
  radioApogeo: 780,        // centro de la Luna en su apogeo
  kmApogeo: 406800,
  radioMaximo: 968,        // límite de la capa
  radioMarcaSol: 905,
};
LUNARIO.radioLuna = (LUNARIO.radioTierra * 1737.4) / 6378.14;   // ≈ 103,5: misma exageración que la Tierra
LUNARIO.escala = LUNARIO.radioApogeo / LUNARIO.kmApogeo;          // unidades del reloj por km
const LUN_SIN_E = Math.sin((LUNARIO.elevacion * Math.PI) / 180);
const LUN_COS_E = Math.cos((LUNARIO.elevacion * Math.PI) / 180);
const LUN_DEG = Math.PI / 180;

// Vector eclíptico unitario a partir de longitud y latitud (°)
function lunVector(lonDeg, latDeg) {
  const cb = Math.cos(latDeg * LUN_DEG);
  return [cb * Math.cos(lonDeg * LUN_DEG), cb * Math.sin(lonDeg * LUN_DEG), Math.sin(latDeg * LUN_DEG)];
}

// Proyección: [x derecha, y abajo, profundidad hacia la cámara]
function lunProyectar(v) {
  return [v[1], v[0] * LUN_SIN_E - v[2] * LUN_COS_E, v[0] * LUN_COS_E + v[2] * LUN_SIN_E];
}

// Punto de la Tierra (latitud y longitud geográficas en °) → vector eclíptico unitario
// gmst: tiempo sidéreo de Greenwich (°), eps: oblicuidad (°)
function lunPuntoDeLaTierra(latDeg, lonDeg, gmst, eps) {
  const a = (gmst + lonDeg) * LUN_DEG, cl = Math.cos(latDeg * LUN_DEG);
  const xe = cl * Math.cos(a), ye = cl * Math.sin(a), ze = Math.sin(latDeg * LUN_DEG);
  const ce = Math.cos(eps * LUN_DEG), se = Math.sin(eps * LUN_DEG);
  return [xe, ye * ce + ze * se, -ye * se + ze * ce];
}

// Esfera iluminada desde la dirección s (vector eclíptico unitario hacia el Sol), de radio R, centrada en el origen.
// Devuelve los trazos de la parte con luz y de la parte en sombra, y el ángulo (°) con el que hay que girarlos.
// proy (opcional): otra proyección (por ejemplo, la vista desde la Tierra); por defecto la cámara de la capa.
function lunTrazoFase(R, s, proy = lunProyectar) {
  const [sx, sy, sd] = proy(s);
  const m = Math.hypot(sx, sy);
  const circulo = `M ${-R} 0 A ${R} ${R} 0 1 0 ${R} 0 A ${R} ${R} 0 1 0 ${-R} 0 Z`;
  if (m < 1e-6) return { luz: sd > 0 ? circulo : "", sombra: sd > 0 ? "" : circulo, angulo: 0 };
  const rx = Math.abs(sd) * R, sweep = sd > 0 ? 1 : 0;
  const terminador = `A ${rx.toFixed(2)} ${R} 0 0 ${sweep} 0 ${-R}`;
  return {
    luz: `M 0 ${-R} A ${R} ${R} 0 0 1 0 ${R} ${terminador} Z`,
    sombra: `M 0 ${-R} A ${R} ${R} 0 0 0 0 ${R} ${terminador} Z`,
    angulo: (Math.atan2(sy, sx) * 180) / Math.PI,
  };
}