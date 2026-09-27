const agujaHora = document.getElementById("aguja-hora");
const agujaMinuto = document.getElementById("aguja-minuto");
const agujaSegundo = document.getElementById("aguja-segundo");
const texto = document.getElementById("hora-digital");
const sol = document.getElementById("sol");
const luna = document.getElementById("luna");
const capaZodiaco = document.getElementById("capa-zodiaco");
const capaCalendario = document.getElementById("capa-calendario");

const RADIO_ORBITA_SOL = 650;
const RADIO_ORBITA_LUNA = 660;

function actualizar() {
  const ahora = new Date();
  agujaHora.setAttribute("transform", `rotate(${anguloDeLaHora(ahora)} 600 600)`);
  agujaMinuto.setAttribute("transform", `rotate(${anguloDelMinuto(ahora)} 600 600)`);
  agujaSegundo.setAttribute("transform", `rotate(${anguloDelSegundo(ahora)} 600 600)`);
  const anguloZod = anguloZodiaco(ahora);
  capaZodiaco.setAttribute("transform", `rotate(${anguloZod} 600 600)`);
  actualizarEtiquetasZodiaco(anguloZod);
  actualizarIndicadorZodiaco(anguloZod);
  actualizarEventoEstacional(ahora, anguloZod);

  const anguloCal = anguloCalendario(ahora);
  capaCalendario.setAttribute("transform", `rotate(${anguloCal} 600 600)`);
  actualizarEtiquetasCalendario(anguloCal);

  let alturaSolar = null;
  if (ubicacion.latitud !== null) {
    alturaSolar = posicionSolarHorizonte(ahora, ubicacion.latitud, ubicacion.longitud).altura;
  }
  actualizarSol(ahora, alturaSolar);
  actualizarLuna(ahora, alturaSolar);

  const horaActual = textoDeLaHora(ahora);
  if (texto.textContent !== horaActual) {
    texto.textContent = horaActual;
  }

  requestAnimationFrame(actualizar);
}

function actualizarSol(fecha, alturaSolar) {
  if (ubicacion.latitud === null) return;
  const angulo = anguloDeLaHora(fecha);
  const p = polar(RADIO_ORBITA_SOL, angulo);
  const intensidad = intensidadSolar(alturaSolar);

  sol.setAttribute("cx", p.x);
  sol.setAttribute("cy", p.y);
  sol.style.opacity = intensidad;
  sol.style.filter = intensidad > 0 ? `drop-shadow(0 0 ${4 + intensidad * 14}px #f5c344)` : "none";
  agujaHora.classList.toggle("aguja-noche", alturaSolar <= 0);
}

actualizar();
dibujarMarco();
dibujarZodiaco();
dibujarReferenciasEstacionales();
dibujarCalendario();
dibujarMarcadorCalendario();

const textoUbicacion = document.getElementById("ubicacion");
const textoPaisCiudad = document.getElementById("pais-ciudad");

function mostrarUbicacion(u) {
  const latStr = `Lat: ${u.latitud.toFixed(4)}°`;
  const lonStr = `Lon: ${u.longitud.toFixed(4)}°`;
  textoUbicacion.textContent = `${latStr}    —    ${lonStr}`;

  if (u.ciudad || u.pais) {
    const partes = [u.ciudad, u.pais].filter(Boolean);
    textoPaisCiudad.textContent = partes.join(", ");
  } else {
    textoPaisCiudad.textContent = "";
  }
  dibujarEventosSolares();
  setInterval(dibujarEventosSolares, 60000);
  dibujarTropicos();
}

function mostrarErrorUbicacion(mensaje) {
  textoUbicacion.textContent = mensaje;
  textoPaisCiudad.textContent = "";
}

pedirUbicacion(mostrarUbicacion, mostrarErrorUbicacion);

function actualizarLuna(fecha, alturaSolar) {
  if (ubicacion.latitud === null) return;
  const { altura } = posicionLunarHorizonte(fecha, ubicacion.latitud, ubicacion.longitud);
  const angulo = anguloDeLaHora(fecha);
  const p = polar(RADIO_ORBITA_LUNA, angulo);

  const intensidad = intensidadLunar(altura, alturaSolar, fraccionIluminada(fecha));

  luna.setAttribute("cx", p.x);
  luna.setAttribute("cy", p.y);
  luna.style.opacity = intensidad;
  luna.style.filter = intensidad > 0 ? `drop-shadow(0 0 ${2 + intensidad * 10}px #cfd8e3)` : "none";
}

