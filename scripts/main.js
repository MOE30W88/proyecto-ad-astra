const agujaHora = document.getElementById("aguja-hora");
const agujaMinuto = document.getElementById("aguja-minuto");
const texto = document.getElementById("hora-digital");
const agujaSegundo = document.getElementById("aguja-segundo");

function actualizar() {
  const ahora = new Date();
  agujaHora.setAttribute("transform", `rotate(${anguloDeLaHora(ahora)} 600 600)`);
  agujaMinuto.setAttribute("transform", `rotate(${anguloDelMinuto(ahora)} 600 600)`);
  agujaSegundo.setAttribute("transform", `rotate(${anguloDelSegundo(ahora)} 600 600)`);

  const horaActual = textoDeLaHora(ahora);
  if (texto.textContent !== horaActual) {
    texto.textContent = horaActual;
  }

  requestAnimationFrame(actualizar);
}

actualizar();
dibujarMarco();