// scripts/tropicos.js

function alturaMaximaMediodia(latitud, declinacion) {
  return 90 - Math.abs(latitud - declinacion);
}

function dibujarTropicos() {
  if (ubicacion.latitud === null) return;
  const capa = document.getElementById("capa-tropicos");
  capa.innerHTML = "";

  const DECLINACION_CANCER = 23.44;
  const DECLINACION_CAPRICORNIO = -23.44;

  const radioCancer = radioDesdeAltura(alturaMaximaMediodia(ubicacion.latitud, DECLINACION_CANCER));
  const radioCapricornio = radioDesdeAltura(alturaMaximaMediodia(ubicacion.latitud, DECLINACION_CAPRICORNIO));

  const circuloCancer = document.createElementNS(SVG_NS, "circle");
  circuloCancer.setAttribute("cx", 600);
  circuloCancer.setAttribute("cy", 600);
  circuloCancer.setAttribute("r", radioCancer);
  circuloCancer.setAttribute("class", "tropico tropico-cancer");
  capa.appendChild(circuloCancer);

  const circuloCapricornio = document.createElementNS(SVG_NS, "circle");
  circuloCapricornio.setAttribute("cx", 600);
  circuloCapricornio.setAttribute("cy", 600);
  circuloCapricornio.setAttribute("r", radioCapricornio);
  circuloCapricornio.setAttribute("class", "tropico tropico-capricornio");
  capa.appendChild(circuloCapricornio);
}