// scripts/idioma.js
// Botón ES / EN de la cabecera. Por ahora solo CAMBIA el idioma activo y lo recuerda; la traducción de los
// textos se conecta aparte, escuchando el evento "cambio-idioma" o leyendo idiomaActual().
//   document.addEventListener("cambio-idioma", (e) => { /* e.detail.idioma === "es" | "en" */ });

const IDIOMAS = ["es", "en"];
const NOMBRES_IDIOMA = {
  es: { es: "español", en: "Spanish" },
  en: { es: "inglés", en: "English" },
};
let idiomaActivo = "es"; // el sitio está escrito en español: es el idioma por defecto

function idiomaActual() {
  return idiomaActivo;
}

function establecerIdioma(nuevo) {
  idiomaActivo = nuevo;
  document.documentElement.lang = nuevo;
  document.documentElement.dataset.idioma = nuevo;
  const boton = document.getElementById("boton-idioma");
  if (boton) {
    const otro = IDIOMAS.find((i) => i !== nuevo);
    boton.textContent = nuevo.toUpperCase();
    boton.title = `Cambiar a ${NOMBRES_IDIOMA[otro].es} / Switch to ${NOMBRES_IDIOMA[otro].en}`;
    boton.setAttribute("aria-label", boton.title);
  }
  try {
    localStorage.setItem("idioma", nuevo);
  } catch (e) {
    /* sin almacenamiento: el idioma solo dura la visita */
  }
  document.dispatchEvent(new CustomEvent("cambio-idioma", { detail: { idioma: nuevo } }));
}

function inicializarIdioma() {
  let guardado = null;
  try {
    guardado = localStorage.getItem("idioma");
  } catch (e) {
    guardado = null;
  }
  establecerIdioma(IDIOMAS.includes(guardado) ? guardado : "es");
  const boton = document.getElementById("boton-idioma");
  if (boton) {
    boton.addEventListener("click", () => establecerIdioma(idiomaActivo === "es" ? "en" : "es"));
  }
}

inicializarIdioma();