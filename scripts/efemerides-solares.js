// scripts/efemerides-solares.js
// Efemérides del día EN EL LUGAR activo (horas como instantes reales, en ms).
// Precisión ~±1-2 min (barrido de 1 min con interpolación lineal).
// Depende de: hora-local.js, astronomia.js, ubicacion.js
 
const UMBRALES_SOLARES = {
  salida: -0.833, // borde del disco + refracción
  civil: -6,
  nautico: -12,
  astronomico: -18,
};
 
// Cambia cuando cambia el día de pared, el huso o el lugar
function claveDiaYLugar(ahora) {
  const p = aHoraDePared(ahora);
  return `${p.getUTCFullYear()}-${p.getUTCMonth()}-${p.getUTCDate()}|${husoDelLugar(ahora)}|${ubicacion.latitud}|${ubicacion.longitud}`;
}
 
function calcularEfemeridesSolares(ahora) {
  const inicio = medianocheLocal(ahora).getTime();
  const alturas = [];
  for (let m = 0; m <= 1440; m++) {
    alturas.push(
      posicionSolarHorizonte(
        new Date(inicio + m * 60000),
        ubicacion.latitud,
        ubicacion.longitud,
      ).altura,
    );
  }
 
  const cruce = (umbral, ascendente) => {
    for (let m = 0; m < 1440; m++) {
      const a = alturas[m];
      const b = alturas[m + 1];
      const cruza = ascendente
        ? a < umbral && b >= umbral
        : a >= umbral && b < umbral;
      if (cruza) return inicio + (m + (umbral - a) / (b - a)) * 60000;
    }
    return null;
  };
 
  const max = Math.max(...alturas);
  const min = Math.min(...alturas);
  const umbral = UMBRALES_SOLARES.salida;
  const resultado = {
    estado: min > umbral ? "sol-medianoche" : max < umbral ? "noche-polar" : "normal",
    mediodia: inicio + alturas.indexOf(max) * 60000,
    alba: {},
    ocaso: {},
  };
  for (const [nombre, u] of Object.entries(UMBRALES_SOLARES)) {
    resultado.alba[nombre] = cruce(u, true);
    resultado.ocaso[nombre] = cruce(u, false);
  }
  return resultado;
}
 
// Hora solar verdadera en horas decimales (12 = Sol en el meridiano)
function horaSolarVerdadera(instante) {
  const { ascensionRecta } = posicionSolar(instante);
  const ha = normalizarGrados(
    horaSideral(instante, ubicacion.longitud) - ascensionRecta,
  );
  return (12 + ha / 15) % 24;
}
 
// Diferencia (minutos) entre el Sol verdadero y el Sol medio
function ecuacionDelTiempoMin(instante) {
  const msDia = 86400000;
  const utc = (((instante.getTime() % msDia) + msDia) % msDia) / 3600000;
  const media = (((utc + ubicacion.longitud / 15) % 24) + 24) % 24;
  const d = ((((horaSolarVerdadera(instante) - media + 12) % 24) + 24) % 24) - 12;
  return d * 60;
}