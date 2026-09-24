function dosDigitos(n) {
  return String(n).padStart(2, "0");
}

function minutosDelDia(fecha) {
  return fecha.getHours() * 60 + fecha.getMinutes() + fecha.getSeconds() / 60 + fecha.getMilliseconds() / 60000;
}

function anguloDeLaHora(fecha) {
  return minutosDelDia(fecha) / 4 - 180;
}

function textoDeLaHora(fecha) {
  return `${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())}:${dosDigitos(fecha.getSeconds())}`;
}

function anguloDelMinuto(fecha) {
  return (fecha.getMinutes() + fecha.getSeconds() / 60 + fecha.getMilliseconds() / 60000) * 6;
}

function anguloDelSegundo(fecha) {
  return (fecha.getSeconds() + fecha.getMilliseconds() / 1000) * 6;
}

