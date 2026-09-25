const agujaHora = document.getElementById("aguja-hora");
const agujaMinuto = document.getElementById("aguja-minuto");
const agujaSegundo = document.getElementById("aguja-segundo");
const texto = document.getElementById("hora-digital");
const sol = document.getElementById("sol");
const luna = document.getElementById("luna");
const capaZodiaco = document.getElementById("capa-zodiaco");

function actualizar() {
  const ahora = new Date();
  agujaHora.setAttribute("transform", `rotate(${anguloDeLaHora(ahora)} 600 600)`);
  agujaMinuto.setAttribute("transform", `rotate(${anguloDelMinuto(ahora)} 600 600)`);
  agujaSegundo.setAttribute("transform", `rotate(${anguloDelSegundo(ahora)} 600 600)`);
  const anguloZod = anguloZodiaco(ahora);
  capaZodiaco.setAttribute("transform", `rotate(${anguloZod} 600 600)`);
  actualizarEtiquetasZodiaco(anguloZod);
  actualizarSol(ahora);
  actualizarLuna(ahora);

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
dibujarZodiaco();

const textoUbicacion = document.getElementById("ubicacion");

function mostrarUbicacion(u) {
  textoUbicacion.textContent = `Lat ${u.latitud.toFixed(4)}°  Lon ${u.longitud.toFixed(4)}°`;
}

function mostrarErrorUbicacion(mensaje) {
  textoUbicacion.textContent = mensaje;
}

pedirUbicacion(mostrarUbicacion, mostrarErrorUbicacion);

function actualizarLuna(fecha) {
  if (ubicacion.latitud === null) return;
  const { altura } = posicionLunarHorizonte(fecha, ubicacion.latitud, ubicacion.longitud);
  const radio = radioDesdeAltura(altura);
  const angulo = anguloDeLaHora(fecha);
  const p = polar(radio, angulo);

  const intensidad = intensidadLunarPorAltura(altura) * fraccionIluminada(fecha);

  luna.setAttribute("cx", p.x);
  luna.setAttribute("cy", p.y);
  luna.style.opacity = 0.05 + intensidad * 0.8;
  luna.style.filter = `drop-shadow(0 0 ${2 + intensidad * 10}px #cfd8e3)`;
}