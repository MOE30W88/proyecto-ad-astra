# Respaldo del proyecto AD ASTRA

Copia concatenada del contenido actual de los archivos de documentación, HTML, CSS, JavaScript y SVG. Fuente de respaldo generado el 2026-09-30.

## Índice

- `README.md`
- `index.html`
- `css\base.css`
- `css\estructura.css`
- `css\panel.css`
- `css\planetas.css`
- `css\reloj.css`
- `css\tema.css`
- `css\viajero.css`
- `iconos\albaAstro.svg`
- `iconos\albaCivil.svg`
- `iconos\albaNautico.svg`
- `iconos\alturaLuna.svg`
- `iconos\alturaSol.svg`
- `iconos\coordenadas.svg`
- `iconos\declinacion.svg`
- `iconos\duracion.svg`
- `iconos\ecuacion.svg`
- `iconos\edadLunar.svg`
- `iconos\estacion.svg`
- `iconos\fase.svg`
- `iconos\fecha.svg`
- `iconos\horaSolar.svg`
- `iconos\huso.svg`
- `iconos\lugar.svg`
- `iconos\mediodia.svg`
- `iconos\ocasoAstro.svg`
- `iconos\ocasoCivil.svg`
- `iconos\ocasoNautico.svg`
- `iconos\puesta.svg`
- `iconos\salida.svg`
- `iconos\signo.svg`
- `scripts\astronomia.js`
- `scripts\calendario.js`
- `scripts\constelaciones.js`
- `scripts\efemerides-solares.js`
- `scripts\enfoque-capas.js`
- `scripts\estado-tiempo.js`
- `scripts\eventos-solares.js`
- `scripts\fase-lunar.js`
- `scripts\hora-local.js`
- `scripts\hora.js`
- `scripts\indicador-zodiaco.js`
- `scripts\main.js`
- `scripts\marco.js`
- `scripts\panel-planetas.js`
- `scripts\panel-resultados.js`
- `scripts\planetas.js`
- `scripts\referencias-estacionales.js`
- `scripts\tema.js`
- `scripts\traslacion.js`
- `scripts\tropicos.js`
- `scripts\ubicacion.js`
- `scripts\viajero.js`
- `scripts\zodiaco.js`

---

## `README.md`

````markdown
Reloj astronómico 2D inspirado en el Orloj de Praga, hecho con HTML, CSS y JavaScript puro — sin librerías ni APIs externas (salvo Nominatim, solo para mostrar el nombre de ciudad y país). Todos los cálculos astronómicos son propios, dinámicos y con un margen de incertidumbre aceptable para un proyecto de aprendizaje.

## Capas completas

- **Base**: geolocalización (lat/lon), ciudad y país, hora global
- **1 — Reloj**: agujas de hora, minuto y segundo en formato 24 h; marcas de hora con números romanos y escala de 60 minutos, en la cara externa del anillo día/noche
- **2 — Día/Noche**: anillo con degradado según la altura solar real (alba, día, ocaso, noche), dinámico por fecha y ubicación
- **3 — Sol y Luna**: el Sol, grande y fijo en el centro del anillo día/noche, y la Luna con fases reales (creciente, gibosa, llena...), ambos visibles solo cuando están sobre el horizonte
- **4 — Zodiaco**: anillo excéntrico con rotación anual real, nombres y símbolos en texto curvo, más un indicador del signo activo
- **5 — Eventos estacionales**: círculos de referencia de equinoccios y solsticios, con aviso visual del día exacto
- **6 — Trópicos**: Cáncer y Capricornio, calculados con la latitud del usuario
- **7 — Calendario**: aro exterior con los 12 meses (proporcionales a sus días reales, con años bisiestos), marcas de día y de mes hacia el exterior del aro (r=780), nombres de los meses centrados en r=760 y marcador fijo del día actual
  - **7.1 — Estaciones** (sub-capa): anillo de 4 colores entre los radios 740 y 780, bajo el calendario. Cada día del año se colorea según la longitud eclíptica real del Sol, así que las estaciones tienen su duración real y se mezclan gradualmente en cada equinoccio y solsticio. Rota junto con el calendario, y en el hemisferio sur los colores se invierten
- **8 — Traslación**: órbita elíptica de la Tierra alrededor de un Sol central, sincronizada con el zodiaco y las estaciones

## Viajero

Cajón lateral para manipular el tiempo y el lugar:

- Fecha y hora manual, botón "Ahora" y velocidades x1, x100, x1000 y x10000
- Ubicación manual por latitud y longitud, o volver a la ubicación real
- Ejes de referencia con "0° Horizonte" y el huso horario (GMT) calculado según la ubicación

## Cómo verlo

Abre la carpeta en Visual Studio Code y usa la extensión **Live Server**: clic derecho sobre `index.html` y **Open with Live Server**. Si haces cambios y no se reflejan, fuerza la recarga con **Ctrl+Shift+R**.

## Estructura

```
index.html
css/
  base.css                       estilos generales
  reloj.css                      estilos del dial
  viajero.css                    cajón "Viajar"
  caja-reloj.css                 caja del reloj y menú superior
  panel.css                      panel "Resultados actuales"
scripts/
  astronomia.js                  posición del Sol y la Luna, fase, tiempo sidéreo
  estado-tiempo.js               motor de tiempo (fecha real, viajero, velocidad)
  hora-local.js                  separa instante real de hora de pared del lugar
  ubicacion.js                   geolocalización, ciudad/país, huso horario
  hora.js                        agujas y marcadores del reloj
  marco.js                       escalas de horas y minutos, ejes
  calendario.js                  aro de meses, marcas exteriores y marcador de hoy
  zodiaco.js                     anillo zodiacal
  indicador-zodiaco.js           signo solar activo
  referencias-estacionales.js    equinoccios, solsticios y anillo de estaciones
  tropicos.js                    trópicos
  traslacion.js                  órbita terrestre
  eventos-solares.js             anillo día/noche
  fase-lunar.js                  forma real de la fase lunar
  efemerides-solares.js          alba, ocaso, mediodía solar, hora solar
  panel-resultados.js            tarjetas del panel
  viajero.js                     cajón "Viajar"
  main.js                        bucle principal
```

## Precisión y aproximaciones

- Las fórmulas son de precisión moderada: orden de ±1–2 min en salida, puesta y crepúsculos, y de una décima de grado en las alturas. No incluyen refracción atmosférica.
- La excentricidad de la órbita terrestre en el dial está exagerada a propósito (0,2 frente a 0,0167 real).
- Sol y Luna se ubican por ángulo horario, no por azimut real.
- En ubicación manual, el huso estimado ignora fronteras políticas y horario de verano.
- El zodiaco usado es el tropical (sectores de 30° desde el equinoccio de marzo), no las constelaciones visibles.
- El anillo de estaciones usa el Sol al mediodía UTC de cada día, por lo que sus fronteras son aproximadas (del orden de ±1 día) y la mezcla de colores abarca ±12° de longitud en cada una.
- Los eclipses no están implementados: las fórmulas actuales no alcanzan la precisión necesaria.

## Cumplidas en la sesión 28-09-2026

- **Círculo interior**: nuevas ideas por definir (adicion de los demas planetas y orbitas, junto a la barrta lateral del nombre)

## Pendientes

- **Panel de información**: "Próximos eventos"
- **Distinción de capas por cursor**: resaltar la capa bajo el cursor y mostrar su nombre
- **Nodos lunares y eclipses**: incluye la luna roja (el motor de color ya está preparado)
- **Astrales**: lluvias de meteoros, cometas y planetas, según visibilidad por ubicación
- **Viajero avanzado**: mapa interactivo y selector de fecha propio
- **Landing page** con sección de blog, y publicación en GitHub Pages (construyendola por secciones)

````

---

## `index.html`

````html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AD ASTRA — Reloj astronómico</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/reloj.css" />
    <link rel="stylesheet" href="css/viajero.css" />
    <link rel="stylesheet" href="css/panel.css" />
    <link rel="stylesheet" href="css/planetas.css" />
    <link rel="stylesheet" href="css/tema.css" />
    <link rel="stylesheet" href="css/estructura.css" />
    <script src="scripts/hora-local.js" defer></script>
    <script src="scripts/hora.js" defer></script>
    <script src="scripts/estado-tiempo.js" defer></script>
    <script src="scripts/viajero.js" defer></script>
    <script src="scripts/marco.js" defer></script>
    <script src="scripts/calendario.js" defer></script>
    <script src="scripts/ubicacion.js" defer></script>
    <script src="scripts/astronomia.js" defer></script>
    <script src="scripts/fase-lunar.js" defer></script>
    <script src="scripts/planetas.js" defer></script>
    <script src="scripts/traslacion.js" defer></script>
    <script src="scripts/indicador-zodiaco.js" defer></script>
    <script src="scripts/tropicos.js" defer></script>
    <script src="scripts/referencias-estacionales.js" defer></script>
    <script src="scripts/eventos-solares.js" defer></script>
    <script src="scripts/zodiaco.js" defer></script>
    <script src="scripts/efemerides-solares.js" defer></script>
    <script src="scripts/panel-resultados.js" defer></script>
    <script src="scripts/panel-planetas.js" defer></script>
    <script src="scripts/enfoque-capas.js" defer></script>
    <script src="scripts/constelaciones.js" defer></script>
    <script src="scripts/tema.js" defer></script>
    <script src="scripts/main.js" defer></script>
  </head>
  <body>
    <div id="contenedor-app">
      <header class="cabecera">
        <a class="logo" href="#">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="15" cy="15" r="13"/><path d="M15 2v26M9 22 21 8"/></svg>
          <span>AD ASTRA</span>
        </a>
        <nav class="nav-capas" aria-label="Capas del reloj">
          <button type="button" data-enfoque="todas" class="activa">Astrolabio</button>
          <button type="button" data-enfoque="reloj">Reloj</button>
          <button type="button" data-enfoque="dia-noche">Día y noche</button>
          <button type="button" data-enfoque="zodiaco">Zodíaco</button>
          <button type="button" data-enfoque="calendario">Calendario</button>
          <button type="button" data-enfoque="sistema-solar">Sistema solar</button>
        </nav>
        <button type="button" id="boton-tema" class="boton-tema" title="Modo día / noche (próximamente)" aria-label="Modo día / noche (próximamente)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        </button>
      </header>
      <main>
        <section class="hero">
          <p class="hero-etiqueta">Reloj astronómico</p>
          <h1 class="hero-titular">El cielo, el tiempo y la posición del Sol en una sola esfera.</h1>
        </section>
        <section id="escenario" class="escenario">
          <button type="button" id="boton-viajar" class="tirador tirador-izq" title="Viajar en el tiempo y el lugar" aria-label="Viajar en el tiempo y el lugar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>
          </button>
          <button type="button" id="boton-planetas" class="tirador tirador-der" title="Sistema solar" aria-label="Sistema solar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="8"/><circle cx="18" cy="7" r="1.6" fill="currentColor"/></svg>
          </button>
          <aside id="cajon-viajero" class="panel-flotante panel-izq">
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
                <button data-velocidad="1" class="boton-velocidad activa">x1</button>
                <button data-velocidad="100" class="boton-velocidad">x100</button>
                <button data-velocidad="1000" class="boton-velocidad">x1000</button>
                <button data-velocidad="10000" class="boton-velocidad">x10000</button>
              </div>
              <label>Modo planetario</label>
              <div class="fila-botones">
                <button data-velocidad="1000000" class="boton-velocidad">x1M</button>
                <button data-velocidad="10000000" class="boton-velocidad">x10M</button>
              </div>
            </section>
            <section class="seccion-viajero">
              <h3>Mapa</h3>
              <label for="input-latitud">Latitud</label>
              <input type="number" id="input-latitud" step="0.0001" placeholder="13.6927" />
              <label for="input-longitud">Longitud</label>
              <input type="number" id="input-longitud" step="0.0001" placeholder="-89.1917" />
              <div class="fila-botones">
                <button id="boton-ir-ubicacion">Ir a esta ubicación</button>
                <button id="boton-ubicacion-real">⟲ Mi ubicación</button>
              </div>
            </section>
          </aside>
          <aside id="cajon-planetas" class="panel-flotante panel-der">
            <section class="seccion-planetas">
              <h3>Sistema solar</h3>
              <p class="nota-planetas">Posiciones heliocéntricas reales. Las distancias del dial usan una escala comprimida.</p>
              <table class="tabla-planetas">
                <thead><tr><th>Planeta</th><th>UA</th><th>Long.</th><th>Período</th></tr></thead>
                <tbody id="tabla-planetas-cuerpo"></tbody>
              </table>
              <p class="arco-planetas">Arco que abarcan los 8 planetas: <strong id="arco-planetas">—</strong><br />(menor = más alineados)</p>
            </section>
          </aside>
          <svg
          id="reloj"
          viewBox="-400 -400 2120 2120"
          role="img"
          aria-label="Reloj astronómico"
        >
          <g id="capa-fija">
            <circle class="guia" cx="600" cy="600" r="480" />
            <circle class="guia" cx="600" cy="600" r="600" />
            <circle class="guia" cx="600" cy="600" r="780" />
            <circle class="guia" cx="600" cy="600" r="900" />
          </g>
          <g id="capa-tropicos"></g>
          <g id="capa-referencias-estacionales"></g>
          <g id="capa-eventos-solares"></g>
          <g id="capa-marco"></g>
          <g id="capa-orbitas-planetarias"></g>
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
            <circle class="guia-zodiaco" cx="600" cy="463.4" r="260" />
          </g>
          <g id="capa-indicador-zodiaco"></g>
          <g id="capa-marcador-estacional"></g>
          <g id="capa-orbita-terrestre"></g>
          <g id="capa-planetas"></g>
          <g id="capa-estaciones"></g>
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
              x1="-360"
              y1="600"
              x2="1560"
              y2="600"
            />
            <text class="etiqueta-eje" x="1600" y="600" text-anchor="middle" transform="rotate(90 1620 600)" >0° Horizonte</text>
            <text
              id="etiqueta-huso"
              class="etiqueta-eje"
              x="600"
              y="-390"
              text-anchor="middle"
            ></text>
          </g>
          <g id="capa-sol-central">
            <circle id="sol-central" cx="600" cy="600" r="35" />
          </g>
        </svg>
          <p id="hora-digital"></p>
          <p id="fecha-digital"></p>
        </section>
        <section id="panel-resultados" class="panel-resultados">
          <h2>Resultados actuales</h2>
          <div id="grid-civil" class="grid-datos"></div>
          <details class="bloque-tecnico">
            <summary>Lectura astronómica</summary>
            <div id="grid-astro" class="grid-datos"></div>
          </details>
        </section>
      </main>
    </div>
  </body>
</html>
 
````

---

## `css\base.css`

````css
/*css/base.css */

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background:
    radial-gradient(
      circle at 50% 38%,
      rgba(35, 75, 125, 0.16) 0%,
      rgba(18, 40, 75, 0.10) 32%,
      transparent 65%
    ),
    radial-gradient(
      circle at 15% 85%,
      rgba(25, 55, 100, 0.10) 0%,
      transparent 45%
    ),
    #071126;
}

main {
  width: min(94vw, 1600px);
}

#reloj {
  width: min(100%, 94vmin, 900px);
  margin: 0 auto;
  height: auto;
  display: block;
}

#hora-digital {
  margin: 1rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 0.3rem;
  color: #c9a24b;
}

#ubicacion {
  margin: 0.25rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 1rem;
  color: #8fb4d9;
  letter-spacing: 0.5px; /* Separa un poco los caracteres generales */
}

#pais-ciudad {
  margin: 0.15rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 0.9rem;
  color: #c9a24b; /* Tono dorado sutil */
  opacity: 0.85;
}

#fecha-digital {
  margin: 0.25rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 0.3rem;
  color: #c9a24b;
}
````

---

## `css\estructura.css`

````css
/* css/estructura.css — estructura final: cabecera, hero, escenario, paneles flotantes, barra inferior */
body {
  display: block;
  margin: 0;
  min-height: 100vh;
  background: var(--fondo);
  background-attachment: fixed;
  overflow-x: hidden;
  color: var(--texto);
  font-family: var(--fuente);
}
 
#contenedor-app { display: block; }
 
main { display: block; width: 100%; margin: 0; padding: 0; }
 
/* Cabecera */
.cabecera {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid var(--linea);
}
.logo { display: flex; align-items: center; gap: 0.8rem; color: var(--acento); text-decoration: none; letter-spacing: 0.45em; font-size: 0.95rem; }
.nav-capas { display: flex; gap: clamp(0.75rem, 3vw, 2.25rem); }
.nav-capas button {
  padding: 0.4rem 0.1rem;
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  color: var(--texto-suave);
  font: inherit;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.nav-capas button:hover { color: var(--texto); }
.nav-capas button.activa { color: var(--texto); border-bottom-color: var(--acento); }
.boton-tema, .tirador {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--linea);
  background: transparent;
  color: var(--acento);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.boton-tema { justify-self: end; }
.boton-tema:hover, .tirador:hover { background: rgba(201, 162, 75, 0.12); border-color: var(--acento); }
 
/* Hero */
.hero { padding: 0.3rem 1rem 0; text-align: center; }
.hero-etiqueta { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 0; font-size: 0.78rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--acento); }
.hero-etiqueta::before, .hero-etiqueta::after { content: ""; width: 2.5rem; height: 1px; background: var(--linea); }
.hero-titular {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin: 0.6rem 0 0;
  font-size: clamp(1.1rem, 2.4vw, 1.75rem);
  font-weight: normal;
  color: #c9d6ee;
}
.hero-titular::before,
.hero-titular::after { content: ""; flex: 0 0 3.5rem; height: 1px; background: var(--acento); opacity: 0.6; }
 
/* Escenario (reloj + paneles flotantes) */
/* El escenario ocupa todo el ancho de la ventana para que los botones queden en los costados */
.escenario {
  /* mismo tamaño visual del dial que antes; el lienzo (viewBox 2120) es un 10 % mayor para el aro de constelaciones */
  --ancho-reloj: min(100%, calc((100vh - 230px) * 1.104), 1104px);
  position: relative;
  padding: 0.5rem 0 1.5rem;
}
#reloj { width: var(--ancho-reloj); margin: 0 auto; }
/* Hora (izquierda) y fecha (derecha) a los lados del reloj, a la altura del centro */
.escenario { text-align: center; }
#hora-digital,
#fecha-digital {
  position: absolute;
  top: 48.5%;
  margin: 0;
  transform: translateY(-150%);
  font-family: var(--fuente);
  font-size: 1.15rem;
  letter-spacing: 0.04em;
  color: var(--acento);
}
#hora-digital { right: calc(52% + var(--ancho-reloj) / 2.2 + 1rem); }
#fecha-digital { left: calc(49% + var(--ancho-reloj) / 2 + 1rem); }
@media (max-width: 1100px) {
  #hora-digital,
  #fecha-digital { position: static; display: inline-block; transform: none; margin: 0 0.9rem; }
}
 
.tirador { position: absolute; top: 50%; transform: translateY(-50%); z-index: 40; }
.tirador-izq { left: clamp(1rem, 3vw, 3rem); }
.tirador-der { right: clamp(1rem, 3vw, 3rem); }
 
.panel-flotante {
  position: absolute;
  top: 50%;
  z-index: 30;
  box-sizing: border-box;
  width: 290px;
  max-width: 86vw;
  max-height: 90%;
  overflow-y: auto;
  padding: 20px;
  background: none;
  border: 0;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s linear 0.25s;
}
.panel-izq { left: calc(clamp(1rem, 3vw, 3rem) + 3.5rem); transform: translateY(-50%) translateX(-16px); }
.panel-der { right: calc(clamp(1rem, 3vw, 3rem) + 3.5rem); width: 320px; transform: translateY(-50%) translateX(16px); }
.panel-flotante.abierto { visibility: visible; opacity: 1; transform: translateY(-50%) translateX(0); transition-delay: 0s; }
 
/* Resultados: sin marco, tarjetas limpias */
.panel-resultados { width: min(100% - 4rem, 1500px); max-width: none; margin: 0 auto; padding: 2.5rem 0 3rem; border: 0; background: none; }
.panel-resultados h2 { text-align: center; }
 
/* Fichas de resultados (estilo de la barra inferior del diseño) */
.panel-resultados .grid-datos { align-items: stretch; gap: 0; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
.panel-resultados .tarjeta {
  position: relative;
  display: grid;
  grid-template-columns: 2.2rem 1fr;
  column-gap: 0.75rem;
  align-content: center;
  min-height: 0;
  padding: 1rem 2.6rem 1rem 1rem;
  background: none;
  border: 0;
  border-left: 1px solid var(--linea);
  border-radius: 0;
}
.panel-resultados .tarjeta::before { content: "✦"; grid-column: 1; grid-row: 1 / span 3; align-self: center; text-align: center; font-size: 1.3rem; color: var(--acento); }
.panel-resultados .tarjeta > * { grid-column: 2; }
.panel-resultados .tarjeta-cabecera { text-align: left; font-size: 0.72rem; letter-spacing: 0.18em; color: var(--texto-suave); }
.panel-resultados .tarjeta-cabecera::before { content: none; }
.panel-resultados .tarjeta-valor,
.panel-resultados .tarjeta #pais-ciudad,
.panel-resultados .tarjeta #ubicacion { margin: 0; text-align: left; font-size: 1rem; letter-spacing: 0; color: var(--texto); opacity: 1; }
.panel-resultados .tarjeta-sub { text-align: left; font-size: 0.75rem; color: var(--texto-suave); }
 
/* "?" arriba a la derecha de la ficha, con burbuja al pasar el cursor */
.panel-resultados .ayuda {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  bottom: auto;
  display: grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  padding: 0;
  border: 1px solid var(--linea);
  border-radius: 50%;
  background: transparent;
  color: var(--texto-suave);
  font: 0.72rem var(--fuente);
  cursor: help;
}
.panel-resultados .ayuda:hover,
.panel-resultados .ayuda:focus { background: rgba(201, 162, 75, 0.15); border-color: var(--acento); color: var(--acento); outline: none; }
.panel-resultados .tarjeta-ayuda,
.panel-resultados .tarjeta-ayuda[hidden] {
  display: block;
  position: absolute;
  right: 0;
  bottom: calc(100% + 6px);
  left: auto;
  z-index: 20;
  width: 220px;
  max-width: 80vw;
  margin: 0;
  padding: 0.6rem 0.75rem;
  background: var(--panel);
  border: 1px solid var(--linea);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--texto);
  text-align: left;
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.panel-resultados .tarjeta:has(.ayuda:hover) .tarjeta-ayuda,
.panel-resultados .tarjeta:has(.ayuda:focus) .tarjeta-ayuda { opacity: 1; transform: translateY(0); }
 
/* Disco oscuro tras las órbitas */
#fondo-traslacion { fill: var(--fondo-traslacion); }
 
/* Aro de constelaciones */
.arco-constelacion { fill: none; stroke: var(--acento); stroke-width: 2; opacity: 0.55; }
.glifo-comodin { fill: var(--acento); stroke: var(--acento); stroke-width: 1.2; opacity: 0.75; }
.glifo-comodin polyline { fill: none; }
.nombre-constelacion {
  fill: var(--acento);
  font-family: var(--fuente);
  font-size: 20px;
  letter-spacing: 3px;
  text-anchor: middle;
  dominant-baseline: central;
  text-transform: uppercase;
}
 
/* Símbolos zodiacales: fuente de símbolos y dorado (evita el emoji morado) */
.simbolo-zodiacal { font-family: var(--fuente-simbolos); color: var(--acento); fill: var(--acento); }
 
/* Enfoque de capas desde el menú */
#reloj > g[id^="capa-"] { transition: opacity 0.45s ease; }
#reloj.enfocando > g[id^="capa-"]:not(.capa-enfocada) { opacity: 0.12; }
 
/* Dígitos del calendario: solo visibles al elegir "Calendario" en el menú */
.digito-calendario {
  fill: #c9d6ee;
  font-family: var(--fuente);
  font-size: 12px;
  text-anchor: middle;
  dominant-baseline: central;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
}
#reloj.enfoque-calendario .digito-calendario { opacity: 1; }
 
/* Sistema solar: al elegirlo se expande de radio máximo 480 a 780 (780 / 480 = 1,625), con el Sol fijo en el centro */
#capa-fondo-traslacion,
#capa-orbita-terrestre,
#capa-orbitas-planetarias,
#capa-planetas,
#capa-sol-central {
  transform-origin: 600px 600px;
  transition: transform 0.9s ease;
}
#reloj.enfoque-sistema-solar #capa-fondo-traslacion,
#reloj.enfoque-sistema-solar #capa-orbita-terrestre,
#reloj.enfoque-sistema-solar #capa-orbitas-planetarias,
#reloj.enfoque-sistema-solar #capa-planetas,
#reloj.enfoque-sistema-solar #capa-sol-central { transform: scale(1.625); }
.orbita-planeta,
.orbita-terrestre { vector-effect: non-scaling-stroke; }
 
/* Icono propio en una ficha (opcional): ver campo "icono" en TARJETAS de panel-resultados.js */
.panel-resultados .tarjeta.con-icono::before {
  content: "";
  justify-self: center;
  width: 1.6rem;
  height: 1.6rem;
  background: var(--acento);
  -webkit-mask: var(--icono) center / contain no-repeat;
  mask: var(--icono) center / contain no-repeat;
}
 
@media (max-width: 800px) {
  .cabecera { grid-template-columns: 1fr auto; row-gap: 0.6rem; }
  .nav-capas { grid-column: 1 / -1; grid-row: 2; justify-content: center; flex-wrap: wrap; }
  .panel-izq { left: 0.5rem; } .panel-der { right: 0.5rem; }
}
 
````

---

## `css\panel.css`

````css
/* css/panel.css — panel "Resultados actuales" */
.panel-resultados {
  border: 1px solid rgba(201, 162, 75, 0.25);
  border-radius: 20px;
  padding: 1.25rem;
  background: #0e1428;
  font-family: var(--fuente);
  color: #c9d4e6;
}
 
.panel-resultados h2 {
  margin: 0 0 1rem;
  font-size: 1.15rem;
  font-weight: normal;
  letter-spacing: 1px;
  color: #c9a24b;
  text-align: center;
}
 
.bloque-tecnico {
  margin-top: 1.25rem;
}
 
.bloque-tecnico summary {
  cursor: pointer;
  margin-bottom: 0.75rem;
  color: #8fb4d9;
  letter-spacing: 0.5px;
  text-align: center;
}
 
.grid-datos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.6rem;
  align-items: start;
}
 
.tarjeta {
  position: relative;
  padding: 0.6rem 0.75rem 1.9rem;
  background: #131a33;
  border: 1px solid rgba(143, 180, 217, 0.15);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-height: 4.3rem;
}
 
.tarjeta-cabecera {
  text-align: center;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #8bc5ff;
}
 
.tarjeta-valor,
.tarjeta #pais-ciudad {
  margin: 0;
  text-align: left;
  font-size: 1rem;
  font-weight: normal;
  color: #f0e2b8;
  opacity: 1;
  text-align: center;
}
 
.tarjeta-sub,
.tarjeta #ubicacion,
.tarjeta #pais-ciudad {
  margin: 0;
  text-align: center;
  font-size: 0.72rem;
  letter-spacing: 0;
  color: #8fb4d9;
}
 
.tarjeta-ayuda {
  margin: 0.3rem 0 0;
  font-size: 0.72rem;
  line-height: 1.35;
  color: #aebbd0;
}
 
.tarjeta-ayuda {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  z-index: 20;
  width: 220px;
  max-width: 80vw;
  margin: 0;
  padding: 0.6rem 0.75rem;
  transform: translateX(-50%) translateY(4px);
  background: #0b1020;
  border: 1px solid rgba(201, 162, 75, 0.4);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
  line-height: 1.4;
  color: #cddef7;
  text-align: left;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tarjeta:has(.ayuda:hover) .tarjeta-ayuda,
.tarjeta:has(.ayuda:focus) .tarjeta-ayuda {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
 
.ayuda:hover {
  background: rgba(143, 180, 217, 0.15);
}

.tarjeta #ubicacion {
  white-space: pre-line;
}

.tarjeta #pais-ciudad,
.tarjeta #ubicacion {
  margin: 0;
  text-align: center;
  font-size: 1.05rem;
  letter-spacing: 0;
  color: #f0e2b8;
}

.tarjeta-cabecera::before {
  content: "✦";
  margin-right: 0.4rem;
  color: #c9a24b;
}
````

---

## `css\planetas.css`

````css
/* css/planetas.css — sistema solar: órbitas, planetas y cajón derecho */
.orbita-planeta {
  fill: none;
  stroke: #cccccc;
  stroke-width: 1;
  stroke-dasharray: 2 6;
  opacity: 0.1;
}
 
.planeta {
  stroke: rgba(255, 255, 255, 0.4);
  stroke-width: 1;
}
 
.boton-planetas {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 5;
  background: #1a2138;
  color: #f2d27a;
  border: 1px solid #f2d27a;
  padding: 8px 14px;
  font-family: var(--fuente);
  cursor: pointer;
  border-radius: 4px;
}
 
.cajon-planetas {
  flex: 0 0 auto;
  width: 0;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  background: #0f1424;
  border: 0 solid rgba(201, 162, 75, 0.35);
  border-radius: 20px;
  opacity: 0;
  transition: width 0.3s ease, margin-left 0.3s ease, padding 0.3s ease, opacity 0.3s ease;
}
 
.cajon-planetas > * {
  min-width: 260px;
}
 
.cajon-planetas.abierto {
  width: 300px;
  padding: 20px;
  margin-left: 1.5rem;
  border-width: 1px;
  opacity: 1;
}
 
.seccion-planetas {
  color: #cddef7;
  font-family: var(--fuente);
}
 
.seccion-planetas h3 {
  margin: 0 0 8px;
  color: #f2d27a;
}
 
.nota-planetas {
  margin: 0 0 12px;
  font-size: 0.75rem;
  line-height: 1.4;
  color: #8fb4d9;
}
 
.tabla-planetas {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
 
.tabla-planetas th {
  padding-bottom: 6px;
  text-align: right;
  font-weight: normal;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8fb4d9;
}
 
.tabla-planetas th:first-child,
.tabla-planetas td:first-child {
  text-align: left;
}
 
.tabla-planetas td {
  padding: 5px 0;
  border-top: 1px solid rgba(143, 180, 217, 0.12);
}
 
.tabla-planetas td.num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
 
.punto-planeta {
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  margin-right: 0.45rem;
  border-radius: 50%;
}
 
.arco-planetas {
  margin: 12px 0 0;
  font-size: 0.8rem;
  color: #cddef7;
}
 
.arco-planetas strong {
  color: #f0e2b8;
  font-weight: normal;
}
 
@media (max-width: 800px) {
  .cajon-planetas {
    width: auto;
    max-height: 0;
    padding: 0 20px;
  }
 
  .cajon-planetas.abierto {
    width: auto;
    max-height: 700px;
    padding: 20px;
    margin: 1.5rem 0 0;
  }
}
````

---

## `css\reloj.css`

````css
.guia {
  fill: none;
  stroke: #12234a;
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
  font-family: var(--fuente);
  font-size: 32px;
  text-anchor: middle;
  dominant-baseline: central;
}

.marca-minuto {
  stroke: #8fb4d9;
  stroke-width: 1.6;
}

.marca-minuto-quinto {
  stroke-width: 2.1;
}

.numero-minuto {
  fill: #8fb4d9;
  font-size: 28.5px;
}

.numero-minuto-chico {
  fill: #8fb4d9;
  font-size: 25px;
  opacity: 0.5;
}

#sol {
  fill: #ffee07;
}

.aguja-noche {
  stroke: #ffffff;
}

.luna-fondo-oscuro { fill: #2a2f3a; }
.luna-porcion-iluminada { fill: #cfd8e3; }

.guia-zodiaco {
  fill: none;
  stroke: #ffe054;
  stroke-width: 2;

}

.division-zodiaco {
  stroke: #ffe054;
  stroke-width: 2;
}

.etiqueta-zodiaco {
  fill: #ffe054;
  font-family: var(--fuente);
  font-size: 22px;
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
  font-family: var(--fuente);
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

.marca-calendario { stroke: #98999b; stroke-width: 1; opacity: 0.6; }
.marca-mes { stroke-width: 2; opacity: 0.9; }
.marca-dia-quinto { stroke-width: 1.5; }
.etiqueta-mes {
  fill: #ffffff;
  font-family: var(--fuente);
  font-size: 28px;
  text-anchor: middle;
  dominant-baseline: central;
  letter-spacing: 2px;
}
.marcador-calendario { fill: #d94f3d; opacity: 1; }
.marcador-reloj {
  fill: #d94f3d;
  opacity: 1;
}

.orbita-terrestre {
  fill: none;
  stroke: #ffffff;
  stroke-width: 1;
  stroke-dasharray: 4 4;
  opacity: 0.2;
}
.marca-orbital { fill: #ffffff; opacity: 0.125; }
#tierra-orbital { fill: #4f8fd9; stroke: #ffffff; stroke-width: 0.5; }
#sol-central { fill: #ffee07; filter: drop-shadow(0 0 20px #ffcc00); }

.etiqueta-eje {
  fill: #8fb4d9;
  font-family: var(--fuente);
  font-size: 28px;
  dominant-baseline: central;
  letter-spacing: 3px;
}

.caja-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem 2rem;
  padding: 1.1rem 1.5rem;
  background: rgba(7, 17, 38, 0.35);
  border: none;
  border-bottom: 1px solid rgba(143, 180, 217, 0.12);
  border-radius: 0;
  font-family: var(--fuente);
  backdrop-filter: blur(8px);
}

.menu-logo {
  color: #d8c58c;
  letter-spacing: 4px;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.25s ease;
}

.menu-logo:hover {
  color: #f0e2b8;
}

.menu-enlaces {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 2.2rem;
}

.menu-enlaces a {
  position: relative;
  color: #8fb4d9;
  text-decoration: none;
  font-size: 0.95rem;
  transition:
    color 0.25s ease,
    opacity 0.25s ease;
}

.menu-enlaces a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.55rem;
  width: 100%;
  height: 1px;
  background: #8fb4d9;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

.menu-enlaces a:hover {
  color: #dce7f5;
}

.menu-enlaces a:hover::after {
  transform: scaleX(1);
}

.sector-estacion {
  stroke: none;
  fill-opacity: 0.4;
  pointer-events: none;
}
````

---

## `css\tema.css`

````css
/* css/tema.css — variables de color por modo. La página lee siempre estas variables. */
 
/* Tipografías (Google Fonts: Playfair Display; símbolos zodiacales: Segoe UI Symbol) */
:root {
  --fuente: "Playfair Display", Georgia, serif;
  --fuente-simbolos: "Segoe UI Symbol", "Apple Symbols", "Noto Sans Symbols 2", "DejaVu Sans", sans-serif;
}
 
/* Modo día: el azul del diseño */
:root,
[data-tema="dia"] {
  --fondo: radial-gradient(ellipse at 50% 30%, #12234a 0%, #0a1226 55%, #070c1a 100%);
  --panel: rgba(12, 21, 43, 0.9);
  --linea: rgba(143, 180, 217, 0.25);
  --texto: #e6eefc;
  --texto-suave: #a9bbd8; /* contraste ≥ 4.5:1 sobre el fondo */
  --acento: #c9a24b;
  --fondo-traslacion: rgba(3, 7, 18, 0.72); /* disco oscuro tras las órbitas */
}
 
/* Modo noche: por ahora el azul plano de antes. Aquí irá el fondo de la Vía Láctea. */
[data-tema="noche"] {
  --fondo: #0b1020;
  --panel: rgba(8, 13, 28, 0.92);
  --linea: rgba(143, 180, 217, 0.2);
  --texto: #dfe8fa;
  --texto-suave: #9db0cf;
  --acento: #c9a24b;
  --fondo-traslacion: rgba(2, 5, 12, 0.8);
}
 
````

---

## `css\viajero.css`

````css
#contenedor-app {
  display: flex;
  transition: margin-left 0.3s ease;
}

.boton-viajar {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 5; 
  background: #1a2138;
  color: #f2d27a;
  border: 1px solid #f2d27a;
  padding: 8px 14px;
  font-family: var(--fuente);
  cursor: pointer;
  border-radius: 4px;
}

.cajon-viajero {
  flex: 0 0 auto;
  width: 0;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  background: #0f1424;
  border: 0 solid rgba(201, 162, 75, 0.35);
  border-radius: 20px;
  opacity: 0;
  transition: width 0.3s ease, margin-right 0.3s ease, padding 0.3s ease, opacity 0.3s ease;
}

.cajon-viajero > * {
  min-width: 240px;
}

.cajon-viajero.abierto {
  width: 280px;
  padding: 20px;
  margin-right: 1.5rem;
  border-width: 1px;
  opacity: 1;
}

.seccion-viajero {
  color: #cddef7;
  font-family: var(--fuente);
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

@media (max-width: 800px) {
  .fila-reloj {
    flex-direction: column;
  }

  .cajon-viajero {
    width: auto;
    max-height: 0;
    padding: 0 20px;
  }

  .cajon-viajero.abierto {
    width: auto;
    max-height: 700px;
    padding: 20px;
    margin: 0 0 1.5rem;
  }
}
````

---

## `iconos\albaAstro.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M4 18.2h16"/>
  <path d="M6.1 15.5a6.1 6.1 0 0 1 11.8 0"/>
  <path d="M12 3.1v4M6.2 5.4l2.6 2.6M17.8 5.4l-2.6 2.6"/>
  <path d="M3.8 12.2h3M17.2 12.2h3"/>

</svg>

````

---

## `iconos\albaCivil.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M3.5 18.2h17"/>
  <path d="M6.3 15.5a5.9 5.9 0 0 1 11.4 0"/>
  <path d="M12 5.2v3M8 6.9l1.7 1.7M16 6.9l-1.7 1.7"/>
  <path d="M6 12h2M16 12h2"/>
  <path d="M8.2 20.7h7.6"/>

</svg>

````

---

## `iconos\albaNautico.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M4 18.2h16"/>
  <path d="M6.1 15.5a6.1 6.1 0 0 1 11.8 0"/>
  <path d="M12 4.1v3M7.1 6.1l2.1 2.1M16.9 6.1l-2.1 2.1"/>
  <path d="M5.2 10.7h2.4M16.4 10.7h2.4"/>
  <path d="M8.1 20.5h7.8"/>

</svg>

````

---

## `iconos\alturaLuna.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M4 19h16"/>
  <path d="M12 19V7"/>
  <path d="M12 7l-2.2 3.1M12 7l2.2 3.1"/>
  <path d="M15.7 4.1A4.8 4.8 0 1 0 18.4 11a4.7 4.7 0 0 1-2.7-6.9Z"/>

</svg>

````

---

## `iconos\alturaSol.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M4 19h16"/>
  <path d="M12 19V7"/>
  <path d="M12 7l-2.2 3.1M12 7l2.2 3.1"/>
  <path d="M5.2 16.2a8 8 0 0 1 13.6 0"/>
  <path d="M7 13.2h2M15 13.2h2"/>

</svg>

````

---

## `iconos\coordenadas.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="7.4"/>
  <path d="M4.6 12h14.8M12 4.6c2.1 2.2 3.2 4.7 3.2 7.4s-1.1 5.2-3.2 7.4c-2.1-2.2-3.2-4.7-3.2-7.4s1.1-5.2 3.2-7.4Z"/>
  <path d="M12 2.7v2M12 19.3v2M2.7 12h2M19.3 12h2"/>

</svg>

````

---

## `iconos\declinacion.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="7.5"/>
  <path d="M5.5 14.5c2.1-4.3 4.4-6.5 6.9-5.1 2.3 1.3 3.4 4.8 6.1 2.1"/>
  <path d="M12 2.7v18.6"/>
  <path d="M9.2 5.5h5.6M9.2 18.5h5.6"/>

</svg>

````

---

## `iconos\duracion.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="7.5"/>
  <path d="M12 7.2v4.8l3.4 2"/>
  <path d="M12 2.3v1.7M12 20v1.7M2.3 12H4M20 12h1.7M5.2 5.2l1.2 1.2M17.6 17.6l1.2 1.2M18.8 5.2l-1.2 1.2M6.4 17.6l-1.2 1.2"/>

</svg>

````

---

## `iconos\ecuacion.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M4 16.8c2.2-7.4 4.2-9.8 6.5-7.2 2.2 2.4 3.2 5.2 5.3 3.7 1.5-1.1 2.6-3.1 4.2-6"/>
  <path d="M5 20h14"/>
  <path d="M7 4v3M17 17v3"/>

</svg>

````

---

## `iconos\edadLunar.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="7.7"/>
  <path d="M12 4.3v3.2M12 16.5v3.2M4.3 12h3.2M16.5 12h3.2"/>
  <path d="M8.4 8.5a5 5 0 0 1 7.1 7.1"/>
  <path d="M8.1 15.9a5 5 0 0 1-.1-7.8"/>

</svg>

````

---

## `iconos\estacion.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="2.5"/>
  <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"/>
  <path d="M12 8.4v7.2M8.4 12h7.2"/>

</svg>

````

---

## `iconos\fase.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M15.7 4.1A7.9 7.9 0 1 0 19.9 16 7.8 7.8 0 0 1 15.7 4.1Z"/>
  <path d="M7.5 17.1c1.2.8 2.7 1.2 4.2 1.2"/>

</svg>

````

---

## `iconos\fecha.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <rect x="4" y="5.5" width="16" height="15" rx="1.7"/>
  <path d="M7.5 3.5v4M16.5 3.5v4M4 9h16"/>
  <path d="M8 12.5h.01M12 12.5h.01M16 12.5h.01M8 16.5h.01M12 16.5h.01M16 16.5h.01"/>

</svg>

````

---

## `iconos\horaSolar.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="7.2"/>
  <path d="M12 6.2v5.8l3.7 2.2"/>
  <path d="M12 2.5v1.5M12 20v1.5M2.5 12H4M20 12h1.5"/>
  <path d="M5.3 5.3l1.1 1.1M17.6 17.6l1.1 1.1M18.7 5.3l-1.1 1.1M6.4 17.6l-1.1 1.1"/>

</svg>

````

---

## `iconos\huso.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="7.8"/>
  <path d="M12 4.2v7.8l4.5 2.8"/>
  <path d="M8 3.8c-1.5 2-2.3 4.8-2.3 8.2s.8 6.2 2.3 8.2M16 3.8c1.5 2 2.3 4.8 2.3 8.2s-.8 6.2-2.3 8.2"/>
  <path d="M4.8 8.1h14.4M4.8 15.9h14.4"/>

</svg>

````

---

## `iconos\lugar.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M12 21s6.2-6.2 6.2-11.2A6.2 6.2 0 1 0 5.8 9.8C5.8 14.8 12 21 12 21Z"/>
  <circle cx="12" cy="9.5" r="2.1"/>

</svg>

````

---

## `iconos\mediodia.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="11" r="3.2"/>
  <path d="M12 2.5v3M12 16.5v3M3.5 11h3M17.5 11h3M6 5l2.1 2.1M15.9 14.9 18 17M18 5l-2.1 2.1M8.1 14.9 6 17"/>
  <path d="M5 21h14"/>

</svg>

````

---

## `iconos\ocasoAstro.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M4 18.2h16"/>
  <path d="M6.1 15.5a6.1 6.1 0 0 1 11.8 0"/>
  <path d="M12 20.9v-4M6.2 18.6l2.6-2.6M17.8 18.6l-2.6-2.6"/>
  <path d="M3.8 12.2h3M17.2 12.2h3"/>

</svg>

````

---

## `iconos\ocasoCivil.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M3.5 18.2h17"/>
  <path d="M6.3 15.5a5.9 5.9 0 0 1 11.4 0"/>
  <path d="M12 19.8v-3M8 18.1l1.7-1.7M16 18.1l-1.7-1.7"/>
  <path d="M6 13h2M16 13h2"/>
  <path d="M8.2 20.7h7.6"/>

</svg>

````

---

## `iconos\ocasoNautico.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M4 18.2h16"/>
  <path d="M6.1 15.5a6.1 6.1 0 0 1 11.8 0"/>
  <path d="M12 19.9v-3M7.1 17.9l2.1-2.1M16.9 17.9l-2.1-2.1"/>
  <path d="M5.2 13.3h2.4M16.4 13.3h2.4"/>
  <path d="M8.1 20.5h7.8"/>

</svg>

````

---

## `iconos\puesta.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M3.5 17.8h17"/>
  <path d="M6.2 15.2a6 6 0 0 1 11.6 0"/>
  <path d="M12 20v-5.2M7 17.9l2.2-2.2M17 17.9l-2.2-2.2"/>
  <path d="M4.7 13.3h3M17.3 13.3h2"/>

</svg>

````

---

## `iconos\salida.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <path d="M3.5 17.8h17"/>
  <path d="M6.2 15.2a6 6 0 0 1 11.6 0"/>
  <path d="M12 4v5.2M7 6.1l2.2 2.2M17 6.1l-2.2 2.2M4.7 10.7h3"/>
  <path d="M17.3 10.7h2"/>

</svg>

````

---

## `iconos\signo.svg`

````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
    fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="12" r="7.6"/>
  <path d="M7.2 8.4c1.3-1.4 3.1-2.2 5.1-2.2 2.1 0 3.7.7 4.6 1.8"/>
  <path d="M8.1 15.7c1.2 1.3 2.7 2 4.5 2 1.8 0 3.3-.6 4.4-1.9"/>
  <path d="M12 4.4v2M12 17.6v2"/>

</svg>

````

---

## `scripts\astronomia.js`

````javascript
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
    longitudMedia + 1.915 * Math.sin(anomaliaRad) + 0.02 * Math.sin(2 * anomaliaRad)
  );
  const longEclipticaRad = (longitudEcliptica * Math.PI) / 180;
  const oblicuidadRad = (OBLICUIDAD * Math.PI) / 180;

  const declinacion =
    (Math.asin(Math.sin(oblicuidadRad) * Math.sin(longEclipticaRad)) * 180) / Math.PI;

  const ascensionRecta =
    (Math.atan2(
      Math.cos(oblicuidadRad) * Math.sin(longEclipticaRad),
      Math.cos(longEclipticaRad)
    ) *
      180) /
    Math.PI;

    return { longitudEcliptica, declinacion, ascensionRecta: normalizarGrados(ascensionRecta) };
}

function horaSideral(fecha, longitudGeografica) {
  const d = diasJuliano(fecha);
  const gmst = normalizarGrados(280.46061837 + 360.98564736629 * d);
  return normalizarGrados(gmst + longitudGeografica);
}

function posicionSolarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionSolar(fecha);
  const anguloHorario = normalizarGrados(horaSideral(fecha, longitudGeografica) - ascensionRecta);

  const latRad = (latitud * Math.PI) / 180;
  const decRad = (declinacion * Math.PI) / 180;
  const haRad = (anguloHorario * Math.PI) / 180;

  const altura =
    (Math.asin(
      Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad)
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
  return ((diferencia % PERIODO_SINODICO) + PERIODO_SINODICO) % PERIODO_SINODICO;
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
  const argumentoLatitud = normalizarGrados(93.272 + 13.229350 * d);

  const anomaliaRad = (anomaliaMedia * Math.PI) / 180;
  const latitudRad = (argumentoLatitud * Math.PI) / 180;

  const longitudEcliptica = normalizarGrados(longitudMedia + 6.289 * Math.sin(anomaliaRad));
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
        Math.cos(latRad) * Math.sin(oblicuidadRad) * Math.sin(lonRad)
    ) *
      180) /
    Math.PI;

  const y = Math.sin(lonRad) * Math.cos(oblicuidadRad) - Math.tan(latRad) * Math.sin(oblicuidadRad);
  const x = Math.cos(lonRad);
  const ascensionRecta = normalizarGrados((Math.atan2(y, x) * 180) / Math.PI);

  return { declinacion, ascensionRecta };
}

function posicionLunarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionLunarEcuatorial(fecha);
  const anguloHorario = normalizarGrados(horaSideral(fecha, longitudGeografica) - ascensionRecta);

  const latRad = (latitud * Math.PI) / 180;
  const decRad = (declinacion * Math.PI) / 180;
  const haRad = (anguloHorario * Math.PI) / 180;

  const altura =
    (Math.asin(
      Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad)
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
````

---

## `scripts\calendario.js`

````javascript
// scripts/calendario.js

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

const CALENDARIO = {
  anillo: 780,        // aro exterior: las marcas salen hacia afuera
  largoDia: 10,
  largoQuinto: 14,
  largoMes: 20,
  radioEtiqueta: 760,
  radioDigitos: 830,
  pasoDigitos: 5,
};

function esBisiesto(anio) {
  return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}

function diasEnAnio(anio) {
  return esBisiesto(anio) ? 366 : 365;
}

const DIAS_POR_MES = [31,28,31,30,31,30,31,31,30,31,30,31];

function diasEnMes(anio, mesIndex) {
  if (mesIndex === 1) return esBisiesto(anio) ? 29 : 28;
  return DIAS_POR_MES[mesIndex];
}

function diaDelAnio(fecha) {
  const inicioAnio = new Date(fecha.getFullYear(), 0, 1);
  return Math.floor((fecha - inicioAnio) / 86400000);
}

function anguloCalendario(fecha) {
  const p = aHoraDePared(fecha);
  const N = diasEnAnio(p.getUTCFullYear());
  return normalizarGrados(-(diaDelAnioFraccional(p) / N) * 360);
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
  path.setAttribute("d", `M ${p1.x} ${p1.y} A ${radio} ${radio} 0 0 ${sweep} ${p2.x} ${p2.y}`);
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

  etiquetasCalendario.push({ elemento: grupo, path: path, radio: radio, medio: anguloMedio });

  return grupo;
}

function crearDigitoCalendario(dia, grados) {
  const p = polar(CALENDARIO.radioDigitos, grados);
  const texto = document.createElementNS(SVG_NS, "text");
  texto.setAttribute("x", p.x);
  texto.setAttribute("y", p.y);
  texto.setAttribute("transform", `rotate(${grados} ${p.x} ${p.y})`);
  texto.setAttribute("class", "digito-calendario");
  texto.textContent = dia;
  return texto;
}

function dibujarCalendario(anio) {
  etiquetasCalendario.length = 0;
  const capa = document.getElementById("capa-calendario");
  capa.innerHTML = "";

  const anioObjetivo = anio || aHoraDePared(obtenerFechaActual()).getUTCFullYear();

  for (let mes = 0; mes < 12; mes++) {
    const anguloInicio = anguloDeInicioDeMes(anioObjetivo, mes);
    const dias = diasEnMes(anioObjetivo, mes);
    const anchoMes = (dias / diasEnAnio(anioObjetivo)) * 360;

    capa.appendChild(crearMarcaCalendario(anguloInicio, CALENDARIO.anillo, CALENDARIO.anillo + CALENDARIO.largoMes, "marca-calendario marca-mes"));

    const anguloMedio = anguloInicio + anchoMes / 2;
    capa.appendChild(crearEtiquetaMesCurva(MESES[mes], anguloMedio, CALENDARIO.radioEtiqueta));

    for (let dia = 1; dia <= dias; dia++) {
      const anguloDia = anguloInicio + ((dia - 1) / dias) * anchoMes;
      const esQuinto = dia % 5 === 0 || dia === 1;
      const largo = esQuinto ? CALENDARIO.largoQuinto : CALENDARIO.largoDia;
      capa.appendChild(crearMarcaCalendario(anguloDia, CALENDARIO.anillo, CALENDARIO.anillo + largo, esQuinto ? "marca-calendario marca-dia-quinto" : "marca-calendario marca-dia"));
      if (dia === 1 || dia % CALENDARIO.pasoDigitos === 0) {
        capa.appendChild(crearDigitoCalendario(dia, anguloDia + anchoMes / dias / 2));
      }
    }
  }
}

function dibujarMarcadorCalendario() {
  const capa = document.getElementById("capa-marcador-calendario");
  const radioPunta = CALENDARIO.anillo + CALENDARIO.largoMes + 4;
  const punta = polar(radioPunta, 0);
  const baseIzq = polar(radioPunta + 18, -0.8);
  const baseDer = polar(radioPunta + 18, 0.8);
  const marcador = document.createElementNS(SVG_NS, "polygon");
  marcador.setAttribute("points", `${punta.x},${punta.y} ${baseIzq.x},${baseIzq.y} ${baseDer.x},${baseDer.y}`);
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

    path.setAttribute("d", `M ${p1.x} ${p1.y} A ${radio} ${radio} 0 0 ${sweep} ${p2.x} ${p2.y}`);
  });
}
````

---

## `scripts\constelaciones.js`

````javascript
// scripts/constelaciones.js
// Aro de las 12 constelaciones del zodiaco, fuera del calendario (radios ~850–990).
// Cada constelación ocupa el tramo de fechas en que el Sol pasa REALMENTE por delante de ella
// (límites oficiales de la UAI), que no coincide con los signos tropicales de 30°: las duraciones
// son desiguales (Escorpio ~7 días, Virgo ~44). El Sol también cruza Ofiuco (30 nov – 18 dic),
// que no es de las 12 y queda como hueco entre Escorpio y Sagitario.
// Rota junto con el calendario. Dibujos: constelaciones/<clave>.svg (si no existe, un comodín).
// Depende de: astronomia.js, planetas.js (precesión), calendario.js, marco.js, hora-local.js
 
const ANILLO_CONSTELACIONES = {
  radioArco: 900,
  radioGlifo: 845,
  tamanoGlifo: 64,
  radioNombre: 917,
};
 
// Límites en longitud eclíptica J2000 (grados), verificados con astropy (get_constellation)
const CONSTELACIONES = [
  { clave: "aries", nombre: "Aries", desde: 28.69, hasta: 53.41 },
  { clave: "tauro", nombre: "Tauro", desde: 53.41, hasta: 90.14 },
  { clave: "geminis", nombre: "Géminis", desde: 90.14, hasta: 117.99 },
  { clave: "cancer", nombre: "Cáncer", desde: 117.99, hasta: 138.04 },
  { clave: "leo", nombre: "Leo", desde: 138.04, hasta: 173.85 },
  { clave: "virgo", nombre: "Virgo", desde: 173.85, hasta: 217.81 },
  { clave: "libra", nombre: "Libra", desde: 217.81, hasta: 241.06 },
  { clave: "escorpio", nombre: "Escorpio", desde: 241.06, hasta: 247.63 },
  { clave: "sagitario", nombre: "Sagitario", desde: 266.24, hasta: 299.65 },
  { clave: "capricornio", nombre: "Capricornio", desde: 299.65, hasta: 327.48 },
  { clave: "acuario", nombre: "Acuario", desde: 327.48, hasta: 351.66 },
  { clave: "piscis", nombre: "Piscis", desde: 351.66, hasta: 28.69 },
];
 
// ── Cálculo de fechas ──────────────────────────────────────────
// Longitud del Sol (equinoccio J2000) al mediodía UTC de cada día; se "desenrolla" para que crezca sin saltos
function longitudesSolaresDelAnio(anio) {
  const N = diasEnAnio(anio);
  const lam = [];
  let previo = null;
  let vueltas = 0;
  for (let i = 0; i <= N; i++) {
    const fecha = new Date(Date.UTC(anio, 0, 1 + i, 12));
    const l = normalizarGrados(
      posicionSolar(fecha).longitudEcliptica - PRECESION_GRADOS_POR_SIGLO * siglosDesdeJ2000(fecha),
    );
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
  });
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
}
 
````

---

## `scripts\efemerides-solares.js`

````javascript
// scripts/efemerides-solares.js
// Efemérides del día EN EL LUGAR activo (horas como instantes reales, en ms).
// Precisión ~±1-2 min (barrido de 1 min con interpolación lineal).
// Depende de: hora-local.js, astronomia.js, ubicacion.js
 
const UMBRALES_SOLARES = {
  salida: -0.833, // borde del disco + refracción
  civil: -6,
  nautico: -12,
  astronomico: -18,
};
 
// Cambia cuando cambia el día de pared, el huso o el lugar
function claveDiaYLugar(ahora) {
  const p = aHoraDePared(ahora);
  return `${p.getUTCFullYear()}-${p.getUTCMonth()}-${p.getUTCDate()}|${husoDelLugar(ahora)}|${ubicacion.latitud}|${ubicacion.longitud}`;
}
 
function calcularEfemeridesSolares(ahora) {
  const inicio = medianocheLocal(ahora).getTime();
  const alturas = [];
  for (let m = 0; m <= 1440; m++) {
    alturas.push(
      posicionSolarHorizonte(
        new Date(inicio + m * 60000),
        ubicacion.latitud,
        ubicacion.longitud,
      ).altura,
    );
  }
 
  const cruce = (umbral, ascendente) => {
    for (let m = 0; m < 1440; m++) {
      const a = alturas[m];
      const b = alturas[m + 1];
      const cruza = ascendente
        ? a < umbral && b >= umbral
        : a >= umbral && b < umbral;
      if (cruza) return inicio + (m + (umbral - a) / (b - a)) * 60000;
    }
    return null;
  };
 
  const max = Math.max(...alturas);
  const min = Math.min(...alturas);
  const umbral = UMBRALES_SOLARES.salida;
  const resultado = {
    estado: min > umbral ? "sol-medianoche" : max < umbral ? "noche-polar" : "normal",
    mediodia: inicio + alturas.indexOf(max) * 60000,
    alba: {},
    ocaso: {},
  };
  for (const [nombre, u] of Object.entries(UMBRALES_SOLARES)) {
    resultado.alba[nombre] = cruce(u, true);
    resultado.ocaso[nombre] = cruce(u, false);
  }
  return resultado;
}
 
// Hora solar verdadera en horas decimales (12 = Sol en el meridiano)
function horaSolarVerdadera(instante) {
  const { ascensionRecta } = posicionSolar(instante);
  const ha = normalizarGrados(
    horaSideral(instante, ubicacion.longitud) - ascensionRecta,
  );
  return (12 + ha / 15) % 24;
}
 
// Diferencia (minutos) entre el Sol verdadero y el Sol medio
function ecuacionDelTiempoMin(instante) {
  const msDia = 86400000;
  const utc = (((instante.getTime() % msDia) + msDia) % msDia) / 3600000;
  const media = (((utc + ubicacion.longitud / 15) % 24) + 24) % 24;
  const d = ((((horaSolarVerdadera(instante) - media + 12) % 24) + 24) % 24) - 12;
  return d * 60;
}
````

---

## `scripts\enfoque-capas.js`

````javascript
// scripts/enfoque-capas.js
// Los botones del menú oscurecen todas las capas menos las elegidas.
// "Astrolabio" (clave "todas") las muestra todas.
// Para cambiar qué capas pertenecen a cada botón, edita ENFOQUES.
 
const CAPAS_SIEMPRE_VISIBLES = ["capa-fija", "capa-fija-ejes", "capa-fondo-traslacion"];
 
const ENFOQUES = {
  reloj: ["capa-marco", "capa-minuto", "capa-segundo", "capa-hora", "capa-marcadores-reloj"],
  "dia-noche": ["capa-eventos-solares", "capa-sol", "capa-luna"],
  zodiaco: ["capa-zodiaco", "capa-indicador-zodiaco", "capa-referencias-estacionales", "capa-marcador-estacional", "capa-tropicos", "capa-constelaciones"],
  calendario: ["capa-calendario", "capa-marcador-calendario", "capa-estaciones"],
  "sistema-solar": ["capa-orbita-terrestre", "capa-orbitas-planetarias", "capa-planetas", "capa-sol-central"],
};
 
function aplicarEnfoque(clave) {
  const svg = document.getElementById("reloj");
  const ids = ENFOQUES[clave];
  svg.querySelectorAll(":scope > g").forEach((g) => g.classList.remove("capa-enfocada"));
  [...svg.classList]
    .filter((c) => c.startsWith("enfoque-"))
    .forEach((c) => svg.classList.remove(c));
  svg.classList.toggle("enfocando", Boolean(ids));
  if (!ids) return;
  svg.classList.add(`enfoque-${clave}`); // permite estilos propios por enfoque (dígitos, escala...)
  [...ids, ...CAPAS_SIEMPRE_VISIBLES].forEach((id) => {
    const capa = document.getElementById(id);
    if (capa) capa.classList.add("capa-enfocada");
  });
}
 
function inicializarNavegacionCapas() {
  const botones = document.querySelectorAll(".nav-capas button");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((b) => b.classList.toggle("activa", b === boton));
      aplicarEnfoque(boton.dataset.enfoque);
    });
  });
}
 
inicializarNavegacionCapas();
 
````

---

## `scripts\estado-tiempo.js`

````javascript
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
````

---

## `scripts\eventos-solares.js`

````javascript
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
 
  // Medianoche (00:00 de pared) del día en curso EN EL LUGAR activo, como instante real
  const inicioDelDia = medianocheLocal(obtenerFechaActual()).getTime();
 
  sectoresEventosSolares.forEach(({ path, minutoMedio }) => {
    const fechaMinuto = new Date(inicioDelDia + minutoMedio * 60000);
    const { altura } = posicionSolarHorizonte(
      fechaMinuto,
      ubicacion.latitud,
      ubicacion.longitud,
    );
    path.style.fill = colorPorAltura(altura);
  });
}
 
// Redibuja el anillo solo cuando cambia algo que lo afecta:
// el día de pared, el huso o la ubicación (reemplaza al setInterval de 60 s).
let claveEventosSolares = null;
 
function actualizarEventosSolaresSiCambio(ahora) {
  if (ubicacion.latitud === null) return;
  const p = aHoraDePared(ahora);
  const clave = `${p.getUTCFullYear()}-${p.getUTCMonth()}-${p.getUTCDate()}|${husoDelLugar(ahora)}|${ubicacion.latitud}|${ubicacion.longitud}`;
  if (clave === claveEventosSolares) return;
  claveEventosSolares = clave;
  dibujarEventosSolares();
}
````

---

## `scripts\fase-lunar.js`

````javascript
// scripts/fase-lunar.js

function construirPathFaseLunar(radio, fraccion, esCreciente) {
  const R = radio;
  const rx = R * Math.abs(1 - 2 * fraccion);
  const sweepExterior = esCreciente ? 1 : 0;
  const sweepTerminador = fraccion < 0.5 ? (esCreciente ? 0 : 1) : (esCreciente ? 1 : 0);
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
    lit.setAttribute("d", construirPathFaseLunar(RADIO_DISCO, fraccion, esCreciente));
    lit.style.fill = colorLunarPorEclipse(factorEclipse);
    capa.appendChild(lit);
  }
}

function colorLunarPorEclipse(factor) {
  const normal = [207, 216, 227];   // #cfd8e3, color lunar normal
  const totalidad = [140, 40, 30];  // rojizo, "luna de sangre"
  const mezcla = normal.map((v, i) => Math.round(v + factor * (totalidad[i] - v)));
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
````

---

## `scripts\hora-local.js`

````javascript
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
````

---

## `scripts\hora.js`

````javascript
function dosDigitos(n) {
  return String(n).padStart(2, "0");
}

function minutosDelDia(fecha) {
  const p = aHoraDePared(fecha);
  return (
    p.getUTCHours() * 60 +
    p.getUTCMinutes() +
    p.getUTCSeconds() / 60 +
    p.getUTCMilliseconds() / 60000
  );
}

function anguloDeLaHora(fecha) {
  return minutosDelDia(fecha) / 4 - 180;
}

function textoDeLaHora(fecha) {
  const p = aHoraDePared(fecha);
  return `${dosDigitos(p.getUTCHours())}:${dosDigitos(p.getUTCMinutes())}:${dosDigitos(p.getUTCSeconds())}`;
}

function anguloDelMinuto(fecha) {
  const p = aHoraDePared(fecha);
  return (p.getUTCMinutes() + p.getUTCSeconds() / 60 + p.getUTCMilliseconds() / 60000) * 6;
}

function anguloDelSegundo(fecha) {
  const p = aHoraDePared(fecha);
  return (p.getUTCSeconds() + p.getUTCMilliseconds() / 1000) * 6;
}

function crearPoligonoMarcadorReloj(radioPunta, radioBase, semiAnchoGrados, clase, id) {
  const punta = polar(radioPunta, 0);
  const baseIzq = polar(radioBase, -semiAnchoGrados);
  const baseDer = polar(radioBase, semiAnchoGrados);
  const marcador = document.createElementNS(SVG_NS, "polygon");
  marcador.setAttribute("points", `${punta.x},${punta.y} ${baseIzq.x},${baseIzq.y} ${baseDer.x},${baseDer.y}`);
  marcador.setAttribute("class", clase);
  if (id) marcador.setAttribute("id", id);
  return marcador;
}

function dibujarMarcadoresReloj() {
  const capa = document.getElementById("capa-marcadores-reloj");
  if (!capa) return null;
  capa.innerHTML = "";

  const marcadorHora = crearPoligonoMarcadorReloj(600, 630, 1.7, "marcador-reloj marcador-reloj-hora", "marcador-hora");
  const marcadorMinuto = crearPoligonoMarcadorReloj(600, 620, 1.3, "marcador-reloj marcador-reloj-minuto", "marcador-minuto");
  const marcadorSegundo = crearPoligonoMarcadorReloj(600, 620, 1, "marcador-reloj marcador-reloj-segundo", "marcador-segundo");

  capa.appendChild(marcadorHora);
  capa.appendChild(marcadorMinuto);
  capa.appendChild(marcadorSegundo);

  return { marcadorHora, marcadorMinuto, marcadorSegundo };
}


````

---

## `scripts\indicador-zodiaco.js`

````javascript
// scripts/indicador-zodiaco.js

const RADIO_ZODIACO_INTERNO = 260; // debe coincidir con el círculo guía interno en index.html

function radioActualDelZodiaco(radioLocal, anguloRotacion) {
  const e = 600 - CENTRO_ZODIACO_Y;
  const A = (anguloRotacion * Math.PI) / 180;
  return e * Math.cos(A) + Math.sqrt(radioLocal * radioLocal - (e * Math.sin(A)) ** 2);
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

  const puntoExtInicio = rotarPunto(polarZodiaco(RADIO_ZODIACO, inicioLocal), anguloRotacion);
  const puntoExtFin = rotarPunto(polarZodiaco(RADIO_ZODIACO, finLocal), anguloRotacion);
  const puntoIntFin = rotarPunto(polarZodiaco(RADIO_ZODIACO_INTERNO, finLocal), anguloRotacion);
  const puntoIntInicio = rotarPunto(polarZodiaco(RADIO_ZODIACO_INTERNO, inicioLocal), anguloRotacion);

  const d = `M ${puntoExtInicio.x} ${puntoExtInicio.y} A ${RADIO_ZODIACO} ${RADIO_ZODIACO} 0 0 1 ${puntoExtFin.x} ${puntoExtFin.y} L ${puntoIntFin.x} ${puntoIntFin.y} A ${RADIO_ZODIACO_INTERNO} ${RADIO_ZODIACO_INTERNO} 0 0 0 ${puntoIntInicio.x} ${puntoIntInicio.y} Z`;

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);
  path.setAttribute("class", "indicador-zodiaco");
  capa.appendChild(path);
}
````

---

## `scripts\main.js`

````javascript
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
  actualizarEventosSolaresSiCambio(ahora);
  actualizarPanelResultados(ahora);
  actualizarPanelPlanetas(ahora);
 
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
 
  const anioActual = aHoraDePared(ahora).getUTCFullYear();
  if (anioActual !== anioCalendarioDibujado) {
    dibujarCalendario(anioActual);
    anioCalendarioDibujado = anioActual;
  }
  const anguloCal = anguloCalendario(ahora);
  capaCalendario.setAttribute("transform", `rotate(${anguloCal} 600 600)`);
  actualizarAnilloEstaciones(ahora, anguloCal);
  actualizarConstelaciones(ahora, anguloCal);
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
 
  const pared = aHoraDePared(ahora);
  const fechaFormateada = `${dosDigitos(pared.getUTCDate())}/${dosDigitos(pared.getUTCMonth() + 1)}/${pared.getUTCFullYear()}`;
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
  textoUbicacion.textContent = `${latStr}\n${lonStr}`;
 
  if (u.ciudad || u.pais) {
    const partes = [u.ciudad, u.pais].filter(Boolean);
    textoPaisCiudad.textContent = partes.join(", ");
  } else {
    textoPaisCiudad.textContent = "";
  }
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


````

---

## `scripts\marco.js`

````javascript
const SVG_NS = "http://www.w3.org/2000/svg";
const CENTRO = 600;
const NUMEROS_ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

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
    const clase = esQuinto ? "marca-minuto marca-minuto-quinto" : "marca-minuto";
    capa.appendChild(crearMarca(grados, MARCO.base, esQuinto ? MARCO.minutoQuintoFin : MARCO.minutoMenorFin, clase));

    if (esQuinto) {
      const etiqueta = minuto === 0 ? 60 : minuto;
      capa.appendChild(crearNumero(etiqueta, grados, MARCO.numeroMinutoQuinto, "numero numero-minuto"));
    } else {
      capa.appendChild(crearNumero(minuto, grados, MARCO.numeroMinutoMenor, "numero numero-minuto-chico"));
    }
  }
}

function dibujarMarco() {
  const capa = document.getElementById("capa-marco");
  for (let hora = 0; hora < 24; hora++) {
    const grados = hora * 15 - 180;
    const esCardinal = hora % 6 === 0;
    capa.appendChild(crearMarca(grados, MARCO.horaInicio, esCardinal ? MARCO.horaCardinalFin : MARCO.horaFin));
    capa.appendChild(crearNumero(NUMEROS_ROMANOS[(hora + 11) % 12], grados, MARCO.numeroRomano));
  }
  dibujarMinutos(capa);
}
````

---

## `scripts\panel-planetas.js`

````javascript
// scripts/panel-planetas.js
// Cajón derecho "Sistema solar": tabla con los datos reales de cada planeta.
// Se construye al cargar y se actualiza ~2 veces por segundo mientras está abierto.
 
const filasPlanetas = {}; // nombre -> { distancia, longitud }
let ultimoRefrescoPlanetas = 0;
 
function textoPeriodo(anios) {
  if (anios < 1) return `${Math.round(anios * 365.25)} d`;
  return `${anios.toFixed(anios < 10 ? 2 : 1).replace(".", ",")} a`;
}
 
function construirTablaPlanetas() {
  const cuerpo = document.getElementById("tabla-planetas-cuerpo");
  if (!cuerpo) return;
  PLANETAS.forEach((p) => {
    const fila = document.createElement("tr");
    fila.innerHTML =
      `<td><span class="punto-planeta" style="background:${p.color}"></span>${p.nombre}</td>` +
      `<td class="num"></td><td class="num"></td><td class="num">${textoPeriodo(p.periodo)}</td>`;
    cuerpo.appendChild(fila);
    const celdas = fila.querySelectorAll("td");
    filasPlanetas[p.nombre] = { distancia: celdas[1], longitud: celdas[2] };
  });
}
 
// Arco mínimo (°) que contiene a todas las longitudes: menor = más alineados
function arcoQueAbarcan(longitudes) {
  const orden = [...longitudes].sort((a, b) => a - b);
  let mayorHueco = 360 - orden[orden.length - 1] + orden[0];
  for (let i = 1; i < orden.length; i++) {
    mayorHueco = Math.max(mayorHueco, orden[i] - orden[i - 1]);
  }
  return 360 - mayorHueco;
}
 
function actualizarPanelPlanetas(ahora) {
  const cajon = document.getElementById("cajon-planetas");
  if (!cajon || !cajon.classList.contains("abierto")) return;
  const t = performance.now();
  if (t - ultimoRefrescoPlanetas < 500) return;
  ultimoRefrescoPlanetas = t;
 
  const longitudes = [];
  PLANETAS.forEach((p) => {
    const pos = posicionHeliocentrica(p, ahora);
    longitudes.push(pos.longitud);
    const fila = filasPlanetas[p.nombre];
    fila.distancia.textContent = pos.distancia.toFixed(3).replace(".", ",");
    fila.longitud.textContent = `${pos.longitud.toFixed(1).replace(".", ",")}°`;
  });
  document.getElementById("arco-planetas").textContent =
    `${arcoQueAbarcan(longitudes).toFixed(0)}°`;
}
 
function inicializarCajonPlanetas() {
  const boton = document.getElementById("boton-planetas");
  const cajon = document.getElementById("cajon-planetas");
  if (!boton || !cajon) return;
  boton.addEventListener("click", () => {
    cajon.classList.toggle("abierto");
    ultimoRefrescoPlanetas = 0; // refresca de inmediato al abrir
  });
}
 
construirTablaPlanetas();
inicializarCajonPlanetas();
````

---

## `scripts\panel-resultados.js`

````javascript
// scripts/panel-resultados.js
// Panel "Resultados actuales" — fase 1. Construye las tarjetas al cargar
// (antes de main.js, que escribe en #pais-ciudad y #ubicacion) y las actualiza ~2 veces por segundo.
 
const DIAS_SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const FASES_LUNARES = ["Luna nueva", "Creciente", "Cuarto creciente", "Gibosa creciente", "Luna llena", "Gibosa menguante", "Cuarto menguante", "Menguante"];
const ESTACIONES = ["Primavera", "Verano", "Otoño", "Invierno"];
 
// g: civil | astro — k: clave — t: título — a: ayuda didáctica
// Iconos: basta guardar iconos/<clave>.svg (clave = k). Opcional: icono: "otra/ruta.svg". Sin archivo se muestra ✦.
const TARJETAS = [
  { g: "civil", k: "lugar", t: "Lugar", a: "Ciudad y país del lugar que el reloj está usando." },
  { g: "civil", k: "coordenadas", t: "Coordenadas", a: "Latitud: distancia al ecuador (+ norte, − sur). Longitud: distancia al meridiano de Greenwich (+ este, − oeste)." },
  { g: "civil", k: "fecha", t: "Fecha", a: "Día de la semana y fecha en el lugar activo, con el número de día dentro del año." },
  { g: "civil", k: "huso", t: "Huso horario", a: "Diferencia entre la hora del lugar y la hora universal (GMT/UTC). En ubicación manual se estima por longitud (15° = 1 hora)." },
  { g: "civil", k: "salida", t: "Salida del Sol", a: "Momento en que el borde superior del Sol asoma en el horizonte." },
  { g: "civil", k: "puesta", t: "Puesta del Sol", a: "Momento en que el Sol termina de ocultarse bajo el horizonte." },
  { g: "civil", k: "duracion", t: "Duración del día", a: "Tiempo entre la salida y la puesta del Sol. Cambia a lo largo del año según la latitud." },
  { g: "civil", k: "fase", t: "Fase lunar", a: "Qué parte del disco lunar está iluminada vista desde la Tierra." },
  { g: "civil", k: "signo", t: "Signo solar", a: "Sector de 30° de la eclíptica donde está el Sol, contado desde el equinoccio de marzo (zodiaco tropical). No coincide con la constelación visible: por la precesión de los equinoccios, hoy los signos están desfasados unos 24° respecto a las constelaciones del mismo nombre." },
  { g: "civil", k: "estacion", t: "Estación", a: "Estación astronómica según la posición del Sol en la eclíptica y el hemisferio del lugar." },
  { g: "astro", k: "albaAstro", t: "Alba astronómica", a: "Sol a 18° bajo el horizonte: empieza a clarear el cielo, todavía casi noche cerrada." },
  { g: "astro", k: "albaNautico", t: "Alba náutica", a: "Sol a 12° bajo el horizonte: se distingue el horizonte marino y las estrellas más brillantes." },
  { g: "astro", k: "albaCivil", t: "Alba civil", a: "Sol a 6° bajo el horizonte: hay luz suficiente para actividades al aire libre sin luz artificial." },
  { g: "astro", k: "mediodia", t: "Mediodía solar", a: "Instante en que el Sol alcanza su altura máxima del día (cruza el meridiano local)." },
  { g: "astro", k: "ocasoCivil", t: "Ocaso civil", a: "Sol a 6° bajo el horizonte tras la puesta: termina la luz útil del día." },
  { g: "astro", k: "ocasoNautico", t: "Ocaso náutico", a: "Sol a 12° bajo el horizonte: el horizonte marino ya no se distingue." },
  { g: "astro", k: "ocasoAstro", t: "Ocaso astronómico", a: "Sol a 18° bajo el horizonte: comienza la noche astronómica, ideal para observar estrellas." },
  { g: "astro", k: "horaSolar", t: "Hora solar verdadera", a: "La hora que marcaría un reloj de sol: 12:00 cuando el Sol cruza el meridiano. Difiere de la hora civil por el huso y por la ecuación del tiempo." },
  { g: "astro", k: "ecuacion", t: "Ecuación del tiempo", a: "Diferencia entre el Sol real y un Sol ideal de movimiento uniforme, causada por la órbita elíptica y la inclinación del eje terrestre." },
  { g: "astro", k: "alturaSol", t: "Altura del Sol", a: "Ángulo del Sol sobre el horizonte: 0° es el horizonte, 90° el cenit; negativo = bajo el horizonte." },
  { g: "astro", k: "alturaLuna", t: "Altura de la Luna", a: "Ángulo de la Luna sobre el horizonte; negativo = bajo el horizonte." },
  { g: "astro", k: "declinacion", t: "Declinación solar", a: "Latitud celeste del Sol: +23,4° en el solsticio de junio, −23,4° en el de diciembre, 0° en los equinoccios." },
  { g: "astro", k: "edadLunar", t: "Edad lunar", a: "Días transcurridos desde la última luna nueva (el ciclo dura ≈ 29,5 días)." },
];
 
const refsPanel = {};
 
// Ids que escriben main.js y ubicacion.js
const IDS_EXTERNOS = { lugar: "pais-ciudad", coordenadas: "ubicacion" };
 
function construirPanel() {
  for (const t of TARJETAS) {
    const grid = document.getElementById(t.g === "civil" ? "grid-civil" : "grid-astro");
    if (!grid) continue;
    const idValor = IDS_EXTERNOS[t.k];
    const el = document.createElement("div");
    el.className = "tarjeta";
    // Icono automático: iconos/<clave>.svg (o la ruta de t.icono). Si el archivo no existe se queda el ✦
    // Ruta absoluta: dentro de una variable CSS, una ruta relativa se resolvería desde css/ y fallaría
    const rutaIcono = new URL(t.icono || `iconos/${t.k}.svg`, document.baseURI).href;
    const sonda = new Image();
    sonda.onload = () => {
      el.classList.add("con-icono");
      el.style.setProperty("--icono", `url("${rutaIcono}")`);
    };
    sonda.src = rutaIcono;
    el.innerHTML =
      `<div class="tarjeta-cabecera">${t.t}</div>` +
      `<strong class="tarjeta-valor" ${idValor ? `id="${idValor}"` : ""}>—</strong>` +
      `<span class="tarjeta-sub"></span>` +
      `<p class="tarjeta-ayuda">${t.a}</p>` +
      `<button type="button" class="ayuda" aria-label="¿Qué es ${t.t}?">?</button>`;
    grid.appendChild(el);
    if (!idValor) {
      refsPanel[t.k] = {
        valor: el.querySelector(".tarjeta-valor"),
        sub: el.querySelector(".tarjeta-sub"),
      };
    }
  }
}
construirPanel();
 
function poner(k, valor, sub = "") {
  const r = refsPanel[k];
  if (!r) return;
  if (r.valor.textContent !== valor) r.valor.textContent = valor;
  if (r.sub.textContent !== sub) r.sub.textContent = sub;
}
 
// El símbolo va en su propio <span> (fuente de símbolos, dorado) y con \uFE0E para forzar la
// versión de texto y evitar el emoji de color.
let ultimoSigno = "";
function ponerSigno(signo, sub) {
  const r = refsPanel.signo;
  const html = `<span class="simbolo-zodiacal">${signo.simbolo}\uFE0E</span> ${signo.nombre}`;
  if (html !== ultimoSigno) {
    r.valor.innerHTML = html;
    ultimoSigno = html;
  }
  if (r.sub.textContent !== sub) r.sub.textContent = sub;
}
 
function textoHM(ms) {
  if (ms === null || ms === undefined) return "—";
  const p = aHoraDePared(new Date(ms));
  return `${dosDigitos(p.getUTCHours())}:${dosDigitos(p.getUTCMinutes())}`;
}
 
function textoHoraDecimal(h) {
  const s = Math.floor(h * 3600);
  return `${dosDigitos(Math.floor(s / 3600) % 24)}:${dosDigitos(Math.floor(s / 60) % 60)}:${dosDigitos(s % 60)}`;
}
 
let claveEfemeridesPanel = null;
let efemeridesPanel = null;
let ultimoRefrescoPanel = 0;
 
function actualizarPanelResultados(ahora) {
  const t = performance.now();
  if (t - ultimoRefrescoPanel < 500) return;
  ultimoRefrescoPanel = t;
 
  const p = aHoraDePared(ahora);
  const anio = p.getUTCFullYear();
  poner("fecha", `${DIAS_SEMANA[p.getUTCDay()]} ${p.getUTCDate()} de ${MESES[p.getUTCMonth()].toLowerCase()}`, `día ${Math.floor(diaDelAnioFraccional(p)) + 1} de ${diasEnAnio(anio)}`);
  poner("huso", textoHusoHorario(husoDelLugar(ahora)), ubicacion.esManual ? "estimado por longitud" : "de tu dispositivo");
 
  const edad = edadLunar(ahora);
  const fase = FASES_LUNARES[Math.floor((edad / PERIODO_SINODICO) * 8 + 0.5) % 8];
  poner("fase", fase, `${Math.round(fraccionIluminada(ahora) * 100)}% iluminada`);
  poner("edadLunar", `${edad.toFixed(1)} días`);
 
  const solar = posicionSolar(ahora);
  const signo = SIGNOS[Math.floor(normalizarGrados(-anguloZodiaco(ahora)) / 30)];
  ponerSigno(signo, `zodiaco tropical · ${solar.longitudEcliptica.toFixed(1)}°`);
  poner("declinacion", `${solar.declinacion.toFixed(2)}°`);
 
  if (ubicacion.latitud === null) return;
 
  const q = Math.floor(solar.longitudEcliptica / 90);
  const sur = ubicacion.latitud < 0;
  poner("estacion", ESTACIONES[sur ? (q + 2) % 4 : q], sur ? "hemisferio sur" : "hemisferio norte");
 
  const clave = claveDiaYLugar(ahora);
  if (clave !== claveEfemeridesPanel) {
    claveEfemeridesPanel = clave;
    efemeridesPanel = calcularEfemeridesSolares(ahora);
  }
  const e = efemeridesPanel;
 
  if (e.estado === "normal") {
    poner("salida", textoHM(e.alba.salida));
    poner("puesta", textoHM(e.ocaso.salida));
    let d = e.ocaso.salida - e.alba.salida;
    if (d < 0) d += 86400000;
    poner("duracion", `${Math.floor(d / 3600000)} h ${Math.floor((d % 3600000) / 60000)} min`);
  } else {
    const texto = e.estado === "sol-medianoche" ? "Sol de medianoche" : "Noche polar";
    poner("salida", texto);
    poner("puesta", texto);
    poner("duracion", e.estado === "sol-medianoche" ? "24 h" : "0 h");
  }
  poner("albaAstro", textoHM(e.alba.astronomico));
  poner("albaNautico", textoHM(e.alba.nautico));
  poner("albaCivil", textoHM(e.alba.civil));
  poner("mediodia", textoHM(e.mediodia));
  poner("ocasoCivil", textoHM(e.ocaso.civil));
  poner("ocasoNautico", textoHM(e.ocaso.nautico));
  poner("ocasoAstro", textoHM(e.ocaso.astronomico));
 
  poner("horaSolar", textoHoraDecimal(horaSolarVerdadera(ahora)));
  const eq = ecuacionDelTiempoMin(ahora);
  const eqAbs = Math.abs(eq);
  poner("ecuacion", `${eq < 0 ? "−" : "+"}${Math.floor(eqAbs)} min ${Math.floor((eqAbs % 1) * 60)} s`);
 
  const alturaSol = posicionSolarHorizonte(ahora, ubicacion.latitud, ubicacion.longitud).altura;
  poner("alturaSol", `${alturaSol.toFixed(1)}°`, alturaSol >= 0 ? "sobre el horizonte" : "bajo el horizonte");
  const alturaLuna = posicionLunarHorizonte(ahora, ubicacion.latitud, ubicacion.longitud).altura;
  poner("alturaLuna", `${alturaLuna.toFixed(1)}°`, alturaLuna >= 0 ? "sobre el horizonte" : "bajo el horizonte");
}
````

---

## `scripts\planetas.js`

````javascript
// scripts/planetas.js
// Posiciones heliocéntricas de los planetas por elementos keplerianos.
// Elementos del JPL (Standish, "Keplerian Elements for Approximate Positions
// of the Major Planets", Tabla 1, válidos 1800–2050 d.C.). Fuera de ese rango
// el error crece poco a poco: útil para ver configuraciones generales, no para
// efemérides de precisión.
// Cada elemento es [valor en J2000, variación por siglo juliano].
 
const PLANETAS = [
  { nombre: "Mercurio", color: "#b8b2a7", radioDibujo: 3, periodo: 0.2408467,
    a: [0.38709927, 0.00000037], e: [0.20563593, 0.00001906], I: [7.00497902, -0.00594749],
    L: [252.2503235, 149472.67411175], w: [77.45779628, 0.16047689], O: [48.33076593, -0.12534081] },
  { nombre: "Venus", color: "#e6c78a", radioDibujo: 5, periodo: 0.61519726,
    a: [0.72333566, 0.0000039], e: [0.00677672, -0.00004107], I: [3.39467605, -0.0007889],
    L: [181.9790995, 58517.81538729], w: [131.60246718, 0.00268329], O: [76.67984255, -0.27769418] },
  { nombre: "Tierra", color: "#4f8fe0", radioDibujo: 9, periodo: 1.00001742, esTierra: true,
    a: [1.00000261, 0.00000562], e: [0.01671123, -0.00004392], I: [-0.00001531, -0.01294668],
    L: [100.46457166, 35999.37244981], w: [102.93768193, 0.32327364], O: [0.0, 0.0] },
  { nombre: "Marte", color: "#d9603b", radioDibujo: 4, periodo: 1.88081632,
    a: [1.52371034, 0.00001847], e: [0.0933941, 0.00007882], I: [1.84969142, -0.00813131],
    L: [-4.55343205, 19140.30268499], w: [-23.94362959, 0.44441088], O: [49.55953891, -0.29257343] },
  { nombre: "Júpiter", color: "#d8a878", radioDibujo: 9, periodo: 11.862615,
    a: [5.202887, -0.00011607], e: [0.04838624, -0.00013253], I: [1.30439695, -0.00183714],
    L: [34.39644051, 3034.74612775], w: [14.72847983, 0.21252668], O: [100.47390909, 0.20469106] },
  { nombre: "Saturno", color: "#e3cf8f", radioDibujo: 8, periodo: 29.447498,
    a: [9.53667594, -0.0012506], e: [0.05386179, -0.00050991], I: [2.48599187, 0.00193609],
    L: [49.95424423, 1222.49362201], w: [92.59887831, -0.41897216], O: [113.66242448, -0.28867794] },
  { nombre: "Urano", color: "#8fd6d9", radioDibujo: 6, periodo: 84.016846,
    a: [19.18916464, -0.00196176], e: [0.04725744, -0.00004397], I: [0.77263783, -0.00242939],
    L: [313.23810451, 428.48202785], w: [170.9542763, 0.40805281], O: [74.01692503, 0.04240589] },
  { nombre: "Neptuno", color: "#6f86e8", radioDibujo: 6, periodo: 164.79132,
    a: [30.06992276, 0.00026291], e: [0.00859048, 0.00005105], I: [1.77004347, 0.00035372],
    L: [-55.12002969, 218.45945325], w: [44.96476227, -0.32241464], O: [131.78422574, -0.00508664] },
];
 
const PRECESION_GRADOS_POR_SIGLO = 1.3969713; // de equinoccio J2000 a equinoccio de la fecha
const GRAD = Math.PI / 180;
 
// ── Escala del dial ─────────────────────────────────────────────
// Radio dibujado = RADIO_TIERRA · (distancia en UA)^EXPONENTE. La Tierra queda en
// 175 (como antes) y el afelio de Neptuno (≈30,33 UA) justo en el borde (480).
const DIAL_RADIO_TIERRA = 175;
const DIAL_RADIO_MAXIMO = 480;
const DIAL_UA_MAXIMA = 30.33;
const DIAL_EXPONENTE =
  Math.log(DIAL_RADIO_MAXIMO / DIAL_RADIO_TIERRA) / Math.log(DIAL_UA_MAXIMA);
 
function radioDelDial(distanciaUA) {
  return DIAL_RADIO_TIERRA * Math.pow(distanciaUA, DIAL_EXPONENTE);
}
 
// Longitud heliocéntrica -> ángulo del dial. Se suma 180° para coincidir con la
// Tierra, que el dial sitúa en la longitud del Sol (= la suya + 180°).
function anguloDelDial(longitudHeliocentrica) {
  return normalizarGrados(longitudHeliocentrica + 180);
}
 
// ── Cálculo ─────────────────────────────────────────────────────
function siglosDesdeJ2000(fecha) {
  return (fecha.getTime() / 86400000 + 2440587.5 - 2451545.0) / 36525;
}
 
function elementosEn(planeta, T) {
  const v = (par) => par[0] + par[1] * T;
  return {
    a: v(planeta.a), e: v(planeta.e), I: v(planeta.I) * GRAD,
    L: v(planeta.L), w: v(planeta.w), O: v(planeta.O) * GRAD,
  };
}
 
function resolverKepler(M, e) {
  let E = M + e * Math.sin(M);
  for (let i = 0; i < 15; i++) {
    const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= d;
    if (Math.abs(d) < 1e-10) break;
  }
  return E;
}
 
// Coordenadas eclípticas J2000 (UA) para una anomalía excéntrica E
function coordenadasOrbitales(el, E) {
  const xp = el.a * (Math.cos(E) - el.e);
  const yp = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E);
  const omega = (el.w - el.O / GRAD) * GRAD; // argumento del perihelio
  const cw = Math.cos(omega), sw = Math.sin(omega);
  const cO = Math.cos(el.O), sO = Math.sin(el.O);
  const cI = Math.cos(el.I), sI = Math.sin(el.I);
  return {
    x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    z: sw * sI * xp + cw * sI * yp,
  };
}
 
// Convierte coordenadas J2000 en distancia y longitud (equinoccio de la fecha)
function resumenHeliocentrico(c, T) {
  const rho = Math.hypot(c.x, c.y); // distancia proyectada en la eclíptica
  return {
    distancia: Math.hypot(c.x, c.y, c.z), // UA reales al Sol
    rho,
    longitud: normalizarGrados(Math.atan2(c.y, c.x) / GRAD + PRECESION_GRADOS_POR_SIGLO * T),
  };
}
 
function posicionHeliocentrica(planeta, fecha) {
  const T = siglosDesdeJ2000(fecha);
  const el = elementosEn(planeta, T);
  const M = normalizarGrados(el.L - el.w) * GRAD;
  return resumenHeliocentrico(coordenadasOrbitales(el, resolverKepler(M, el.e)), T);
}
 
// Puntos de la órbita (para dibujarla) con los elementos de la fecha dada
function puntosDeOrbita(planeta, fecha, pasos = 180) {
  const T = siglosDesdeJ2000(fecha);
  const el = elementosEn(planeta, T);
  const puntos = [];
  for (let i = 0; i <= pasos; i++) {
    const r = resumenHeliocentrico(coordenadasOrbitales(el, (i / pasos) * 2 * Math.PI), T);
    puntos.push(polar(radioDelDial(r.rho), anguloDelDial(r.longitud)));
  }
  return puntos;
}
````

---

## `scripts\referencias-estacionales.js`

````javascript
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
  ejeLectura.setAttribute("y1", -360);
  ejeLectura.setAttribute("x2", 600);
  ejeLectura.setAttribute("y2", 1560);
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
 
// ───────── Anillo de estaciones (bajo el calendario, radios 745–780) ─────────
// Cada día del año es un sector del anillo, coloreado según la longitud
// eclíptica REAL del Sol ese día: las estaciones salen con su duración real
// (no cuatro cuartos iguales) y se mezclan suavemente en cada frontera.
// Rota junto con el calendario (mismo ángulo que #capa-calendario).
 
const ANILLO_ESTACIONES = {
  radioInterno: 740,
  radioExterno: 780,
  mezclaGrados: 12, // transición a cada lado de cada equinoccio/solsticio
};
 
// [r, g, b] — suaves pero distintivos
const COLORES_ESTACION = {
  primavera: [111, 191, 115],
  verano: [242, 193, 78],
  otonio: [217, 120, 58],
  invierno: [127, 183, 230],
};
 
// Sectores eclípticos 0–90, 90–180, 180–270, 270–360 según el hemisferio
function estacionesPorSector(sur) {
  const c = COLORES_ESTACION;
  return sur
    ? [c.otonio, c.invierno, c.primavera, c.verano]
    : [c.primavera, c.verano, c.otonio, c.invierno];
}
 
function mezclarRGB(a, b, peso) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * peso));
}
 
function colorEstacionPorLongitud(longitud, sur) {
  const orden = estacionesPorSector(sur);
  const m = ANILLO_ESTACIONES.mezclaGrados;
  const sector = Math.floor(longitud / 90) % 4;
  const dentro = longitud - sector * 90;
  const actual = orden[sector];
 
  if (dentro < m) {
    // frontera anterior: 50 % en el límite, 100 % actual a `m` grados
    const previo = orden[(sector + 3) % 4];
    return mezclarRGB(previo, actual, 0.5 + (0.5 * dentro) / m);
  }
  if (dentro > 90 - m) {
    const siguiente = orden[(sector + 1) % 4];
    return mezclarRGB(actual, siguiente, (0.5 * (dentro - (90 - m))) / m);
  }
  return actual;
}
 
function trazoSectorAnillo(radioInterno, radioExterno, a0, a1) {
  const p1 = polar(radioExterno, a0);
  const p2 = polar(radioExterno, a1);
  const p3 = polar(radioInterno, a1);
  const p4 = polar(radioInterno, a0);
  return (
    `M ${p1.x} ${p1.y} A ${radioExterno} ${radioExterno} 0 0 1 ${p2.x} ${p2.y} ` +
    `L ${p3.x} ${p3.y} A ${radioInterno} ${radioInterno} 0 0 0 ${p4.x} ${p4.y} Z`
  );
}
 
function dibujarAnilloEstaciones(anio, sur) {
  const capa = document.getElementById("capa-estaciones");
  capa.innerHTML = "";
 
  const N = diasEnAnio(anio);
  const paso = 360 / N;
  const { radioInterno, radioExterno } = ANILLO_ESTACIONES;
 
  for (let i = 0; i < N; i++) {
    // Longitud eclíptica del Sol al mediodía (UTC) de ese día del año
    const { longitudEcliptica } = posicionSolar(new Date(Date.UTC(anio, 0, 1 + i, 12)));
    const [r, g, b] = colorEstacionPorLongitud(longitudEcliptica, sur);
 
    const sector = document.createElementNS(SVG_NS, "path");
    // +0.15° de solape evita líneas finas entre sectores contiguos
    sector.setAttribute("d", trazoSectorAnillo(radioInterno, radioExterno, i * paso, (i + 1) * paso + 0.15));
    sector.setAttribute("fill", `rgb(${r},${g},${b})`);
    sector.setAttribute("class", "sector-estacion");
    capa.appendChild(sector);
  }
}
 
let claveAnilloEstaciones = null;
 
// Se llama en cada fotograma: redibuja solo si cambia el año o el hemisferio
function actualizarAnilloEstaciones(ahora, anguloCalendario) {
  const anio = aHoraDePared(ahora).getUTCFullYear();
  const sur = ubicacion.latitud !== null && ubicacion.latitud < 0;
  const clave = `${anio}|${sur}`;
  if (clave !== claveAnilloEstaciones) {
    claveAnilloEstaciones = clave;
    dibujarAnilloEstaciones(anio, sur);
  }
  document
    .getElementById("capa-estaciones")
    .setAttribute("transform", `rotate(${anguloCalendario} 600 600)`);
}
````

---

## `scripts\tema.js`

````javascript
// scripts/tema.js
// Botón sol/luna de la cabecera: alterna modo día / noche y recuerda la elección.
// Los colores de cada modo viven en css/tema.css.
 
const ICONO_SOL =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const ICONO_LUNA =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>';
 
function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  const boton = document.getElementById("boton-tema");
  if (!boton) return;
  const etiqueta = tema === "dia" ? "Cambiar a modo noche" : "Cambiar a modo día";
  boton.innerHTML = tema === "dia" ? ICONO_SOL : ICONO_LUNA;
  boton.title = etiqueta;
  boton.setAttribute("aria-label", etiqueta);
  try {
    localStorage.setItem("tema", tema);
  } catch (e) {
    /* sin almacenamiento: el modo solo dura la visita */
  }
}
 
function inicializarTema() {
  let guardado = null;
  try {
    guardado = localStorage.getItem("tema");
  } catch (e) {
    guardado = null;
  }
  aplicarTema(guardado === "noche" ? "noche" : "dia");
  const boton = document.getElementById("boton-tema");
  if (boton) {
    boton.addEventListener("click", () => {
      aplicarTema(document.documentElement.dataset.tema === "dia" ? "noche" : "dia");
    });
  }
}
 
inicializarTema();
 
````

---

## `scripts\traslacion.js`

````javascript
// scripts/traslacion.js
// Órbita de la Tierra y de los demás planetas alrededor del Sol central.
// La Tierra sigue la longitud solar del dial; los demás salen de planetas.js.
// Depende de: planetas.js (radioDelDial, PLANETAS, posicionHeliocentrica...)
 
const EXCENTRICIDAD_TERRESTRE = 0.0167; // real
const LONGITUD_PERIHELIO = 283; // longitud solar aparente del perihelio (~3 de enero)
 
const planetasEnDial = {}; // nombre -> <circle>
 
function posicionOrbital(longitudEcliptica) {
  const e = EXCENTRICIDAD_TERRESTRE;
  const nu = ((longitudEcliptica - LONGITUD_PERIHELIO) * Math.PI) / 180;
  const distanciaUA = (1 - e * e) / (1 + e * Math.cos(nu));
  return polar(radioDelDial(distanciaUA), longitudEcliptica);
}
 
function construirOrbitaPath() {
  const puntos = [];
  for (let grado = 0; grado <= 360; grado += 2) {
    puntos.push(posicionOrbital(grado));
  }
  return trazoDesdePuntos(puntos);
}
 
function trazoDesdePuntos(puntos) {
  const [inicio, ...resto] = puntos;
  return (
    `M ${inicio.x} ${inicio.y} ` +
    resto.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    " Z"
  );
}
 
// Disco oscuro (sin llegar a negro) tras las órbitas para que contrasten
function dibujarFondoTraslacion() {
  const svg = document.getElementById("reloj");
  if (!svg || document.getElementById("capa-fondo-traslacion")) return;
  const capa = document.createElementNS(SVG_NS, "g");
  capa.setAttribute("id", "capa-fondo-traslacion");
  const disco = document.createElementNS(SVG_NS, "circle");
  disco.setAttribute("id", "fondo-traslacion");
  disco.setAttribute("cx", 600);
  disco.setAttribute("cy", 600);
  disco.setAttribute("r", DIAL_RADIO_MAXIMO);
  capa.appendChild(disco);
  svg.insertBefore(capa, svg.querySelector(":scope > g"));
}
 
function dibujarOrbitaTerrestre() {
  dibujarFondoTraslacion();
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
 
  dibujarOrbitasPlanetarias();
}
 
// Órbitas (bajo el zodiaco) y puntos de los planetas (sobre él)
function dibujarOrbitasPlanetarias() {
  const capaOrbitas = document.getElementById("capa-orbitas-planetarias");
  const capaPlanetas = document.getElementById("capa-planetas");
  if (!capaOrbitas || !capaPlanetas) {
    console.error("Faltan <g id='capa-orbitas-planetarias'> o <g id='capa-planetas'> en index.html");
    return;
  }
  const fecha = obtenerFechaActual();
 
  PLANETAS.filter((p) => !p.esTierra).forEach((planeta) => {
    const orbita = document.createElementNS(SVG_NS, "path");
    orbita.setAttribute("d", trazoDesdePuntos(puntosDeOrbita(planeta, fecha)));
    orbita.setAttribute("class", "orbita-planeta");
    capaOrbitas.appendChild(orbita);
 
    const punto = document.createElementNS(SVG_NS, "circle");
    punto.setAttribute("r", planeta.radioDibujo);
    punto.setAttribute("fill", planeta.color);
    punto.setAttribute("class", "planeta");
    const titulo = document.createElementNS(SVG_NS, "title");
    titulo.textContent = planeta.nombre;
    punto.appendChild(titulo);
    capaPlanetas.appendChild(punto);
    planetasEnDial[planeta.nombre] = punto;
  });
}
 
function actualizarTraslacion(fecha) {
  const tierra = document.getElementById("tierra-orbital");
  if (!tierra) return;
  const { longitudEcliptica } = posicionSolar(fecha);
  const p = posicionOrbital(longitudEcliptica);
  tierra.setAttribute("cx", p.x);
  tierra.setAttribute("cy", p.y);
 
  PLANETAS.forEach((planeta) => {
    const punto = planetasEnDial[planeta.nombre];
    if (!punto) return;
    const pos = posicionHeliocentrica(planeta, fecha);
    const xy = polar(radioDelDial(pos.rho), anguloDelDial(pos.longitud));
    punto.setAttribute("cx", xy.x);
    punto.setAttribute("cy", xy.y);
  });
}
````

---

## `scripts\tropicos.js`

````javascript
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

  const radioCancer = radioDesdeAltura(alturaMaximaMediodia(ubicacion.latitud, DECLINACION_CANCER));
  const radioCapricornio = radioDesdeAltura(alturaMaximaMediodia(ubicacion.latitud, DECLINACION_CAPRICORNIO));

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
````

---

## `scripts\ubicacion.js`

````javascript
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
    const respuesta = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`, {
      headers: {
        'Accept-Language': 'es' 
      }
    });
    const datos = await respuesta.json();
    if (datos && datos.address) {
      ubicacion.ciudad = datos.address.city || datos.address.town || datos.address.village || datos.address.county || "";
      ubicacion.pais = datos.address.country || "";
      return {
        ciudad: ubicacion.ciudad,
        pais: ubicacion.pais
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
    { timeout: 10000, maximumAge: 600000 }
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
    `Lat: ${lat.toFixed(4)}°\nLon: ${lon.toFixed(4)}°`;

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
````

---

## `scripts\viajero.js`

````javascript
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
    establecerFechaViajero(instanteDesdeInput(inputFechaHora.value));
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
````

---

## `scripts\zodiaco.js`

````javascript
const CENTRO_ZODIACO_X = 600;
const CENTRO_ZODIACO_Y = 463.4;
const RADIO_ZODIACO = 343.4;
const RADIO_ETIQUETA = 300;

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
  path.setAttribute("d", `M ${p1.x} ${p1.y} A ${RADIO_ETIQUETA} ${RADIO_ETIQUETA} 0 0 ${sweep} ${p2.x} ${p2.y}`);
  path.setAttribute("fill", "none");
  grupo.appendChild(path);

  const textoEl = document.createElementNS(SVG_NS, "text");
  textoEl.setAttribute("class", "etiqueta-zodiaco");

  const textPath = document.createElementNS(SVG_NS, "textPath");
  textPath.setAttribute("href", "#" + pathId);
  textPath.setAttribute("startOffset", "50%");
  textPath.setAttribute("text-anchor", "middle");
  const simbolo = document.createElementNS(SVG_NS, "tspan");
  simbolo.setAttribute("class", "simbolo-zodiacal");
  simbolo.textContent = `${signo.simbolo}\uFE0E`;
  const nombre = document.createElementNS(SVG_NS, "tspan");
  nombre.textContent = `\u00A0${signo.nombre}`;
  textPath.append(simbolo, nombre);

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

    path.setAttribute("d", `M ${p1.x} ${p1.y} A ${RADIO_ETIQUETA} ${RADIO_ETIQUETA} 0 0 ${sweep} ${p2.x} ${p2.y}`);
  });
}
````

