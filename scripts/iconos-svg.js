// scripts/iconos-svg.js
// Dibuja un SVG propio DENTRO del reloj usando su forma como máscara, para que tome el color de la paleta
// (y cambie con el modo día/noche). Un <image> normal conserva los colores fijos del archivo; esto no.
// Se usará en Día y noche (observador), Zodiaco y Calendario chino.
//
//   const g = iconoEnmascarado("svg/observador/observador.svg", x, y, ancho, alto, "observador-icono");
//   capa.appendChild(g);   // el color lo da la regla CSS de la clase (fill: var(--tinta), etc.)

let contadorMascaras = 0;

function iconoEnmascarado(ruta, x, y, ancho, alto, clase = "icono-mascara", alineacion = "xMidYMax") {
  const ns = "http://www.w3.org/2000/svg";
  const id = `mascara-icono-${contadorMascaras++}`;
  const grupo = document.createElementNS(ns, "g");

  const mascara = document.createElementNS(ns, "mask");
  mascara.setAttribute("id", id);
  mascara.setAttribute("maskUnits", "userSpaceOnUse");
  mascara.setAttribute("x", x);
  mascara.setAttribute("y", y);
  mascara.setAttribute("width", ancho);
  mascara.setAttribute("height", alto);
  mascara.style.maskType = "alpha"; // usa la transparencia del SVG, no su luminosidad

  const imagen = document.createElementNS(ns, "image");
  imagen.setAttribute("href", new URL(ruta, document.baseURI).href);
  imagen.setAttribute("x", x);
  imagen.setAttribute("y", y);
  imagen.setAttribute("width", ancho);
  imagen.setAttribute("height", alto);
  imagen.setAttribute("preserveAspectRatio", `${alineacion} meet`); // por defecto centrado y apoyado en la base; "xMidYMid" para centrar del todo
  mascara.appendChild(imagen);

  const relleno = document.createElementNS(ns, "rect");
  relleno.setAttribute("x", x);
  relleno.setAttribute("y", y);
  relleno.setAttribute("width", ancho);
  relleno.setAttribute("height", alto);
  relleno.setAttribute("mask", `url(#${id})`);
  relleno.setAttribute("class", clase);

  grupo.append(mascara, relleno);
  return grupo;
}