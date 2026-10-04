// scripts/alineacion.js
// Línea punteada sobre el eje Sol–Tierra cuando los centros planetarios se alinean en 3D
// (del mismo lado que la Tierra o del lado opuesto, dentro del umbral angular declarado).
//   1 planeta además de Sol y Tierra  -> gris claro
//   2 planetas                         -> amarilla
//   3 o más                            -> cian
// Colores: variables --alineacion-1/2/3 en css/tema.css. Estilo: css/alineacion.css.
// Depende de: planetas.js (PLANETAS, posicionHeliocentrica, anguloDelDial, DIAL_RADIO_MAXIMO), astronomia.js (polar)

const UMBRAL_ALINEACION_GRADOS = 0.1; // umbral didáctico; no existe un límite astronómico universal
const GRADOS_POR_RADIAN = 180 / Math.PI;

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

function productoCruz(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

function productoPunto(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function norma(v) {
  return Math.hypot(v[0], v[1], v[2]);
}

// Evalúa centros en el mismo marco heliocéntrico; el eje es la recta infinita Sol–Tierra.
function evaluarAlineaciones(fecha) {
  const tierra = posicionHeliocentrica(PLANETA_TIERRA, fecha);
  const rTierra = [tierra.x, tierra.y, tierra.z];
  const moduloTierra = norma(rTierra);

  return PLANETAS.filter((p) => !p.esTierra).map((planeta) => {
    const posicion = posicionHeliocentrica(planeta, fecha);
    const rPlaneta = [posicion.x, posicion.y, posicion.z];
    const cruz = productoCruz(rTierra, rPlaneta);
    const magnitudCruz = norma(cruz);
    const desviacionGrados = Math.atan2(magnitudCruz, Math.abs(productoPunto(rTierra, rPlaneta))) * GRADOS_POR_RADIAN;
    return {
      nombre: planeta.nombre,
      desviacionGrados,
      distanciaEjeUA: magnitudCruz / moduloTierra,
      alineado: desviacionGrados <= UMBRAL_ALINEACION_GRADOS,
    };
  }).sort((a, b) => a.desviacionGrados - b.desviacionGrados);
}

// Se llama en cada fotograma desde main.js
function actualizarAlineacion(fecha) {
  const linea = obtenerLineaAlineacion();
  const alineados = evaluarAlineaciones(fecha).filter((p) => p.alineado);
  if (alineados.length === 0) {
    linea.removeAttribute("data-nivel");
    return;
  }
  const posicionTierra = posicionHeliocentrica(PLANETA_TIERRA, fecha);
  if (Math.hypot(posicionTierra.x, vistaSistemaSolar === "xz" ? posicionTierra.z : posicionTierra.y) < 1e-8) {
    linea.removeAttribute("data-nivel");
    return;
  }
  const angulo = anguloDelDial(anguloEnVistaSistemaSolar(posicionTierra));
  const a = polar(DIAL_RADIO_MAXIMO, angulo);
  const b = polar(DIAL_RADIO_MAXIMO, angulo + 180);
  linea.setAttribute("x1", a.x);
  linea.setAttribute("y1", a.y);
  linea.setAttribute("x2", b.x);
  linea.setAttribute("y2", b.y);
  linea.setAttribute("data-nivel", Math.min(alineados.length, 3));
}
