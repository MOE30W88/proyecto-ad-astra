// scripts/luna-angulo.js
// Ángulo de la Luna en el dial de 24 h (capa Día y noche): el del Sol (aguja de la hora) más su diferencia de ascensión recta.
// Luna nueva = junto al Sol (XII al mediodía), llena = frente al Sol (XXIV), creciente = detrás del Sol, menguante = delante.
// Depende de: hora.js (anguloDeLaHora), astronomia.js (posicionSolar, posicionLunarEcuatorial, normalizarGrados)
function anguloDeLaLuna(fecha) {
  return anguloDeLaHora(fecha) + normalizarGrados(posicionSolar(fecha).ascensionRecta - posicionLunarEcuatorial(fecha).ascensionRecta + 180) - 180;
}