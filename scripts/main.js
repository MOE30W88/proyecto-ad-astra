const agujaHora = document.getElementById("aguja-hora");
const agujaMinuto = document.getElementById("aguja-minuto");
const agujaSegundo = document.getElementById("aguja-segundo");
const texto = document.getElementById("hora-digital");
const sol = document.getElementById("sol");

function actualizar() {
  const ahora = new Date();
  agujaHora.setAttribute("transform", `rotate(${anguloDeLaHora(ahora)} 600 600)`);
  agujaMinuto.setAttribute("transform", `rotate(${anguloDelMinuto(ahora)} 600 600)`);
  agujaSegundo.setAttribute("transform", `rotate(${anguloDelSegundo(ahora)} 600 600)`);
  actualizarSol(ahora);

  const horaActual = textoDeLaHora(ahora);
  if (texto.textContent !== horaActual) {
    texto.textContent = horaActual;
  }

  requestAnimationFrame(actualizar);
}

function actualizarSol(fecha) {
  if (ubicacion.latitud === null) return;
  const { altura } = posicionSolarHorizonte(fecha, ubicacion.latitud, ubicacion.longitud);
  const radio = radioDesdeAltura(altura);
  const angulo = anguloDeLaHora(fecha);
  const p = polar(radio, angulo);
  const intensidad = intensidadSolar(altura);

  sol.setAttribute("cx", p.x);
  sol.setAttribute("cy", p.y);
  sol.style.opacity = 0.05 + intensidad * 0.95;
  sol.style.filter = `drop-shadow(0 0 ${4 + intensidad * 14}px #f5c344)`;
  agujaHora.classList.toggle("aguja-noche", altura <= 0);
}

actualizar();
dibujarMarco();

const textoUbicacion = document.getElementById("ubicacion");

function mostrarUbicacion(u) {
  textoUbicacion.textContent = `Lat ${u.latitud.toFixed(4)}°  Lon ${u.longitud.toFixed(4)}°`;
}

function mostrarErrorUbicacion(mensaje) {
  textoUbicacion.textContent = mensaje;
}

pedirUbicacion(mostrarUbicacion, mostrarErrorUbicacion);