// scripts/indicador-zodiaco.js

const RADIO_ZODIACO_INTERNO = 260; // debe coincidir con el círculo guía interno en index.html

function radioActualDelZodiaco(radioLocal, anguloRotacion) {
  const e = 600 - CENTRO_ZODIACO_Y;
  const A = (anguloRotacion * Math.PI) / 180;
  return e * Math.cos(A) + Math.sqrt(radioLocal * radioLocal - (e * Math.sin(A)) ** 2);
}

function rotarPunto(punto, angulo) {
  const rad = (angulo * Math.PI) / 180;
  const dx = punto.x - 600;
  const dy = punto.y - 600;
  return {
    x: 600 + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: 600 + dx * Math.sin(rad) + dy * Math.cos(rad),
  };
}

function actualizarIndicadorZodiaco(anguloRotacion) {
  const capa = document.getElementById("capa-indicador-zodiaco");
  capa.innerHTML = "";

  const anguloLocalArriba = normalizarGrados(-anguloRotacion);
  const inicioLocal = Math.floor(anguloLocalArriba / 30) * 30;
  const finLocal = inicioLocal + 30;

  const puntoExtInicio = rotarPunto(polarZodiaco(RADIO_ZODIACO, inicioLocal), anguloRotacion);
  const puntoExtFin = rotarPunto(polarZodiaco(RADIO_ZODIACO, finLocal), anguloRotacion);
  const puntoIntFin = rotarPunto(polarZodiaco(RADIO_ZODIACO_INTERNO, finLocal), anguloRotacion);
  const puntoIntInicio = rotarPunto(polarZodiaco(RADIO_ZODIACO_INTERNO, inicioLocal), anguloRotacion);

  const d = `M ${puntoExtInicio.x} ${puntoExtInicio.y} A ${RADIO_ZODIACO} ${RADIO_ZODIACO} 0 0 1 ${puntoExtFin.x} ${puntoExtFin.y} L ${puntoIntFin.x} ${puntoIntFin.y} A ${RADIO_ZODIACO_INTERNO} ${RADIO_ZODIACO_INTERNO} 0 0 0 ${puntoIntInicio.x} ${puntoIntInicio.y} Z`;

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);
  path.setAttribute("class", "indicador-zodiaco");
  capa.appendChild(path);
}