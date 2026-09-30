// scripts/rotacion.js
// Capa Rotación: dos grupos del SVG.
//   capa-eje-rotacion → línea punteada del eje terrestre (visible en "Astrolabio" y en "Rotación")
//   capa-rotacion     → globo terrestre (visible SOLO al elegir "Rotación"; ver css/rotacion.css)
// El globo se ve desde el Sol: el meridiano central es el que tiene el Sol en el cenit, y gira con el
// tiempo simulado (así responde a los botones de velocidad). Proyección ortográfica real.

const ROTACION = {
  centro: 600,
  radioGlobo: 596,
  inclinacion: 23.44,          // grados; el polo norte se inclina hacia la derecha
  largoEje: 1000,              // del centro a cada extremo del eje
  velocidadEcuatorial: 465.1,  // m/s (2π·6378 km / 23 h 56 min)
  pasoMeridianos: 15,          // un meridiano por huso horario
  paralelos: [-60, -30, 0, 30, 60],
};

const NS_SVG = "http://www.w3.org/2000/svg";
let rotacionConstruida = false;
let meridianosGlobo = [];      // { linea, longitud }
let puntoUbicacionGlobo = null;
let textoVelocidadRotacion = null;
let ultimaLatitudEtiqueta = undefined;

function crearSvg(nombre, atributos = {}, padre = null) {
  const el = document.createElementNS(NS_SVG, nombre);
  Object.entries(atributos).forEach(([k, v]) => el.setAttribute(k, v));
  if (padre) padre.appendChild(el);
  return el;
}

function formatoGrados(valor) {
  return `${valor.toFixed(2).replace(".", ",")}°`;
}

function construirEjeRotacion(capa) {
  const { centro: c, inclinacion: eps, largoEje: L } = ROTACION;
  const extremoSup = polar(L, eps);        // polar() viene de marco.js (grados desde arriba, horario)
  const extremoInf = polar(L, eps + 180);

  crearSvg("line", { class: "eje-rotacion-linea", x1: extremoInf.x, y1: extremoInf.y, x2: extremoSup.x, y2: extremoSup.y }, capa);
  crearSvg("circle", { class: "eje-rotacion-punta", cx: extremoSup.x, cy: extremoSup.y, r: 7 }, capa);
  crearSvg("circle", { class: "eje-rotacion-punta", cx: extremoInf.x, cy: extremoInf.y, r: 7 }, capa);

  // Trazo matemático del ángulo: arco entre la vertical y el eje, con su valor
  const rArco = 945;
  const a = polar(rArco, 0);
  const b = polar(rArco, eps);
  crearSvg("path", { class: "eje-rotacion-arco", d: `M ${a.x} ${a.y} A ${rArco} ${rArco} 0 0 1 ${b.x} ${b.y}` }, capa);
  [a, b].forEach((p) => {
    const dentro = polar(rArco - 16, p === a ? 0 : eps);
    const fuera = polar(rArco + 16, p === a ? 0 : eps);
    crearSvg("line", { class: "eje-rotacion-arco", x1: dentro.x, y1: dentro.y, x2: fuera.x, y2: fuera.y }, capa);
  });
  const medio = polar(rArco + 34, eps / 2);
  const valor = crearSvg("text", { class: "texto-eje-rotacion", x: medio.x, y: medio.y, "text-anchor": "middle" }, capa);
  valor.textContent = formatoGrados(eps);

  // Extremo superior: nombre del ángulo. Extremo inferior: velocidad de rotación.
  const etiquetaAngulo = crearSvg("text", { class: "texto-eje-rotacion", x: extremoSup.x + 22, y: extremoSup.y + 8, "text-anchor": "start" }, capa);
  etiquetaAngulo.textContent = "Ángulo de inclinación";
  textoVelocidadRotacion = crearSvg("text", { class: "texto-eje-rotacion", x: extremoInf.x - 22, y: extremoInf.y + 8, "text-anchor": "end" }, capa);
}

function construirGlobo(capa) {
  const { centro: c, radioGlobo: R, inclinacion: eps } = ROTACION;

  const defs = crearSvg("defs", {}, capa);
  const grad = crearSvg("radialGradient", { id: "grad-globo", cx: "42%", cy: "38%", r: "72%" }, defs);
  crearSvg("stop", { offset: "0%", "stop-color": "#c4ebf7" }, grad);
  crearSvg("stop", { offset: "55%", "stop-color": "#7dbddd" }, grad);
  crearSvg("stop", { offset: "100%", "stop-color": "#2f6f9e" }, grad);
  const limbo = crearSvg("radialGradient", { id: "grad-limbo", cx: "50%", cy: "50%", r: "50%" }, defs);
  crearSvg("stop", { offset: "72%", "stop-color": "#04101f", "stop-opacity": "0" }, limbo);
  crearSvg("stop", { offset: "100%", "stop-color": "#04101f", "stop-opacity": "0.55" }, limbo);

  crearSvg("circle", { class: "globo-esfera", cx: c, cy: c, r: R }, capa);

  // Todo lo que pertenece a la Tierra va en un grupo inclinado por el ángulo del eje
  const tierra = crearSvg("g", { transform: `rotate(${eps} ${c} ${c})` }, capa);

  // Paralelos: con el eje en el plano de la pantalla se proyectan como rectas perpendiculares al eje
  const lats = [...ROTACION.paralelos, eps, -eps, 90 - eps, -(90 - eps)];
  lats.forEach((lat) => {
    const y = c - R * Math.sin((lat * Math.PI) / 180);
    const medio = R * Math.cos((lat * Math.PI) / 180);
    const especial = lat === 0 ? "ecuador" : Math.abs(lat) === eps || Math.abs(lat) === 90 - eps ? "circulo-notable" : "";
    crearSvg("line", { class: `globo-paralelo ${especial}`.trim(), x1: c - medio, y1: y, x2: c + medio, y2: y }, tierra);
  });

  // Meridianos: semielipses cuyo ancho depende del ángulo respecto al meridiano central
  for (let lon = -180; lon < 180; lon += ROTACION.pasoMeridianos) {
    const linea = crearSvg("path", { class: lon === 0 ? "globo-meridiano meridiano-cero" : "globo-meridiano" }, tierra);
    meridianosGlobo.push({ linea, longitud: lon });
  }

  puntoUbicacionGlobo = crearSvg("circle", { class: "globo-ubicacion", cx: c, cy: c, r: 12, visibility: "hidden" }, tierra);

  crearSvg("circle", { class: "globo-limbo", cx: c, cy: c, r: R }, capa);
  crearSvg("circle", { class: "globo-borde", cx: c, cy: c, r: R }, capa);
}

function construirRotacion() {
  construirEjeRotacion(document.getElementById("capa-eje-rotacion"));
  construirGlobo(document.getElementById("capa-rotacion"));
  rotacionConstruida = true;
}

// Velocidad lineal de la superficie a la latitud del usuario (o en el ecuador si aún no hay ubicación)
function actualizarEtiquetaVelocidad() {
  if (ubicacion.latitud === ultimaLatitudEtiqueta) return;
  ultimaLatitudEtiqueta = ubicacion.latitud;
  const lat = ubicacion.latitud;
  const v = ROTACION.velocidadEcuatorial * Math.cos(((lat ?? 0) * Math.PI) / 180);
  const valor = Math.round(v).toLocaleString("es");
  textoVelocidadRotacion.textContent = `Velocidad de rotación · ${valor} m/s${lat === null ? " (ecuador)" : ""}`;
}

// Longitud (este +) del punto subsolar: el meridiano que mira hacia el Sol
function longitudSubsolar(instante) {
  const { ascensionRecta } = posicionSolar(instante);
  const l = normalizarGrados(ascensionRecta - horaSideral(instante, 0));
  return l > 180 ? l - 360 : l;
}

function actualizarRotacion(ahora) {
  if (!rotacionConstruida) construirRotacion();
  actualizarEtiquetaVelocidad();
  if (!document.getElementById("reloj").classList.contains("enfoque-rotacion")) return; // globo oculto: no gastar

  const { centro: c, radioGlobo: R } = ROTACION;
  const central = longitudSubsolar(ahora);

  meridianosGlobo.forEach(({ linea, longitud }) => {
    let t = longitud - central;
    t = ((((t + 180) % 360) + 360) % 360) - 180;
    if (Math.abs(t) >= 90) {
      linea.setAttribute("d", "");
      return;
    }
    const rx = R * Math.abs(Math.sin((t * Math.PI) / 180));
    linea.setAttribute("d", `M ${c} ${c - R} A ${rx} ${R} 0 0 ${t > 0 ? 1 : 0} ${c} ${c + R}`);
  });

  if (ubicacion.latitud === null) {
    puntoUbicacionGlobo.setAttribute("visibility", "hidden");
    return;
  }
  const lat = (ubicacion.latitud * Math.PI) / 180;
  let t = ubicacion.longitud - central;
  t = (((((t + 180) % 360) + 360) % 360) - 180) * (Math.PI / 180);
  const visible = Math.cos(lat) * Math.cos(t) > 0;
  puntoUbicacionGlobo.setAttribute("visibility", visible ? "visible" : "hidden");
  if (visible) {
    puntoUbicacionGlobo.setAttribute("cx", c + R * Math.cos(lat) * Math.sin(t));
    puntoUbicacionGlobo.setAttribute("cy", c - R * Math.sin(lat));
  }
}