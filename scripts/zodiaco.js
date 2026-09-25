const CENTRO_ZODIACO_X = 600;
const CENTRO_ZODIACO_Y = 463.4;
const RADIO_ZODIACO = 343.4;
const etiquetasZodiaco = [];

const SIGNOS = [
  "Capricornio", "Sagitario", "Escorpio", "Libra", "Virgo", "Leo",
  "Cáncer", "Géminis", "Tauro", "Aries", "Piscis", "Acuario",
];

function polarZodiaco(radio, gradosDesdeArriba) {
  const rad = (gradosDesdeArriba * Math.PI) / 180;
  return {
    x: CENTRO_ZODIACO_X + radio * Math.sin(rad),
    y: CENTRO_ZODIACO_Y - radio * Math.cos(rad),
  };
}

function crearDivisionZodiaco(grados) {
  const a = polarZodiaco(RADIO_ZODIACO - 20, grados);
  const b = polarZodiaco(RADIO_ZODIACO + 20, grados);
  const linea = document.createElementNS(SVG_NS, "line");
  linea.setAttribute("x1", a.x);
  linea.setAttribute("y1", a.y);
  linea.setAttribute("x2", b.x);
  linea.setAttribute("y2", b.y);
  linea.setAttribute("class", "division-zodiaco");
  return linea;
}

function crearEtiquetaZodiaco(texto, grados, radio) {
  const p = polarZodiaco(radio, grados);
  const elemento = document.createElementNS(SVG_NS, "text");
  elemento.setAttribute("x", p.x);
  elemento.setAttribute("y", p.y);
  elemento.setAttribute("class", "etiqueta-zodiaco");
  elemento.textContent = texto;
  etiquetasZodiaco.push({ elemento, x: p.x, y: p.y });
  return elemento;
}

function dibujarZodiaco() {
  const capa = document.getElementById("capa-zodiaco");
  const RADIO_ETIQUETA = 290;

  for (let i = 0; i < 12; i++) {
    const inicio = i * 30;
    const medio = inicio + 15;
    capa.appendChild(crearDivisionZodiaco(inicio));
    capa.appendChild(crearEtiquetaZodiaco(SIGNOS[i], medio, RADIO_ETIQUETA));
  }
}

function actualizarEtiquetasZodiaco(anguloRotacion) {
  etiquetasZodiaco.forEach(({ elemento, x, y }) => {
    elemento.setAttribute("transform", `rotate(${-anguloRotacion} ${x} ${y})`);
  });
}