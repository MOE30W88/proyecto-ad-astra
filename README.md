# Proyecto AD ASTRA

Reloj astronómico 2D inspirado en el Orloj de Praga, hecho con HTML, CSS y JavaScript puro, sin librerías. Es un proyecto personal de aprendizaje, construido capa por capa.

## Estado actual

- Aguja de 24 horas (mediodía arriba, medianoche abajo) con movimiento continuo
- Agujas de minutos y segundos, con animación fluida mediante `requestAnimationFrame`
- Hora digital
- Marco del reloj: 24 marcas de hora con números romanos (I a XII, dos veces) y una escala de 60 minutos con números arábigos
- Ubicación del usuario mediante geolocalización del navegador, con ciudad y país (API Nominatim)
- Posición real del Sol y la Luna sobre el horizonte, calculada a partir de la fecha y la ubicación (altura/azimut, días julianos desde J2000)
- Fase lunar (fracción iluminada) afectando la intensidad visual de la Luna
- Anillo del zodiaco con rotación anual real según la posición solar

## Cómo verlo

Abre la carpeta en Visual Studio Code y usa la extensión **Live Server**: clic derecho sobre `index.html` y **Open with Live Server**.

## Estructura
├── index.html
├── css/
│ ├── base.css
│ └── reloj.css
└── scripts/
├── hora.js
├── marco.js
├── ubicacion.js
├── astronomia.js
├── zodiaco.js
└── main.js

## Próximas capas

- Capa de día/noche con franjas de aurora y crepúsculo (amanecer/atardecer), estilo Orloj de Praga
- Indicador visual de "signo activo" en el zodiaco
- Ocultamiento del Sol/Luna bajo el horizonte
- Que el disco lunar cambie de forma según la fase (no solo opacidad)
- Capa de eclipses (largo plazo)
- Publicación en GitHub Pages