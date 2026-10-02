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

## Pendientes

- **Nodos lunares y eclipses**: incluye la luna roja (el motor de color ya está preparado)
- **Astrales**: lluvias de meteoros, cometas y planetas, según visibilidad por ubicación

- **Panel de información**: "Próximos eventos"
- **Landing page** (construyendola por secciones)
- **Publicación en GitHub Pages**
