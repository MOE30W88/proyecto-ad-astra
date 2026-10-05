const relojCompleto = document.getElementById("reloj");
const cabecera = document.querySelector(".cabecera");

if (relojCompleto && cabecera && "IntersectionObserver" in window) {
  const observador = new IntersectionObserver(([entrada]) => {
    cabecera.classList.toggle("menu-secciones", !entrada.isIntersecting);
  }, { rootMargin: "-80px 0px 0px 0px" });

  observador.observe(relojCompleto);
}
