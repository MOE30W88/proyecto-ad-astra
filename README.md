# Proyecto AD ASTRA

Reloj astronómico 2D inspirado en el Orloj de Praga, hecho con HTML, CSS y JavaScript puro, sin librerías. Es un proyecto personal de aprendizaje, construido capa por capa.

## Estado actual

- Aguja de 24 horas (mediodía arriba, medianoche abajo) con movimiento continuo
- Agujas de minutos y segundos, con animación fluida mediante `requestAnimationFrame`
- Hora digital
- Marco del reloj: 24 marcas de hora con números romanos (I a XII, dos veces) y una escala de 60 minutos con números arábigos

## Cómo verlo

Abre la carpeta en Visual Studio Code y usa la extensión **Live Server**: clic derecho sobre `index.html` y **Open with Live Server**.

## Estructura

```
├── index.html
├── css/
│   ├── base.css
│   └── reloj.css
└── scripts/
    ├── hora.js
    ├── marco.js
    └── main.js
```

## Próximas capas

- Ubicación del usuario (geolocalización)
- Anillo del zodíaco
- Posición del Sol y la Luna, y fase lunar
- Amanecer y atardecer