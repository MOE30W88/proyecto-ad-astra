function dosDigitos(n) {
  return String(n).padStart(2, "0");
}

function minutosDelDia(fecha) {
  const p = aHoraDePared(fecha);
  return (
    p.getUTCHours() * 60 +
    p.getUTCMinutes() +
    p.getUTCSeconds() / 60 +
    p.getUTCMilliseconds() / 60000
  );
}

function anguloDeLaHora(fecha) {
  return minutosDelDia(fecha) / 4 - 180;
}

function textoDeLaHora(fecha) {
  const p = aHoraDePared(fecha);
  return `${dosDigitos(p.getUTCHours())}:${dosDigitos(p.getUTCMinutes())}:${dosDigitos(p.getUTCSeconds())}`;
}

function anguloDelMinuto(fecha) {
  const p = aHoraDePared(fecha);
  return (p.getUTCMinutes() + p.getUTCSeconds() / 60 + p.getUTCMilliseconds() / 60000) * 6;
}

function anguloDelSegundo(fecha) {
  const p = aHoraDePared(fecha);
  return (p.getUTCSeconds() + p.getUTCMilliseconds() / 1000) * 6;
}

function crearPoligonoMarcadorReloj(radioPunta, radioBase, semiAnchoGrados, clase, id) {
  const punta = polar(radioPunta, 0);
  const baseIzq = polar(radioBase, -semiAnchoGrados);
  const baseDer = polar(radioBase, semiAnchoGrados);
  const marcador = document.createElementNS(SVG_NS, "polygon");
  marcador.setAttribute("points", `${punta.x},${punta.y} ${baseIzq.x},${baseIzq.y} ${baseDer.x},${baseDer.y}`);
  marcador.setAttribute("class", clase);
  if (id) marcador.setAttribute("id", id);
  return marcador;
}

function dibujarMarcadoresReloj() {
  const capa = document.getElementById("capa-marcadores-reloj");
  if (!capa) return null;
  capa.innerHTML = "";

  const marcadorHora = crearPoligonoMarcadorReloj(600, 630, 1.7, "marcador-reloj marcador-reloj-hora", "marcador-hora");
  const marcadorMinuto = crearPoligonoMarcadorReloj(600, 620, 1.3, "marcador-reloj marcador-reloj-minuto", "marcador-minuto");
  const marcadorSegundo = crearPoligonoMarcadorReloj(600, 620, 1, "marcador-reloj marcador-reloj-segundo", "marcador-segundo");

  capa.appendChild(marcadorHora);
  capa.appendChild(marcadorMinuto);
  capa.appendChild(marcadorSegundo);

  return { marcadorHora, marcadorMinuto, marcadorSegundo };
}

