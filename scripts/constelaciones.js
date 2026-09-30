// scripts/constelaciones.js
// Aro de las 12 constelaciones del zodiaco, fuera del calendario (radios ~850–990).
// Cada sección abarca 30° de la eclíptica y se coloca en el calendario según el día en que el Sol
// cruza sus límites. La sección que queda bajo el marcador del calendario se marca como activa.
// Rota junto con el calendario. Dibujos: constelaciones/<clave>.svg (si no existe, un comodín).
// Depende de: astronomia.js, planetas.js (precesión), calendario.js, marco.js, hora-local.js
 
const ANILLO_CONSTELACIONES = {
  radioArco: 900,
  radioGlifo: 845,
  tamanoGlifo: 64,
  radioNombre: 917,
};
 
// Las 12 secciones son IGUALES: 30° de longitud eclíptica cada una, contadas desde el equinoccio de marzo
// (zodiaco tropical, igual que el anillo del zodiaco y el panel de resultados). Así la sección activa
// coincide con el signo solar: Libra empieza en el equinoccio de septiembre. Sin tramos cortos ni Ofiuco.
const INICIO_SECCIONES = 0;
const AMPLITUD_SECCION = 30;
 
const CONSTELACIONES = [
  { clave: "aries", nombre: "Aries" },
  { clave: "tauro", nombre: "Tauro" },
  { clave: "geminis", nombre: "Géminis" },
  { clave: "cancer", nombre: "Cáncer" },
  { clave: "leo", nombre: "Leo" },
  { clave: "virgo", nombre: "Virgo" },
  { clave: "libra", nombre: "Libra" },
  { clave: "escorpio", nombre: "Escorpio" },
  { clave: "sagitario", nombre: "Sagitario" },
  { clave: "capricornio", nombre: "Capricornio" },
  { clave: "acuario", nombre: "Acuario" },
  { clave: "piscis", nombre: "Piscis" },
].map((c, i) => ({
  ...c,
  desde: normalizarGrados(INICIO_SECCIONES + i * AMPLITUD_SECCION),
  hasta: normalizarGrados(INICIO_SECCIONES + (i + 1) * AMPLITUD_SECCION),
}));
 
// ── Cálculo de fechas ──────────────────────────────────────────
// Longitud del Sol (equinoccio de la fecha, como el zodiaco tropical) al mediodía UTC de cada día; se "desenrolla" para que crezca sin saltos
function longitudesSolaresDelAnio(anio) {
  const N = diasEnAnio(anio);
  const lam = [];
  let previo = null;
  let vueltas = 0;
  for (let i = 0; i <= N; i++) {
    const fecha = new Date(Date.UTC(anio, 0, 1 + i, 12));
    const l = normalizarGrados(posicionSolar(fecha).longitudEcliptica);
    if (previo !== null && l < previo - 180) vueltas += 1;
    previo = l;
    lam.push(l + 360 * vueltas);
  }
  return { N, lam };
}
 
// Posición en días (desde el 1 de enero 00:00) en que el Sol cruza la longitud `limite`
function diaDeCruce(lam, limite) {
  for (let k = -1; k <= 2; k++) {
    const B = limite + 360 * k;
    for (let i = 0; i < lam.length - 1; i++) {
      if (lam[i] <= B && B < lam[i + 1]) {
        return i + 0.5 + (B - lam[i]) / (lam[i + 1] - lam[i]);
      }
    }
  }
  return null;
}
 
function textoFechaDelAnio(anio, dias) {
  const f = new Date(Date.UTC(anio, 0, 1) + dias * 86400000);
  return `${f.getUTCDate()} ${MESES[f.getUTCMonth()].slice(0, 3).toLowerCase()}`;
}
 
// ── Dibujo ─────────────────────────────────────────────────────
let capaConstelaciones = null;
const sectoresConstelaciones = []; // { grupo, aIni, aFin } en grados del calendario
let sectorActivo = -1;
 
function obtenerCapaConstelaciones() {
  if (capaConstelaciones) return capaConstelaciones;
  capaConstelaciones = document.getElementById("capa-constelaciones");
  if (!capaConstelaciones) {
    capaConstelaciones = document.createElementNS(SVG_NS, "g");
    capaConstelaciones.setAttribute("id", "capa-constelaciones");
    const calendario = document.getElementById("capa-calendario");
    calendario.parentNode.insertBefore(capaConstelaciones, calendario);
  }
  return capaConstelaciones;
}
 
function trazoArcoConstelacion(radio, a0, a1) {
  const p0 = polar(radio, a0);
  const p1 = polar(radio, a1);
  const grande = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${radio} ${radio} 0 ${grande} 1 ${p1.x} ${p1.y}`;
}
 
// Dibujo comodín: cinco estrellas unidas por líneas
function crearGlifoComodin() {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "glifo-comodin");
  const pts = [[-22, 14], [-10, -6], [4, 4], [14, -14], [24, 2]];
  const linea = document.createElementNS(SVG_NS, "polyline");
  linea.setAttribute("points", pts.map((p) => p.join(",")).join(" "));
  g.appendChild(linea);
  pts.forEach(([x, y]) => {
    const c = document.createElementNS(SVG_NS, "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", 3);
    g.appendChild(c);
  });
  return g;
}
 
const glifosDisponibles = {}; // clave -> true | false (evita volver a sondear en cada redibujo)
 
function ponerGlifoReal(grupo, comodin, clave) {
  const ruta = new URL(`constelaciones/${clave}.svg`, document.baseURI).href;
  const t = ANILLO_CONSTELACIONES.tamanoGlifo;
  const usar = () => {
    const img = document.createElementNS(SVG_NS, "image");
    img.setAttribute("href", ruta);
    img.setAttribute("x", -t / 2);
    img.setAttribute("y", -t / 2);
    img.setAttribute("width", t);
    img.setAttribute("height", t);
    grupo.replaceChild(img, comodin);
  };
  if (glifosDisponibles[clave] === true) return usar();
  if (glifosDisponibles[clave] === false) return;
  const sonda = new Image();
  sonda.onload = () => {
    glifosDisponibles[clave] = true;
    if (comodin.parentNode === grupo) usar();
  };
  sonda.onerror = () => {
    glifosDisponibles[clave] = false;
  };
  sonda.src = ruta;
}
 
function dibujarConstelaciones(anio) {
  const capa = obtenerCapaConstelaciones();
  capa.innerHTML = "";
  sectoresConstelaciones.length = 0;
  sectorActivo = -1;
  const { N, lam } = longitudesSolaresDelAnio(anio);
  const { radioArco, radioGlifo, radioNombre } = ANILLO_CONSTELACIONES;
 
  CONSTELACIONES.forEach((c) => {
    const dIni = diaDeCruce(lam, c.desde);
    const dFin = diaDeCruce(lam, c.hasta);
    if (dIni === null || dFin === null) return;
    const aIni = (dIni / N) * 360;
    let aFin = (dFin / N) * 360;
    if (aFin <= aIni) aFin += 360; // tramo que cruza el cambio de año
    const medio = normalizarGrados((aIni + aFin) / 2);
 
    const grupo = document.createElementNS(SVG_NS, "g");
    grupo.setAttribute("class", "constelacion");
    const titulo = document.createElementNS(SVG_NS, "title");
    titulo.textContent = `${c.nombre} · ${textoFechaDelAnio(anio, dIni)} – ${textoFechaDelAnio(anio, dFin)}`;
    grupo.appendChild(titulo);
 
    const arco = document.createElementNS(SVG_NS, "path");
    arco.setAttribute("d", trazoArcoConstelacion(radioArco, aIni + 0.4, aFin - 0.4));
    arco.setAttribute("class", "arco-constelacion");
    grupo.appendChild(arco);
 
    const p = polar(radioGlifo, medio);
    const glifo = document.createElementNS(SVG_NS, "g");
    glifo.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${medio})`);
    const comodin = crearGlifoComodin();
    glifo.appendChild(comodin);
    grupo.appendChild(glifo);
    ponerGlifoReal(glifo, comodin, c.clave);
 
    const pn = polar(radioNombre, medio);
    const nombre = document.createElementNS(SVG_NS, "text");
    nombre.setAttribute("x", pn.x);
    nombre.setAttribute("y", pn.y);
    nombre.setAttribute("transform", `rotate(${medio} ${pn.x} ${pn.y})`);
    nombre.setAttribute("class", "nombre-constelacion");
    nombre.textContent = c.nombre;
    grupo.appendChild(nombre);
 
    capa.appendChild(grupo);
    sectoresConstelaciones.push({ grupo, aIni, aFin });
  });
}
 
// Marca como activa la sección que está bajo el marcador del calendario (arriba, ángulo 0 de pantalla)
function marcarConstelacionActiva(anguloCalendario) {
  const a = normalizarGrados(-anguloCalendario); // posición del marcador en el sistema del calendario
  const i = sectoresConstelaciones.findIndex(
    (s) => (a >= s.aIni && a < s.aFin) || (a + 360 >= s.aIni && a + 360 < s.aFin),
  );
  if (i === sectorActivo) return;
  sectorActivo = i;
  sectoresConstelaciones.forEach((s, j) => s.grupo.classList.toggle("activa", j === i));
}
 
let anioConstelaciones = null;
 
// Se llama en cada fotograma: redibuja solo al cambiar de año y rota con el calendario
function actualizarConstelaciones(ahora, anguloCalendario) {
  const anio = aHoraDePared(ahora).getUTCFullYear();
  if (anio !== anioConstelaciones) {
    anioConstelaciones = anio;
    dibujarConstelaciones(anio);
  }
  obtenerCapaConstelaciones().setAttribute("transform", `rotate(${anguloCalendario} 600 600)`);
  marcarConstelacionActiva(anguloCalendario);
}
 