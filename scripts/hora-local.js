// scripts/hora-local.js
// Separa dos conceptos:
//   INSTANTE REAL -> Date normal (obtenerFechaActual()). Lo usa la astronomía.
//   HORA DE PARED -> lo que marcaría un reloj en el lugar elegido. Lo usa todo lo que se MUESTRA.
//
// La hora de pared se guarda en un Date "desplazado" por el huso y se lee
// SIEMPRE con getUTC*() (getUTCHours, getUTCDate...), nunca con getHours().
// Así el navegador no vuelve a aplicar la zona horaria de la computadora.
//
// Depende de: obtenerHusoHorario(fecha) y ubicacion.esManual (ubicacion.js)
 
const MS_POR_HORA = 3600000;
 
// Huso del lugar activo. Mientras la geolocalización no responde,
// obtenerHusoHorario devuelve null: se usa el desfase del navegador.
function husoDelLugar(instante) {
  const huso = obtenerHusoHorario(instante);
  return huso === null ? -instante.getTimezoneOffset() / 60 : huso;
}
 
// Instante real -> hora de pared del lugar (leer con getUTC*)
function aHoraDePared(instante, huso = husoDelLugar(instante)) {
  return new Date(instante.getTime() + huso * MS_POR_HORA);
}
 
// Hora de pared del lugar -> instante real
function deHoraDePared(anio, mes, dia, hora = 0, minuto = 0, segundo = 0, huso = 0) {
  return new Date(Date.UTC(anio, mes, dia, hora, minuto, segundo) - huso * MS_POR_HORA);
}
 
// Instante real de la medianoche local (00:00 de pared) del día en curso.
// El anillo día/noche parte de aquí: hora h del dial = medianoche + h * MS_POR_HORA.
function medianocheLocal(instante) {
  const huso = husoDelLugar(instante);
  const p = aHoraDePared(instante, huso);
  return deHoraDePared(p.getUTCFullYear(), p.getUTCMonth(), p.getUTCDate(), 0, 0, 0, huso);
}
 
// Día del año fraccional (0 = 1 de enero 00:00 de pared) para el calendario
function diaDelAnioFraccional(pared) {
  const inicio = Date.UTC(pared.getUTCFullYear(), 0, 1);
  return (pared.getTime() - inicio) / 86400000;
}
 
// Instante -> texto para <input type="datetime-local"> en hora del lugar
function valorParaInput(instante) {
  return aHoraDePared(instante).toISOString().slice(0, 16);
}
 
// Texto de <input type="datetime-local"> (hora del lugar) -> instante real
function instanteDesdeInput(valor) {
  // Ubicación real: el navegador ya resuelve el horario de verano exacto.
  if (!ubicacion.esManual) return new Date(valor);
  // Ubicación manual: se interpreta como hora de pared del huso estimado.
  const huso = husoDelLugar(new Date());
  return new Date(Date.parse(valor + "Z") - huso * MS_POR_HORA);
}