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

    return { longitudEcliptica, declinacion, ascensionRecta: normalizarGrados(ascensionRecta) };
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

  return { altura };
}

function radioDesdeAltura(altura) {
  const RADIO_MAXIMO = 480;
  const radio = (RADIO_MAXIMO * (altura + 90)) / 180;
  return Math.max(0, Math.min(RADIO_MAXIMO, radio));
}

function intensidadSolar(altura) {
  if (altura <= 0) return 0;
  const INICIO_PLENO = 15; // grados sobre el horizonte para brillo máximo
  return Math.max(0, Math.min(1, altura / INICIO_PLENO));
}

const PERIODO_SINODICO = 29.530588853;
const REFERENCIA_LUNA_NUEVA = 5.25972;

function edadLunar(fecha) {
  const d = diasJuliano(fecha);
  const diferencia = d - REFERENCIA_LUNA_NUEVA;
  return ((diferencia % PERIODO_SINODICO) + PERIODO_SINODICO) % PERIODO_SINODICO;
}

function fraccionIluminada(fecha) {
  const edad = edadLunar(fecha);
  const fraccionDelCiclo = edad / PERIODO_SINODICO;
  return (1 - Math.cos(2 * Math.PI * fraccionDelCiclo)) / 2;
}

function posicionLunar(fecha) {
  const d = diasJuliano(fecha);

  const longitudMedia = normalizarGrados(218.316 + 13.176396 * d);
  const anomaliaMedia = normalizarGrados(134.963 + 13.064993 * d);
  const argumentoLatitud = normalizarGrados(93.272 + 13.229350 * d);

  const anomaliaRad = (anomaliaMedia * Math.PI) / 180;
  const latitudRad = (argumentoLatitud * Math.PI) / 180;

  const longitudEcliptica = normalizarGrados(longitudMedia + 6.289 * Math.sin(anomaliaRad));
  const latitudEcliptica = 5.128 * Math.sin(latitudRad);

  return { longitudEcliptica, latitudEcliptica };
}

function posicionLunarEcuatorial(fecha) {
  const { longitudEcliptica, latitudEcliptica } = posicionLunar(fecha);

  const lonRad = (longitudEcliptica * Math.PI) / 180;
  const latRad = (latitudEcliptica * Math.PI) / 180;
  const oblicuidadRad = (OBLICUIDAD * Math.PI) / 180;

  const declinacion =
    (Math.asin(
      Math.sin(latRad) * Math.cos(oblicuidadRad) +
        Math.cos(latRad) * Math.sin(oblicuidadRad) * Math.sin(lonRad)
    ) *
      180) /
    Math.PI;

  const y = Math.sin(lonRad) * Math.cos(oblicuidadRad) - Math.tan(latRad) * Math.sin(oblicuidadRad);
  const x = Math.cos(lonRad);
  const ascensionRecta = normalizarGrados((Math.atan2(y, x) * 180) / Math.PI);

  return { declinacion, ascensionRecta };
}

function posicionLunarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionLunarEcuatorial(fecha);
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

  return { altura };
}

function intensidadLunar(alturaLuna, alturaSolar, fraccion) {
  if (alturaLuna <= 0) return 0;
  const INICIO_PLENO = 10; // atenuación propia cerca del horizonte

  const factorHorizonte = Math.max(0, Math.min(1, alturaLuna / INICIO_PLENO));
  const factorNocturno = 1 - intensidadSolar(alturaSolar); // 1 = noche cerrada, 0 = pleno día
  const pisoDiurno = 0.15; // nunca 100% invisible de día, pero sí muy tenue
  const visibilidadCielo = pisoDiurno + factorNocturno * (1 - pisoDiurno);

  return factorHorizonte * visibilidadCielo * fraccion;
}

function anguloZodiaco(fecha) {
  const { longitudEcliptica } = posicionSolar(fecha);
  return normalizarGrados(longitudEcliptica - 300);
}