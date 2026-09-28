// scripts/estado-tiempo.js

const estadoTiempo = {
  modoViajero: false,
  fechaBase: null,       // fecha elegida por el usuario
  momentoFijado: null,   // Date.now() real en el instante que se fijó fechaBase
  multiplicador: 1,
};

function obtenerFechaActual() {
  if (!estadoTiempo.modoViajero) {
    return new Date();
  }
  const transcurridoReal = Date.now() - estadoTiempo.momentoFijado;
  const transcurridoSimulado = transcurridoReal * estadoTiempo.multiplicador;
  return new Date(estadoTiempo.fechaBase.getTime() + transcurridoSimulado);
}

function establecerFechaViajero(fecha) {
  estadoTiempo.modoViajero = true;
  estadoTiempo.fechaBase = fecha;
  estadoTiempo.momentoFijado = Date.now();
}

function establecerMultiplicador(valor) {
  // "congelamos" la fecha actual como nueva base antes de cambiar la velocidad,
  // para que el cambio no produzca un salto brusco
  estadoTiempo.fechaBase = obtenerFechaActual();
  estadoTiempo.momentoFijado = Date.now();
  estadoTiempo.multiplicador = valor;
  estadoTiempo.modoViajero = true;
}

function volverAAhora() {
  estadoTiempo.modoViajero = false;
  estadoTiempo.fechaBase = null;
  estadoTiempo.momentoFijado = null;
  estadoTiempo.multiplicador = 1;
}