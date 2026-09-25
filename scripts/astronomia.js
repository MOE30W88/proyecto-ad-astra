function diasJuliano(fecha) {
  const msPorDia = 86400000;
  const inicioJ2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  return (fecha.getTime() - inicioJ2000) / msPorDia;
}

function normalizarGrados(grados) {
  return ((grados % 360) + 360) % 360;
}

const OBLICUIDAD = 23.44;

function posicionSolar(fecha) {
  const d = diasJuliano(fecha);

  const longitudMedia = normalizarGrados(280.46 + 0.9856474 * d);
  const anomaliaMedia = normalizarGrados(357.528 + 0.9856003 * d);
  const anomaliaRad = (anomaliaMedia * Math.PI) / 180;

  const longitudEcliptica = normalizarGrados(
    longitudMedia + 1.915 * Math.sin(anomaliaRad) + 0.02 * Math.sin(2 * anomaliaRad)
  );
  const longEclipticaRad = (longitudEcliptica * Math.PI) / 180;
  const oblicuidadRad = (OBLICUIDAD * Math.PI) / 180;

  const declinacion =
    (Math.asin(Math.sin(oblicuidadRad) * Math.sin(longEclipticaRad)) * 180) / Math.PI;

  const ascensionRecta =
    (Math.atan2(
      Math.cos(oblicuidadRad) * Math.sin(longEclipticaRad),
      Math.cos(longEclipticaRad)
    ) *
      180) /
    Math.PI;

  return { declinacion, ascensionRecta: normalizarGrados(ascensionRecta) };
}

function horaSideral(fecha, longitudGeografica) {
  const d = diasJuliano(fecha);
  const gmst = normalizarGrados(280.46061837 + 360.98564736629 * d);
  return normalizarGrados(gmst + longitudGeografica);
}

function posicionSolarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionSolar(fecha);
  const anguloHorario = normalizarGrados(horaSideral(fecha, longitudGeografica) - ascensionRecta);

  const latRad = (latitud * Math.PI) / 180;
  const decRad = (declinacion * Math.PI) / 180;
  const haRad = (anguloHorario * Math.PI) / 180;

  const altura =
    (Math.asin(
      Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad)
    ) *
      180) /
    Math.PI;

  const azimut =
    (Math.atan2(
      -Math.sin(haRad),
      Math.tan(decRad) * Math.cos(latRad) - Math.sin(latRad) * Math.cos(haRad)
    ) *
      180) /
    Math.PI;

  return { altura, azimut: normalizarGrados(azimut) };
}

function radioDesdeAltura(altura) {
  const RADIO_MAXIMO = 480;
  const radio = (RADIO_MAXIMO * (altura + 90)) / 180;
  return Math.max(0, Math.min(RADIO_MAXIMO, radio));
}

function intensidadSolar(altura) {
  const FIN_CREPUSCULO = -6;
  const CENIT = 90;
  const normalizado = (altura - FIN_CREPUSCULO) / (CENIT - FIN_CREPUSCULO);
  return Math.max(0, Math.min(1, normalizado));
}