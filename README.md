# Proyecto AD ASTRA

Reloj astronómico 2D inspirado en el Orloj de Praga, hecho con HTML, CSS y JavaScript puro — sin librerías ni APIs externas (salvo Nominatim, solo para mostrar el nombre de ciudad y país). Todos los cálculos astronómicos son propios, dinámicos y con un margen de incertidumbre aceptable para un proyecto de aprendizaje.

## Capas completas

- **Base**: geolocalización (lat/lon), ciudad y país, hora global
- **1 — Reloj**: agujas de hora, minuto y segundo en formato 24 h; marcas de hora con números romanos y escala de 60 minutos, en la cara externa del anillo día/noche
- **2 — Día/Noche**: anillo con degradado según la altura solar real (alba, día, ocaso, noche), dinámico por fecha y ubicación
- **3 — Sol y Luna**: el Sol, grande y fijo en el centro del anillo día/noche, y la Luna con fases reales (creciente, gibosa, llena...), ambos visibles solo cuando están sobre el horizonte
- **4 — Zodiaco**: anillo excéntrico con rotación anual real, nombres y símbolos en texto curvo, más un indicador del signo activo
- **5 — Eventos estacionales**: círculos de referencia de equinoccios y solsticios, con aviso visual del día exacto
- **6 — Trópicos**: Cáncer y Capricornio, calculados con la latitud del usuario
- **7 — Calendario**: aro exterior con los 12 meses (proporcionales a sus días reales, con años bisiestos) y marcador fijo del día actual
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
├── index.html
├── css/
│   ├── base.css
│   ├── reloj.css
│   └── viajero.css
└── scripts/
    ├── hora.js
    ├── marco.js
    ├── calendario.js
    ├── ubicacion.js
    ├── astronomia.js
    ├── traslacion.js
    ├── indicador-zodiaco.js
    ├── tropicos.js
    ├── referencias-estacionales.js
    ├── eventos-solares.js
    ├── zodiaco.js
    ├── fase-lunar.js
    ├── estado-tiempo.js
    ├── viajero.js
    └── main.js
```

## Pendientes

- **Hora local del lugar**: que el reloj muestre la hora del lugar al viajar de huso (hoy sigue mostrando la de la computadora)
- **Agujas**: ajustar sus largos a las nuevas marcas
- **Panel de información**: "Resultados actuales" y "Próximos eventos"
- **Distinción de capas por cursor**: resaltar la capa bajo el cursor y mostrar su nombre
- **Círculo interior**: nuevas ideas por definir
- **Nodos lunares y eclipses**: incluye la luna roja (el motor de color ya está preparado)
- **Astrales**: lluvias de meteoros, cometas y planetas, según visibilidad por ubicación
- **Viajero avanzado**: mapa interactivo y selector de fecha propio
- **Landing page** con sección de blog, y publicación en GitHub Pages
- **Deuda técnica**: el anillo día/noche se recalcula cada 60 s reales, así que tras un salto de fecha o a velocidades altas puede quedar desfasado