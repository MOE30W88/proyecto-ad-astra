// scripts/alineacion.js
// Línea punteada que cruza el Sol y la Tierra cuando otros planetas quedan alineados con ellos
// (vistos desde el Sol, del mismo lado que la Tierra o del lado opuesto).
//   1 planeta además de Sol y Tierra  -> gris claro
//   2 planetas                         -> amarilla
//   3 o más                            -> cian
// Colores: variables --alineacion-1/2/3 en css/tema.css. Estilo: css/alineacion.css.
// Depende de: planetas.js (PLANETAS, posicionHeliocentrica, anguloDelDial, DIAL_RADIO_MAXIMO), astronomia.js (polar, normalizarGrados)

const UMBRAL_ALINEACION = 3; // grados de tolerancia (≈19 % del tiempo hay 1 planeta, ≈2 % hay 2, ≈0,2 % hay 3 o más)

let lineaAlineacion = null;

function obtenerLineaAlineacion() {
  if (lineaAlineacion) return lineaAlineacion;
  const capa = document.createElementNS(SVG_NS, "g");
  capa.setAttribute("id", "capa-alineacion");
  lineaAlineacion = document.createElementNS(SVG_NS, "line");
  lineaAlineacion.setAttribute("class", "linea-alineacion");
  capa.appendChild(lineaAlineacion);
  const planetas = document.getElementById("capa-planetas");
  planetas.parentNode.insertBefore(capa, planetas); // bajo los planetas, sobre las órbitas
  return lineaAlineacion;
}

// Diferencia angular entre dos longitudes, módulo 180° (0 = misma línea que pasa por el Sol)
function diferenciaAxial(a, b) {
  const d = Math.abs(normalizarGrados(a) - normalizarGrados(b)) % 180;
  return Math.min(d, 180 - d);
}

function planetasAlineados(fecha) {
  const tierra = PLANETAS.find((p) => p.esTierra);
  const longTierra = posicionHeliocentrica(tierra, fecha).longitud;
  return PLANETAS.filter(
    (p) => !p.esTierra && diferenciaAxial(posicionHeliocentrica(p, fecha).longitud, longTierra) <= UMBRAL_ALINEACION,
  ).length;
}

// Se llama en cada fotograma desde main.js
function actualizarAlineacion(fecha) {
  const linea = obtenerLineaAlineacion();
  const n = planetasAlineados(fecha);
  if (n === 0) {
    linea.removeAttribute("data-nivel");
    return;
  }
  const angulo = anguloDelDial(posicionHeliocentrica(PLANETAS.find((p) => p.esTierra), fecha).longitud);
  const a = polar(DIAL_RADIO_MAXIMO, angulo);
  const b = polar(DIAL_RADIO_MAXIMO, angulo + 180);
  linea.setAttribute("x1", a.x);
  linea.setAttribute("y1", a.y);
  linea.setAttribute("x2", b.x);
  linea.setAttribute("y2", b.y);
  linea.setAttribute("data-nivel", Math.min(n, 3));
}