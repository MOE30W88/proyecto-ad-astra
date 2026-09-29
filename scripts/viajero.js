// scripts/viajero.js

function inicializarViajero() {
  const boton = document.getElementById("boton-viajar");
  const cajon = document.getElementById("cajon-viajero");
  const contenedor = document.getElementById("contenedor-app");

  boton.addEventListener("click", () => {
    cajon.classList.toggle("abierto");
    contenedor.classList.toggle("desplazado");
  });

  const inputFechaHora = document.getElementById("input-fecha-hora");
  const botonIrFecha = document.getElementById("boton-ir-fecha");
  const botonAhora = document.getElementById("boton-ahora");
  const botonesVelocidad = document.querySelectorAll(".boton-velocidad");

  botonIrFecha.addEventListener("click", () => {
    if (!inputFechaHora.value) return;
    establecerFechaViajero(instanteDesdeInput(inputFechaHora.value));
  });

  botonAhora.addEventListener("click", () => {
    volverAAhora();
    inputFechaHora.value = "";
    botonesVelocidad.forEach((b) => b.classList.remove("activa"));
    botonesVelocidad[0].classList.add("activa");
  });

  botonesVelocidad.forEach((b) => {
    b.addEventListener("click", () => {
      const valor = Number(b.dataset.velocidad);
      establecerMultiplicador(valor);
      botonesVelocidad.forEach((otro) => otro.classList.remove("activa"));
      b.classList.add("activa");
    });
  });

    const inputLatitud = document.getElementById("input-latitud");
    const inputLongitud = document.getElementById("input-longitud");
    const botonIrUbicacion = document.getElementById("boton-ir-ubicacion");
    const botonUbicacionReal = document.getElementById("boton-ubicacion-real");

    botonIrUbicacion.addEventListener("click", () => {
    const lat = parseFloat(inputLatitud.value);
    const lon = parseFloat(inputLongitud.value);
    if (isNaN(lat) || isNaN(lon)) return;
    establecerUbicacionManual(lat, lon);
    });

    botonUbicacionReal.addEventListener("click", () => {
    inputLatitud.value = "";
    inputLongitud.value = "";
    pedirUbicacion(mostrarUbicacion, mostrarErrorUbicacion);
  });
}