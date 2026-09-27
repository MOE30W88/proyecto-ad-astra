# Proyecto AD ASTRA

Reloj astronómico 2D inspirado en el Orloj de Praga, hecho con HTML, CSS y JavaScript puro — sin librerías ni APIs externas (salvo Nominatim, solo para mostrar nombre de ciudad/país). Todos los cálculos astronómicos son propios, dinámicos y con un margen de incertidumbre aceptable para un proyecto de aprendizaje.

## Capas completas

- **Base**: geolocalización del usuario (lat/lon), ciudad/país, hora global
- **1 — Reloj**: agujas de hora, minuto y segundo en formato 24h, con números romanos I-XII repetidos dos veces
- **2 — Día/Noche**: anillo exterior con degradado de color según la altura solar real (alba, día, ocaso, noche), 100% dinámico por fecha y ubicación
- **3 — Sol y Luna**: posición real calculada por astronomía, con opacidad que respeta fielmente cuándo cada uno es visible sobre el horizonte
- **4 — Zodiaco**: anillo excéntrico representando el desplazamiento real de las constelaciones durante el año, con nombres y símbolos astrológicos en texto curvo, más un indicador dinámico del signo activo
- **5 — Eventos estacionales**: círculos de referencia para equinoccios/solsticios, con detección automática y aviso visual del día exacto
- **6 — Trópicos**: Cáncer y Capricornio, calculados con astronomía real según la latitud del usuario
- **7 — Calendario**: anillo exterior con los 12 meses (proporcional a sus días reales, incluyendo años bisiestos) y marcador fijo del día actual

## Cómo verlo

Abre la carpeta en Visual Studio Code y usa la extensión **Live Server**: clic derecho sobre `index.html` y **Open with Live Server**. Si haces cambios y no se reflejan, fuerza la recarga con **Ctrl+Shift+R**.

## Estructura

├── index.html
├── css/
│ ├── base.css
│ └── reloj.css
└── scripts/
├── hora.js
├── marco.js
├── calendario.js
├── ubicacion.js
├── astronomia.js
├── indicador-zodiaco.js
├── tropicos.js
├── referencias-estacionales.js
├── eventos-solares.js
├── zodiaco.js
└── main.js


## Roadmap

- Capa lunar: que el disco de la Luna cambie de forma según su fase (nueva, creciente, llena, menguante), incluyendo lunas rojas/eclipses lunares
- Panel de información en pantalla con los datos calculados
- "Viajero": línea de tiempo para viajar a fechas pasadas/futuras, más mapa interactivo para elegir ubicación manualmente
- "Astrales": lluvias de meteoros, cometas y planetas, calculando su visibilidad real según ubicación
- Eclipses (solares y lunares) — requiere mucha más precisión que las fórmulas actuales
- "Traslación": representación 2D de la órbita elíptica de la Tierra alrededor del Sol
- Landing page completa, con sección tipo blog