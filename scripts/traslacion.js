// scripts/traslacion.js

const ORBITA_SEMIEJE_MAYOR = 175;
const EXCENTRICIDAD_TERRESTRE = 0.2; // exagerada a propósito (la real es 0.0167, casi un círculo)
const LONGITUD_PERIHELIO = 283;

function posicionOrbital(longitudEcliptica) {
  const a = ORBITA_SEMIEJE_MAYOR;
  const e = EXCENTRICIDAD_TERRESTRE;
  const nu = ((longitudEcliptica - LONGITUD_PERIHELIO) * Math.PI) / 180;
  const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));
  return polar(r, longitudEcliptica);
}

function construirOrbitaPath() {
  const puntos = [];
  for (let grado = 0; grado <= 360; grado += 2) {
    puntos.push(posicionOrbital(grado));
  }
  const [inicio, ...resto] = puntos;
  return `M ${inicio.x} ${inicio.y} ` + resto.map((p) => `L ${p.x} ${p.y}`).join(" ") + " Z";
}

function dibujarOrbitaTerrestre() {
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
}

function actualizarTraslacion(fecha) {
  const tierra = document.getElementById("tierra-orbital");
  if (!tierra) return;
  const { longitudEcliptica } = posicionSolar(fecha);
  const p = posicionOrbital(longitudEcliptica);
  tierra.setAttribute("cx", p.x);
  tierra.setAttribute("cy", p.y);
}