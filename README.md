# AD ASTRA — Reloj astronómico 2D

**AD ASTRA** es un reloj astronómico interactivo inspirado en el Orloj de Praga. Reúne en una esfera el reloj civil, el recorrido anual del Sol, el cielo local y una representación del sistema solar. La intención es didáctica: explorar cómo se relacionan el tiempo, la fecha y la ubicación mediante capas visuales que se actualizan al cambiar cualquiera de esos datos.

Está hecho con HTML, CSS, SVG y JavaScript nativo; no necesita instalar dependencias ni compilar. Los cálculos se realizan en el navegador. La ubicación puede obtenerse con la geolocalización del navegador o introducirse mediante coordenadas.

---

## Estructura de capas (esfera SVG)

La esfera SVG comparte un centro y un eje de lectura. Cada capa traduce una escala de tiempo o una magnitud astronómica a una posición o un anillo; no todas las distancias visuales están a escala física.

| # | Capa | Sub-capas | Qué muestra |
|---|------|-----------|-------------|
| 1 | **Marco y reloj** | — | Agujas de hora, minuto y segundo, lectura digital (`#hora-digital`, `#fecha-digital`), marcas de hora con números romanos y escala de 60 min. Las marcas aparecen en la cara externa del anillo día/noche (r = 600 – 680). |
| 2 | **Día y noche** | — | Anillo coloreado según la altura solar calculada a lo largo del día local, con transiciones de alba, luz diurna, ocaso y noche. Se actualiza cuando cambia la fecha, la ubicación o el huso horario. |
| 3 | **Sol y Luna** | — | Posiciones aparentes del Sol y la Luna alrededor del anillo según la hora del día. La opacidad depende de la altura sobre el horizonte; la Luna muestra la fase real (creciente, gibosa, llena) y la fracción iluminada. |
| 4 | **Zodiaco tropical** | — | Doce sectores de 30° vinculados a la longitud eclíptica del Sol, comenzando en el equinoccio de marzo. Incluye nombres y símbolos zodiacales (♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓). Un indicador muestra el signo solar activo. |
| 5 | **Eventos estacionales** | — | Cuatro círculos de referencia (equinoccios de primavera/otoño, solsticios de verano/invierno) basados en la longitud eclíptica real del Sol. Cada día del año se colorea según la posición del Sol (bandas entre los radios 740 y 780). El color se mezcla gradualmente en los límites de cada estación, con una duración real y no forzada a cuartos iguales. |
| 6 | **Trópicos** | — | Círculos derivados de la latitud activa y de la declinación solar de ±23,44° (Cáncer y Capricornio). Calculan la altura máxima al mediodía para la ubicación del usuario. |
| 7 | **Calendario** | **Estaciones** (sub-capa) | Los doce meses ocupan sectores proporcionales a sus días reales (febrero y años bisiestos considerados). Un marcador fijo señala el día actual. Entre los radios 740 y 780 se superpone un anillo de 4 colores que indica la estación actual, con transición gradual de ±12° de longitud en cada frontera. |
| 8 | **Sistema solar** | — | La Tierra y los otros siete planetas (Mercurio, Venus, Marte, Júpiter, Saturno, Urano, Neptuno) recorren órbitas heliocéntricas calculadas con elementos keplerianos aproximados. El botón del cajón lateral alterna la proyección XY (plano eclíptico) con la XZ ( vista de canto, muestra altura orbital). El panel lateral muestra distancia en UA, longitud orbital y período de cada planeta, además del arco mínimo que los contiene (menor = más alineados). |
| 9 | **Rotación terrestre** | — | Un globo con inclinación axial de 23,44°, paralelos y meridianos. El meridiano central corresponde al punto subsolar. Indica una velocidad superficial estimada para la latitud seleccionada. |
| 10 | **Panel de resultados** | **Lecturas civiles** | Tarjetas que muestran: lugar, coordenadas, fecha, huso horario, salida/puesta del Sol, duración del día, fase lunar, signo solar, estación, alba/ocaso civil, náutico y astronómico, hora solar verdadera, ecuación del tiempo, altura del Sol y de la Luna. |
| 11 | **Enfoque de capas** | — | El menú superior (**Astrolabio**, **Reloj**, **Día y noche**, **Zodiaco**, **Calendario**, **Sistema solar**) atenúa las capas no seleccionadas, dejando visibles solo las del enfoque elegido. Los ejes de referencia (0° Horizonte, huso GMT) permanecen visibles siempre. |

---

## Viajero (cajón lateral)

Abre el control con el botón de deslizadores junto a la esfera. El viajero modifica el estado temporal y el lugar activo, y todas las capas que dependen de ellos se recalculan.

- **Fecha y hora:** introduce una fecha en el control `datetime-local` y pulsa **Ir a esta fecha**. **Ahora** vuelve al reloj en vivo.
- **Velocidad y sentido:** los controles a los lados de la esfera reproducen el tiempo hacia atrás o hacia adelante. Velocidades disponibles: x1 (activo), x100, x1 000, x10 000, x1 000 000, x10 000 000.
- **Ubicación:** escribe latitud y longitude y pulsa **Ir a esta ubicación**. **Mi ubicación** solicita la geolocalización del navegador.
- **Lectura:** las coordenadas, el huso utilizado y los resultados del panel inferior corresponden al lugar y al instante activos. La zona horaria manual se estima a partir de la longitud (redondeo a franjas de 15 °); no equivale necesariamente a la hora legal local.

---

## Cómo ejecutarlo y verlo

1. Abre la carpeta del proyecto en **Visual Studio Code**.
2. Sirve la carpeta como sitio estático. Puedes usar la extensión **Live Server** y hacer clic derecho sobre `index.html` → **Open with Live Server**, o ejecutar `python -m http.server 8000` desde la carpeta del proyecto y visitar `http://localhost:8000`.
3. Para usar **Mi ubicación**, permite el acceso cuando el navegador lo solicite. La geolocalización suele requerir `localhost` o un sitio servido por HTTPS; abrir el archivo directamente puede impedirla.
4. Usa el menú superior para enfocar una capa, los controles laterales para viajar en tiempo y lugar, y el panel **Resultados actuales** bajo la esfera para consultar las lecturas. **Lectura astronómica** despliega los datos técnicos. El botón del sistema solar abre la tabla planetaria.

La aplicación no requiere un paso de compilación. Si cambias archivos mientras está abierta, recarga la página; una recarga forzada (**Ctrl + Shift + R**) evita usar archivos guardados en caché.

---

## Estructura actual del proyecto

```text
index.html                        estructura, paneles y capas SVG
README.md                         guía del proyecto
css/
  base.css                        estilos globales básicos
  reloj.css                       apariencia de la esfera y sus elementos
  viajero.css                     panel de fecha y ubicación
  planetas.css                    tabla y panel del sistema solar
  panel.css                       tarjetas de resultados
  estructura.css                  disposición de la página y controles comunes
  tema.css                        temas y paletas
scripts/
  hora-local.js                   conversión entre instante, hora de pared y huso
  hora.js                         agujas y marcas temporales
  estado-tiempo.js                reloj en vivo y fecha simulada
  viajero.js                      controles de fecha y coordenadas
  marco.js                        escalas y geometría de referencia
  calendario.js                   meses, días y marcador anual
  ubicacion.js                    geolocalización, búsqueda inversa y huso estimado
  astronomia.js                   posiciones del Sol y la Luna, altura y fase
  fase-lunar.js                   construcción del path SVG de la fase lunar
  planetas.js                     elementos y posiciones planetarias
  traslacion.js                   órbitas y posiciones del sistema solar
  indicador-zodiaco.js            signo activo del zodiaco
  referencias-estacionales.js     equinoccios, solsticios y banda estacional
  tropicos.js                     círculos de los trópicos
  eventos-solares.js              anillo diario de luz y oscuridad
  zodiaco.js                      sectores y etiquetas del zodiaco
  efemerides-solares.js           salidas, puestas, crepúsculos y hora solar
  panel-resultados.js             lecturas civiles y astronómicas
  panel-planetas.js               tabla de posiciones planetarias
  enfoque-capas.js                filtros de visualización por capa
  tema.js                         modos Auto, día y noche
main.js                           inicialización y actualización de la esfera
```

Los scripts se cargan desde `index.html` en el orden listado porque comparten funciones y estado global. El orden importa: cada módulo asume que los que depende ya están definidos.

---

## Precisión y aproximaciones

AD ASTRA sirve para visualizar ciclos y relaciones astronómicas; no es un instrumento de navegación ni una fuente de efemérides de alta precisión.

- **Sol:** la longitud eclíptica, la declinación, la ascensión recta y la altura se obtienen con fórmulas astronómicas compactas. La salida y la puesta se encuentran recorriendo el día en pasos de un minuto e interpolando el cruce entre muestras; el mediodía se toma de la muestra de altura máxima. Resolución aproximada de ±1–2 min para estos eventos.
- **Horizonte y crepúsculos:** la salida y puesta usan el umbral de −0,833° para representar el semidiámetro solar y la refracción estándar. No se modelan presión, temperatura, elevación del observador, relieve u obstrucciones del horizonte.
- **Luna:** la posición y la iluminación usan términos periódicos simplificados y un ciclo sinódico medio. Representaciones visuales aproximadas; no incorporan perturbaciones orbitales completas ni topografía lunar.
- **Posición en la esfera:** Sol y Luna se colocan usando el ángulo horario sobre una órbita circular de dial. La posición radial no es una proyección topográfica del horizonte local ni da el azimut celeste real.
- **Planetas y alineaciones:** `planetas.js` usa elementos keplerianos aproximados (JPL, válidos 1800–2050). La vista XY proyecta el plano de la eclíptica; la XZ observa el sistema de canto. Las distancias del sistema solar se comprimen mediante una escala no lineal para que quepan en la esfera; tamaños y órbitas no comparten escala visual.
- **Calendario y husos:** en geolocalización, la hora de pared usa el huso del dispositivo y puede no representar la zona legal del lugar. Para coordenadas manuales se redondea la longitud a franjas de 15 °; no se consideran fronteras políticas ni horario de verano.
- **Zodiaco y estaciones:** el zodiaco es tropical: doce sectores iguales referidos al equinoccio de marzo. La banda estacional toma la longitud del Sol al mediodía UTC de cada día y suaviza el color en ±12° alrededor de los cambios; es una visualización diaria, no el cálculo de los instantes exactos de equinoccio y solsticio.
- **Rotación:** la inclinación axial es fija en 23,44° y la velocidad ecuatorial de referencia es constante. Modelo didáctico, no incluye variaciones de la orientación del eje ni de la rotación terrestre.

---

## Por resolver / Pendientes

- **Panel de información "Próximos eventos":** añadir un panel que muestre próximas fases lunares, equinoccios y solsticios con fechas calculadas.
- **Distinción de capas por cursor:** resaltar la capa bajo el cursor y mostrar su nombre.
- **Nodos lunares y eclipses:** incluir la luna roja (el motor de color ya está preparado) y geometría de eclipses.
- **Astrales:** lluvias de meteoros, cometas y planetas según visibilidad por ubicación.
- **Viajero avanzado:** mapa interactivo y selector de fecha propio con controles más granulares.
- **Landing page** con sección de blog y publicación en GitHub Pages (construyéndola por secciones).
- **Traducciones reales:** el control ES/EN cambia el idioma declarado, guarda la preferencia y emite un evento, pero los textos de la interfaz todavía están en español.
- **Completar la sección Infografía:** espacio de contenido pendiente.

---

## Dependencias externas

La aplicación no usa librerías JavaScript. El navegador proporciona la geolocalización; Nominatim de OpenStreetMap hace la búsqueda inversa para mostrar ciudad y país, y Google Fonts sirve Playfair Display. Sin conexión pueden faltar la localidad o la tipografía externa, pero las coordenadas y los cálculos locales siguen siendo la base de la vista.

---

**Última actualización:** 06 de octubre de 2026