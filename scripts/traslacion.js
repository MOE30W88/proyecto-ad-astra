// scripts/traslacion.js
// Órbita de la Tierra y de los demás planetas alrededor del Sol central.
// La Tierra sigue la longitud solar del dial; los demás salen de planetas.js.
// Depende de: planetas.js (radioDelDial, PLANETAS, posicionHeliocentrica...)
 
const EXCENTRICIDAD_TERRESTRE = 0.0167; // real
const LONGITUD_PERIHELIO = 283; // longitud solar aparente del perihelio (~3 de enero)
 
const planetasEnDial = {}; // nombre -> <circle>
 
function posicionOrbital(longitudEcliptica) {
  const e = EXCENTRICIDAD_TERRESTRE;
  const nu = ((longitudEcliptica - LONGITUD_PERIHELIO) * Math.PI) / 180;
  const distanciaUA = (1 - e * e) / (1 + e * Math.cos(nu));
  return polar(radioDelDial(distanciaUA), longitudEcliptica);
}
 
function construirOrbitaPath() {
  const puntos = [];
  for (let grado = 0; grado <= 360; grado += 2) {
    puntos.push(posicionOrbital(grado));
  }
  return trazoDesdePuntos(puntos);
}
 
function trazoDesdePuntos(puntos) {
  const [inicio, ...resto] = puntos;
  return (
    `M ${inicio.x} ${inicio.y} ` +
    resto.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    " Z"
  );
}
 
// Disco oscuro (sin llegar a negro) tras las órbitas para que contrasten
function dibujarFondoTraslacion() {
  const svg = document.getElementById("reloj");
  if (!svg || document.getElementById("capa-fondo-traslacion")) return;
  const capa = document.createElementNS(SVG_NS, "g");
  capa.setAttribute("id", "capa-fondo-traslacion");
  const disco = document.createElementNS(SVG_NS, "circle");
  disco.setAttribute("id", "fondo-traslacion");
  disco.setAttribute("cx", 600);
  disco.setAttribute("cy", 600);
  disco.setAttribute("r", DIAL_RADIO_MAXIMO);
  capa.appendChild(disco);
  svg.insertBefore(capa, svg.querySelector(":scope > g"));
}
 
function dibujarOrbitaTerrestre() {
  dibujarFondoTraslacion();
  const capa = document.getElementById("capa-orbita-terrestre");
  if (!capa) {
    console.error("Falta <g id='capa-orbita-terrestre'></g> en index.html");
    return;
  }
  const orbita = document.createElementNS(SVG_NS, "path");
  orbita.setAttribute("d", construirOrbitaPath());
  orbita.setAttribute("class", "orbita-terrestre");
  capa.appendChild(orbita);
 
  [0, 90, 180, 270].forEach((longitud) => {
    const p = posicionOrbital(longitud);
    const marca = document.createElementNS(SVG_NS, "circle");
    marca.setAttribute("cx", p.x);
    marca.setAttribute("cy", p.y);
    marca.setAttribute("r", 4);
    marca.setAttribute("class", "marca-orbital");
    capa.appendChild(marca);
  });
 
  const tierra = document.createElementNS(SVG_NS, "circle");
  tierra.setAttribute("id", "tierra-orbital");
  tierra.setAttribute("r", 9);
  capa.appendChild(tierra);
 
  dibujarOrbitasPlanetarias();
}
 
// Órbitas (bajo el zodiaco) y puntos de los planetas (sobre él)
function dibujarOrbitasPlanetarias() {
  const capaOrbitas = document.getElementById("capa-orbitas-planetarias");
  const capaPlanetas = document.getElementById("capa-planetas");
  if (!capaOrbitas || !capaPlanetas) {
    console.error("Faltan <g id='capa-orbitas-planetarias'> o <g id='capa-planetas'> en index.html");
    return;
  }
  const fecha = obtenerFechaActual();
 
  PLANETAS.filter((p) => !p.esTierra).forEach((planeta) => {
    const orbita = document.createElementNS(SVG_NS, "path");
    orbita.setAttribute("d", trazoDesdePuntos(puntosDeOrbita(planeta, fecha)));
    orbita.setAttribute("class", "orbita-planeta");
    capaOrbitas.appendChild(orbita);
 
    const punto = document.createElementNS(SVG_NS, "circle");
    punto.setAttribute("r", planeta.radioDibujo);
    punto.setAttribute("fill", planeta.color);
    punto.setAttribute("class", "planeta");
    const titulo = document.createElementNS(SVG_NS, "title");
    titulo.textContent = planeta.nombre;
    punto.appendChild(titulo);
    capaPlanetas.appendChild(punto);
    planetasEnDial[planeta.nombre] = punto;
  });
}
 
function actualizarTraslacion(fecha) {
  const tierra = document.getElementById("tierra-orbital");
  if (!tierra) return;
  const { longitudEcliptica } = posicionSolar(fecha);
  const p = posicionOrbital(longitudEcliptica);
  tierra.setAttribute("cx", p.x);
  tierra.setAttribute("cy", p.y);
 
  PLANETAS.forEach((planeta) => {
    const punto = planetasEnDial[planeta.nombre];
    if (!punto) return;
    const pos = posicionHeliocentrica(planeta, fecha);
    const xy = polar(radioDelDial(pos.rho), anguloDelDial(pos.longitud));
    punto.setAttribute("cx", xy.x);
    punto.setAttribute("cy", xy.y);
  });
}