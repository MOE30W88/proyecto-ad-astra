const SVG_NS = "http://www.w3.org/2000/svg";
const CENTRO = 600;
const NUMEROS_ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

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
    capa.appendChild(crearMarca(grados, esQuinto ? 455 : 465, 480, clase));

    if (esQuinto) {
      const etiqueta = minuto === 0 ? 60 : minuto;
      capa.appendChild(crearNumero(etiqueta, grados, 430, "numero numero-minuto"));
    } else {
      capa.appendChild(crearNumero(minuto, grados, 447, "numero numero-minuto-chico"));
    }
  }
}

function dibujarMarco() {
  const capa = document.getElementById("capa-marco");
  for (let hora = 0; hora < 24; hora++) {
    const grados = hora * 15 - 180;
    const esCardinal = hora % 6 === 0;
    capa.appendChild(crearMarca(grados, 480, esCardinal ? 510 : 500));
    capa.appendChild(crearNumero(NUMEROS_ROMANOS[(hora + 11) % 12], grados, 550));
  }
  dibujarMinutos(capa);
}