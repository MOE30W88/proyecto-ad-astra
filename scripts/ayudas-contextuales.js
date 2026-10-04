// Ayudas contextuales del mapa astronómico.
// Identifica Sol, Tierra, planetas y cinturón mediante data-tooltip y muestra
// sus nombres al pasar el cursor o enfocarlos con teclado. En pantallas táctiles
// un toque fija la etiqueta; se cierra al tocar fuera, pulsar Escape, cambiar de
// capa o desplazar la página. La delegación en #reloj también cubre SVG dinámicos.

const relojAyudas = document.getElementById("reloj");
const etiquetaAyudas = document.createElement("div");
etiquetaAyudas.id = "ayuda-contextual";
etiquetaAyudas.className = "ayuda-contextual";
etiquetaAyudas.setAttribute("role", "tooltip");
etiquetaAyudas.hidden = true;
document.body.appendChild(etiquetaAyudas);

let elementoAyudaActivo = null;
let ayudaFijada = false;

function buscarElementoConAyuda(objetivo) {
  return objetivo instanceof Element ? objetivo.closest("[data-tooltip]") : null;
}

function posicionarAyuda(x, y) {
  const margen = 8;
  const rect = etiquetaAyudas.getBoundingClientRect();
  etiquetaAyudas.style.left = `${Math.max(margen, Math.min(x + 14, innerWidth - rect.width - margen))}px`;
  etiquetaAyudas.style.top = `${Math.max(margen, Math.min(y + 14, innerHeight - rect.height - margen))}px`;
}

function mostrarAyuda(elemento, x, y) {
  if (!relojAyudas.classList.contains("enfoque-sistema-solar")) return;
  elementoAyudaActivo = elemento;
  etiquetaAyudas.textContent = elemento.dataset.tooltip;
  etiquetaAyudas.hidden = false;
  posicionarAyuda(x, y);
}

function ocultarAyuda() {
  etiquetaAyudas.hidden = true;
  elementoAyudaActivo = null;
}

function cerrarAyudaContextual() {
  ayudaFijada = false;
  ocultarAyuda();
}

relojAyudas.addEventListener("pointerover", (evento) => {
  const elemento = buscarElementoConAyuda(evento.target);
  if (!elemento || ayudaFijada) return;
  mostrarAyuda(elemento, evento.clientX, evento.clientY);
});

relojAyudas.addEventListener("pointermove", (evento) => {
  if (elementoAyudaActivo && !ayudaFijada) posicionarAyuda(evento.clientX, evento.clientY);
});

relojAyudas.addEventListener("pointerout", (evento) => {
  if (ayudaFijada) return;
  const siguiente = buscarElementoConAyuda(evento.relatedTarget);
  if (!siguiente || siguiente !== elementoAyudaActivo) ocultarAyuda();
});

relojAyudas.addEventListener("focusin", (evento) => {
  const elemento = buscarElementoConAyuda(evento.target);
  if (!elemento || ayudaFijada) return;
  const rect = elemento.getBoundingClientRect();
  mostrarAyuda(elemento, rect.left + rect.width / 2, rect.top + rect.height / 2);
});

relojAyudas.addEventListener("focusout", (evento) => {
  if (ayudaFijada) return;
  const siguiente = buscarElementoConAyuda(evento.relatedTarget);
  if (!siguiente || siguiente !== elementoAyudaActivo) ocultarAyuda();
});

relojAyudas.addEventListener("click", (evento) => {
  if (!relojAyudas.classList.contains("enfoque-sistema-solar")) return;
  const elemento = buscarElementoConAyuda(evento.target);
  if (!elemento) {
    ayudaFijada = false;
    ocultarAyuda();
    return;
  }
  if (ayudaFijada && elemento === elementoAyudaActivo) {
    ayudaFijada = false;
    ocultarAyuda();
    return;
  }
  ayudaFijada = true;
  const rect = elemento.getBoundingClientRect();
  mostrarAyuda(elemento, rect.left + rect.width / 2, rect.top + rect.height / 2);
});

document.addEventListener("pointerdown", (evento) => {
  if (!ayudaFijada || buscarElementoConAyuda(evento.target)) return;
  ayudaFijada = false;
  ocultarAyuda();
});

window.addEventListener("scroll", cerrarAyudaContextual, { passive: true });

document.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape" || !elementoAyudaActivo) return;
  ayudaFijada = false;
  ocultarAyuda();
});
