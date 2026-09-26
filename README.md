# Proyecto AD ASTRA

Reloj astronómico 2D inspirado en el Orloj de Praga, hecho con HTML, CSS y JavaScript puro, sin librerías. Es un proyecto personal de aprendizaje, construido capa por capa.

## Estado actual

- Aguja de 24 horas (mediodía arriba, medianoche abajo) con movimiento continuo, más agujas de minuto y segundo, animadas con `requestAnimationFrame`
- Hora digital
- Marco del reloj: 24 marcas de hora con números romanos (I a XII, dos veces) y una escala de 60 minutos con números arábigos
- Ubicación del usuario mediante geolocalización del navegador, con ciudad y país (API Nominatim)
- **Sol y Luna**: posición real calculada por astronomía (días julianos desde J2000, altura y azimut sobre el horizonte), orbitando en radios fijos por fuera del disco horario (Sol r=650, Luna r=690). Intensidad y opacidad diferenciadas: el Sol se apaga por completo bajo el horizonte; la Luna se ve tenue de día y a su brillo real de fase durante la noche
- Fase lunar real (ciclo sinódico completo) afectando el brillo de la Luna
- Anillo del zodiaco con rotación anual real según la posición solar
- **Anillo día/noche con degradado** (cerrado): franja entre el marco y el borde exterior, coloreada según la altura solar real — noche, crepúsculo astronómico/náutico/civil (violetas, rojos, naranjas) y día — con transiciones de color suaves y 100% dinámico según fecha y ubicación real (válido en cualquier estación y latitud)

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
├── eventos-solares.js
├── zodiaco.js
└── main.js

## Próximas capas

- Rediseñar la rotación del zodiaco: que el círculo de fondo quede fijo y solo giren las marcas y etiquetas
- Indicador visual de "signo activo" en el zodiaco
- Que el disco lunar cambie de forma según la fase (no solo opacidad/brillo)
- Capa de eclipses (a largo plazo)
- Publicación en GitHub Pages