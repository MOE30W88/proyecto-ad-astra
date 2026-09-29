# Bitácora de Código - Proyecto AD ASTRA

> **Propósito:** Este archivo consolida la totalidad del código fuente del proyecto en un único documento estructurado. Permite tener el contexto completo del sistema en una sola lectura optimizada, facilitando el ahorro de tokens y la continuidad entre sesiones de desarrollo. Se actualiza al final de cada sesión.

---

## Índice de Archivos

1. **HTML**
   - [`index.html`](#indexhtml)
2. **Hojas de Estilo (CSS)**
   - [`css/base.css`](#cssbasecss)
   - [`css/reloj.css`](#cssrelojcss)
   - [`css/viajero.css`](#cssviajerocss)
3. **Módulos JavaScript (`scripts/`)**
   - [`scripts/astronomia.js`](#scriptsastronomiajs)
   - [`scripts/calendario.js`](#scriptscalendariojs)
   - [`scripts/estado-tiempo.js`](#scriptsestado-tiempojs)
   - [`scripts/eventos-solares.js`](#scriptseventos-solaresjs)
   - [`scripts/fase-lunar.js`](#scriptsfase-lunarjs)
   - [`scripts/hora.js`](#scriptshorajs)
   - [`scripts/indicador-zodiaco.js`](#scriptsindicador-zodiacojs)
   - [`scripts/marco.js`](#scriptsmarcojs)
   - [`scripts/referencias-estacionales.js`](#scriptsreferencias-estacionalesjs)
   - [`scripts/traslacion.js`](#scriptstraslacionjs)
   - [`scripts/tropicos.js`](#scriptstropicosjs)
   - [`scripts/ubicacion.js`](#scriptsubicacionjs)
   - [`scripts/viajero.js`](#scriptsviajerojs)
   - [`scripts/zodiaco.js`](#scriptszodiacojs)
   - [`scripts/main.js`](#scriptsmainjs)

---

## 1. Estructura HTML

### `index.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proyecto AD ASTRA</title>
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/reloj.css" />
    <link rel="stylesheet" href="css/viajero.css" />
    <script src="scripts/hora.js" defer></script>
    <script src="scripts/estado-tiempo.js" defer></script>
    <script src="scripts/viajero.js" defer></script>
    <script src="scripts/marco.js" defer></script>
    <script src="scripts/calendario.js" defer></script>
    <script src="scripts/ubicacion.js" defer></script>
    <script src="scripts/astronomia.js" defer></script>
    <script src="scripts/fase-lunar.js" defer></script>
    <script src="scripts/traslacion.js" defer></script>
    <script src="scripts/indicador-zodiaco.js" defer></script>
    <script src="scripts/tropicos.js" defer></script>
    <script src="scripts/referencias-estacionales.js" defer></script>
    <script src="scripts/eventos-solares.js" defer></script>
    <script src="scripts/zodiaco.js" defer></script>
    <script src="scripts/main.js" defer></script>
  </head>
  <body>
    <div id="contenedor-app">
      <main>
        <svg
          id="reloj"
          viewBox="-360 -360 1920 1920"
          role="img"
          aria-label="Reloj astronómico"
        >
          <g id="capa-fija">
            <circle class="guia" cx="600" cy="600" r="480" />
            <circle class="guia" cx="600" cy="600" r="600" />
            <circle class="guia" cx="600" cy="600" r="780" />
          </g>
          <g id="capa-tropicos"></g>
          <g id="capa-referencias-estacionales"></g>
          <g id="capa-eventos-solares"></g>
          <g id="capa-marco"></g>
          <g id="capa-minuto">
            <line
              id="aguja-minuto"
              class="aguja aguja-minuto"
              x1="600"
              y1="600"
              x2="600"
              y2="120"
            />
          </g>
          <g id="capa-segundo">
            <line
              id="aguja-segundo"
              class="aguja aguja-segundo"
              x1="600"
              y1="600"
              x2="600"
              y2="120"
            />
          </g>
          <g id="capa-hora">
            <line
              id="aguja-hora"
              class="aguja"
              x1="600"
              y1="600"
              x2="600"
              y2="120"
            />
          </g>
          <g id="capa-zodiaco">
            <circle class="guia-zodiaco" cx="600" cy="463.4" r="343.4" />
            <circle class="guia-zodiaco" cx="600" cy="463.4" r="230" />
          </g>
          <g id="capa-indicador-zodiaco"></g>
          <g id="capa-marcador-estacional"></g>
          <g id="capa-orbita-terrestre"></g>
          <g id="capa-calendario"></g>
          <g id="capa-marcador-calendario"></g>
          <g id="capa-sol">
            <circle id="sol" cx="600" cy="600" r="43" />
          </g>
          <g id="capa-luna">
            <g id="capa-fase-lunar"></g>
          </g>
          <g id="capa-marcadores-reloj"></g>
          <g id="capa-fija-ejes">
            <line
              class="eje-cartesiano"
              x1="-230"
              y1="600"
              x2="1430"
              y2="600"
            />
            <text class="etiqueta-eje" x="1445" y="600">0° Horizonte</text>
            <text
              id="etiqueta-huso"
              class="etiqueta-eje"
              x="600"
              y="-250"
              text-anchor="middle"
            ></text>
          </g>
          <g id="capa-sol-central">
            <circle id="sol-central" cx="600" cy="600" r="35" />
          </g>
        </svg>
        <p id="hora-digital"></p>
        <p id="fecha-digital"></p>
        <p id="ubicacion"></p>
        <p id="pais-ciudad"></p>
        <button id="boton-viajar" class="boton-viajar">☰ Viajar</button>
        <aside id="cajon-viajero" class="cajon-viajero">
          <section class="seccion-viajero">
            <h3>Reloj</h3>
            <label for="input-fecha-hora">Fecha y hora</label>
            <input type="datetime-local" id="input-fecha-hora" />
            <div class="fila-botones">
              <button id="boton-ir-fecha">Ir a esta fecha</button>
              <button id="boton-ahora">⟲ Ahora</button>
            </div>
            <label>Velocidad</label>
            <div class="fila-botones" id="botones-velocidad">
              <button data-velocidad="1" class="boton-velocidad activa">
                x1
              </button>
              <button data-velocidad="100" class="boton-velocidad">x100</button>
              <button data-velocidad="1000" class="boton-velocidad">
                x1000
              </button>
              <button data-velocidad="10000" class="boton-velocidad">
                x10000
              </button>
            </div>
          </section>
          <section class="seccion-viajero">
            <h3>Mapa</h3>
            <label for="input-latitud">Latitud</label>
            <input
              type="number"
              id="input-latitud"
              step="0.0001"
              placeholder="13.6927"
            />
            <label for="input-longitud">Longitud</label>
            <input
              type="number"
              id="input-longitud"
              step="0.0001"
              placeholder="-89.1917"
            />
            <div class="fila-botones">
              <button id="boton-ir-ubicacion">Ir a esta ubicación</button>
              <button id="boton-ubicacion-real">⟲ Mi ubicación</button>
            </div>
          </section>
        </aside>
      </main>
    </div>
  </body>
</html>
```

---

## 2. Hojas de Estilo (CSS)

### `css/base.css`

```css
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0b1020;
}

main {
  width: min(94vmin, 900px);
}

#reloj {
  width: 100%;
  height: auto;
  display: block;
}

#hora-digital {
  margin: 1rem 0 0;
  text-align: center;
  font-family: Georgia, serif;
  font-size: 1.5rem;
  color: #c9a24b;
}

#ubicacion {
  margin: 0.25rem 0 0;
  text-align: center;
  font-family: Georgia, serif;
  font-size: 1rem;
  color: #8fb4d9;
  letter-spacing: 0.5px; /* Separa un poco los caracteres generales */
}

#pais-ciudad {
  margin: 0.15rem 0 0;
  text-align: center;
  font-family: Georgia, serif;
  font-size: 0.9rem;
  color: #c9a24b; /* Tono dorado sutil */
  opacity: 0.85;
}

#fecha-digital {
  margin: 0.25rem 0 0;
  text-align: center;
  font-family: Georgia, serif;
  font-size: 1rem;
  color: #8fb4d9;
}
```

### `css/reloj.css`

```css
.guia {
  fill: none;
  stroke: #fdfcf9;
  stroke-width: 2;
}
.aguja {
  stroke: #ffffff;
  stroke-width: 5;
  stroke-linecap: round;
}
.aguja-minuto {
  stroke: #8fb4d9;
  stroke-width: 3;
}
.aguja-segundo {
  stroke: #ffffff;
  stroke-width: 1;
}
.marca {
  stroke: #fcfbf9;
  stroke-width: 2;
}

.numero {
  fill: #f8f7f3;
  font-family: Georgia, serif;
  font-size: 32px;
  text-anchor: middle;
  dominant-baseline: central;
}

.marca-minuto {
  stroke: #8fb4d9;
  stroke-width: 1;
}

.marca-minuto-quinto {
  stroke-width: 2;
}

.numero-minuto {
  fill: #8fb4d9;
  font-size: 20px;
}

.numero-minuto-chico {
  fill: #8fb4d9;
  font-size: 15px;
  opacity: 0.9;
}

#sol {
  fill: #ffee07;
}

.aguja-noche {
  stroke: #ffffff;
}

.luna-fondo-oscuro {
  fill: #2a2f3a;
}
.luna-porcion-iluminada {
  fill: #cfd8e3;
}

.guia-zodiaco {
  fill: none;
  stroke: #c9a24b;
  stroke-width: 2;
}

.division-zodiaco {
  stroke: #c9a24b;
  stroke-width: 2;
}

.etiqueta-zodiaco {
  fill: #c9a24b;
  font-family: "Segoe UI Symbol", "Noto Sans Symbols", Georgia, serif;
  font-size: 18px;
  text-anchor: middle;
  dominant-baseline: central;
  letter-spacing: 2px;
}

.eje-cartesiano {
  stroke: #ffffff;
  stroke-width: 1;
  stroke-dasharray: 4 6;
  opacity: 0.15;
}

.sector-evento-solar {
  transition: fill 3s linear;
}

.indicador-zodiaco {
  fill: #f2d27a;
  opacity: 0.35;
  stroke: #f2d27a;
  stroke-width: 3;
  stroke-opacity: 0.9;
}

.tropico {
  fill: none;
  stroke-width: 3;
  stroke-dasharray: 3 5;
  opacity: 0.8;
}
.tropico-cancer {
  stroke: #5ec253;
}
.tropico-capricornio {
  stroke: #ffa126;
}

.eje-lectura-estacional {
  stroke: cyan;
  stroke-width: 1.5;
  stroke-dasharray: 4 6;
  opacity: 0.7;
}

.punto-evento-estacional {
  fill: cyan;
  stroke: #ffffff;
  stroke-width: 1;
}

.etiqueta-evento-estacional {
  fill: cyan;
  font-family: Georgia, serif;
  font-size: 20px;
  text-anchor: middle;
  dominant-baseline: central;
}

.referencia-estacional {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-dasharray: 2 8;
  opacity: 0.3;
}

.marca-calendario {
  stroke: #98999b;
  stroke-width: 1;
  opacity: 0.6;
}
.marca-mes {
  stroke-width: 2;
  opacity: 0.9;
}
.marca-dia-quinto {
  stroke-width: 1.5;
}
.etiqueta-mes {
  fill: #cddef7;
  font-family: Georgia, serif;
  font-size: 18px;
  text-anchor: middle;
  dominant-baseline: central;
  letter-spacing: 2px;
}
.marcador-calendario {
  fill: #d94f3d;
  opacity: 1;
}
.marcador-reloj {
  fill: #d94f3d;
  opacity: 1;
}

.orbita-terrestre {
  fill: none;
  stroke: #8899aa;
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
  opacity: 0.5;
}
.marca-orbital {
  fill: #8899aa;
  opacity: 0.6;
}
#tierra-orbital {
  fill: #4f8fd9;
  stroke: #ffffff;
  stroke-width: 1;
}
#sol-central {
  fill: #ffee07;
  filter: drop-shadow(0 0 20px #ffcc00);
}

.etiqueta-eje {
  fill: #8fb4d9;
  font-family: Georgia, serif;
  font-size: 20px;
  dominant-baseline: central;
}
```

### `css/viajero.css`

```css
#contenedor-app {
  display: flex;
  transition: margin-left 0.3s ease;
}

.boton-viajar {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  background: #1a2138;
  color: #f2d27a;
  border: 1px solid #f2d27a;
  padding: 8px 14px;
  font-family: Georgia, serif;
  cursor: pointer;
  border-radius: 4px;
}

.cajon-viajero {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: #0f1424;
  border-right: 1px solid #2a3050;
  padding: 70px 20px 20px;
  box-sizing: border-box;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 90;
  overflow-y: auto;
}

.cajon-viajero.abierto {
  transform: translateX(0);
}

#contenedor-app.desplazado {
  margin-left: 280px;
}

.seccion-viajero {
  color: #cddef7;
  font-family: Georgia, serif;
  margin-bottom: 24px;
}

.seccion-viajero h3 {
  color: #f2d27a;
  margin-bottom: 12px;
}

.seccion-viajero label {
  display: block;
  margin-top: 10px;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.seccion-viajero input {
  width: 100%;
  box-sizing: border-box;
  padding: 6px;
  background: #1a2138;
  border: 1px solid #2a3050;
  color: #cddef7;
  border-radius: 4px;
}

.fila-botones {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.fila-botones button {
  flex: 1;
  background: #1a2138;
  color: #cddef7;
  border: 1px solid #2a3050;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
}

.boton-velocidad.activa {
  background: #f2d27a;
  color: #0f1424;
  border-color: #f2d27a;
}
```

---

## 3. Scripts JavaScript (`scripts/`)

### `scripts/astronomia.js`

```javascript
function diasJuliano(fecha) {
  const msPorDia = 86400000;
  const inicioJ2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  return (fecha.getTime() - inicioJ2000) / msPorDia;
}

function normalizarGrados(grados) {
  return ((grados % 360) + 360) % 360;
}

const OBLICUIDAD = 23.44;

function posicionSolar(fecha) {
  const d = diasJuliano(fecha);

  const longitudMedia = normalizarGrados(280.46 + 0.9856474 * d);
  const anomaliaMedia = normalizarGrados(357.528 + 0.9856003 * d);
  const anomaliaRad = (anomaliaMedia * Math.PI) / 180;

  const longitudEcliptica = normalizarGrados(
    longitudMedia +
      1.915 * Math.sin(anomaliaRad) +
      0.02 * Math.sin(2 * anomaliaRad),
  );
  const longEclipticaRad = (longitudEcliptica * Math.PI) / 180;
  const oblicuidadRad = (OBLICUIDAD * Math.PI) / 180;

  const declinacion =
    (Math.asin(Math.sin(oblicuidadRad) * Math.sin(longEclipticaRad)) * 180) /
    Math.PI;

  const ascensionRecta =
    (Math.atan2(
      Math.cos(oblicuidadRad) * Math.sin(longEclipticaRad),
      Math.cos(longEclipticaRad),
    ) *
      180) /
    Math.PI;

  return {
    longitudEcliptica,
    declinacion,
    ascensionRecta: normalizarGrados(ascensionRecta),
  };
}

function horaSideral(fecha, longitudGeografica) {
  const d = diasJuliano(fecha);
  const gmst = normalizarGrados(280.46061837 + 360.98564736629 * d);
  return normalizarGrados(gmst + longitudGeografica);
}

function posicionSolarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionSolar(fecha);
  const anguloHorario = normalizarGrados(
    horaSideral(fecha, longitudGeografica) - ascensionRecta,
  );

  const latRad = (latitud * Math.PI) / 180;
  const decRad = (declinacion * Math.PI) / 180;
  const haRad = (anguloHorario * Math.PI) / 180;

  const altura =
    (Math.asin(
      Math.sin(latRad) * Math.sin(decRad) +
        Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad),
    ) *
      180) /
    Math.PI;

  return { altura };
}

function radioDesdeAltura(altura) {
  const RADIO_MAXIMO = 480;
  const radio = (RADIO_MAXIMO * (altura + 90)) / 180;
  return Math.max(0, Math.min(RADIO_MAXIMO, radio));
}

function intensidadSolar(altura) {
  if (altura <= 0) return 0;
  const INICIO_PLENO = 15; // grados sobre el horizonte para brillo máximo
  return Math.max(0, Math.min(1, altura / INICIO_PLENO));
}

const PERIODO_SINODICO = 29.530588853;
const REFERENCIA_LUNA_NUEVA = 5.25972;

function edadLunar(fecha) {
  const d = diasJuliano(fecha);
  const diferencia = d - REFERENCIA_LUNA_NUEVA;
  return (
    ((diferencia % PERIODO_SINODICO) + PERIODO_SINODICO) % PERIODO_SINODICO
  );
}

function fraccionIluminada(fecha) {
  const edad = edadLunar(fecha);
  const fraccionDelCiclo = edad / PERIODO_SINODICO;
  return (1 - Math.cos(2 * Math.PI * fraccionDelCiclo)) / 2;
}

function posicionLunar(fecha) {
  const d = diasJuliano(fecha);

  const longitudMedia = normalizarGrados(218.316 + 13.176396 * d);
  const anomaliaMedia = normalizarGrados(134.963 + 13.064993 * d);
  const argumentoLatitud = normalizarGrados(93.272 + 13.22935 * d);

  const anomaliaRad = (anomaliaMedia * Math.PI) / 180;
  const latitudRad = (argumentoLatitud * Math.PI) / 180;

  const longitudEcliptica = normalizarGrados(
    longitudMedia + 6.289 * Math.sin(anomaliaRad),
  );
  const latitudEcliptica = 5.128 * Math.sin(latitudRad);

  return { longitudEcliptica, latitudEcliptica };
}

function posicionLunarEcuatorial(fecha) {
  const { longitudEcliptica, latitudEcliptica } = posicionLunar(fecha);

  const lonRad = (longitudEcliptica * Math.PI) / 180;
  const latRad = (latitudEcliptica * Math.PI) / 180;
  const oblicuidadRad = (OBLICUIDAD * Math.PI) / 180;

  const declinacion =
    (Math.asin(
      Math.sin(latRad) * Math.cos(oblicuidadRad) +
        Math.cos(latRad) * Math.sin(oblicuidadRad) * Math.sin(lonRad),
    ) *
      180) /
    Math.PI;

  const y =
    Math.sin(lonRad) * Math.cos(oblicuidadRad) -
    Math.tan(latRad) * Math.sin(oblicuidadRad);
  const x = Math.cos(lonRad);
  const ascensionRecta = normalizarGrados((Math.atan2(y, x) * 180) / Math.PI);

  return { declinacion, ascensionRecta };
}

function posicionLunarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionLunarEcuatorial(fecha);
  const anguloHorario = normalizarGrados(
    horaSideral(fecha, longitudGeografica) - ascensionRecta,
  );

  const latRad = (latitud * Math.PI) / 180;
  const decRad = (declinacion * Math.PI) / 180;
  const haRad = (anguloHorario * Math.PI) / 180;

  const altura =
    (Math.asin(
      Math.sin(latRad) * Math.sin(decRad) +
        Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad),
    ) *
      180) /
    Math.PI;

  return { altura };
}

function intensidadLunar(alturaLuna, alturaSolar, fraccion) {
  if (alturaLuna <= 0) return 0;
  const INICIO_PLENO = 10; // atenuación propia cerca del horizonte

  const factorHorizonte = Math.max(0, Math.min(1, alturaLuna / INICIO_PLENO));
  const factorNocturno = 1 - intensidadSolar(alturaSolar); // 1 = noche cerrada, 0 = pleno día
  const pisoDiurno = 0.15; // nunca 100% invisible de día, pero sí muy tenue
  const visibilidadCielo = pisoDiurno + factorNocturno * (1 - pisoDiurno);

  return factorHorizonte * visibilidadCielo * fraccion;
}

function anguloZodiaco(fecha) {
  const { longitudEcliptica } = posicionSolar(fecha);
  return normalizarGrados(longitudEcliptica - 300);
}
```

### `scripts/calendario.js`

```javascript
// scripts/calendario.js

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const CALENDARIO = {
  anillo: 780, // aro exterior: el calendario cuelga de su cara interna
  largoDia: 10,
  largoQuinto: 14,
  largoMes: 20,
  radioEtiqueta: 750,
};

function esBisiesto(anio) {
  return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}

function diasEnAnio(anio) {
  return esBisiesto(anio) ? 366 : 365;
}

const DIAS_POR_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function diasEnMes(anio, mesIndex) {
  if (mesIndex === 1) return esBisiesto(anio) ? 29 : 28;
  return DIAS_POR_MES[mesIndex];
}

function diaDelAnio(fecha) {
  const inicioAnio = new Date(fecha.getFullYear(), 0, 1);
  return Math.floor((fecha - inicioAnio) / 86400000);
}

function anguloCalendario(fecha) {
  const anio = fecha.getFullYear();
  const N = diasEnAnio(anio);
  const fraccionDelDia =
    (fecha.getHours() * 3600 + fecha.getMinutes() * 60 + fecha.getSeconds()) /
    86400;
  const diaFraccional = diaDelAnio(fecha) + fraccionDelDia;
  return normalizarGrados(-(diaFraccional / N) * 360);
}

function anguloDeInicioDeMes(anio, mesIndex) {
  let dias = 0;
  for (let m = 0; m < mesIndex; m++) dias += diasEnMes(anio, m);
  return (dias / diasEnAnio(anio)) * 360;
}

function crearMarcaCalendario(grados, radioInterno, radioExterno, clase) {
  const a = polar(radioInterno, grados);
  const b = polar(radioExterno, grados);
  const linea = document.createElementNS(SVG_NS, "line");
  linea.setAttribute("x1", a.x);
  linea.setAttribute("y1", a.y);
  linea.setAttribute("x2", b.x);
  linea.setAttribute("y2", b.y);
  linea.setAttribute("class", clase);
  return linea;
}

const etiquetasCalendario = [];

function crearEtiquetaMesCurva(texto, anguloMedio, radio) {
  const grupo = document.createElementNS(SVG_NS, "g");

  // Usamos siempre el mismo sentido para que mantengan la orientación uniforme
  const anguloInicio = anguloMedio - 15;
  const anguloFin = anguloMedio + 15;

  const p1 = polar(radio, anguloInicio);
  const p2 = polar(radio, anguloFin);
  const sweep = 1; // Fijo para mantener la misma dirección en todo el círculo

  const pathId = "path-mes-" + Math.random().toString(36).slice(2, 11);
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("id", pathId);
  path.setAttribute(
    "d",
    `M ${p1.x} ${p1.y} A ${radio} ${radio} 0 0 ${sweep} ${p2.x} ${p2.y}`,
  );
  path.setAttribute("fill", "none");
  grupo.appendChild(path);

  const textoEl = document.createElementNS(SVG_NS, "text");
  textoEl.setAttribute("class", "etiqueta-mes");

  const textPath = document.createElementNS(SVG_NS, "textPath");
  textPath.setAttribute("href", "#" + pathId);
  textPath.setAttribute("startOffset", "50%");
  textPath.setAttribute("text-anchor", "middle");
  textPath.textContent = texto;

  textoEl.appendChild(textPath);
  grupo.appendChild(textoEl);

  etiquetasCalendario.push({
    elemento: grupo,
    path: path,
    radio: radio,
    medio: anguloMedio,
  });

  return grupo;
}

function dibujarCalendario(anio) {
  const capa = document.getElementById("capa-calendario");
  capa.innerHTML = "";

  const anioObjetivo = anio || obtenerFechaActual().getFullYear();

  for (let mes = 0; mes < 12; mes++) {
    const anguloInicio = anguloDeInicioDeMes(anioObjetivo, mes);
    const dias = diasEnMes(anioObjetivo, mes);
    const anchoMes = (dias / diasEnAnio(anioObjetivo)) * 360;

    capa.appendChild(
      crearMarcaCalendario(
        anguloInicio,
        CALENDARIO.anillo - CALENDARIO.largoMes,
        CALENDARIO.anillo,
        "marca-calendario marca-mes",
      ),
    );

    const anguloMedio = anguloInicio + anchoMes / 2;
    capa.appendChild(
      crearEtiquetaMesCurva(MESES[mes], anguloMedio, CALENDARIO.radioEtiqueta),
    );

    for (let dia = 1; dia <= dias; dia++) {
      const anguloDia = anguloInicio + ((dia - 1) / dias) * anchoMes;
      const esQuinto = dia % 5 === 0 || dia === 1;
      const largo = esQuinto ? CALENDARIO.largoQuinto : CALENDARIO.largoDia;
      capa.appendChild(
        crearMarcaCalendario(
          anguloDia,
          CALENDARIO.anillo - largo,
          CALENDARIO.anillo,
          esQuinto
            ? "marca-calendario marca-dia-quinto"
            : "marca-calendario marca-dia",
        ),
      );
    }
  }
}

function dibujarMarcadorCalendario() {
  const capa = document.getElementById("capa-marcador-calendario");
  const punta = polar(CALENDARIO.anillo, 0);
  const baseIzq = polar(CALENDARIO.anillo + 18, -0.8);
  const baseDer = polar(CALENDARIO.anillo + 18, 0.8);
  const marcador = document.createElementNS(SVG_NS, "polygon");
  marcador.setAttribute(
    "points",
    `${punta.x},${punta.y} ${baseIzq.x},${baseIzq.y} ${baseDer.x},${baseDer.y}`,
  );
  marcador.setAttribute("class", "marcador-calendario");
  capa.appendChild(marcador);
}

function actualizarEtiquetasCalendario(anguloRotacion) {
  etiquetasCalendario.forEach(({ path, radio, medio }) => {
    const anguloInicio = medio - 15;
    const anguloFin = medio + 15;

    const p1 = polar(radio, anguloInicio);
    const p2 = polar(radio, anguloFin);
    const sweep = 1;

    path.setAttribute(
      "d",
      `M ${p1.x} ${p1.y} A ${radio} ${radio} 0 0 ${sweep} ${p2.x} ${p2.y}`,
    );
  });
}
```

### `scripts/estado-tiempo.js`

```javascript
// scripts/estado-tiempo.js

const estadoTiempo = {
  modoViajero: false,
  fechaBase: null, // fecha elegida por el usuario
  momentoFijado: null, // Date.now() real en el instante que se fijó fechaBase
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
```

### `scripts/eventos-solares.js`

```javascript
// scripts/eventos-solares.js

const PASO_MINUTOS = 2; // resolución del degradado: más bajo = más suave, más pesado

const PARADAS_COLOR = [
  { altura: -90, color: [4, 6, 18] }, // noche profunda, casi negro azulado
  { altura: -18, color: [10, 12, 40] }, // fin crepúsculo astronómico
  { altura: -12, color: [45, 20, 70] }, // crepúsculo náutico: violeta
  { altura: -8, color: [120, 35, 65] }, // transición violeta → rojo
  { altura: -4, color: [200, 60, 40] }, // crepúsculo civil: rojo/naranja intenso
  { altura: -1, color: [230, 130, 40] }, // naranja cálido cerca del horizonte
  { altura: 0, color: [235, 180, 80] }, // horizonte: dorado
  { altura: 8, color: [80, 120, 170] }, // transición a azul día
  { altura: 30, color: [63, 110, 168] }, // día
  { altura: 90, color: [63, 110, 168] }, // cenit
];

function colorPorAltura(altura) {
  if (altura <= PARADAS_COLOR[0].altura) return rgb(PARADAS_COLOR[0].color);
  const ultima = PARADAS_COLOR[PARADAS_COLOR.length - 1];
  if (altura >= ultima.altura) return rgb(ultima.color);

  for (let i = 0; i < PARADAS_COLOR.length - 1; i++) {
    const a = PARADAS_COLOR[i];
    const b = PARADAS_COLOR[i + 1];
    if (altura >= a.altura && altura <= b.altura) {
      const t = (altura - a.altura) / (b.altura - a.altura);
      const mezcla = a.color.map((v, idx) =>
        Math.round(v + t * (b.color[idx] - v)),
      );
      return rgb(mezcla);
    }
  }
}

function rgb([r, g, b]) {
  return `rgb(${r}, ${g}, ${b})`;
}

let sectoresEventosSolares = null; // se crean una sola vez, luego solo se actualiza su color

function crearSectoresEventosSolares(capa) {
  const RADIO_INTERNO = 480;
  const RADIO_EXTERNO = 600;
  const sectores = [];

  for (let minuto = 0; minuto < 1440; minuto += PASO_MINUTOS) {
    const anguloInicio = minuto / 4 - 180;
    const anguloFin = (minuto + PASO_MINUTOS) / 4 - 180;

    const p1 = polar(RADIO_EXTERNO, anguloInicio);
    const p2 = polar(RADIO_EXTERNO, anguloFin);
    const p3 = polar(RADIO_INTERNO, anguloFin);
    const p4 = polar(RADIO_INTERNO, anguloInicio);

    const d = `M ${p1.x} ${p1.y} A ${RADIO_EXTERNO} ${RADIO_EXTERNO} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${RADIO_INTERNO} ${RADIO_INTERNO} 0 0 0 ${p4.x} ${p4.y} Z`;

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "sector-evento-solar");
    capa.appendChild(path);
    sectores.push({ path, minutoMedio: minuto + PASO_MINUTOS / 2 });
  }

  return sectores;
}

function dibujarEventosSolares() {
  const capa = document.getElementById("capa-eventos-solares");
  if (ubicacion.latitud === null) return;

  if (!sectoresEventosSolares) {
    sectoresEventosSolares = crearSectoresEventosSolares(capa);
  }

  const fecha = obtenerFechaActual();

  sectoresEventosSolares.forEach(({ path, minutoMedio }) => {
    const fechaMinuto = new Date(
      fecha.getFullYear(),
      fecha.getMonth(),
      fecha.getDate(),
      0,
      minutoMedio,
      0,
    );
    const { altura } = posicionSolarHorizonte(
      fechaMinuto,
      ubicacion.latitud,
      ubicacion.longitud,
    );
    path.style.fill = colorPorAltura(altura);
  });
}
```

### `scripts/fase-lunar.js`

```javascript
// scripts/fase-lunar.js

function construirPathFaseLunar(radio, fraccion, esCreciente) {
  const R = radio;
  const rx = R * Math.abs(1 - 2 * fraccion);
  const sweepExterior = esCreciente ? 1 : 0;
  const sweepTerminador =
    fraccion < 0.5 ? (esCreciente ? 0 : 1) : esCreciente ? 1 : 0;
  return `M 0 ${-R} A ${R} ${R} 0 0 ${sweepExterior} 0 ${R} A ${rx} ${R} 0 0 ${sweepTerminador} 0 ${-R} Z`;
}

function actualizarFaseLunar(fecha) {
  const capa = document.getElementById("capa-fase-lunar");
  capa.innerHTML = "";

  const RADIO_DISCO = 35;
  const fraccion = fraccionIluminada(fecha);
  const edad = edadLunar(fecha);
  const esCreciente = edad < PERIODO_SINODICO / 2;
  const factorEclipse = calcularFactorEclipse(fecha);

  const fondo = document.createElementNS(SVG_NS, "circle");
  fondo.setAttribute("cx", 0);
  fondo.setAttribute("cy", 0);
  fondo.setAttribute("r", RADIO_DISCO);
  fondo.setAttribute("class", "luna-fondo-oscuro");
  capa.appendChild(fondo);

  if (fraccion > 0.001) {
    const lit = document.createElementNS(SVG_NS, "path");
    lit.setAttribute(
      "d",
      construirPathFaseLunar(RADIO_DISCO, fraccion, esCreciente),
    );
    lit.style.fill = colorLunarPorEclipse(factorEclipse);
    capa.appendChild(lit);
  }
}

function colorLunarPorEclipse(factor) {
  const normal = [207, 216, 227]; // #cfd8e3, color lunar normal
  const totalidad = [140, 40, 30]; // rojizo, "luna de sangre"
  const mezcla = normal.map((v, i) =>
    Math.round(v + factor * (totalidad[i] - v)),
  );
  return `rgb(${mezcla[0]}, ${mezcla[1]}, ${mezcla[2]})`;
}

function calcularFactorEclipse(fecha) {
  // Cascarón: todavía no calculamos eclipses reales (necesita mucha más
  // precisión que las fórmulas actuales — pendiente en el roadmap).
  // Cuando se implemente esa capa, esta función debe devolver un valor
  // continuo 0-1 según qué tan adentro de la sombra total está la Luna,
  // para aprovechar la transición gradual que ya queda lista aquí.
  return 0;
}
```

### `scripts/hora.js`

```javascript
function dosDigitos(n) {
  return String(n).padStart(2, "0");
}

function minutosDelDia(fecha) {
  return (
    fecha.getHours() * 60 +
    fecha.getMinutes() +
    fecha.getSeconds() / 60 +
    fecha.getMilliseconds() / 60000
  );
}

function anguloDeLaHora(fecha) {
  return minutosDelDia(fecha) / 4 - 180;
}

function textoDeLaHora(fecha) {
  return `${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())}:${dosDigitos(fecha.getSeconds())}`;
}

function anguloDelMinuto(fecha) {
  return (
    (fecha.getMinutes() +
      fecha.getSeconds() / 60 +
      fecha.getMilliseconds() / 60000) *
    6
  );
}

function anguloDelSegundo(fecha) {
  return (fecha.getSeconds() + fecha.getMilliseconds() / 1000) * 6;
}

function crearPoligonoMarcadorReloj(
  radioPunta,
  radioBase,
  semiAnchoGrados,
  clase,
  id,
) {
  const punta = polar(radioPunta, 0);
  const baseIzq = polar(radioBase, -semiAnchoGrados);
  const baseDer = polar(radioBase, semiAnchoGrados);
  const marcador = document.createElementNS(SVG_NS, "polygon");
  marcador.setAttribute(
    "points",
    `${punta.x},${punta.y} ${baseIzq.x},${baseIzq.y} ${baseDer.x},${baseDer.y}`,
  );
  marcador.setAttribute("class", clase);
  if (id) marcador.setAttribute("id", id);
  return marcador;
}

function dibujarMarcadoresReloj() {
  const capa = document.getElementById("capa-marcadores-reloj");
  if (!capa) return null;
  capa.innerHTML = "";

  const marcadorHora = crearPoligonoMarcadorReloj(
    600,
    630,
    1.7,
    "marcador-reloj marcador-reloj-hora",
    "marcador-hora",
  );
  const marcadorMinuto = crearPoligonoMarcadorReloj(
    600,
    620,
    1.3,
    "marcador-reloj marcador-reloj-minuto",
    "marcador-minuto",
  );
  const marcadorSegundo = crearPoligonoMarcadorReloj(
    600,
    620,
    1,
    "marcador-reloj marcador-reloj-segundo",
    "marcador-segundo",
  );

  capa.appendChild(marcadorHora);
  capa.appendChild(marcadorMinuto);
  capa.appendChild(marcadorSegundo);

  return { marcadorHora, marcadorMinuto, marcadorSegundo };
}
```

### `scripts/indicador-zodiaco.js`

```javascript
// scripts/indicador-zodiaco.js

const RADIO_ZODIACO_INTERNO = 230; // debe coincidir con el círculo guía interno en index.html

function radioActualDelZodiaco(radioLocal, anguloRotacion) {
  const e = 600 - CENTRO_ZODIACO_Y;
  const A = (anguloRotacion * Math.PI) / 180;
  return (
    e * Math.cos(A) +
    Math.sqrt(radioLocal * radioLocal - (e * Math.sin(A)) ** 2)
  );
}

function rotarPunto(punto, angulo) {
  const rad = (angulo * Math.PI) / 180;
  const dx = punto.x - 600;
  const dy = punto.y - 600;
  return {
    x: 600 + dx * Math.cos(rad) - dy * Math.sin(rad),
    y: 600 + dx * Math.sin(rad) + dy * Math.cos(rad),
  };
}

function actualizarIndicadorZodiaco(anguloRotacion) {
  const capa = document.getElementById("capa-indicador-zodiaco");
  capa.innerHTML = "";

  const anguloLocalArriba = normalizarGrados(-anguloRotacion);
  const inicioLocal = Math.floor(anguloLocalArriba / 30) * 30;
  const finLocal = inicioLocal + 30;

  const puntoExtInicio = rotarPunto(
    polarZodiaco(RADIO_ZODIACO, inicioLocal),
    anguloRotacion,
  );
  const puntoExtFin = rotarPunto(
    polarZodiaco(RADIO_ZODIACO, finLocal),
    anguloRotacion,
  );
  const puntoIntFin = rotarPunto(
    polarZodiaco(RADIO_ZODIACO_INTERNO, finLocal),
    anguloRotacion,
  );
  const puntoIntInicio = rotarPunto(
    polarZodiaco(RADIO_ZODIACO_INTERNO, inicioLocal),
    anguloRotacion,
  );

  const d = `M ${puntoExtInicio.x} ${puntoExtInicio.y} A ${RADIO_ZODIACO} ${RADIO_ZODIACO} 0 0 1 ${puntoExtFin.x} ${puntoExtFin.y} L ${puntoIntFin.x} ${puntoIntFin.y} A ${RADIO_ZODIACO_INTERNO} ${RADIO_ZODIACO_INTERNO} 0 0 0 ${puntoIntInicio.x} ${puntoIntInicio.y} Z`;

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);
  path.setAttribute("class", "indicador-zodiaco");
  capa.appendChild(path);
}
```

### `scripts/marco.js`

```javascript
const SVG_NS = "http://www.w3.org/2000/svg";
const CENTRO = 600;
const NUMEROS_ROMANOS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

// Radios del marco: todo cuelga de la cara externa del anillo día/noche (r=600)
const MARCO = {
  base: 600,
  minutoMenorFin: 609,
  minutoQuintoFin: 616,
  numeroMinutoMenor: 627,
  numeroMinutoQuinto: 640,
  horaInicio: 660,
  horaFin: 670,
  horaCardinalFin: 680,
  numeroRomano: 705,
};

function polar(radio, gradosDesdeArriba) {
  const rad = (gradosDesdeArriba * Math.PI) / 180;
  return {
    x: CENTRO + radio * Math.sin(rad),
    y: CENTRO - radio * Math.cos(rad),
  };
}

function crearMarca(grados, radioInterno, radioExterno, clase = "marca") {
  const a = polar(radioInterno, grados);
  const b = polar(radioExterno, grados);
  const linea = document.createElementNS(SVG_NS, "line");
  linea.setAttribute("x1", a.x);
  linea.setAttribute("y1", a.y);
  linea.setAttribute("x2", b.x);
  linea.setAttribute("y2", b.y);
  linea.setAttribute("class", clase);
  return linea;
}

function crearNumero(texto, grados, radio, clase = "numero") {
  const p = polar(radio, grados);
  const elemento = document.createElementNS(SVG_NS, "text");
  elemento.setAttribute("x", p.x);
  elemento.setAttribute("y", p.y);
  elemento.setAttribute("class", clase);
  elemento.textContent = texto;
  return elemento;
}

function dibujarMinutos(capa) {
  for (let minuto = 0; minuto < 60; minuto++) {
    const grados = minuto * 6;
    const esQuinto = minuto % 5 === 0;
    const clase = esQuinto
      ? "marca-minuto marca-minuto-quinto"
      : "marca-minuto";
    capa.appendChild(
      crearMarca(
        grados,
        MARCO.base,
        esQuinto ? MARCO.minutoQuintoFin : MARCO.minutoMenorFin,
        clase,
      ),
    );

    if (esQuinto) {
      const etiqueta = minuto === 0 ? 60 : minuto;
      capa.appendChild(
        crearNumero(
          etiqueta,
          grados,
          MARCO.numeroMinutoQuinto,
          "numero numero-minuto",
        ),
      );
    } else {
      capa.appendChild(
        crearNumero(
          minuto,
          grados,
          MARCO.numeroMinutoMenor,
          "numero numero-minuto-chico",
        ),
      );
    }
  }
}

function dibujarMarco() {
  const capa = document.getElementById("capa-marco");
  for (let hora = 0; hora < 24; hora++) {
    const grados = hora * 15 - 180;
    const esCardinal = hora % 6 === 0;
    capa.appendChild(
      crearMarca(
        grados,
        MARCO.horaInicio,
        esCardinal ? MARCO.horaCardinalFin : MARCO.horaFin,
      ),
    );
    capa.appendChild(
      crearNumero(
        NUMEROS_ROMANOS[(hora + 11) % 12],
        grados,
        MARCO.numeroRomano,
      ),
    );
  }
  dibujarMinutos(capa);
}
```

### `scripts/referencias-estacionales.js`

```javascript
// scripts/referencias-estacionales.js

const EVENTOS_ESTACIONALES = [
  {
    nombre: "equinoccio-primavera",
    longitud: 0,
    etiqueta: "Equinoccio de primavera",
  },
  { nombre: "solsticio-verano", longitud: 90, etiqueta: "Solsticio de verano" },
  {
    nombre: "equinoccio-otonio",
    longitud: 180,
    etiqueta: "Equinoccio de otoño",
  },
  {
    nombre: "solsticio-invierno",
    longitud: 270,
    etiqueta: "Solsticio de invierno",
  },
];

const TOLERANCIA_GRADOS = 0.5; // ~medio día de movimiento solar

function dibujarReferenciasEstacionales() {
  const capa = document.getElementById("capa-referencias-estacionales");
  capa.innerHTML = "";

  EVENTOS_ESTACIONALES.forEach(({ nombre, longitud }) => {
    const rotacion = normalizarGrados(longitud - 300);
    const radio = radioActualDelZodiaco(RADIO_ZODIACO, rotacion);

    const circulo = document.createElementNS(SVG_NS, "circle");
    circulo.setAttribute("cx", 600);
    circulo.setAttribute("cy", 600);
    circulo.setAttribute("r", radio);
    circulo.setAttribute("class", `referencia-estacional referencia-${nombre}`);
    capa.appendChild(circulo);
  });

  const ejeLectura = document.createElementNS(SVG_NS, "line");
  ejeLectura.setAttribute("x1", 600);
  ejeLectura.setAttribute("y1", -230);
  ejeLectura.setAttribute("x2", 600);
  ejeLectura.setAttribute("y2", 1430);
  ejeLectura.setAttribute("class", "eje-lectura-estacional");
  capa.appendChild(ejeLectura);
}

function actualizarEventoEstacional(fecha, anguloRotacion) {
  const capa = document.getElementById("capa-marcador-estacional");
  capa.innerHTML = "";

  const { longitudEcliptica } = posicionSolar(fecha);

  const eventoActivo = EVENTOS_ESTACIONALES.find(({ longitud }) => {
    let diferencia = Math.abs(longitudEcliptica - longitud);
    if (diferencia > 180) diferencia = 360 - diferencia;
    return diferencia <= TOLERANCIA_GRADOS;
  });

  if (!eventoActivo) return;

  const radio = radioActualDelZodiaco(RADIO_ZODIACO, anguloRotacion);
  const punto = polar(radio, 0);

  const marcador = document.createElementNS(SVG_NS, "circle");
  marcador.setAttribute("cx", punto.x);
  marcador.setAttribute("cy", punto.y);
  marcador.setAttribute("r", 8);
  marcador.setAttribute("class", "punto-evento-estacional");
  capa.appendChild(marcador);

  const etiqueta = document.createElementNS(SVG_NS, "text");
  const centroActual = rotarPunto(
    { x: CENTRO_ZODIACO_X, y: CENTRO_ZODIACO_Y },
    anguloRotacion,
  );
  etiqueta.setAttribute("x", centroActual.x);
  etiqueta.setAttribute("y", centroActual.y);
  etiqueta.setAttribute("class", "etiqueta-evento-estacional");
  etiqueta.textContent = eventoActivo.etiqueta;
  capa.appendChild(etiqueta);
}
```

### `scripts/traslacion.js`

```javascript
// scripts/traslacion.js

const ORBITA_SEMIEJE_MAYOR = 175;
const EXCENTRICIDAD_TERRESTRE = 0.2; // exagerada a propósito (la real es 0.0167, casi un círculo)
const LONGITUD_PERIHELIO = 283;

function posicionOrbital(longitudEcliptica) {
  const a = ORBITA_SEMIEJE_MAYOR;
  const e = EXCENTRICIDAD_TERRESTRE;
  const nu = ((longitudEcliptica - LONGITUD_PERIHELIO) * Math.PI) / 180;
  const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));
  return polar(r, longitudEcliptica);
}

function construirOrbitaPath() {
  const puntos = [];
  for (let grado = 0; grado <= 360; grado += 2) {
    puntos.push(posicionOrbital(grado));
  }
  const [inicio, ...resto] = puntos;
  return (
    `M ${inicio.x} ${inicio.y} ` +
    resto.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    " Z"
  );
}

function dibujarOrbitaTerrestre() {
  const capa = document.getElementById("capa-orbita-terrestre");
  if (!capa) {
    console.error("Falta <g id='capa-orbita-terrestre'></g> en index.html");
    return;
  }
  const orbita = document.createElementNS(SVG_NS, "path");
  orbita.setAttribute("d", construirOrbitaPath());
  orbita.setAttribute("class", "orbita-terrestre");
  capa.appendChild(orbita);

  [0, 90, 180, 270].forEach((longitud) => {
    const p = posicionOrbital(longitud);
    const marca = document.createElementNS(SVG_NS, "circle");
    marca.setAttribute("cx", p.x);
    marca.setAttribute("cy", p.y);
    marca.setAttribute("r", 4);
    marca.setAttribute("class", "marca-orbital");
    capa.appendChild(marca);
  });

  const tierra = document.createElementNS(SVG_NS, "circle");
  tierra.setAttribute("id", "tierra-orbital");
  tierra.setAttribute("r", 9);
  capa.appendChild(tierra);
}

function actualizarTraslacion(fecha) {
  const tierra = document.getElementById("tierra-orbital");
  if (!tierra) return;
  const { longitudEcliptica } = posicionSolar(fecha);
  const p = posicionOrbital(longitudEcliptica);
  tierra.setAttribute("cx", p.x);
  tierra.setAttribute("cy", p.y);
}
```

### `scripts/tropicos.js`

```javascript
// scripts/tropicos.js

function alturaMaximaMediodia(latitud, declinacion) {
  return 90 - Math.abs(latitud - declinacion);
}

function dibujarTropicos() {
  if (ubicacion.latitud === null) return;
  const capa = document.getElementById("capa-tropicos");
  capa.innerHTML = "";

  const DECLINACION_CANCER = 23.44;
  const DECLINACION_CAPRICORNIO = -23.44;

  const radioCancer = radioDesdeAltura(
    alturaMaximaMediodia(ubicacion.latitud, DECLINACION_CANCER),
  );
  const radioCapricornio = radioDesdeAltura(
    alturaMaximaMediodia(ubicacion.latitud, DECLINACION_CAPRICORNIO),
  );

  const circuloCancer = document.createElementNS(SVG_NS, "circle");
  circuloCancer.setAttribute("cx", 600);
  circuloCancer.setAttribute("cy", 600);
  circuloCancer.setAttribute("r", radioCancer);
  circuloCancer.setAttribute("class", "tropico tropico-cancer");
  capa.appendChild(circuloCancer);

  const circuloCapricornio = document.createElementNS(SVG_NS, "circle");
  circuloCapricornio.setAttribute("cx", 600);
  circuloCapricornio.setAttribute("cy", 600);
  circuloCapricornio.setAttribute("r", radioCapricornio);
  circuloCapricornio.setAttribute("class", "tropico tropico-capricornio");
  capa.appendChild(circuloCapricornio);
}
```

### `scripts/ubicacion.js`

```javascript
const ubicacion = {
  latitud: null,
  longitud: null,
  ciudad: null,
  pais: null,
  esManual: false,
};

function mensajeDeError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Permiso de ubicación denegado.";
    case error.POSITION_UNAVAILABLE:
      return "No se pudo determinar la ubicación.";
    case error.TIMEOUT:
      return "La ubicación tardó demasiado en responder.";
    default:
      return "Error desconocido al obtener la ubicación.";
  }
}

async function obtenerPaisYCiudad(lat, lon) {
  try {
    const respuesta = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
      {
        headers: {
          "Accept-Language": "es",
        },
      },
    );
    const datos = await respuesta.json();
    if (datos && datos.address) {
      ubicacion.ciudad =
        datos.address.city ||
        datos.address.town ||
        datos.address.village ||
        datos.address.county ||
        "";
      ubicacion.pais = datos.address.country || "";
      return {
        ciudad: ubicacion.ciudad,
        pais: ubicacion.pais,
      };
    }
  } catch (e) {
    console.error("No se pudo obtener la localidad", e);
  }
  return null;
}

function pedirUbicacion(alExito, alError) {
  if (!("geolocation" in navigator)) {
    alError("Este navegador no soporta geolocalización.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (posicion) => {
      ubicacion.latitud = posicion.coords.latitude;
      ubicacion.longitud = posicion.coords.longitude;
      ubicacion.esManual = false;

      await obtenerPaisYCiudad(ubicacion.latitud, ubicacion.longitud);

      alExito(ubicacion);
    },
    (error) => {
      alError(mensajeDeError(error));
    },
    { timeout: 10000, maximumAge: 600000 },
  );
}

function establecerUbicacionManual(lat, lon) {
  ubicacion.esManual = true;
  ubicacion.latitud = lat;
  ubicacion.longitud = lon;
  ubicacion.ciudad = "";
  ubicacion.pais = "";

  obtenerPaisYCiudad(lat, lon).then((resultado) => {
    if (resultado) {
      const partes = [resultado.ciudad, resultado.pais].filter(Boolean);
      document.getElementById("pais-ciudad").textContent = partes.join(", ");
    }
  });

  document.getElementById("ubicacion").textContent =
    `Lat: ${lat.toFixed(4)}°    —    Lon: ${lon.toFixed(4)}°`;

  dibujarEventosSolares();
  dibujarTropicos();
}

function obtenerHusoHorario(fecha) {
  if (ubicacion.latitud === null) return null;
  if (!ubicacion.esManual) return -fecha.getTimezoneOffset() / 60;
  return Math.round(ubicacion.longitud / 15);
}

function textoHusoHorario(huso) {
  if (huso === null) return "";
  const signo = huso < 0 ? "-" : "+";
  const abs = Math.abs(huso);
  const horas = Math.floor(abs);
  const minutos = Math.round((abs - horas) * 60);
  const sufijo = minutos ? `:${String(minutos).padStart(2, "0")}` : "";
  return `(GMT${signo}${horas}${sufijo})`;
}
```

### `scripts/viajero.js`

```javascript
// scripts/viajero.js

function inicializarViajero() {
  const boton = document.getElementById("boton-viajar");
  const cajon = document.getElementById("cajon-viajero");
  const contenedor = document.getElementById("contenedor-app");

  boton.addEventListener("click", () => {
    cajon.classList.toggle("abierto");
    contenedor.classList.toggle("desplazado");
  });

  const inputFechaHora = document.getElementById("input-fecha-hora");
  const botonIrFecha = document.getElementById("boton-ir-fecha");
  const botonAhora = document.getElementById("boton-ahora");
  const botonesVelocidad = document.querySelectorAll(".boton-velocidad");

  botonIrFecha.addEventListener("click", () => {
    if (!inputFechaHora.value) return;
    establecerFechaViajero(new Date(inputFechaHora.value));
  });

  botonAhora.addEventListener("click", () => {
    volverAAhora();
    inputFechaHora.value = "";
    botonesVelocidad.forEach((b) => b.classList.remove("activa"));
    botonesVelocidad[0].classList.add("activa");
  });

  botonesVelocidad.forEach((b) => {
    b.addEventListener("click", () => {
      const valor = Number(b.dataset.velocidad);
      establecerMultiplicador(valor);
      botonesVelocidad.forEach((otro) => otro.classList.remove("activa"));
      b.classList.add("activa");
    });
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
```

### `scripts/zodiaco.js`

```javascript
const CENTRO_ZODIACO_X = 600;
const CENTRO_ZODIACO_Y = 463.4;
const RADIO_ZODIACO = 343.4;
const RADIO_ETIQUETA = 290;

const SIGNOS = [
  { nombre: "Capricornio", simbolo: "♑" },
  { nombre: "Sagitario", simbolo: "♐" },
  { nombre: "Escorpio", simbolo: "♏" },
  { nombre: "Libra", simbolo: "♎" },
  { nombre: "Virgo", simbolo: "♍" },
  { nombre: "Leo", simbolo: "♌" },
  { nombre: "Cáncer", simbolo: "♋" },
  { nombre: "Géminis", simbolo: "♊" },
  { nombre: "Tauro", simbolo: "♉" },
  { nombre: "Aries", simbolo: "♈" },
  { nombre: "Piscis", simbolo: "♓" },
  { nombre: "Acuario", simbolo: "♒" },
];

function polarZodiaco(radio, gradosDesdeArriba) {
  const rad = (gradosDesdeArriba * Math.PI) / 180;
  return {
    x: CENTRO_ZODIACO_X + radio * Math.sin(rad),
    y: CENTRO_ZODIACO_Y - radio * Math.cos(rad),
  };
}

function crearDivisionZodiaco(grados) {
  const a = polarZodiaco(RADIO_ZODIACO, grados);
  const b = polarZodiaco(RADIO_ZODIACO - 20, grados);
  const linea = document.createElementNS(SVG_NS, "line");
  linea.setAttribute("x1", a.x);
  linea.setAttribute("y1", a.y);
  linea.setAttribute("x2", b.x);
  linea.setAttribute("y2", b.y);
  linea.setAttribute("class", "division-zodiaco");
  return linea;
}

const etiquetasZodiaco = [];

function crearEtiquetaCurvaZodiaco(signo, medio) {
  const texto = `${signo.simbolo}  ${signo.nombre}`;
  const grupo = document.createElementNS(SVG_NS, "g");

  const anguloInicio = medio - 15;
  const anguloFin = medio + 15;

  const p1 = polarZodiaco(RADIO_ETIQUETA, anguloInicio);
  const p2 = polarZodiaco(RADIO_ETIQUETA, anguloFin);
  const sweep = 1; // Fijo para mantener la misma dirección uniforme

  const pathId = "path-zodiaco-" + Math.random().toString(36).slice(2, 11);
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("id", pathId);
  path.setAttribute(
    "d",
    `M ${p1.x} ${p1.y} A ${RADIO_ETIQUETA} ${RADIO_ETIQUETA} 0 0 ${sweep} ${p2.x} ${p2.y}`,
  );
  path.setAttribute("fill", "none");
  grupo.appendChild(path);

  const textoEl = document.createElementNS(SVG_NS, "text");
  textoEl.setAttribute("class", "etiqueta-zodiaco");

  const textPath = document.createElementNS(SVG_NS, "textPath");
  textPath.setAttribute("href", "#" + pathId);
  textPath.setAttribute("startOffset", "50%");
  textPath.setAttribute("text-anchor", "middle");
  textPath.textContent = texto;

  textoEl.appendChild(textPath);
  grupo.appendChild(textoEl);

  etiquetasZodiaco.push({ elemento: grupo, path: path, medio: medio });

  return grupo;
}

function dibujarZodiaco() {
  const capa = document.getElementById("capa-zodiaco");
  for (let i = 0; i < 12; i++) {
    const inicio = i * 30;
    const medio = inicio + 15;
    capa.appendChild(crearDivisionZodiaco(inicio));
    capa.appendChild(crearEtiquetaCurvaZodiaco(SIGNOS[i], medio));
  }
}

function actualizarEtiquetasZodiaco(anguloRotacion) {
  etiquetasZodiaco.forEach(({ path, medio }) => {
    const anguloInicio = medio - 15;
    const anguloFin = medio + 15;

    const p1 = polarZodiaco(RADIO_ETIQUETA, anguloInicio);
    const p2 = polarZodiaco(RADIO_ETIQUETA, anguloFin);
    const sweep = 1;

    path.setAttribute(
      "d",
      `M ${p1.x} ${p1.y} A ${RADIO_ETIQUETA} ${RADIO_ETIQUETA} 0 0 ${sweep} ${p2.x} ${p2.y}`,
    );
  });
}
```

### `scripts/main.js`

```javascript
const agujaHora = document.getElementById("aguja-hora");
const agujaMinuto = document.getElementById("aguja-minuto");
const agujaSegundo = document.getElementById("aguja-segundo");
const texto = document.getElementById("hora-digital");
const sol = document.getElementById("sol");
const luna = document.getElementById("luna");
const capaZodiaco = document.getElementById("capa-zodiaco");
const capaCalendario = document.getElementById("capa-calendario");
const fechaDigital = document.getElementById("fecha-digital");

const RADIO_ORBITA_SOL = 540;
const RADIO_ORBITA_LUNA = 540;
const etiquetaHuso = document.getElementById("etiqueta-huso");

let marcadorHora = null;
let marcadorMinuto = null;
let marcadorSegundo = null;

let anioCalendarioDibujado = null;

function actualizar() {
  const ahora = obtenerFechaActual();

  const textoHuso = textoHusoHorario(obtenerHusoHorario(ahora));
  if (etiquetaHuso.textContent !== textoHuso) {
    etiquetaHuso.textContent = textoHuso;
  }

  const anguloH = anguloDeLaHora(ahora);
  const anguloM = anguloDelMinuto(ahora);
  const anguloS = anguloDelSegundo(ahora);

  agujaHora.setAttribute("transform", `rotate(${anguloH} 600 600)`);
  agujaMinuto.setAttribute("transform", `rotate(${anguloM} 600 600)`);
  agujaSegundo.setAttribute("transform", `rotate(${anguloS} 600 600)`);

  if (marcadorHora)
    marcadorHora.setAttribute("transform", `rotate(${anguloH} 600 600)`);
  if (marcadorMinuto)
    marcadorMinuto.setAttribute("transform", `rotate(${anguloM} 600 600)`);
  if (marcadorSegundo)
    marcadorSegundo.setAttribute("transform", `rotate(${anguloS} 600 600)`);
  const anguloZod = anguloZodiaco(ahora);
  capaZodiaco.setAttribute("transform", `rotate(${anguloZod} 600 600)`);
  actualizarTraslacion(ahora);
  actualizarEtiquetasZodiaco(anguloZod);
  actualizarIndicadorZodiaco(anguloZod);
  actualizarEventoEstacional(ahora, anguloZod);

  const anioActual = ahora.getFullYear();
  if (anioActual !== anioCalendarioDibujado) {
    dibujarCalendario(anioActual);
    anioCalendarioDibujado = anioActual;
  }
  const anguloCal = anguloCalendario(ahora);
  capaCalendario.setAttribute("transform", `rotate(${anguloCal} 600 600)`);
  actualizarEtiquetasCalendario(anguloCal);

  let alturaSolar = null;
  if (ubicacion.latitud !== null) {
    alturaSolar = posicionSolarHorizonte(
      ahora,
      ubicacion.latitud,
      ubicacion.longitud,
    ).altura;
  }
  actualizarSol(ahora, alturaSolar);
  actualizarLuna(ahora, alturaSolar);

  const horaActual = textoDeLaHora(ahora);
  if (texto.textContent !== horaActual) {
    texto.textContent = horaActual;
  }

  const fechaFormateada = ahora.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  if (fechaDigital.textContent !== fechaFormateada) {
    fechaDigital.textContent = fechaFormateada;
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
  sol.style.filter =
    intensidad > 0
      ? `drop-shadow(0 0 ${4 + intensidad * 14}px #f5c344)`
      : "none";
  agujaHora.classList.toggle("aguja-noche", alturaSolar <= 0);
}

const marcadoresReloj = dibujarMarcadoresReloj();
if (marcadoresReloj) {
  marcadorHora = marcadoresReloj.marcadorHora;
  marcadorMinuto = marcadoresReloj.marcadorMinuto;
  marcadorSegundo = marcadoresReloj.marcadorSegundo;
}

actualizar();
dibujarMarco();
inicializarViajero();
dibujarOrbitaTerrestre();
dibujarZodiaco();
dibujarReferenciasEstacionales();
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
  const { altura } = posicionLunarHorizonte(
    fecha,
    ubicacion.latitud,
    ubicacion.longitud,
  );
  const angulo = anguloDeLaHora(fecha);
  const p = polar(RADIO_ORBITA_LUNA, angulo);

  const intensidad = intensidadLunar(altura, alturaSolar, 1);
  const grupo = document.getElementById("capa-fase-lunar");
  grupo.setAttribute("transform", `translate(${p.x} ${p.y})`);
  grupo.style.opacity = intensidad;
  grupo.style.filter =
    intensidad > 0
      ? `drop-shadow(0 0 ${2 + intensidad * 10}px #cfd8e3)`
      : "none";

  actualizarFaseLunar(fecha);
}
```
