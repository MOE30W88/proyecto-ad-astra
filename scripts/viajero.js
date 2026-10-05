// scripts/viajero.js

function inicializarViajero() {
  const inputFechaHora = document.getElementById("input-fecha-hora");
  const botonIrFecha = document.getElementById("boton-ir-fecha");
  const botonAhora = document.getElementById("boton-ahora");

  botonIrFecha.addEventListener("click", () => {
    if (!inputFechaHora.value) return;
    establecerFechaViajero(instanteDesdeInput(inputFechaHora.value));
  });

  botonAhora.addEventListener("click", () => {
    volverAAhora();
    inputFechaHora.value = "";
    reiniciarControlesVelocidad(); // velocidad.js: vuelve a x1 hacia adelante
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
