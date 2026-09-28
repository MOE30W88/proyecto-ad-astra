// scripts/fase-lunar.js

function construirPathFaseLunar(radio, fraccion, esCreciente) {
  const R = radio;
  const rx = R * Math.abs(1 - 2 * fraccion);
  const sweepExterior = esCreciente ? 1 : 0;
  const sweepTerminador = fraccion < 0.5 ? (esCreciente ? 0 : 1) : (esCreciente ? 1 : 0);
  return `M 0 ${-R} A ${R} ${R} 0 0 ${sweepExterior} 0 ${R} A ${rx} ${R} 0 0 ${sweepTerminador} 0 ${-R} Z`;
}

function actualizarFaseLunar(fecha) {
  const capa = document.getElementById("capa-fase-lunar");
  capa.innerHTML = "";

  const RADIO_DISCO = 26;
  const fraccion = fraccionIluminada(fecha);
  const edad = edadLunar(fecha);
  const esCreciente = edad < PERIODO_SINODICO / 2;
  const factorEclipse = calcularFactorEclipse(fecha);

  const fondo = document.createElementNS(SVG_NS, "circle");
  fondo.setAttribute("cx", 0);
  fondo.setAttribute("cy", 0);
  fondo.setAttribute("r", RADIO_DISCO);
  fondo.setAttribute("class", "luna-fondo-oscuro");
  capa.appendChild(fondo);

  if (fraccion > 0.001) {
    const lit = document.createElementNS(SVG_NS, "path");
    lit.setAttribute("d", construirPathFaseLunar(RADIO_DISCO, fraccion, esCreciente));
    lit.style.fill = colorLunarPorEclipse(factorEclipse);
    capa.appendChild(lit);
  }
}

function colorLunarPorEclipse(factor) {
  const normal = [207, 216, 227];   // #cfd8e3, color lunar normal
  const totalidad = [140, 40, 30];  // rojizo, "luna de sangre"
  const mezcla = normal.map((v, i) => Math.round(v + factor * (totalidad[i] - v)));
  return `rgb(${mezcla[0]}, ${mezcla[1]}, ${mezcla[2]})`;
}

function calcularFactorEclipse(fecha) {
  // Cascarón: todavía no calculamos eclipses reales (necesita mucha más
  // precisión que las fórmulas actuales — pendiente en el roadmap).
  // Cuando se implemente esa capa, esta función debe devolver un valor
  // continuo 0-1 según qué tan adentro de la sombra total está la Luna,
  // para aprovechar la transición gradual que ya queda lista aquí.
  return 0;
}