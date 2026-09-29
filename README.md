Proyecto AD ASTRA

Reloj astronómico 2D inspirado en el Orloj de Praga, construido en HTML, CSS y JavaScript puro. Sin librerías ni frameworks: todos los cálculos astronómicos son propios. Muestra en un solo dial la hora, el día y la noche, el Sol y la Luna con su fase real, el zodiaco, el calendario, las estaciones y la órbita terrestre, según tu ubicación y el momento elegido.

La única llamada externa es la geocodificación inversa de OpenStreetMap (Nominatim) para mostrar ciudad y país a partir de las coordenadas.

Qué muestra

El reloj (capas del dial, de adentro hacia afuera)

Capa Descripción
Traslación Órbita elíptica de la Tierra alrededor del Sol central, con posición real por longitud eclíptica
Zodiaco Anillo excéntrico con los 12 signos en texto curvo; el signo solar activo se resalta
Eventos estacionales Círculos de equinoccios y solsticios, con detección del día exacto
Trópicos Trópico de Cáncer y de Capricornio según la latitud
Día / noche Anillo con degradado por altura solar real (alba, día, ocaso, noche)
Sol y Luna Sobre el anillo día/noche, en el ángulo de la hora; la Luna con forma de fase real
Reloj Agujas de hora, minuto y segundo (24 h), con marcas en el aro exterior
Calendario Aro exterior de 12 meses proporcionales a sus días reales; marcador fijo en "hoy"

La página (tres cajas responsive)

Menú: barra superior sencilla (enlaces por completar).
Reloj: el dial con la hora y la fecha digitales.
Resultados actuales: panel de tarjetas con ayuda didáctica (botón ?) en dos niveles:
Lectura civil: lugar, coordenadas, fecha, huso horario, salida y puesta del Sol, duración del día, fase lunar, signo solar y estación.
Lectura astronómica: alba y ocaso en los tres crepúsculos (civil, náutico y astronómico), mediodía solar, hora solar verdadera, ecuación del tiempo, alturas del Sol y la Luna, declinación solar y edad lunar.

Cajón "Viajar" (lateral): permite viajar a otra fecha y hora, cambiar la velocidad (x1, x100, x1000, x10000) y elegir otra ubicación por latitud y longitud. Al viajar, el reloj muestra la hora local del lugar elegido, y "Ahora" / "Mi ubicación" restauran todo.

Estructura
index.html
css/
base.css estilos generales
reloj.css estilos del dial
viajero.css cajón "Viajar"
caja-reloj.css caja del reloj y menú superior
panel.css panel "Resultados actuales"
scripts/
astronomia.js posición del Sol y la Luna, fase, tiempo sidéreo
estado-tiempo.js motor de tiempo (fecha real, viajero, velocidad)
hora-local.js separa instante real de hora de pared del lugar
ubicacion.js geolocalización, ciudad/país, huso horario
hora.js agujas y marcadores del reloj
marco.js escalas de horas y minutos, ejes
calendario.js aro de meses y marcador de hoy
zodiaco.js anillo zodiacal
indicador-zodiaco.js signo solar activo
referencias-estacionales.js equinoccios y solsticios
tropicos.js trópicos
traslacion.js órbita terrestre
eventos-solares.js anillo día/noche
fase-lunar.js forma real de la fase lunar
efemerides-solares.js alba, ocaso, mediodía solar, hora solar
panel-resultados.js tarjetas del panel
viajero.js cajón "Viajar"
main.js bucle principal

El orden de carga de los <script> en index.html importa: hora-local.js antes de hora.js, y efemerides-solares.js y panel-resultados.js antes de main.js.

Cómo ejecutarlo

No requiere instalación. Abre el proyecto con un servidor estático local (por ejemplo, la extensión Live Server de VS Code) o desde cualquier hosting estático. La geolocalización del navegador solo funciona en localhost o bajo HTTPS. Si cambias CSS o scripts y no ves el efecto, recarga con Ctrl+Shift+R, porque los servidores locales cachean con agresividad.

Cómo se separan tiempo y lugar
Instante real (Date normal): lo usa toda la astronomía.
Hora de pared del lugar (hora-local.js): lo usa todo lo que se muestra. Se guarda en un Date desplazado por el huso y se lee siempre con getUTC\*.
Ubicación real: el huso sale del navegador, con horario de verano. Ubicación manual: se estima como round(longitud / 15).
Precisión y aproximaciones
Las fórmulas son de precisión moderada: orden de ±1–2 min en salida, puesta y crepúsculos, y de una décima de grado en las alturas. No incluyen refracción atmosférica.
La excentricidad de la órbita terrestre en el dial está exagerada a propósito (0,2 frente a 0,0167 real).
Sol y Luna se ubican por ángulo horario, no por azimut real.
En ubicación manual, el huso estimado ignora fronteras políticas y horario de verano.
El zodiaco usado es el tropical (sectores de 30° desde el equinoccio de marzo), no las constelaciones visibles.
Los eclipses no están implementados: las fórmulas actuales no alcanzan la precisión necesaria.

Pendiente

Próximos eventos: solsticios, equinoccios y lunas llenas con cuenta regresiva.
Distinción de capas al pasar el cursor, con tooltip.
Sección "Cómo funciona" con la matemática y la física de cada capa.
Blog, pie de página y menú funcional.
Nodos lunares y eclipses (la luna roja ya tiene su motor de color preparado).
"Astrales": lluvias de meteoros, cometas y planetas.
Mapa interactivo para elegir ubicación.
