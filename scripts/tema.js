// scripts/tema.js
// Botón sol/luna de la cabecera: alterna modo día / noche y recuerda la elección.
// Los colores de cada modo viven en css/tema.css.
 
const ICONO_SOL =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const ICONO_LUNA =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';
 
function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  const boton = document.getElementById("boton-tema");
  if (!boton) return;
  const etiqueta = tema === "dia" ? "Cambiar a modo noche" : "Cambiar a modo día";
  boton.innerHTML = tema === "dia" ? ICONO_SOL : ICONO_LUNA;
  boton.title = etiqueta;
  boton.setAttribute("aria-label", etiqueta);
  try {
    localStorage.setItem("tema", tema);
  } catch (e) {
    /* sin almacenamiento: el modo solo dura la visita */
  }
}
 
function inicializarTema() {
  let guardado = null;
  try {
    guardado = localStorage.getItem("tema");
  } catch (e) {
    guardado = null;
  }
  aplicarTema(guardado === "noche" ? "noche" : "dia");
  const boton = document.getElementById("boton-tema");
  if (boton) {
    boton.addEventListener("click", () => {
      aplicarTema(document.documentElement.dataset.tema === "dia" ? "noche" : "dia");
    });
  }
}
 
inicializarTema();
 