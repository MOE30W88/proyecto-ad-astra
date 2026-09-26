Reloj astronómico 2D inspirado en el Orloj de Praga, hecho con HTML, CSS y JavaScript puro, sin librerías. Es un proyecto personal de aprendizaje, construido capa por capa.

## Estado actual

- Aguja de 24 horas (mediodía arriba, medianoche abajo) con movimiento continuo, más agujas de minuto y segundo, animadas con `requestAnimationFrame`
- Hora digital
- Marco del reloj: 24 marcas de hora con números romanos (I a XII, dos veces) y una escala de 60 minutos con números arábigos
- Ubicación del usuario mediante geolocalización del navegador, con ciudad y país (API Nominatim)
- **Sol y Luna**: posición real calculada por astronomía (días julianos desde J2000, altura y azimut sobre el horizonte), orbitando en radios fijos por fuera del disco horario. Intensidad y opacidad diferenciadas: el Sol se apaga por completo bajo el horizonte; la Luna se ve tenue de día y a su brillo real de fase durante la noche
- Fase lunar real (ciclo sinódico completo) afectando el brillo de la Luna
- Anillo del zodiaco con rotación anual real según la posición solar, excéntrico (como el Orloj original)
- **Indicador de signo activo**: cuña curva que sigue en tiempo real al signo zodiacal correspondiente a la fecha actual, respetando sus bordes reales (no siempre centrada, ya que el Sol se mueve dentro de cada signo a lo largo de su temporada)
- **Círculos de referencia estacional**: 4 guías tenues marcando dónde llegaría el anillo del zodiaco en cada equinoccio y solsticio, como referencia visual
- **Anillo día/noche con degradado**: franja entre el marco y el borde exterior, coloreada según la altura solar real — noche, crepúsculo astronómico/náutico/civil (violetas, rojos, naranjas) y día — con transiciones de color suaves y 100% dinámico según fecha y ubicación real

## Cómo verlo

Abre la carpeta en Visual Studio Code y usa la extensión **Live Server**: clic derecho sobre `index.html` y **Open with Live Server**. Si haces cambios y no se reflejan, fuerza la recarga con **Ctrl+Shift+R** (Live Server a veces cachea scripts y CSS de forma agresiva).

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
├── indicador-zodiaco.js
├── tropicos.js
├── referencias-estacionales.js
├── eventos-solares.js
├── zodiaco.js
└── main.js


## Próximas capas

- Trópico de Cáncer y Trópico de Capricornio: implementado pero temporalmente desactivado (comentado en `index.html`) mientras se pulía el indicador de signo activo — falta reactivarlo y confirmarlo en pantalla
- "segmento_luna_2.0": que el disco lunar cambie de forma según la fase (no solo opacidad/brillo)
- Capa de eclipses (a largo plazo)
- Publicación en GitHub Pages