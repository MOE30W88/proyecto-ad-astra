// scripts/referencias-estacionales.js

const EVENTOS_ESTACIONALES = [
  { nombre: "equinoccio-primavera", longitud: 0, etiqueta: "Equinoccio de primavera" },
  { nombre: "solsticio-verano", longitud: 90, etiqueta: "Solsticio de verano" },
  { nombre: "equinoccio-otonio", longitud: 180, etiqueta: "Equinoccio de otoño" },
  { nombre: "solsticio-invierno", longitud: 270, etiqueta: "Solsticio de invierno" },
];

const TOLERANCIA_GRADOS = 0.5; // ~medio día de movimiento solar

function dibujarReferenciasEstacionales() {
  const capa = document.getElementById("capa-referencias-estacionales");
  capa.innerHTML = "";

  EVENTOS_ESTACIONALES.forEach(({ nombre, longitud }) => {
    const rotacion = normalizarGrados(longitud - 300);
    const radio = radioActualDelZodiaco(RADIO_ZODIACO, rotacion);

    const circulo = document.createElementNS(SVG_NS, "circle");
    circulo.setAttribute("cx", 600);
    circulo.setAttribute("cy", 600);
    circulo.setAttribute("r", radio);
    circulo.setAttribute("class", `referencia-estacional referencia-${nombre}`);
    capa.appendChild(circulo);
  });

  const ejeLectura = document.createElementNS(SVG_NS, "line");
  ejeLectura.setAttribute("x1", 600);
  ejeLectura.setAttribute("y1", -230);
  ejeLectura.setAttribute("x2", 600);
  ejeLectura.setAttribute("y2", 1430);
  ejeLectura.setAttribute("class", "eje-lectura-estacional");
  capa.appendChild(ejeLectura);
}

function actualizarEventoEstacional(fecha, anguloRotacion) {
  const capa = document.getElementById("capa-marcador-estacional");
  capa.innerHTML = "";

  const { longitudEcliptica } = posicionSolar(fecha);

  const eventoActivo = EVENTOS_ESTACIONALES.find(({ longitud }) => {
    let diferencia = Math.abs(longitudEcliptica - longitud);
    if (diferencia > 180) diferencia = 360 - diferencia;
    return diferencia <= TOLERANCIA_GRADOS;
  });

  if (!eventoActivo) return;

  const radio = radioActualDelZodiaco(RADIO_ZODIACO, anguloRotacion);
  const punto = polar(radio, 0);

  const marcador = document.createElementNS(SVG_NS, "circle");
  marcador.setAttribute("cx", punto.x);
  marcador.setAttribute("cy", punto.y);
  marcador.setAttribute("r", 8);
  marcador.setAttribute("class", "punto-evento-estacional");
  capa.appendChild(marcador);

  const etiqueta = document.createElementNS(SVG_NS, "text");
  const centroActual = rotarPunto({ x: CENTRO_ZODIACO_X, y: CENTRO_ZODIACO_Y }, anguloRotacion);
  etiqueta.setAttribute("x", centroActual.x);
  etiqueta.setAttribute("y", centroActual.y);
  etiqueta.setAttribute("class", "etiqueta-evento-estacional");
  etiqueta.textContent = eventoActivo.etiqueta;
  capa.appendChild(etiqueta);
}