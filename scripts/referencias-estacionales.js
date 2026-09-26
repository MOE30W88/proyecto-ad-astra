// scripts/referencias-estacionales.js

const LONGITUDES_ESTACIONALES = [
  { nombre: "equinoccio-primavera", longitud: 0 },
  { nombre: "solsticio-verano", longitud: 90 },
  { nombre: "equinoccio-otonio", longitud: 180 },
  { nombre: "solsticio-invierno", longitud: 270 },
];

function dibujarReferenciasEstacionales() {
  const capa = document.getElementById("capa-referencias-estacionales");

  LONGITUDES_ESTACIONALES.forEach(({ nombre, longitud }) => {
    const rotacion = normalizarGrados(longitud - 300);
    const radio = radioActualDelZodiaco(RADIO_ZODIACO, rotacion);

    const circulo = document.createElementNS(SVG_NS, "circle");
    circulo.setAttribute("cx", 600);
    circulo.setAttribute("cy", 600);
    circulo.setAttribute("r", radio);
    circulo.setAttribute("class", `referencia-estacional referencia-${nombre}`);
    capa.appendChild(circulo);
  });
}