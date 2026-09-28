const SVG_NS = "http://www.w3.org/2000/svg";
const CENTRO = 600;
const NUMEROS_ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Radios del marco: todo cuelga de la cara externa del anillo día/noche (r=600)
const MARCO = {
  base: 600,
  minutoMenorFin: 609,
  minutoQuintoFin: 616,
  numeroMinutoMenor: 627,
  numeroMinutoQuinto: 640,
  horaInicio: 660,
  horaFin: 670,
  horaCardinalFin: 680,
  numeroRomano: 705,
};

function polar(radio, gradosDesdeArriba) {
  const rad = (gradosDesdeArriba * Math.PI) / 180;
  return {
    x: CENTRO + radio * Math.sin(rad),
    y: CENTRO - radio * Math.cos(rad),
  };
}

function crearMarca(grados, radioInterno, radioExterno, clase = "marca") {
  const a = polar(radioInterno, grados);
  const b = polar(radioExterno, grados);
  const linea = document.createElementNS(SVG_NS, "line");
  linea.setAttribute("x1", a.x);
  linea.setAttribute("y1", a.y);
  linea.setAttribute("x2", b.x);
  linea.setAttribute("y2", b.y);
  linea.setAttribute("class", clase);
  return linea;
}

function crearNumero(texto, grados, radio, clase = "numero") {
  const p = polar(radio, grados);
  const elemento = document.createElementNS(SVG_NS, "text");
  elemento.setAttribute("x", p.x);
  elemento.setAttribute("y", p.y);
  elemento.setAttribute("class", clase);
  elemento.textContent = texto;
  return elemento;
}

function dibujarMinutos(capa) {
  for (let minuto = 0; minuto < 60; minuto++) {
    const grados = minuto * 6;
    const esQuinto = minuto % 5 === 0;
    const clase = esQuinto ? "marca-minuto marca-minuto-quinto" : "marca-minuto";
    capa.appendChild(crearMarca(grados, MARCO.base, esQuinto ? MARCO.minutoQuintoFin : MARCO.minutoMenorFin, clase));

    if (esQuinto) {
      const etiqueta = minuto === 0 ? 60 : minuto;
      capa.appendChild(crearNumero(etiqueta, grados, MARCO.numeroMinutoQuinto, "numero numero-minuto"));
    } else {
      capa.appendChild(crearNumero(minuto, grados, MARCO.numeroMinutoMenor, "numero numero-minuto-chico"));
    }
  }
}

function dibujarMarco() {
  const capa = document.getElementById("capa-marco");
  for (let hora = 0; hora < 24; hora++) {
    const grados = hora * 15 - 180;
    const esCardinal = hora % 6 === 0;
    capa.appendChild(crearMarca(grados, MARCO.horaInicio, esCardinal ? MARCO.horaCardinalFin : MARCO.horaFin));
    capa.appendChild(crearNumero(NUMEROS_ROMANOS[(hora + 11) % 12], grados, MARCO.numeroRomano));
  }
  dibujarMinutos(capa);
}