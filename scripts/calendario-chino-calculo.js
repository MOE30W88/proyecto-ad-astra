// scripts/calendario-chino-calculo.js
// Cálculo del calendario lunisolar chino: fecha del Año Nuevo lunar de cualquier año y fracción del año chino transcurrida.
// Reglas (las del calendario chino oficial, hora de Pekín UTC+8):
//   · Los meses empiezan en cada luna nueva (Meeus, cap. 49, términos principales: error de minutos).
//   · El mes 11 es el que contiene el solsticio de diciembre.
//   · Entre dos solsticios hay 12 o 13 meses. Con 13, el primer mes sin "término mayor" (el Sol cruzando
//     un múltiplo de 30° de longitud) es el mes intercalar (bisiesto) y no recibe número propio.
//   · El Año Nuevo es el día 1 del mes 1: normalmente la 2.ª luna nueva tras el solsticio (3.ª si el bisiesto cae en el mes 11 o 12).
// Depende de: astronomia.js (posicionSolar, normalizarGrados)

const CHINO_ZONA_MS = 8 * 3600000;       // Pekín = UTC+8
const CHINO_DIA_MS = 86400000;
const CHINO_SINODICO = 29.530588861;     // días
const CHINO_JD_UNIX = 2440587.5;         // JD del 1/1/1970 00:00 UTC
const CHINO_DELTA_T_DIAS = 69 / 86400;   // TT − UT ≈ 69 s (suficiente aquí)

// Instante (ms UTC) de la luna nueva número k (k = 0 ↔ 6 ene 2000), Meeus cap. 49
function lunaNuevaMeeus(k) {
  const T = k / 1236.85;
  const R = Math.PI / 180;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = (2.5534 + 29.1053567 * k - 0.0000014 * T * T) * R;
  const Mp = (201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T ** 3) * R;
  const F = (160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T ** 3) * R;
  const O = (124.7746 - 1.56375588 * k + 0.0020672 * T * T) * R;
  const jde = 2451550.09766 + CHINO_SINODICO * k + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const c =
    -0.4072 * Math.sin(Mp) + 0.17241 * E * Math.sin(M) + 0.01608 * Math.sin(2 * Mp) + 0.01039 * Math.sin(2 * F) +
    0.00739 * E * Math.sin(Mp - M) - 0.00514 * E * Math.sin(Mp + M) + 0.00208 * E * E * Math.sin(2 * M) -
    0.00111 * Math.sin(Mp - 2 * F) - 0.00057 * Math.sin(Mp + 2 * F) + 0.00056 * E * Math.sin(2 * Mp + M) -
    0.00042 * Math.sin(3 * Mp) + 0.00042 * E * Math.sin(M + 2 * F) + 0.00038 * E * Math.sin(M - 2 * F) -
    0.00024 * E * Math.sin(2 * Mp - M) - 0.00017 * Math.sin(O) - 0.00007 * Math.sin(Mp + 2 * M) +
    0.00004 * Math.sin(2 * Mp - 2 * F) + 0.00004 * Math.sin(3 * M) + 0.00003 * Math.sin(Mp + M - 2 * F) +
    0.00003 * Math.sin(2 * Mp + 2 * F) - 0.00003 * Math.sin(Mp + M + 2 * F) + 0.00003 * Math.sin(Mp - M + 2 * F) -
    0.00002 * Math.sin(Mp - M - 2 * F) - 0.00002 * Math.sin(3 * Mp + M) + 0.00002 * Math.sin(4 * Mp);
  return (jde + c - CHINO_DELTA_T_DIAS - CHINO_JD_UNIX) * CHINO_DIA_MS;
}

// Instante (ms UTC) en que el Sol alcanza la longitud `objetivo`, cerca de `aproxMs` (bisección)
function instanteLongitudSolar(objetivo, aproxMs) {
  const dif = (ms) => ((posicionSolar(new Date(ms)).longitudEcliptica - objetivo + 540) % 360) - 180;
  let a = aproxMs - 20 * CHINO_DIA_MS;
  let b = aproxMs + 20 * CHINO_DIA_MS;
  for (let i = 0; i < 40; i++) {
    const m = (a + b) / 2;
    if (dif(m) < 0) a = m; else b = m;
  }
  return (a + b) / 2;
}

const diaDePekin = (ms) => Math.floor((ms + CHINO_ZONA_MS) / CHINO_DIA_MS);

// Solsticio de diciembre del año gregoriano `anio` (ms UTC)
function solsticioDeDiciembre(anio) {
  return instanteLongitudSolar(270, Date.UTC(anio, 11, 21, 12));
}

const cacheAnioNuevoChino = {};

// Instante (ms UTC) de las 00:00 de Pekín del Año Nuevo lunar que cae en el año gregoriano `anio`
function anioNuevoChino(anio) {
  if (cacheAnioNuevoChino[anio]) return cacheAnioNuevoChino[anio];
  const s0 = solsticioDeDiciembre(anio - 1);
  const s1 = solsticioDeDiciembre(anio);
  // Lunas nuevas (como día de Pekín) desde antes de s0 hasta después de s1
  const k0 = Math.floor((s0 / CHINO_DIA_MS + CHINO_JD_UNIX - 2451550.09766) / CHINO_SINODICO) - 1;
  const lunas = [];
  for (let k = k0; k <= k0 + 15; k++) lunas.push(diaDePekin(lunaNuevaMeeus(k)));
  const dia0 = diaDePekin(s0);
  const dia1 = diaDePekin(s1);
  const i11a = lunas.filter((d) => d <= dia0).length - 1; // mes 11 que contiene el solsticio de s0
  const i11b = lunas.filter((d) => d <= dia1).length - 1; // mes 11 siguiente
  const meses = i11b - i11a; // 12 o 13
  // Días de Pekín de los 13 términos mayores desde el solsticio s0
  const terminos = [];
  for (let j = 0; j <= 12; j++) terminos.push(diaDePekin(instanteLongitudSolar((270 + 30 * j) % 360, s0 + j * 30.4369 * CHINO_DIA_MS)));
  let bisiesto = -1;
  if (meses === 13) {
    for (let i = 1; i < 13; i++) {
      const desde = lunas[i11a + i];
      const hasta = lunas[i11a + i + 1];
      if (!terminos.some((t) => t >= desde && t < hasta)) { bisiesto = i; break; }
    }
  }
  const indice = 2 + (bisiesto === 1 || bisiesto === 2 ? 1 : 0);
  const ms = lunas[i11a + indice] * CHINO_DIA_MS - CHINO_ZONA_MS;
  cacheAnioNuevoChino[anio] = ms;
  return ms;
}

// Año chino en curso y fracción (0–1) transcurrida desde su Año Nuevo hasta el siguiente
function estadoAnioChino(fecha) {
  const t = fecha.getTime();
  let anio = fecha.getUTCFullYear();
  if (t < anioNuevoChino(anio)) anio -= 1;
  const inicio = anioNuevoChino(anio);
  const fin = anioNuevoChino(anio + 1);
  return { anio, fraccion: (t - inicio) / (fin - inicio) };
}