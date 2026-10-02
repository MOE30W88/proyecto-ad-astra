# AD ASTRA

AD ASTRA es un reloj astronómico interactivo inspirado en los astrolabios y en el Orloj de Praga. Reúne en una esfera el reloj civil, el recorrido anual del Sol, el cielo local y una representación del sistema solar. La intención es didáctica: explorar cómo se relacionan el tiempo, la fecha y la ubicación mediante capas visuales que se actualizan al cambiar cualquiera de esos datos.

Está hecho con HTML, CSS, SVG y JavaScript nativo; no necesita instalar dependencias ni compilar. Los cálculos se realizan en el navegador. La ubicación puede obtenerse con la geolocalización del navegador o introducirse mediante coordenadas.

## Estado del proyecto

La primera versión reunió ubicación, hora, Sol, Luna y zodiaco en una esfera. Después se incorporaron el calendario anual, la capa estacional, las efemérides solares y el viajero en fecha y ubicación. La geometría se amplió más tarde al sistema solar y a una vista de rotación terrestre. La interfaz actual añade enfoques para aislar capas, paneles de resultados, temas claro/oscuro y un control de idioma.

La implementación funcional está en `index.html`, `css/` y `scripts/`. `respaldo.md` conserva una concatenación fechada de una versión anterior del proyecto; puede servir para consultar esa etapa, pero no refleja la estructura ni todas las funciones actuales.

## La esfera, capa por capa

La esfera SVG comparte un centro y un eje de lectura. Cada capa traduce una escala de tiempo o una magnitud astronómica a una posición o un anillo; no todas las distancias visuales están a escala física.

| Capa | Qué muestra |
| --- | --- |
| **Marco y reloj** | Agujas de hora, minuto y segundo, lectura digital, marcas y escalas de referencia. La hora se presenta para la ubicación activa. |
| **Día y noche** | Un anillo coloreado según la altura calculada del Sol a lo largo del día local, con transiciones de alba, luz diurna, ocaso y noche. |
| **Sol y Luna** | Su posición aparente se coloca alrededor del anillo según la hora del día. La opacidad depende de la altura sobre el horizonte; la Luna muestra la fase y la fracción iluminada. |
| **Zodiaco tropical** | Doce sectores iguales de 30° vinculados a la longitud eclíptica del Sol y al equinoccio de marzo. Incluye el signo activo y referencias de equinoccios y solsticios. |
| **Trópicos** | Círculos derivados de la latitud activa y de la declinación solar de ±23,44°. |
| **Calendario** | Los doce meses ocupan sectores proporcionales a sus días reales; febrero y los años bisiestos se contemplan. Un marcador señala el día del año. |
| **Estaciones** | Banda anual coloreada según la longitud eclíptica del Sol y el hemisferio. La duración de cada estación no se fuerza a cuatro partes iguales. |
| **Constelaciones zodiacales** | Doce sectores tropicales con ilustraciones, fechas de cruce solar aproximadas y un sector activo. Aquí “constelaciones” nombra una capa didáctica de sectores e imágenes: no es un mapa estelar con límites astronómicos oficiales ni posiciones observadas de estrellas. |
| **Sistema solar** | La Tierra y los otros siete planetas recorren órbitas heliocéntricas calculadas con elementos orbitales aproximados. El panel lateral ofrece longitud, distancia en UA y período. |
| **Rotación terrestre** | Globo con inclinación axial de 23,44°, paralelos, meridianos y ubicación activa. El meridiano central corresponde al punto subsolar; también se indica una velocidad superficial estimada para la latitud seleccionada. |

El menú superior **Astrolabio**, **Reloj**, **Día y noche**, **Zodíaco**, **Calendario**, **Sistema solar** y **Rotación** atenúa las capas ajenas al enfoque elegido. Los ejes de referencia permanecen visibles para facilitar la lectura.

## Modo Viajero

Abre el control con el botón de deslizadores junto a la esfera. El viajero modifica el estado temporal y el lugar activo, y todas las capas que dependen de ellos se recalculan.

- **Fecha y hora:** introduce una fecha en el control nativo y pulsa **Ir a esta fecha**. **Ahora** vuelve al reloj en vivo.
- **Velocidad y sentido:** los controles a los lados de la esfera reproducen el tiempo hacia atrás o hacia adelante. Cada clic en rápido sube por x10, x100, x1.000 y los siguientes órdenes hasta x10M; los controles normales reproducen a x1. Al elegir una fecha se inicia una simulación temporal.
- **Ubicación:** escribe latitud y longitud y pulsa **Ir a esta ubicación**. **Mi ubicación** solicita de nuevo la geolocalización del navegador.
- **Lectura:** las coordenadas, el huso utilizado y los resultados del panel inferior corresponden al lugar y al instante activos. La zona horaria manual se estima a partir de la longitud; no equivale necesariamente a la hora legal local.

## Cómo ejecutarlo y verlo

1. Descarga o clona el proyecto y abre su carpeta en Visual Studio Code.
2. Sirve la carpeta como sitio estático. Puedes usar la extensión **Live Server** y abrir `index.html`, o ejecutar `python -m http.server 8000` desde la carpeta del proyecto y visitar `http://localhost:8000`.
3. Para usar **Mi ubicación**, permite el acceso cuando el navegador lo solicite. La geolocalización suele requerir `localhost` o un sitio servido por HTTPS; abrir el archivo directamente puede impedirla.
4. Usa el menú superior para enfocar una capa, los controles laterales para viajar en tiempo y lugar, y el panel **Resultados actuales** bajo la esfera para consultar las lecturas. **Lectura astronómica** despliega los datos técnicos. El botón del sistema solar abre la tabla planetaria.

La aplicación no requiere un paso de compilación. Si cambias archivos mientras está abierta, recarga la página; una recarga forzada evita usar archivos guardados en caché.

## Estructura del proyecto

```text
index.html                 estructura, paneles y capas SVG
README.md                  guía del proyecto
respaldo.md                copia concatenada anterior; no es la fuente actual
rutas-iconos-svg.md        inventario de rutas de iconos y gráficos
css/
  base.css                 estilos globales básicos
  estructura.css           disposición de la página y controles comunes
  reloj.css                apariencia de la esfera y sus elementos
  viajero.css              panel de fecha y ubicación
  panel.css                tarjetas de resultados
  planetas.css             tabla y panel del sistema solar
  rotacion.css             globo y eje terrestre
  velocidad.css            controles de avance y retroceso
  tema.css                 temas y paletas
  fondo-estrellas.css      fondo estrellado
  fondo-lavado.css         fondo claro
  secciones.css            secciones inferiores de la página
scripts/
  hora-local.js            conversión entre instante, hora de pared y huso
  estado-tiempo.js         reloj en vivo y fecha simulada
  viajero.js               controles de fecha y coordenadas
  velocidad.js             controles de velocidad y sentido
  ubicacion.js             geolocalización, búsqueda inversa y huso estimado
  astronomia.js            posiciones del Sol y la Luna, altura y fase
  efemerides-solares.js    salidas, puestas, crepúsculos y hora solar
  eventos-solares.js       anillo diario de luz y oscuridad
  hora.js                  agujas y marcas temporales
  marco.js                 escalas y geometría de referencia
  calendario.js            meses, días y marcador anual
  referencias-estacionales.js equinoccios, solsticios y banda estacional
  zodiaco.js               sectores y etiquetas del zodiaco
  indicador-zodiaco.js     signo activo
  tropicos.js              círculos de los trópicos
  constelaciones.js        sectores e ilustraciones zodiacales
  planetas.js              elementos y posiciones planetarias
  traslacion.js            órbitas y posiciones del sistema solar
  rotacion.js              globo, meridianos y punto subsolar
  panel-resultados.js      lecturas civiles y astronómicas
  panel-planetas.js        tabla de posiciones planetarias
  enfoque-capas.js         filtros de visualización
  tema.js                  modos Auto, día y noche
  idioma.js                estado del selector ES/EN
  main.js                  inicialización y actualización de la esfera
svg/
  iconos/                  iconos del panel y del tema
  logo/                    marca gráfica
  zodiaco occidental/      figuras, símbolos y constelaciones zodiacales
  zodiaco chino/           figuras y símbolos disponibles para uso futuro
```

Los scripts se cargan desde `index.html` en orden porque comparten funciones y estado global. La carpeta de recursos incluye gráficos que todavía no forman parte de la vista principal.

## Precisión y aproximaciones

AD ASTRA sirve para visualizar ciclos y relaciones astronómicas; no es un instrumento de navegación ni una fuente de efemérides de alta precisión.

- **Sol:** la longitud eclíptica, la declinación, la ascensión recta y la altura se obtienen con fórmulas astronómicas compactas. La salida y la puesta se encuentran recorriendo el día en pasos de un minuto e interpolando el cruce entre muestras; el mediodía se toma de la muestra de altura máxima. El código documenta una resolución aproximada de ±1–2 minutos para estos eventos, no una garantía universal.
- **Horizonte y crepúsculos:** la salida y puesta usan el umbral de −0,833° para representar el semidiámetro solar y la refracción estándar. No se modelan presión, temperatura, elevación del observador, relieve u obstrucciones del horizonte; por eso la hora observada puede diferir. Alba y ocaso civil, náutico y astronómico usan −6°, −12° y −18°.
- **Luna:** la posición y la iluminación usan términos periódicos simplificados y un ciclo sinódico medio. Son representaciones visuales aproximadas; no incorporan perturbaciones orbitales completas ni topografía lunar. Que se dibuje cerca del horizonte no predice condiciones reales de observación.
- **Posición en la esfera:** Sol y Luna se colocan sobre una órbita circular de dial usando el ángulo horario. El anillo comunica cuándo están sobre/bajo el horizonte mediante altura y opacidad, pero la posición radial no es una proyección topográfica del horizonte local ni da el azimut celeste real.
- **Planetas:** `planetas.js` usa elementos keplerianos aproximados atribuidos en el código a JPL, indicados como válidos para 1800–2050. Fuera de ese intervalo el error crece. Las distancias del sistema solar se comprimen mediante una escala no lineal para que quepan en la esfera; tamaños y órbitas no comparten escala visual.
- **Calendario y husos:** en geolocalización, la hora de pared usa el huso del dispositivo y puede no representar la zona legal del lugar si dispositivo y ubicación no coinciden. Para coordenadas manuales se redondea la longitud a franjas de 15°; no se consideran fronteras políticas ni horario de verano. En consecuencia, conversiones de hora manuales también son aproximadas.
- **Zodiaco y estaciones:** el zodiaco es tropical: doce sectores iguales referidos al equinoccio de marzo. Las constelaciones ilustradas siguen esos sectores, no los límites desiguales de las constelaciones astronómicas. La banda estacional toma la longitud del Sol al mediodía UTC de cada día y suaviza el color en ±12° alrededor de los cambios; es una visualización diaria, no el cálculo de los instantes exactos de equinoccio y solsticio.
- **Rotación:** la inclinación axial es fija en 23,44° y la velocidad ecuatorial de referencia es constante. Es un modelo didáctico, no incluye variaciones de la orientación del eje ni de la rotación terrestre.
- **Eclipses:** no se calculan eclipses reales. El color rojizo lunar es solo una base visual, no una detección de eclipse.

## Por resolver

- Implementar traducciones reales: el control ES/EN cambia el idioma declarado, guarda la preferencia y emite un evento, pero los textos de la interfaz todavía están en español.
- Completar la sección **Infografía**, que por ahora es un espacio de contenido pendiente.
- Añadir un panel de próximos eventos con fechas calculadas de equinoccios, solsticios y fases lunares.
- Desarrollar una selección geográfica más sencilla, como mapa o búsqueda de lugar, y mejorar la selección de fecha para viajar.
- Calcular nodos lunares y eclipses con un modelo de precisión apropiada antes de presentar predicciones.
- Ampliar los objetos celestes observables: lluvias de meteoros, cometas y visibilidad planetaria local.
- Preparar la página pública y el despliegue en GitHub Pages.

## Dependencias externas

La aplicación no usa librerías JavaScript. El navegador proporciona la geolocalización; Nominatim de OpenStreetMap hace la búsqueda inversa para mostrar ciudad y país, y Google Fonts sirve Playfair Display. Sin conexión pueden faltar la localidad o la tipografía externa, pero las coordenadas y los cálculos locales siguen siendo la base de la vista.
