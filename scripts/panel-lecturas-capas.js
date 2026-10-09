// scripts/panel-lecturas-capas.js
// Lecturas dinámicas del panel derecho para Lunario, Calendario y Rotación.
// panel-informacion-capas.js las llama (máx. 2 veces por segundo, solo con el panel abierto) a través de LECTORES_PANEL.
// Depende de: eventos-astronomicos.js (instanteLongitudAparente, nombreAnioChino), eclipses.js (faseLunarPrecisa), efemerides-precisas.js, eventos-lunares.js (fasesLunares), lunario.js, nodos-lunares.js,
// calendario.js, calendario-chino*.js, referencias-estacionales.js, rotacion.js, panel-resultados.js (DIAS_SEMANA, textoHoraDecimal).

const plcTxt = (id, texto) => { const el = document.getElementById(id); if (el && el.textContent !== texto) el.textContent = texto; };
const plcNum = (n, d = 1) => n.toLocaleString("es", { minimumFractionDigits: d, maximumFractionDigits: d });
const plcGrados = (v, pos, neg) => `${plcNum(Math.abs(v), 2)}° ${v >= 0 ? pos : neg}`;
const plcMes = (i) => MESES[i].slice(0, 3).toLowerCase();
// Instante (ms UTC) → "9 oct · 14:05" en hora de pared del lugar (con año si conAnio)
function plcFechaHora(ms, conAnio = false) {
  const p = aHoraDePared(new Date(ms));
  return `${p.getUTCDate()} ${plcMes(p.getUTCMonth())}${conAnio ? ` ${p.getUTCFullYear()}` : ""} · ${dosDigitos(p.getUTCHours())}:${dosDigitos(p.getUTCMinutes())}`;
}
const plcEn = (ms, ahoraMs) => {
  const d = Math.round((ms - ahoraMs) / 86400000);
  return d === 0 ? "hoy" : d > 0 ? `en ${d} d` : `hace ${-d} d`;
};

// ───── Lunario ─────
const plcLunar = { centro: null, lista: [] };
function leerPanelLunario(ahora) {
  const ms = ahora.getTime();
  // Las fases exactas cuestan: se calculan ±36 días y se reutilizan mientras el reloj no se aleje 5 días del centro
  if (plcLunar.centro === null || Math.abs(ms - plcLunar.centro) > 5 * 86400000) {
    plcLunar.centro = ms;
    plcLunar.lista = fasesLunares(ms - 36 * 86400000, ms + 36 * 86400000);
  }
  const f = faseLunarPrecisa(ms), luna = posicionLunarPrecisa(ms), sol = posicionSolarPrecisa(ms);
  const T = TEXTOS_LUNARIO[idiomaActual?.()] || TEXTOS_LUNARIO.es;
  const ultimaNueva = [...plcLunar.lista].reverse().find((x) => x.fase === "nueva" && x.ms <= ms);
  const proxima = (fase) => plcLunar.lista.find((x) => x.fase === fase && x.ms > ms);
  const nueva = proxima("nueva"), llena = proxima("llena");
  const mareas = lunMareas(luna.distancia, sol.distanciaUA, f.elongacion);

  plcTxt("dato-lunario-fase", T.fases[nombreDeFase(f.elongacion * (f.creciente ? 1 : -1))]);
  plcTxt("dato-lunario-iluminacion", `${plcNum(f.fraccion * 100)} %`);
  plcTxt("dato-lunario-edad", ultimaNueva ? `${plcNum((ms - ultimaNueva.ms) / 86400000)} días` : "—");
  plcTxt("dato-lunario-distancia", `${(Math.round(luna.distancia / 10) * 10).toLocaleString("es")} km`);
  plcTxt("dato-lunario-mareas", T.mareas(mareas.clase, Math.round(mareas.indice)));
  plcTxt("dato-lunario-proxima-nueva", nueva ? `${plcFechaHora(nueva.ms)} · ${plcEn(nueva.ms, ms)}` : "—");
  plcTxt("dato-lunario-proxima-llena", llena ? `${plcFechaHora(llena.ms)} · ${plcEn(llena.ms, ms)}` : "—");
  plcTxt("dato-lunario-eclipses", posicionOrbitalLunar(ms).temporadaEclipses ? "Sí · la Luna está cerca de un nodo" : "No");
}

// ───── Calendario ─────
const plcEstacion = { clave: "", instante: 0 };
const NOMBRES_ESTACION = ["Primavera", "Verano", "Otoño", "Invierno"];
const NOMBRES_HITO_ESTACION = ["Equinoccio de primavera", "Solsticio de verano", "Equinoccio de otoño", "Solsticio de invierno"];

function leerPanelCalendario(ahora) {
  const ms = ahora.getTime(), p = aHoraDePared(ahora), anio = p.getUTCFullYear();
  const diaAnio = Math.round((Date.UTC(anio, p.getUTCMonth(), p.getUTCDate()) - Date.UTC(anio, 0, 1)) / 86400000) + 1;
  plcTxt("dato-calendario-fecha", `${DIAS_SEMANA[p.getUTCDay()]} ${p.getUTCDate()} de ${MESES[p.getUTCMonth()].toLowerCase()} de ${anio}`);
  plcTxt("dato-calendario-dia-anio", `${diaAnio} de ${diasEnAnio(anio)}`);
  plcTxt("dato-calendario-bisiesto", esBisiesto(anio) ? "Sí · 366 días" : "No · 365 días");

  // Estación astronómica según la longitud eclíptica del Sol; el hemisferio sur invierte los nombres
  const sur = typeof ubicacion.latitud === "number" && ubicacion.latitud < 0;
  const lon = posicionSolar(ahora).longitudEcliptica, sector = Math.floor(lon / 90) % 4, desfase = sur ? 2 : 0;
  plcTxt("dato-calendario-estacion", `${NOMBRES_ESTACION[(sector + desfase) % 4]}${sur ? " (hemisferio sur)" : ""}`);
  const clave = `${sector}|${anio}`;
  if (plcEstacion.clave !== clave) {
    const objetivo = ((sector + 1) * 90) % 360;
    plcEstacion.clave = clave;
    plcEstacion.instante = instanteLongitudAparente(objetivo, ms + (normalizarGrados(objetivo - lon) / 0.9856474) * 86400000);
  }
  plcTxt("dato-calendario-hito", `${NOMBRES_HITO_ESTACION[(sector + 1 + desfase) % 4]}`);
  plcTxt("dato-calendario-hito-fecha", `≈ ${plcFechaHora(plcEstacion.instante, true)} · ${plcEn(plcEstacion.instante, ms)}`);

  // Año chino (Año Nuevo lunar, hora de Pekín)
  const { anio: anioChino, fraccion } = estadoAnioChino(ahora);
  const siguiente = new Date(anioNuevoChino(anioChino + 1) + CHINO_ZONA_MS);
  plcTxt("dato-calendario-chino", `${nombreAnioChino(anioChino).replace(/^del? (la )?/, "")} · ${anioChino}`);
  plcTxt("dato-calendario-chino-avance", `${plcNum(fraccion * 100)} %`);
  plcTxt("dato-calendario-chino-nuevo", `${siguiente.getUTCDate()} ${plcMes(siguiente.getUTCMonth())} ${siguiente.getUTCFullYear()}`);
}

// ───── Rotación ─────
function leerPanelRotacion(ahora) {
  const sol = posicionSolar(ahora), lat = ubicacion.latitud, hayLugar = typeof lat === "number" && typeof ubicacion.longitud === "number";
  const v = ROTACION.velocidadEcuatorial * Math.cos(((hayLugar ? lat : 0) * Math.PI) / 180);
  plcTxt("dato-rotacion-subsolar", `${plcGrados(sol.declinacion, "N", "S")} · ${plcGrados(longitudSubsolar(ahora), "E", "O")}`);
  plcTxt("dato-rotacion-velocidad", `${Math.round(v).toLocaleString("es")} m/s · ${Math.round(v * 3.6).toLocaleString("es")} km/h${hayLugar ? "" : " (ecuador)"}`);
  plcTxt("dato-rotacion-sideral", `${textoHoraDecimal(horaSideral(ahora, hayLugar ? ubicacion.longitud : 0) / 15)}${hayLugar ? "" : " · Greenwich"}`);
}

const LECTORES_PANEL = { lunario: leerPanelLunario, calendario: leerPanelCalendario, rotacion: leerPanelRotacion };