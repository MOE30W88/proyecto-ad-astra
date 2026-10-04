// scripts/enfoque-capas.js
// Los botones del menú oscurecen todas las capas menos las elegidas.
// "Astrolabio" (clave "todas") las muestra todas.
// Para cambiar qué capas pertenecen a cada botón, edita ENFOQUES.
 
const CAPAS_SIEMPRE_VISIBLES = ["capa-fija", "capa-fija-ejes", "capa-fondo-traslacion"];
 
const ENFOQUES = {
  reloj: ["capa-fondo-reloj", "capa-marco", "capa-minuto", "capa-segundo", "capa-hora", "capa-marcadores-reloj"],
  "dia-noche": ["capa-eventos-solares", "capa-sol", "capa-luna", "capa-eclipse", "capa-horizonte", "capa-marcas-eventos"],
  zodiaco: ["capa-zodiaco", "capa-indicador-zodiaco", "capa-referencias-estacionales", "capa-marcador-estacional", "capa-tropicos", "capa-constelaciones", "capa-sol-central"],
  calendario: ["capa-calendario", "capa-marcador-calendario", "capa-estaciones", "capa-calendario-chino", "capa-sol-central"],
  "sistema-solar": ["capa-orbita-terrestre", "capa-orbitas-planetarias", "capa-asteroides", "capa-alineacion", "capa-planetas", "capa-sol-central", "capa-planetas-frente"],
  rotacion: ["capa-rotacion", "capa-eje-rotacion"],
};
 
function aplicarEnfoque(clave) {
  const svg = document.getElementById("reloj");
  const botonVistaSolar = document.getElementById("boton-vista-solar");
  if (botonVistaSolar) botonVistaSolar.hidden = clave !== "sistema-solar";
  const ids = ENFOQUES[clave];
  svg.querySelectorAll(":scope > g").forEach((g) => g.classList.remove("capa-enfocada"));
  [...svg.classList]
    .filter((c) => c.startsWith("enfoque-"))
    .forEach((c) => svg.classList.remove(c));
  svg.classList.toggle("enfocando", Boolean(ids));
  if (clave !== "sistema-solar" && typeof cerrarAyudaContextual === "function") cerrarAyudaContextual();
  actualizarEnfoqueConstelaciones?.(clave);
  if (!ids) return;
  svg.classList.add(`enfoque-${clave}`); // permite estilos propios por enfoque (dígitos, escala...)
  [...ids, ...CAPAS_SIEMPRE_VISIBLES].forEach((id) => {
    const capa = document.getElementById(id);
    if (capa) capa.classList.add("capa-enfocada");
  });
}
 
function inicializarNavegacionCapas() {
  const botones = document.querySelectorAll(".nav-capas button");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((b) => b.classList.toggle("activa", b === boton));
      aplicarEnfoque(boton.dataset.enfoque);
    });
  });
}
 
inicializarNavegacionCapas();
