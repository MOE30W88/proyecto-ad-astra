# Codigo de paginas internas

Fuentes actuales de las paginas internas y todos los archivos CSS y JavaScript locales enlazados desde ellas.

## Paginas HTML

### `paginas/alcance.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AD ASTRA — Alcance</title>
    <script>try{var p=localStorage.getItem("tema-preferencia")||"auto",h=new Date().getHours();document.documentElement.dataset.tema=p==="auto"?(h>=6&&h<18?"dia":"noche"):p}catch(e){}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/tema.css" />
    <link rel="stylesheet" href="../css/estructura.css" />
    <link rel="stylesheet" href="../css/alcance.css" />
    <link rel="stylesheet" href="../css/pie.css" />
    <link rel="stylesheet" href="../css/fondo-estrellas.css" />
    <link rel="stylesheet" href="../css/fondo-lavado.css" />
    <script src="../scripts/astronomia.js" defer></script>
    <script src="../scripts/ubicacion.js" defer></script>
    <script src="../scripts/tema.js" defer></script>
    <script src="../scripts/idioma.js" defer></script>
  </head>
  <body>
    <div id="fondo-lavado" aria-hidden="true"></div>
    <div id="fondo-estrellas" aria-hidden="true">
      <div class="estrellas-fondo estrellas-a"></div>
      <div class="estrellas-fondo estrellas-b"></div>
    </div>
    <div id="contenedor-app">
      <header class="cabecera menu-secciones">
        <a class="logo" href="../index.html" aria-label="AD ASTRA, ir al Astrolabio">
          <span class="logo-marca" aria-hidden="true"></span>
          <span>AD ASTRA</span>
        </a>
        <nav class="nav-secciones" aria-label="Navegación del sitio">
          <a href="../index.html">Astrolabio</a>
          <a href="alcance.html" class="activa" aria-current="page">Alcance</a>
          <a href="matematicas.html">Matemáticas</a>
          <a href="infografias.html">Infografías</a>
          <a href="acerca-de.html">Acerca de mí</a>
          <a href="soporte.html">Soporte</a>
        </nav>
        <div class="cabecera-acciones">
          <button type="button" id="boton-idioma" class="boton-tema boton-idioma" title="Cambiar idioma" aria-label="Cambiar idioma">ES</button>
          <div class="control-tema" role="group" aria-label="Modo de color">
            <button type="button" class="control-tema-opcion" data-tema-pref="auto">Auto</button>
            <button type="button" class="control-tema-opcion" data-tema-pref="dia"><span class="icono-svg icono-dia" aria-hidden="true"></span></button>
            <button type="button" class="control-tema-opcion" data-tema-pref="noche"><span class="icono-svg icono-noche" aria-hidden="true"></span></button>
          </div>
        </div>
      </header>
      <main>
        <section class="hero">
          <p class="hero-etiqueta">Los límites de la precisión</p>
          <h1 class="hero-titular">
            Modelos, incertidumbre y alcance de los cálculos astronómicos.
          </h1>
        </section>

        <div class="contenido-pagina">

          <!-- Introducción -->
          <section class="alcance-introduccion" aria-labelledby="titulo-introduccion">
            <h2 id="titulo-introduccion">El alcance de nuestros cálculos</h2>

            <p>
              AD ASTRA combina modelos matemáticos y astronómicos para representar
              el movimiento de los astros y calcular distintos fenómenos celestes.
              La fiabilidad de cada resultado depende del método utilizado,
              los datos disponibles y las aproximaciones inherentes al cálculo.
            </p>

            <p>
              En esta sección se documentan los modelos empleados, la precisión
              conocida, las fuentes de incertidumbre y los límites de cada proceso.
              El objetivo es ofrecer una visión transparente de las capacidades
              del proyecto y proporcionar el contexto necesario para interpretar
              sus resultados.
            </p>

            <p class="alcance-destacado">
              Conocer las limitaciones de un modelo es parte fundamental
              de comprender sus resultados.
            </p>
          </section>

          <!-- Navegación interna -->
          <nav class="alcance-nav" aria-label="Contenido de Alcance">
            <p class="alcance-nav-etiqueta">Contenido</p>

            <ol>
              <li>
                <a href="#precision">
                  <span>01</span>
                  Precisión e incertidumbre
                </a>
              </li>
              <li>
                <a href="#modelos">
                  <span>02</span>
                  Modelos de cálculo
                </a>
              </li>
              <li>
                <a href="#fenomenos">
                  <span>03</span>
                  Precisión por fenómeno
                </a>
              </li>
              <li>
                <a href="#condiciones">
                  <span>04</span>
                  Límites temporales y geográficos
                </a>
              </li>
              <li>
                <a href="#validacion">
                  <span>05</span>
                  Validación y limitaciones conocidas
                </a>
              </li>
              <li>
                <a href="#referencias">
                  <span>06</span>
                  Fuentes y referencias
                </a>
              </li>
            </ol>
          </nav>

          <!-- 01. Precisión e incertidumbre -->
          <section id="precision" class="alcance-seccion">
            <p class="seccion-etiqueta">01 — Fundamentos</p>
            <h2>Precisión, error e incertidumbre</h2>

            <p>
              Para interpretar correctamente un resultado astronómico es necesario
              distinguir entre la diferencia respecto a un valor de referencia,
              la incertidumbre asociada al resultado y el nivel de detalle con
              el que se representa.
            </p>

            <div class="alcance-conceptos">
              <article class="alcance-concepto">
                <h3>Error</h3>
                <p>
                  Diferencia entre un resultado calculado y un valor de referencia,
                  expresada en una unidad apropiada.
                </p>
              </article>

              <article class="alcance-concepto">
                <h3>Incertidumbre</h3>
                <p>
                  Estimación de la duda asociada a un resultado, considerando
                  los datos, los modelos y las aproximaciones utilizados.
                </p>
              </article>

              <article class="alcance-concepto">
                <h3>Resolución</h3>
                <p>
                  Nivel de detalle con el que el sistema expresa o representa
                  un resultado.
                </p>
              </article>
            </div>

            <aside class="alcance-nota">
              <h3>Una distinción fundamental</h3>
              <p>
                Mostrar más decimales no garantiza que un resultado sea
                más preciso.
              </p>
            </aside>
          </section>

          <!-- 02. Modelos de cálculo -->
          <section id="modelos" class="alcance-seccion">
            <p class="seccion-etiqueta">02 — Metodología</p>
            <h2>Modelos de cálculo</h2>

            <p>
              Los fenómenos astronómicos pueden requerir métodos de cálculo
              diferentes según el objetivo y el nivel de precisión necesario.
              En este apartado se documentarán los modelos utilizados por
              AD ASTRA y su aplicación dentro del proyecto.
            </p>

            <div class="alcance-placeholder">
              <h3>Modelos utilizados</h3>
              <p>
                Documentación pendiente: modelo, fuente, aplicación,
                intervalo de validez y precisión documentada.
              </p>
            </div>
          </section>

          <!-- 03. Precisión por fenómeno -->
          <section id="fenomenos" class="alcance-seccion">
            <p class="seccion-etiqueta">03 — Evaluación</p>
            <h2>Precisión por fenómeno</h2>

            <p>
              Cada cálculo tiene características y fuentes de incertidumbre
              propias. Por ello, la precisión debe documentarse por separado
              y no atribuirse de forma general a todo el proyecto.
            </p>

            <div class="alcance-fenomenos">

              <article class="alcance-fenomeno">
                <h3>El Sol</h3>
                <p>
                  Posición solar, declinación, altura y eventos solares.
                </p>
                <a href="#referencias">Consultar modelo y referencias</a>
              </article>

              <article class="alcance-fenomeno">
                <h3>La Luna</h3>
                <p>
                  Posición lunar y aproximaciones utilizadas en los cálculos.
                </p>
                <a href="#referencias">Consultar modelo y referencias</a>
              </article>

              <article class="alcance-fenomeno">
                <h3>Eclipses</h3>
                <p>
                  Modelos geométricos, condiciones de cálculo y limitaciones
                  de las predicciones.
                </p>
                <a href="#referencias">Consultar modelo y referencias</a>
              </article>

              <article class="alcance-fenomeno">
                <h3>Reloj astronómico</h3>
                <p>
                  Hora solar, ecuación del tiempo y representación de los ciclos.
                </p>
                <a href="#referencias">Consultar modelo y referencias</a>
              </article>

              <article class="alcance-fenomeno">
                <h3>Analema</h3>
                <p>
                  Representación de la declinación solar y la ecuación del tiempo.
                </p>
                <a href="#referencias">Consultar modelo y referencias</a>
              </article>
            </div>

            <p class="alcance-aclaracion">
              Los valores cuantitativos de precisión se incorporarán cuando
              estén documentados o se hayan contrastado con referencias
              independientes.
            </p>
          </section>

          <!-- 04. Límites temporales y geográficos -->
          <section id="condiciones" class="alcance-seccion">
            <p class="seccion-etiqueta">04 — Condiciones de cálculo</p>
            <h2>Límites temporales y geográficos</h2>

            <p>
              Los resultados pueden depender del intervalo temporal cubierto
              por el modelo, de la fecha y hora seleccionadas, de las coordenadas
              geográficas y del tratamiento de las escalas de tiempo.
            </p>

            <div class="alcance-placeholder">
              <h3>Intervalos y condiciones de validez</h3>
              <p>
                Aquí se indicarán los intervalos admitidos, las condiciones
                de uso y los comportamientos que requieren precaución.
              </p>
            </div>
          </section>

          <!-- 05. Validación -->
          <section id="validacion" class="alcance-seccion">
            <p class="seccion-etiqueta">05 — Verificación</p>
            <h2>Validación y limitaciones conocidas</h2>

            <p>
              La validación permite evaluar el comportamiento de los cálculos
              mediante su comparación con referencias independientes y pruebas
              reproducibles.
            </p>

            <div class="alcance-placeholder">
              <h3>Pruebas y resultados</h3>
              <p>
                Se documentarán las referencias utilizadas, las diferencias
                observadas, las pruebas realizadas y las limitaciones pendientes
                de verificar.
              </p>
            </div>
          </section>

          <!-- 06. Fuentes -->
          <section id="referencias" class="alcance-seccion">
            <p class="seccion-etiqueta">06 — Documentación</p>
            <h2>Fuentes y referencias</h2>

            <p>
              Las fuentes permiten identificar los modelos, métodos y datos
              utilizados para fundamentar los cálculos de AD ASTRA.
            </p>

            <ul class="alcance-referencias">
              <li>
                <span>01</span>
                <div>
                  <h3>Modelos y métodos astronómicos</h3>
                  <p>Referencias técnicas de los algoritmos utilizados.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Fuentes de datos</h3>
                  <p>Efemérides, catálogos y referencias de comparación.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Documentación del proyecto</h3>
                  <p>Implementación, criterios de validación y limitaciones.</p>
                </div>
              </li>
            </ul>
          </section>

          <!-- Cierre -->
          <footer class="alcance-cierre">
            <p class="seccion-etiqueta">AD ASTRA</p>
            <h2>Comprender también significa reconocer los límites.</h2>
            <p>
              La interpretación responsable de un resultado comienza por
              conocer el modelo que lo produce, sus condiciones de validez
              y la incertidumbre asociada.
            </p>
          </footer>

        </div>
      </main>
      <footer id="pie" class="pie pie-minimo">
        <div class="pie-final">
          <span>© 2026 Moisés Soriano · AD ASTRA · Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  </body>
</html>
```

### `paginas/matematicas.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AD ASTRA — Matemáticas</title>
    <script>try{var p=localStorage.getItem("tema-preferencia")||"auto",h=new Date().getHours();document.documentElement.dataset.tema=p==="auto"?(h>=6&&h<18?"dia":"noche"):p}catch(e){}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/tema.css" />
    <link rel="stylesheet" href="../css/estructura.css" />
    <link rel="stylesheet" href="../css/matematicas.css" />
    <link rel="stylesheet" href="../css/pie.css" />
    <link rel="stylesheet" href="../css/fondo-estrellas.css" />
    <link rel="stylesheet" href="../css/fondo-lavado.css" />
    <script src="../scripts/astronomia.js" defer></script>
    <script src="../scripts/ubicacion.js" defer></script>
    <script src="../scripts/tema.js" defer></script>
    <script src="../scripts/idioma.js" defer></script>
  </head>
  <body>
    <div id="fondo-lavado" aria-hidden="true"></div>
    <div id="fondo-estrellas" aria-hidden="true">
      <div class="estrellas-fondo estrellas-a"></div>
      <div class="estrellas-fondo estrellas-b"></div>
    </div>
    <div id="contenedor-app">
      <header class="cabecera menu-secciones">
        <a class="logo" href="../index.html" aria-label="AD ASTRA, ir al Astrolabio">
          <span class="logo-marca" aria-hidden="true"></span>
          <span>AD ASTRA</span>
        </a>
        <nav class="nav-secciones" aria-label="Navegación del sitio">
          <a href="../index.html">Astrolabio</a>
          <a href="alcance.html">Alcance</a>
          <a href="matematicas.html" class="activa" aria-current="page">Matemáticas</a>
          <a href="infografias.html">Infografías</a>
          <a href="acerca-de.html">Acerca de mí</a>
          <a href="soporte.html">Soporte</a>
        </nav>
        <div class="cabecera-acciones">
          <button type="button" id="boton-idioma" class="boton-tema boton-idioma" title="Cambiar idioma" aria-label="Cambiar idioma">ES</button>
          <div class="control-tema" role="group" aria-label="Modo de color">
            <button type="button" class="control-tema-opcion" data-tema-pref="auto">Auto</button>
            <button type="button" class="control-tema-opcion" data-tema-pref="dia"><span class="icono-svg icono-dia" aria-hidden="true"></span></button>
            <button type="button" class="control-tema-opcion" data-tema-pref="noche"><span class="icono-svg icono-noche" aria-hidden="true"></span></button>
          </div>
        </div>
      </header>
      <main>
        <section class="hero">
          <p class="hero-etiqueta">Reloj astronómico</p>
          <h1 class="hero-titular">El cielo, el tiempo y la posición del Sol en una sola esfera.</h1>
        </section>
        <div class="pagina-matematicas">
          <nav class="menu-matematicas" aria-label="Capas del Astrolabio">
            <a class="menu-matematicas-principal" href="../index.html">Astrolabio</a>
            <details class="menu-matematicas-grupo"><summary>Reloj</summary><ul>
              <li>Fondo del reloj</li><li>Marco y escala horaria</li><li>Escala de minutos</li><li>Aguja horaria</li><li>Aguja minutera</li><li>Segundero</li><li>Marcadores del reloj</li><li>Analema</li>
            </ul></details>
            <details class="menu-matematicas-grupo"><summary>Día y noche</summary><ul>
              <li>Eventos solares</li><li>Sol</li><li>Luna</li><li>Planetas sobre el horizonte</li><li>Eclipse</li><li>Horizonte</li><li>Marcas de eventos</li>
            </ul></details>
            <details class="menu-matematicas-grupo"><summary>Lunario</summary><ul><li>Fase lunar</li></ul></details>
            <details class="menu-matematicas-grupo"><summary>Zodíaco</summary><ul>
              <li>Franja zodiacal</li><li>Indicador zodiacal</li><li>Referencias estacionales</li><li>Marcador estacional</li><li>Trópicos</li><li>Constelaciones</li><li>Sol central</li>
            </ul></details>
            <details class="menu-matematicas-grupo"><summary>Calendario</summary><ul>
              <li>Calendario</li><li>Marcador de fecha</li><li>Estaciones</li><li>Calendario chino</li><li>Sol central</li>
            </ul></details>
            <details class="menu-matematicas-grupo"><summary>Sistema solar</summary><ul>
              <li>Órbita terrestre</li><li>Órbitas planetarias</li><li>Asteroides</li><li>Alineación planetaria</li><li>Planetas</li><li>Sol central</li><li>Planetas en primer plano</li>
            </ul></details>
            <details class="menu-matematicas-grupo"><summary>Rotación</summary><ul><li>Representación de la rotación</li><li>Eje de rotación</li></ul></details>
          </nav>
          <div class="contenido-pagina" aria-label="Espacio reservado para el contenido"></div>
        </div>
      </main>
      <footer id="pie" class="pie pie-minimo">
        <div class="pie-final">
          <span>© 2026 Moisés Soriano · AD ASTRA · Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  </body>
</html>
```

### `paginas/infografias.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AD ASTRA — Infografías</title>
    <script>try{var p=localStorage.getItem("tema-preferencia")||"auto",h=new Date().getHours();document.documentElement.dataset.tema=p==="auto"?(h>=6&&h<18?"dia":"noche"):p}catch(e){}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/tema.css" />
    <link rel="stylesheet" href="../css/estructura.css" />
    <link rel="stylesheet" href="../css/pie.css" />
    <link rel="stylesheet" href="../css/fondo-estrellas.css" />
    <link rel="stylesheet" href="../css/fondo-lavado.css" />
    <script src="../scripts/astronomia.js" defer></script>
    <script src="../scripts/ubicacion.js" defer></script>
    <script src="../scripts/tema.js" defer></script>
    <script src="../scripts/idioma.js" defer></script>
  </head>
  <body>
    <div id="fondo-lavado" aria-hidden="true"></div>
    <div id="fondo-estrellas" aria-hidden="true">
      <div class="estrellas-fondo estrellas-a"></div>
      <div class="estrellas-fondo estrellas-b"></div>
    </div>
    <div id="contenedor-app">
      <header class="cabecera menu-secciones">
        <a class="logo" href="../index.html" aria-label="AD ASTRA, ir al Astrolabio">
          <span class="logo-marca" aria-hidden="true"></span>
          <span>AD ASTRA</span>
        </a>
        <nav class="nav-secciones" aria-label="Navegación del sitio">
          <a href="../index.html">Astrolabio</a>
          <a href="alcance.html">Alcance</a>
          <a href="matematicas.html">Matemáticas</a>
          <a href="infografias.html" class="activa" aria-current="page">Infografías</a>
          <a href="acerca-de.html">Acerca de mí</a>
          <a href="soporte.html">Soporte</a>
        </nav>
        <div class="cabecera-acciones">
          <button type="button" id="boton-idioma" class="boton-tema boton-idioma" title="Cambiar idioma" aria-label="Cambiar idioma">ES</button>
          <div class="control-tema" role="group" aria-label="Modo de color">
            <button type="button" class="control-tema-opcion" data-tema-pref="auto">Auto</button>
            <button type="button" class="control-tema-opcion" data-tema-pref="dia"><span class="icono-svg icono-dia" aria-hidden="true"></span></button>
            <button type="button" class="control-tema-opcion" data-tema-pref="noche"><span class="icono-svg icono-noche" aria-hidden="true"></span></button>
          </div>
        </div>
      </header>
      <main>
        <section class="hero">
          <p class="hero-etiqueta">Reloj astronómico</p>
          <h1 class="hero-titular">El cielo, el tiempo y la posición del Sol en una sola esfera.</h1>
        </section>
        <div class="contenido-pagina" aria-label="Espacio reservado para el contenido"></div>
      </main>
      <footer id="pie" class="pie pie-minimo">
        <div class="pie-final">
          <span>© 2026 Moisés Soriano · AD ASTRA · Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  </body>
</html>
```

### `paginas/acerca-de.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AD ASTRA — Acerca de mí</title>
    <script>try{var p=localStorage.getItem("tema-preferencia")||"auto",h=new Date().getHours();document.documentElement.dataset.tema=p==="auto"?(h>=6&&h<18?"dia":"noche"):p}catch(e){}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/tema.css" />
    <link rel="stylesheet" href="../css/estructura.css" />
    <link rel="stylesheet" href="../css/pie.css" />
    <link rel="stylesheet" href="../css/fondo-estrellas.css" />
    <link rel="stylesheet" href="../css/fondo-lavado.css" />
    <script src="../scripts/astronomia.js" defer></script>
    <script src="../scripts/ubicacion.js" defer></script>
    <script src="../scripts/tema.js" defer></script>
    <script src="../scripts/idioma.js" defer></script>
  </head>
  <body>
    <div id="fondo-lavado" aria-hidden="true"></div>
    <div id="fondo-estrellas" aria-hidden="true">
      <div class="estrellas-fondo estrellas-a"></div>
      <div class="estrellas-fondo estrellas-b"></div>
    </div>
    <div id="contenedor-app">
      <header class="cabecera menu-secciones">
        <a class="logo" href="../index.html" aria-label="AD ASTRA, ir al Astrolabio">
          <span class="logo-marca" aria-hidden="true"></span>
          <span>AD ASTRA</span>
        </a>
        <nav class="nav-secciones" aria-label="Navegación del sitio">
          <a href="../index.html">Astrolabio</a>
          <a href="alcance.html">Alcance</a>
          <a href="matematicas.html">Matemáticas</a>
          <a href="infografias.html">Infografías</a>
          <a href="acerca-de.html" class="activa" aria-current="page">Acerca de mí</a>
          <a href="soporte.html">Soporte</a>
        </nav>
        <div class="cabecera-acciones">
          <button type="button" id="boton-idioma" class="boton-tema boton-idioma" title="Cambiar idioma" aria-label="Cambiar idioma">ES</button>
          <div class="control-tema" role="group" aria-label="Modo de color">
            <button type="button" class="control-tema-opcion" data-tema-pref="auto">Auto</button>
            <button type="button" class="control-tema-opcion" data-tema-pref="dia"><span class="icono-svg icono-dia" aria-hidden="true"></span></button>
            <button type="button" class="control-tema-opcion" data-tema-pref="noche"><span class="icono-svg icono-noche" aria-hidden="true"></span></button>
          </div>
        </div>
      </header>
      <main>
        <section class="hero">
          <p class="hero-etiqueta">Reloj astronómico</p>
          <h1 class="hero-titular">El cielo, el tiempo y la posición del Sol en una sola esfera.</h1>
        </section>
        <div class="contenido-pagina" aria-label="Espacio reservado para el contenido"></div>
      </main>
      <footer id="pie" class="pie pie-minimo">
        <div class="pie-final">
          <span>© 2026 Moisés Soriano · AD ASTRA · Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  </body>
</html>
```

### `paginas/soporte.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AD ASTRA — Soporte</title>
    <script>try{var p=localStorage.getItem("tema-preferencia")||"auto",h=new Date().getHours();document.documentElement.dataset.tema=p==="auto"?(h>=6&&h<18?"dia":"noche"):p}catch(e){}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="../css/base.css" />
    <link rel="stylesheet" href="../css/tema.css" />
    <link rel="stylesheet" href="../css/estructura.css" />
    <link rel="stylesheet" href="../css/pie.css" />
    <link rel="stylesheet" href="../css/fondo-estrellas.css" />
    <link rel="stylesheet" href="../css/fondo-lavado.css" />
    <script src="../scripts/astronomia.js" defer></script>
    <script src="../scripts/ubicacion.js" defer></script>
    <script src="../scripts/tema.js" defer></script>
    <script src="../scripts/idioma.js" defer></script>
  </head>
  <body>
    <div id="fondo-lavado" aria-hidden="true"></div>
    <div id="fondo-estrellas" aria-hidden="true">
      <div class="estrellas-fondo estrellas-a"></div>
      <div class="estrellas-fondo estrellas-b"></div>
    </div>
    <div id="contenedor-app">
      <header class="cabecera menu-secciones">
        <a class="logo" href="../index.html" aria-label="AD ASTRA, ir al Astrolabio">
          <span class="logo-marca" aria-hidden="true"></span>
          <span>AD ASTRA</span>
        </a>
        <nav class="nav-secciones" aria-label="Navegación del sitio">
          <a href="../index.html">Astrolabio</a>
          <a href="alcance.html">Alcance</a>
          <a href="matematicas.html">Matemáticas</a>
          <a href="infografias.html">Infografías</a>
          <a href="acerca-de.html">Acerca de mí</a>
          <a href="soporte.html" class="activa" aria-current="page">Soporte</a>
        </nav>
        <div class="cabecera-acciones">
          <button type="button" id="boton-idioma" class="boton-tema boton-idioma" title="Cambiar idioma" aria-label="Cambiar idioma">ES</button>
          <div class="control-tema" role="group" aria-label="Modo de color">
            <button type="button" class="control-tema-opcion" data-tema-pref="auto">Auto</button>
            <button type="button" class="control-tema-opcion" data-tema-pref="dia"><span class="icono-svg icono-dia" aria-hidden="true"></span></button>
            <button type="button" class="control-tema-opcion" data-tema-pref="noche"><span class="icono-svg icono-noche" aria-hidden="true"></span></button>
          </div>
        </div>
      </header>
      <main>
        <section class="hero">
          <p class="hero-etiqueta">Reloj astronómico</p>
          <h1 class="hero-titular">El cielo, el tiempo y la posición del Sol en una sola esfera.</h1>
        </section>
        <div class="contenido-pagina" aria-label="Espacio reservado para el contenido"></div>
      </main>
      <footer id="pie" class="pie pie-minimo">
        <div class="pie-final">
          <span>© 2026 Moisés Soriano · AD ASTRA · Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  </body>
</html>
```

## CSS

### `css/base.css`

```css
/*css/base.css */

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background:
    radial-gradient(
      circle at 50% 38%,
      rgba(35, 75, 125, 0.16) 0%,
      rgba(18, 40, 75, 0.10) 32%,
      transparent 65%
    ),
    radial-gradient(
      circle at 15% 85%,
      rgba(25, 55, 100, 0.10) 0%,
      transparent 45%
    ),
    #071126;
}

main {
  width: min(94vw, 1600px);
}

#reloj {
  width: min(100%, 94vmin, 900px);
  margin: 0 auto;
  height: auto;
  display: block;
}

#hora-digital {
  margin: 1rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 0.3rem;
  color: var(--oro);
}

#ubicacion {
  margin: 0.25rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 1rem;
  color: var(--hielo);
  letter-spacing: 0.5px; /* Separa un poco los caracteres generales */
}

#pais-ciudad {
  margin: 0.15rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 0.9rem;
  color: var(--oro); /* Tono dorado sutil */
  opacity: 0.85;
}

#fecha-digital {
  margin: 0.25rem 0 0;
  text-align: center;
  font-family: var(--fuente);
  font-size: 0.3rem;
  color: var(--oro);
}
```

### `css/tema.css`

```css
/* css/tema.css — variables de color por modo. La página lee siempre estas variables.
   DÍA  = piedra clara (tinta azul-negra, acento oro oscuro).   NOCHE = espacio oscuro.
   Regla: ningún archivo CSS usa colores sueltos; todo sale de estas variables. */

/* Tipografías (Google Fonts: Playfair Display; símbolos zodiacales: Segoe UI Symbol) */
:root {
  --fuente: "Playfair Display", Georgia, serif;
  --fuente-simbolos: "Segoe UI Symbol", "Apple Symbols", "Noto Sans Symbols 2", "DejaVu Sans", sans-serif;
}

/* ───────── MODO DÍA (por defecto): fondo piedra, tinta oscura ───────── */
:root,
[data-tema="dia"] {
  /* superficies y texto */
  /* centro algo más oscuro: el contrario del brillo central del modo noche */
  --fondo: radial-gradient(ellipse at 30% 40%, #d8d6d0 0%, #e1dfda 55%, #ecebe7 100%);
  --estrellas-intensidad: 1;
  --panel: rgba(244, 243, 239, 0.92);
  --linea: rgba(27, 34, 51, 0.22);
  --texto: #1b2233;
  --texto-suave: #5b6679;
  --acento: #8f6b1c;
  --fondo-traslacion: rgba(27, 34, 51, 0.08);   /* disco tras las órbitas */
  --aro-lectura: rgba(246, 244, 238, 0.78);     /* aro tras los números del Reloj al enfocarlo */
  --sombra: 0 8px 24px rgba(27, 34, 51, 0.18);
  /* acentos */
  --oro: #8f6b1c;
  --oro-claro: #7a5a14;
  --hielo: #46688f;
  --alerta: #b3402f;
  /* tintas */
  --tinta: #1b2233;
  --tinta-suave: #38425a;
  --tinta-tenue: #5b6679;
  /* superficies del reloj */
  --marino: #c8cdd8;
  --superficie: #f4f3ef;
  --superficie-2: #e8e6e0;
  --borde-sutil: rgba(27, 34, 51, 0.16);
  --borde-oro: rgba(143, 107, 28, 0.4);
  /* astros (con contorno para que se vean sobre fondo claro) */
  --sol: #e0a21c;
  --sol-brillo: #b67a0a;
  --sol-contorno: #7a4f00;
  --luna-luz: #ece8dc;
  --luna-sombra: #394156;
  --luna-contorno: #394156;
  --nodo: #596375;
  --nodo-brillo: rgba(255, 255, 255, 0.9);
  --tierra: #2f6aa6;
  --estacion-opacidad: 0.8;   /* el anillo de estaciones necesita más cuerpo sobre fondo claro */
  /* trópicos */
  --tropico-cancer: #4f7d57;
  --tropico-capricornio: #a8683a;
  /* globo de Rotación */
  --globo-1: #dfe9f3;
  --globo-2: #9db9d4;
  --globo-3: #46688f;
  --globo-linea: #1b2233;
  --roca-marron: #8a6240;
  --roca-negra: #262a33;
  --roca-contorno: rgba(27, 34, 51, 0.45);
  --alineacion-1: #8d95a3;
  --alineacion-2: #c9a017;
  --alineacion-3: #1f9fb5;
  --tierra-oceano: #3b86c8;
  --tierra-oceano-profundo: #14468a;
  --tierra-firme: #5d8f4c;
  --tierra-desierto: #a58253;
  --tierra-hielo: #eaf4fb;
  --tierra-atmosfera: #8fd0f5;
  --tierra-noche: #040919;
}

/* ───────── MODO NOCHE: espacio profundo. Las estrellas sutiles las pinta css/fondo-estrellas.css ───────── */
[data-tema="noche"] {
  --fondo: radial-gradient(ellipse at 30% 40%, #090f24 0%, #050813 55%, #03050c 100%);
  --estrellas-intensidad: 1;
  --panel: rgba(6, 10, 22, 0.88);
  --linea: rgba(143, 180, 217, 0.2);
  --texto: #dfe8fa;
  --texto-suave: #9db0cf;
  --acento: #c9a24b;
  --fondo-traslacion: rgba(6, 13, 29, 0.9);
  --aro-lectura: rgba(3, 7, 18, 0.6);
  --sombra: 0 8px 24px rgba(0, 0, 0, 0.5);

  --oro: #c9a24b;
  --oro-claro: #e8d08a;
  --hielo: #8fb4d9;
  --alerta: #cf5a4a;

  --tinta: #e6eefc;
  --tinta-suave: #c4d3ea;
  --tinta-tenue: #a9bbd8;

  --marino: #12234a;
  --superficie: #0e1428;
  --superficie-2: #161e3a;
  --borde-sutil: rgba(143, 180, 217, 0.18);
  --borde-oro: rgba(201, 162, 75, 0.35);

  --sol: #f4cf6a;
  --sol-brillo: #e3a63a;
  --sol-contorno: transparent;
  --luna-luz: #cfd8e3;
  --luna-sombra: #2a2f3a;
  --luna-contorno: transparent;
  --nodo: #98a2b5;
  --nodo-brillo: rgba(168, 182, 210, 0.6);
  --tierra: #5b93d1;
  --estacion-opacidad: 0.4;

  --tropico-cancer: #86b08c;
  --tropico-capricornio: #c98d62;

  --globo-1: #c3d6e8;
  --globo-2: #7fa3c6;
  --globo-3: #2f527a;
  --globo-linea: #0b2a4a;
  --roca-marron: #8a6a4c;
  --roca-negra: #14171f;
  --roca-contorno: rgba(201, 214, 235, 0.4);
  --alineacion-1: #c3cad6;
  --alineacion-2: #f2d35a;
  --alineacion-3: #4fdcf0;
  --tierra-oceano: #3b86c8;
  --tierra-oceano-profundo: #14468a;
  --tierra-firme: #5d8f4c;
  --tierra-desierto: #a58253;
  --tierra-hielo: #eaf4fb;
  --tierra-atmosfera: #8fd0f5;
  --tierra-noche: #040919;
}
```

### `css/estructura.css`

```css
/* css/estructura.css — estructura final: cabecera, hero, escenario, paneles flotantes, barra inferior */
body {
  display: block;
  margin: 0;
  min-height: 100vh;
  background: var(--fondo);
  background-attachment: fixed;
  overflow-x: hidden;
  color: var(--texto);
  font-family: var(--fuente);
}
 
#contenedor-app { display: block; width: 100%; }
 
main { display: block; width: 100%; margin: 0; padding: 0; }

.contenido-pagina {
  width: min(calc(100% - 2rem), 1120px);
  margin: clamp(1.5rem, 4vh, 3rem) auto clamp(3rem, 8vh, 6rem);
}
.contenido-pagina:empty {
  min-height: min(58vh, 560px);
  margin: clamp(3rem, 8vh, 6rem) auto;
  border: 1px dashed var(--linea);
  background: color-mix(in srgb, var(--panel) 24%, transparent);
}
 
/* Cabecera */
.cabecera {
  position: sticky;
  top: 0;
  z-index: 100;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid var(--linea);
  background: var(--fondo);
}
.logo { display: flex; align-items: center; gap: 0.8rem; color: var(--acento); text-decoration: none; letter-spacing: 0.45em; font-size: 0.95rem; }
.logo-marca {
  width: 45px;
  height: 45px;
  background-color: currentColor;
  -webkit-mask: url("../svg/logo/logo.svg") center / contain no-repeat;
  mask: url("../svg/logo/logo.svg") center / contain no-repeat;
}
.nav-capas { display: flex; gap: clamp(0.75rem, 3vw, 2.25rem); }
.nav-capas button {
  padding: 0.4rem 0.1rem;
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  color: var(--texto-suave);
  font: inherit;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.nav-capas button.activa,
.nav-secciones > .activa,
.nav-secciones > [aria-current="page"] {
  color: var(--texto);
  border-bottom-color: var(--acento);
}
.nav-secciones { display: none; gap: clamp(0.75rem, 3vw, 2.25rem); white-space: nowrap; }
.nav-secciones > * {
  padding: 0.4rem 0.1rem;
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  color: var(--texto-suave);
  font: inherit;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.nav-secciones > *:hover { color: var(--texto); }
.cabecera.menu-secciones .nav-capas { display: none; }
.cabecera.menu-secciones .nav-secciones { display: flex; }
.boton-tema, .tirador {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--linea);
  background: transparent;
  color: var(--acento);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.boton-tema { justify-self: end; }
.cabecera-acciones { display: flex; align-items: center; gap: 0.6rem; justify-self: end; }
.boton-idioma { font-family: var(--fuente); font-size: 0.78rem; letter-spacing: 0.08em; }
.control-tema { display: flex; align-items: center; gap: 2px; box-sizing: border-box; height: 42px; padding: 2px; border: 1px solid var(--linea); border-radius: 999px; }
.control-tema-opcion {
  display: grid; place-items: center; min-width: 36px; height: 36px; padding: 0 0.55rem;
  border: 0; border-radius: 999px; background: transparent; color: var(--texto-suave); cursor: pointer;
  font-family: var(--fuente); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
  transition: background 0.2s, color 0.2s;
}
.control-tema-opcion:hover { color: var(--acento); }
.icono-svg {
  display: block;
  width: 30px;
  height: 30px;
  background-color: currentColor;
  -webkit-mask: center / contain no-repeat;
  mask: center / contain no-repeat;
}
.icono-dia { -webkit-mask-image: url("../svg/iconos/iconodia.svg"); mask-image: url("../svg/iconos/iconodia.svg"); }
.icono-noche { -webkit-mask-image: url("../svg/iconos/icononoche.svg"); mask-image: url("../svg/iconos/icononoche.svg"); }
.icono-panel-fecha { -webkit-mask-image: url("../svg/panel-control/fecha.svg"); mask-image: url("../svg/panel-control/fecha.svg"); }
.icono-panel-pregunta { -webkit-mask-image: url("../svg/panel-control/pregunta.svg"); mask-image: url("../svg/panel-control/pregunta.svg"); }
.icono-panel-geolocalizacion { -webkit-mask-image: url("../svg/panel-control/geolocalizacion.svg"); mask-image: url("../svg/panel-control/geolocalizacion.svg"); }
.icono-panel-masinfo { -webkit-mask-image: url("../svg/panel-control/masinfo.svg"); mask-image: url("../svg/panel-control/masinfo.svg"); }
.control-tema-opcion.activa { background: color-mix(in srgb, var(--oro) 16%, transparent); color: var(--acento); box-shadow: inset 0 0 0 1px var(--acento); }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 0.7s; }
.boton-tema:hover, .tirador:hover { background: color-mix(in srgb, var(--oro) 12%, transparent); border-color: var(--acento); }
 
/* Hero */
.hero { padding: 0.3rem 1rem 1.1rem; text-align: center; }
.hero-etiqueta { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 0; font-size: 0.78rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--acento); }
.hero-etiqueta::before, .hero-etiqueta::after { content: ""; width: 2.5rem; height: 1px; background: var(--linea); }
.hero-titular {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin: 0.6rem 0 0;
  font-size: clamp(1.1rem, 2.4vw, 1.75rem);
  font-weight: normal;
  color: var(--tinta-suave);
}
.hero-titular::before,
.hero-titular::after { content: ""; flex: 0 0 3.5rem; height: 1px; background: var(--acento); opacity: 0.6; }
 
/* Escenario (reloj + paneles flotantes) */
/* El escenario ocupa todo el ancho de la ventana para que los botones queden en los costados */
.escenario {
  /* mismo tamaño visual del dial que antes; el lienzo (viewBox 2120 × 1990, centrado en x=600 para que el reloj quede en el centro de la página) es un 10 % mayor para el aro de constelaciones */
  --ancho-reloj: min(100%, calc((100vh - 230px) * 1.104), 1104px);
  position: relative;
  padding: 0.5rem 0 0.5rem;
  --separacion-lados: 5rem; /* separación simétrica de hora/fecha y controles al reloj */
}
#reloj { width: var(--ancho-reloj); margin: 0 auto; }
/* Hora (izquierda) y fecha (derecha) a los lados del reloj, a la altura del centro */
.escenario { text-align: center; }
#hora-digital,
#fecha-digital {
  position: absolute;
  /* centro del reloj (1000/2120 del ancho) + el desplazamiento que tenía antes */
  top: calc(0.5rem + var(--ancho-reloj) * 0.4717 + 22px);
  margin: 0;
  transform: translateY(-150%);
  font-family: var(--fuente);
  font-size: 1.15rem;
  letter-spacing: 0.04em;
  color: var(--acento);
}
#hora-digital { right: calc(50% + var(--ancho-reloj) * 0.4262 + var(--separacion-lados)); }
#fecha-digital { left: calc(50% + var(--ancho-reloj) * 0.4262 + var(--separacion-lados)); }
/* Pantallas angostas: hora y fecha bajo el reloj, y bajo cada una sus controles de velocidad (ver velocidad.css) */
@media (max-width: 1100px) {
  .escenario { display: grid; grid-template-columns: 1fr 1fr; column-gap: 1.5rem; }
  #reloj { grid-column: 1 / -1; }
  #hora-digital,
  #fecha-digital { position: static; transform: none; margin: 0.4rem 0 0; }
  #hora-digital { grid-column: 1; grid-row: 2; justify-self: end; }
  #fecha-digital { grid-column: 2; grid-row: 2; justify-self: start; }
}
 
.tirador { position: absolute; top: 50%; transform: translateY(-50%); z-index: 40; }
.tirador-izq { left: clamp(1rem, 3vw, 3rem); }
.tirador-der { right: clamp(1rem, 3vw, 3rem); }
.tirador-secundario { top: calc(50% + 3.5rem); }
 
.panel-flotante {
  position: absolute;
  top: 50%;
  z-index: 30;
  box-sizing: border-box;
  width: 290px;
  max-width: 86vw;
  max-height: 90%;
  overflow-y: auto;
  padding: 20px;
  background: none;
  border: 0;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0s linear 0.25s;
}
.panel-izq { left: calc(clamp(1rem, 3vw, 3rem) + 3.5rem); transform: translateY(-50%) translateX(-16px); }
.panel-der { right: calc(clamp(1rem, 3vw, 3rem) + 3.5rem); width: 320px; transform: translateY(-50%) translateX(16px); }
.panel-lateral-nuevo { top: calc(50% + 3.5rem); min-height: min(55vh, 380px); background: var(--superficie); border: 1px solid var(--borde-oro); border-radius: 20px; }
.panel-flotante.abierto { visibility: visible; opacity: 1; transform: translateY(-50%) translateX(0); transition-delay: 0s; }
 
/* Resultados: sin marco, tarjetas limpias */
.panel-resultados { width: min(100% - 4rem, 1500px); max-width: none; margin: 0 auto; padding: 1.25rem 0 3rem; border: 0; background: none; }
.panel-resultados h2 { text-align: center; }
 
/* Fichas de resultados (estilo de la barra inferior del diseño) */
.panel-resultados .grid-datos { align-items: stretch; gap: 0; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
.panel-resultados .tarjeta {
  position: relative;
  display: grid;
  grid-template-columns: 2.2rem 1fr;
  column-gap: 0.75rem;
  align-content: center;
  min-height: 0;
  padding: 1rem 2.6rem 1rem 1rem;
  background: none;
  border: 0;
  border-left: 1px solid var(--linea);
  border-radius: 0;
}
.panel-resultados .tarjeta::before { content: "✦"; grid-column: 1; grid-row: 1 / span 3; align-self: center; text-align: center; font-size: 1.3rem; color: var(--acento); }
.panel-resultados .tarjeta > * { grid-column: 2; }
.panel-resultados .tarjeta-cabecera { text-align: left; font-size: 0.72rem; letter-spacing: 0.18em; color: var(--texto-suave); }
.panel-resultados .tarjeta-cabecera::before { content: none; }
.panel-resultados .tarjeta-valor,
.panel-resultados .tarjeta #pais-ciudad,
.panel-resultados .tarjeta #ubicacion { margin: 0; text-align: left; font-size: 1rem; letter-spacing: 0; color: var(--texto); opacity: 1; }
.panel-resultados .tarjeta-sub { text-align: left; font-size: 0.75rem; color: var(--texto-suave); }
 
/* "?" arriba a la derecha de la ficha, con burbuja al pasar el cursor */
.panel-resultados .ayuda {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  bottom: auto;
  display: grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  padding: 0;
  border: 1px solid var(--linea);
  border-radius: 50%;
  background: transparent;
  color: var(--texto-suave);
  font: 0.72rem var(--fuente);
  cursor: help;
}
.panel-resultados .ayuda:hover,
.panel-resultados .ayuda:focus { background: color-mix(in srgb, var(--oro) 15%, transparent); border-color: var(--acento); color: var(--acento); outline: none; }
.panel-resultados .tarjeta-ayuda,
.panel-resultados .tarjeta-ayuda[hidden] {
  display: block;
  position: absolute;
  right: 0;
  bottom: calc(100% + 6px);
  left: auto;
  z-index: 20;
  width: 220px;
  max-width: 80vw;
  margin: 0;
  padding: 0.6rem 0.75rem;
  background: var(--panel);
  border: 1px solid var(--linea);
  border-radius: 10px;
  box-shadow: var(--sombra);
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--texto);
  text-align: left;
  opacity: 0;
  pointer-events: none;
  transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.panel-resultados .tarjeta:has(.ayuda:hover) .tarjeta-ayuda,
.panel-resultados .tarjeta:has(.ayuda:focus) .tarjeta-ayuda { opacity: 1; transform: translateY(0); }
 
/* Disco oscuro tras las órbitas */
#fondo-traslacion { fill: var(--fondo-traslacion); }
 
/* Aro de constelaciones */
.arco-constelacion { fill: none; stroke: var(--acento); stroke-width: 2; opacity: 0.55; }
.glifo-comodin { fill: var(--acento); stroke: var(--acento); stroke-width: 1.2; opacity: 0.75; }
.glifo-comodin polyline { fill: none; }
.nombre-constelacion {
  fill: var(--acento);
  font-family: var(--fuente);
  font-size: 20px;
  letter-spacing: 3px;
  text-anchor: middle;
  dominant-baseline: central;
  text-transform: uppercase;
}
 
/* Símbolos zodiacales: fuente de símbolos y dorado (evita el emoji morado) */
.simbolo-zodiacal { font-family: var(--fuente-simbolos); color: var(--acento); fill: var(--acento); }
 
/* Enfoque de capas desde el menú */
#reloj > g[id^="capa-"] { transition: opacity 0.45s ease; }
#reloj.enfocando > g[id^="capa-"]:not(.capa-enfocada) { opacity: 0.12; }
 
/* Aro oscuro de lectura (radio 600–730): solo al elegir "Reloj" en el menú, para contrastar minutos y números romanos */
.aro-lectura-reloj {
  fill: none;
  stroke: var(--aro-lectura);
  stroke-width: 130;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
}
#reloj.enfoque-reloj .aro-lectura-reloj { opacity: 1; }

/* Dígitos del calendario: solo visibles al elegir "Calendario" en el menú */
.digito-calendario {
  fill: var(--tinta-suave);
  font-family: var(--fuente);
  font-size: 22px;
  text-anchor: middle;
  dominant-baseline: central;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.45s ease;
}
#reloj.enfoque-calendario .digito-calendario { opacity: 1; }
 
/* Sistema solar: al elegirlo se expande de radio máximo 480 a 900 (900 / 480 = 1,875), con el Sol fijo en el centro */
#capa-fondo-traslacion,
#capa-orbita-terrestre,
#capa-orbitas-planetarias,
#capa-asteroides,
#capa-alineacion,
#capa-planetas,
#capa-planetas-frente,
#capa-sol-central {
  transform-origin: 600px 600px;
  transition: transform 0.9s ease;
}
#reloj.enfoque-sistema-solar #capa-fondo-traslacion,
#reloj.enfoque-sistema-solar #capa-orbita-terrestre,
#reloj.enfoque-sistema-solar #capa-orbitas-planetarias,
#reloj.enfoque-sistema-solar #capa-asteroides,
#reloj.enfoque-sistema-solar #capa-alineacion,
#reloj.enfoque-sistema-solar #capa-planetas,
#reloj.enfoque-sistema-solar #capa-planetas-frente,
#reloj.enfoque-sistema-solar #capa-sol-central { transform: scale(1.875); }
.orbita-planeta,
.orbita-terrestre { vector-effect: non-scaling-stroke; }
 
/* Icono propio en una ficha (opcional): ver campo "icono" en TARJETAS de panel-resultados.js */
.panel-resultados .tarjeta.con-icono::before {
  content: "";
  justify-self: center;
  width: 2.5rem;
  height: 2.5rem;
  background: var(--acento);
  -webkit-mask: var(--icono) center / contain no-repeat;
  mask: var(--icono) center / contain no-repeat;
}
 
/* Cabecera en móviles estrechos (≤420 px): logo y acciones caben en una fila */
@media (max-width: 420px) {
  .cabecera { gap: 0.5rem; padding-inline: 0.75rem; }
  .logo { gap: 0.5rem; letter-spacing: 0.2em; font-size: 0.85rem; }
  .logo-marca { width: 36px; height: 36px; }
  .cabecera-acciones { gap: 0.4rem; }
  .boton-tema, .tirador { width: 38px; height: 38px; }
  .control-tema { height: 38px; }
  .control-tema-opcion { min-width: 30px; height: 32px; padding: 0 0.4rem; }
  .control-tema-opcion .icono-svg { width: 24px; height: 24px; }
}

@media (max-width: 800px) {
  .cabecera { grid-template-columns: 1fr auto; row-gap: 0.6rem; }
  .nav-capas { grid-column: 1 / -1; grid-row: 2; justify-content: center; flex-wrap: wrap; }
  .nav-secciones { grid-column: 1 / -1; grid-row: 2; justify-content: center; flex-wrap: wrap; white-space: normal; }
  .panel-izq { left: 0.5rem; } .panel-der { right: 0.5rem; }
}

@media (min-width: 801px) and (max-width: 1250px) {
  .cabecera { grid-template-columns: 1fr auto; row-gap: 0.6rem; }
  .nav-capas, .nav-secciones { grid-column: 1 / -1; grid-row: 2; justify-content: center; flex-wrap: wrap; white-space: normal; }
}

@media (max-width: 1100px) {
  .tirador { top: auto; bottom: 0.75rem; transform: none; }
  .tirador-izq.tirador-secundario { left: calc(clamp(1rem, 3vw, 3rem) + 3.25rem); }
  .tirador-der:not(.tirador-secundario) { right: calc(clamp(1rem, 3vw, 3rem) + 3.25rem); }

  #reloj { grid-row: 1; }
  #hora-digital, #fecha-digital { grid-row: 2; }
  .controles-tiempo { grid-row: 3; }

  .panel-flotante,
  .panel-izq,
  .panel-der {
    position: absolute;
    top: auto;
    right: 0.5rem;
    bottom: calc(0.75rem + 3.75rem);
    left: 0.5rem;
    width: auto;
    max-width: 100%;
    max-height: min(68vh, calc(100% - 4.5rem));
    overflow-y: auto;
    margin: 0;
    display: none;
    transform: none;
  }
  .panel-flotante.abierto {
    display: block;
    visibility: visible;
    opacity: 1;
    transform: none;
  }

  #cajon-planetas {
    right: auto;
    left: 50%;
    width: min(var(--ancho-reloj), calc(100% - 1rem));
    max-width: none;
    background: color-mix(in srgb, var(--superficie) 78%, transparent);
    border: 1px solid var(--borde-oro);
    border-radius: 20px;
    backdrop-filter: blur(2px);
    transform: translateX(-50%);
  }
  #cajon-planetas.abierto { transform: translateX(-50%); }
  #cajon-viajero,
  #panel-geolocalizacion {
    right: auto;
    width: min(26rem, calc(100% - 1rem)); /* paneles de formulario: no estirarlos a todo el ancho */
    background: color-mix(in srgb, var(--superficie) 78%, transparent);
    border: 1px solid var(--borde-oro);
    border-radius: 20px;
    backdrop-filter: blur(2px);
  }
}
```

### `css/alcance.css`

```css
/* css/alcance.css — Estilos específicos para la página de Alcance (modelos, precisión e incertidumbre) */

/* Contenedor principal de lectura */
.contenido-pagina {
  width: min(calc(100% - 2.5rem), 980px);
  margin: 1.5rem auto clamp(3rem, 6vh, 5rem);
}

/* ───────── INTRODUCCIÓN ───────── */
.alcance-introduccion {
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--linea);
}

.alcance-introduccion h2 {
  margin: 0 0 1.25rem;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: normal;
  color: var(--texto);
  line-height: 1.25;
}

.alcance-introduccion p {
  margin: 0 0 1.15rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--tinta-suave);
  max-width: 74ch;
}

.alcance-destacado {
  margin: 1.75rem 0 0;
  padding: 1.1rem 1.4rem;
  border-left: 3px solid var(--acento);
  border-radius: 0 8px 8px 0;
  background: color-mix(in srgb, var(--oro) 8%, transparent);
  font-size: 1.1rem !important;
  font-style: italic;
  color: var(--texto) !important;
  line-height: 1.6;
}

/* ───────── ÍNDICE / NAVEGACIÓN INTERNA ───────── */
.alcance-nav {
  margin: 2.5rem 0 3.5rem;
  padding: 1.75rem 2rem;
  border: 1px solid var(--linea);
  border-radius: 12px;
  background: color-mix(in srgb, var(--panel) 50%, transparent);
  backdrop-filter: blur(8px);
}

.alcance-nav-etiqueta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1.25rem;
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--acento);
}

.alcance-nav-etiqueta::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--linea);
  opacity: 0.7;
}

.alcance-nav ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.alcance-nav a {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1rem;
  border: 1px solid color-mix(in srgb, var(--linea) 80%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--superficie) 40%, transparent);
  text-decoration: none;
  color: var(--texto);
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.alcance-nav a:hover {
  border-color: var(--acento);
  background: color-mix(in srgb, var(--panel) 90%, transparent);
  color: var(--acento);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.alcance-nav a span {
  font-family: var(--fuente);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--acento);
  letter-spacing: 0.05em;
  opacity: 0.85;
}

/* ───────── SECCIONES GENERALES ───────── */
.alcance-seccion {
  margin-top: clamp(3rem, 6vh, 4.5rem);
  padding-top: 2.25rem;
  border-top: 1px solid var(--linea);
  scroll-margin-top: 90px;
}

.seccion-etiqueta {
  margin: 0 0 0.5rem;
  font-size: 0.74rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--acento);
}

.alcance-seccion h2 {
  margin: 0 0 1.25rem;
  font-size: clamp(1.45rem, 2.4vw, 1.95rem);
  font-weight: normal;
  color: var(--texto);
  line-height: 1.3;
}

.alcance-seccion > p {
  margin: 0 0 1.2rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--tinta-suave);
  max-width: 74ch;
}

/* ───────── 01. CONCEPTOS (ERROR, INCERTIDUMBRE, RESOLUCIÓN) ───────── */
.alcance-conceptos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin: 1.75rem 0 2rem;
}

.alcance-concepto {
  padding: 1.4rem 1.3rem;
  border: 1px solid var(--linea);
  border-top: 2px solid var(--acento);
  border-radius: 8px;
  background: color-mix(in srgb, var(--panel) 65%, transparent);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.alcance-concepto:hover {
  transform: translateY(-2px);
  border-color: var(--acento);
}

.alcance-concepto h3 {
  margin: 0 0 0.6rem;
  font-size: 1.2rem;
  color: var(--acento);
  font-weight: normal;
}

.alcance-concepto p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--tinta-suave);
}

.alcance-nota {
  margin: 1.75rem 0;
  padding: 1.2rem 1.6rem;
  border: 1px solid color-mix(in srgb, var(--acento) 35%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--oro) 7%, transparent);
}

.alcance-nota h3 {
  margin: 0 0 0.35rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--acento);
  font-weight: 600;
}

.alcance-nota p {
  margin: 0;
  font-size: 1.05rem;
  color: var(--texto);
  font-style: italic;
  line-height: 1.5;
}

/* ───────── BLOQUES PLACEHOLDER / DOSSIER TÉCNICO ───────── */
.alcance-placeholder {
  margin: 1.75rem 0;
  padding: 1.6rem 1.8rem;
  border: 1px dashed var(--linea);
  border-radius: 8px;
  background: color-mix(in srgb, var(--superficie) 35%, transparent);
  position: relative;
}

.alcance-placeholder h3 {
  margin: 0 0 0.45rem;
  font-size: 1.05rem;
  color: var(--acento);
  font-weight: normal;
  letter-spacing: 0.04em;
}

.alcance-placeholder p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--tinta-tenue);
}

/* ───────── 03. PRECISIÓN POR FENÓMENO ───────── */
.alcance-fenomenos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  margin: 1.75rem 0 1.5rem;
}

.alcance-fenomeno {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.4rem 1.3rem;
  border: 1px solid var(--linea);
  border-radius: 10px;
  background: color-mix(in srgb, var(--panel) 70%, transparent);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.alcance-fenomeno:hover {
  transform: translateY(-3px);
  border-color: var(--acento);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.alcance-fenomeno h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: normal;
  color: var(--texto);
}

.alcance-fenomeno p {
  margin: 0 0 1.25rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--tinta-suave);
  flex-grow: 1;
}

.alcance-fenomeno a {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: var(--acento);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease, gap 0.2s ease;
}

.alcance-fenomeno a::after {
  content: "→";
  transition: transform 0.2s ease;
}

.alcance-fenomeno a:hover {
  color: var(--oro-claro);
  gap: 0.55rem;
}

.alcance-aclaracion {
  margin: 1.25rem 0 0;
  padding-left: 1rem;
  border-left: 2px solid var(--linea);
  font-size: 0.92rem;
  font-style: italic;
  color: var(--tinta-tenue);
  line-height: 1.6;
}

/* ───────── 06. FUENTES Y REFERENCIAS ───────── */
.alcance-referencias {
  list-style: none;
  margin: 1.75rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.alcance-referencias li {
  display: flex;
  align-items: flex-start;
  gap: 1.35rem;
  padding: 1.2rem 1.4rem;
  border: 1px solid var(--linea);
  border-radius: 8px;
  background: color-mix(in srgb, var(--panel) 55%, transparent);
  backdrop-filter: blur(8px);
  transition: border-color 0.2s ease;
}

.alcance-referencias li:hover {
  border-color: var(--acento);
}

.alcance-referencias li > span {
  font-family: var(--fuente);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--acento);
  line-height: 1;
  opacity: 0.85;
  padding-top: 0.15rem;
  min-width: 1.8rem;
}

.alcance-referencias h3 {
  margin: 0 0 0.3rem;
  font-size: 1.05rem;
  font-weight: normal;
  color: var(--texto);
}

.alcance-referencias p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--tinta-suave);
}

/* ───────── CIERRE EDITORIAL ───────── */
.alcance-cierre {
  margin-top: clamp(3.5rem, 7vh, 5.5rem);
  padding: clamp(2.5rem, 5vw, 4rem) 2rem;
  border-top: 1px solid var(--linea);
  border-radius: 12px;
  background: radial-gradient(ellipse at center, color-mix(in srgb, var(--oro) 7%, transparent) 0%, transparent 70%);
  text-align: center;
}

.alcance-cierre .seccion-etiqueta {
  display: inline-block;
  margin-bottom: 0.75rem;
}

.alcance-cierre h2 {
  margin: 0 auto 1.15rem;
  max-width: 30ch;
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  font-weight: normal;
  color: var(--texto);
  line-height: 1.3;
}

.alcance-cierre p {
  margin: 0 auto;
  max-width: 62ch;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--tinta-suave);
}

/* ───────── RESPONSIVE ───────── */
@media (max-width: 768px) {
  .alcance-nav {
    padding: 1.25rem 1.25rem;
  }
  .alcance-nav ol {
    grid-template-columns: 1fr;
  }
  .alcance-conceptos,
  .alcance-fenomenos {
    grid-template-columns: 1fr;
  }
}
```

### `css/pie.css`

```css
/* css/pie.css — pie de página (3): logo, columnas de enlaces y contacto. Colores: variables de css/tema.css. */
.pie, .pie *, .pie *::before, .pie *::after { box-sizing: border-box; }
.pie { margin-top: 0; padding: 3.5rem clamp(1.5rem, 7vw, 7rem) 1.5rem; border-top: 1px solid var(--linea); background: color-mix(in srgb, var(--panel) 44%, transparent); }
.pie-minimo { padding-top: 1.5rem; border-top: 0; background: transparent; }
.pie-minimo .pie-final { margin-top: 0; }
.pie-contenido {
  display: grid;
  grid-template-columns: minmax(320px, 1.5fr) repeat(3, minmax(150px, 1fr));
  align-items: start;
  gap: clamp(1.5rem, 4vw, 4rem);
  width: min(100%, 1500px);
  margin: 0 auto;
}
.pie-logo { display: inline-flex; align-items: center; align-self: center; gap: 1.1rem; color: var(--acento); text-decoration: none; }
.pie-logo .logo-marca { width: 110px; height: 110px; }
.pie-nombre { font-size: clamp(1.6rem, 2.4vw, 2.2rem); letter-spacing: 0.16em; white-space: nowrap; }

.pie-bloque { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; }
.pie-bloque h2 { margin: 0 0 0.5rem; color: var(--acento); font-size: clamp(1.25rem, 1.8vw, 1.6rem); font-weight: 400; letter-spacing: 0.06em; }
.pie-bloque a, .pie-final a { color: var(--texto-suave); font-size: 0.95rem; text-decoration: none; transition: color 0.2s; }
.pie-bloque a:hover, .pie-bloque a:focus-visible, .pie-final a:hover, .pie-final a:focus-visible { color: var(--acento); text-decoration: underline; text-underline-offset: 0.25em; }

/* Redes: iconos propios en svg/redes/, pintados como máscara. Para añadir una red: copia su SVG a svg/redes/ y una línea .pie-red.<nombre> abajo */
.pie-redes { display: flex; width: 100%; max-width: 22rem; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.4rem; padding: 0.6rem 0.75rem; border: 1px solid var(--linea); border-radius: 8px; }
.pie-red { display: block; width: 1.9rem; height: 1.9rem; background: var(--texto-suave); -webkit-mask: var(--icono) center / contain no-repeat; mask: var(--icono) center / contain no-repeat; transition: background-color 0.2s, transform 0.2s; }
.pie-red:hover, .pie-red:focus-visible { background: var(--acento); transform: translateY(-2px); }
.pie-red.instagram { --icono: url("../svg/redes/instagram.svg"); }
.pie-red.youtube { --icono: url("../svg/redes/youtube.svg"); }
.pie-red.x { --icono: url("../svg/redes/x.svg"); }

.pie-final { display: grid; justify-items: center; gap: 0.7rem; width: min(100%, 1500px); margin: 3rem auto 0; color: var(--texto-suave); font-size: 0.78rem; letter-spacing: 0.08em; text-align: center; }
.pie-final::before { width: min(100%, 36rem); border-top: 1px solid var(--borde-oro); content: ""; }

@media (max-width: 1100px) {
  .pie-contenido { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .pie-logo { grid-column: 1 / -1; justify-self: center; }
}
@media (max-width: 560px) {
  .pie { padding-inline: 1rem; }
  .pie-contenido { grid-template-columns: 1fr 1fr; gap: 1.75rem 1rem; }
  .pie-bloque:last-of-type { grid-column: 1 / -1; }
  .pie-logo .logo-marca { width: 76px; height: 76px; }
  .pie-nombre { font-size: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) { .pie-red, .pie-bloque a, .pie-final a { transition: none; } }
```

### `css/fondo-estrellas.css`

```css
/* css/fondo-estrellas.css — fondo del modo noche: espacio oscuro con estrellas sutiles que parpadean muy lento */
#fondo-estrellas {
  display: block;
  opacity: var(--estrellas-intensidad);
  position: fixed;
  inset: 0;
  z-index: -1;           /* detrás de todo el contenido */
  overflow: hidden;
  pointer-events: none;
}

/* Capa de estrellas fijas con un parpadeo lentísimo (dos capas desfasadas) */
.estrellas-fondo {
  position: absolute;
  inset: 0;
  opacity: 0.7;
  background-repeat: repeat;
  filter: drop-shadow(0 0 3.5px var(--oro-claro));
  animation: estrellas-parpadeo 9s ease-in-out infinite alternate;
}
.estrellas-a {
  background-image:
    radial-gradient(1px 1px at 12% 18%, var(--tinta) 50%, transparent 51%),
    radial-gradient(1px 1px at 47% 71%, var(--tinta) 50%, transparent 51%),
    radial-gradient(1.4px 1.4px at 83% 34%, var(--tinta) 50%, transparent 51%),
    radial-gradient(1px 1px at 31% 88%, var(--tinta) 50%, transparent 51%),
    radial-gradient(1px 1px at 66% 9%, var(--tinta) 50%, transparent 51%),
    radial-gradient(1.2px 1.2px at 91% 79%, var(--tinta) 50%, transparent 51%);
  background-size: 520px 520px;
}
.estrellas-b {
  background-image:
    radial-gradient(1px 1px at 27% 43%, var(--oro-claro) 50%, transparent 51%),
    radial-gradient(1.2px 1.2px at 58% 22%, var(--tinta) 50%, transparent 51%),
    radial-gradient(1px 1px at 74% 62%, var(--hielo) 50%, transparent 51%),
    radial-gradient(1px 1px at 8% 76%, var(--tinta) 50%, transparent 51%),
    radial-gradient(1.4px 1.4px at 39% 6%, var(--oro-claro) 50%, transparent 51%);
  background-size: 770px 770px;
  animation-duration: 13s;
  animation-delay: -5s;
}

@keyframes estrellas-parpadeo { from { opacity: 0.25; } to { opacity: 0.8; } }

/* Respeta a quien pide menos movimiento: las estrellas quedan quietas */
@media (prefers-reduced-motion: reduce) {
  .estrellas-fondo { animation: none; }
}
```

### `css/fondo-lavado.css`

```css
/* css/fondo-lavado.css — fondo del modo día: efecto "limewash / color wash" (pintura a la cal).
   Un tono claro de base con dos tonos algo más oscuros aplicados a la vez, más veladuras claras y un grano fino.
   Es SVG puro dentro del CSS (feTurbulence): sin imágenes ni JavaScript. Cambia la semilla (seed) para otra mancha. */
#fondo-lavado {
  display: none;
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat, no-repeat, no-repeat, repeat;
  background-size: cover, cover, cover, 400px 400px;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000' preserveAspectRatio='none'%3E%3Cfilter id='f' x='0' y='0' width='100%' height='100%'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0035 0.006' numOctaves='3' seed='31'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.98  0 0 0 0 0.97  0 0 0 0 0.94  1.5 0 0 0 -0.52'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23f)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000' preserveAspectRatio='none'%3E%3Cfilter id='f' x='0' y='0' width='100%' height='100%'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.009 0.014' numOctaves='4' seed='19'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.6  0 0 0 0 0.61  0 0 0 0 0.6  1.3 0 0 0 -0.58'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23f)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000' viewBox='0 0 1600 1000' preserveAspectRatio='none'%3E%3Cfilter id='f' x='0' y='0' width='100%' height='100%'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0028 0.0045' numOctaves='3' seed='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.72  0 0 0 0 0.7  0 0 0 0 0.64  1.3 0 0 0 -0.42'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23f)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio='none'%3E%3Cfilter id='f' x='0' y='0' width='100%' height='100%'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' seed='3'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0 0.25  0.2 0 0 0 -0.055'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23f)'/%3E%3C/svg%3E");
}
/* visible en modo día (incluye el instante antes de que tema.js asigne el modo) */
html:not([data-tema="noche"]) #fondo-lavado { display: block; }
```

### `css/matematicas.css`

```css
.pagina-matematicas {
  display: flex;
  align-items: flex-start;
  gap: clamp(1.5rem, 3.5vw, 3rem);
  width: min(calc(100% - 2rem), 1200px);
  min-height: 65vh;
  margin: clamp(1.5rem, 4vh, 3rem) auto clamp(3rem, 8vh, 6rem);
}

.menu-matematicas {
  position: sticky;
  top: 6rem;
  flex: 0 0 290px;
  width: 290px;
  max-height: calc(100vh - 7.5rem);
  overflow-y: auto;
  border-top: 1px solid var(--linea, var(--borde-suave, rgb(255 255 255 / 18%)));
  border-bottom: 1px solid var(--linea, var(--borde-suave, rgb(255 255 255 / 18%)));
}

.pagina-matematicas .contenido-pagina {
  flex: 1 1 0;
  min-width: 0;
  width: 100%;
  margin: 0;
}

.menu-matematicas a,
.menu-matematicas summary {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.menu-matematicas-principal,
.menu-matematicas-grupo summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.8rem;
  padding: 0.65rem 0.2rem;
  font-size: 0.94rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  list-style: none;
}

.menu-matematicas-grupo summary::-webkit-details-marker { display: none; }
.menu-matematicas-grupo summary::after { content: "+"; margin-left: 1rem; opacity: 0.7; font-size: 1.1rem; font-weight: 400; }
.menu-matematicas-grupo[open] summary::after { content: "−"; }

.menu-matematicas a:hover,
.menu-matematicas a:focus-visible,
.menu-matematicas summary:hover,
.menu-matematicas summary:focus-visible { opacity: 0.72; }

.menu-matematicas-grupo ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0.2rem 0 0.9rem 1rem;
  border-left: 1px solid var(--linea, var(--borde-suave, rgb(255 255 255 / 18%)));
  list-style: none;
  font-size: 0.88rem;
  line-height: 1.45;
  opacity: 0.78;
}

@media (max-width: 760px) {
  .pagina-matematicas {
    flex-direction: column;
    margin-top: 1rem;
  }
  .menu-matematicas {
    position: static;
    width: 100%;
    max-width: 100%;
    flex: auto;
    max-height: none;
    overflow-y: visible;
  }
}

```

## JavaScript

### `scripts/astronomia.js`

```javascript
function diasJuliano(fecha) {
  const msPorDia = 86400000;
  const inicioJ2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  return (fecha.getTime() - inicioJ2000) / msPorDia;
}

function normalizarGrados(grados) {
  return ((grados % 360) + 360) % 360;
}

const OBLICUIDAD = 23.44;

function posicionSolar(fecha) {
  const d = diasJuliano(fecha);

  const longitudMedia = normalizarGrados(280.46 + 0.9856474 * d);
  const anomaliaMedia = normalizarGrados(357.528 + 0.9856003 * d);
  const anomaliaRad = (anomaliaMedia * Math.PI) / 180;

  const longitudEcliptica = normalizarGrados(
    longitudMedia + 1.915 * Math.sin(anomaliaRad) + 0.02 * Math.sin(2 * anomaliaRad)
  );
  const longEclipticaRad = (longitudEcliptica * Math.PI) / 180;
  const oblicuidadRad = (OBLICUIDAD * Math.PI) / 180;

  const declinacion =
    (Math.asin(Math.sin(oblicuidadRad) * Math.sin(longEclipticaRad)) * 180) / Math.PI;

  const ascensionRecta =
    (Math.atan2(
      Math.cos(oblicuidadRad) * Math.sin(longEclipticaRad),
      Math.cos(longEclipticaRad)
    ) *
      180) /
    Math.PI;

    return { longitudEcliptica, declinacion, ascensionRecta: normalizarGrados(ascensionRecta) };
}

function horaSideral(fecha, longitudGeografica) {
  const d = diasJuliano(fecha);
  const gmst = normalizarGrados(280.46061837 + 360.98564736629 * d);
  return normalizarGrados(gmst + longitudGeografica);
}

function posicionSolarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionSolar(fecha);
  const anguloHorario = normalizarGrados(horaSideral(fecha, longitudGeografica) - ascensionRecta);

  const latRad = (latitud * Math.PI) / 180;
  const decRad = (declinacion * Math.PI) / 180;
  const haRad = (anguloHorario * Math.PI) / 180;

  const altura =
    (Math.asin(
      Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad)
    ) *
      180) /
    Math.PI;

  return { altura };
}

function radioDesdeAltura(altura) {
  const RADIO_MAXIMO = 480;
  const radio = (RADIO_MAXIMO * (altura + 90)) / 180;
  return Math.max(0, Math.min(RADIO_MAXIMO, radio));
}

function intensidadSolar(altura) {
  if (altura <= 0) return 0;
  const INICIO_PLENO = 15; // grados sobre el horizonte para brillo máximo
  return Math.max(0, Math.min(1, altura / INICIO_PLENO));
}

const PERIODO_SINODICO = 29.530588853;
const REFERENCIA_LUNA_NUEVA = 5.25972;

function edadLunar(fecha) {
  const d = diasJuliano(fecha);
  const diferencia = d - REFERENCIA_LUNA_NUEVA;
  return ((diferencia % PERIODO_SINODICO) + PERIODO_SINODICO) % PERIODO_SINODICO;
}

function fraccionIluminada(fecha) {
  const edad = edadLunar(fecha);
  const fraccionDelCiclo = edad / PERIODO_SINODICO;
  return (1 - Math.cos(2 * Math.PI * fraccionDelCiclo)) / 2;
}

function posicionLunar(fecha) {
  const d = diasJuliano(fecha);

  const longitudMedia = normalizarGrados(218.316 + 13.176396 * d);
  const anomaliaMedia = normalizarGrados(134.963 + 13.064993 * d);
  const argumentoLatitud = normalizarGrados(93.272 + 13.229350 * d);

  const anomaliaRad = (anomaliaMedia * Math.PI) / 180;
  const latitudRad = (argumentoLatitud * Math.PI) / 180;

  const longitudEcliptica = normalizarGrados(longitudMedia + 6.289 * Math.sin(anomaliaRad));
  const latitudEcliptica = 5.128 * Math.sin(latitudRad);

  return { longitudEcliptica, latitudEcliptica };
}

function posicionLunarEcuatorial(fecha) {
  const { longitudEcliptica, latitudEcliptica } = posicionLunar(fecha);

  const lonRad = (longitudEcliptica * Math.PI) / 180;
  const latRad = (latitudEcliptica * Math.PI) / 180;
  const oblicuidadRad = (OBLICUIDAD * Math.PI) / 180;

  const declinacion =
    (Math.asin(
      Math.sin(latRad) * Math.cos(oblicuidadRad) +
        Math.cos(latRad) * Math.sin(oblicuidadRad) * Math.sin(lonRad)
    ) *
      180) /
    Math.PI;

  const y = Math.sin(lonRad) * Math.cos(oblicuidadRad) - Math.tan(latRad) * Math.sin(oblicuidadRad);
  const x = Math.cos(lonRad);
  const ascensionRecta = normalizarGrados((Math.atan2(y, x) * 180) / Math.PI);

  return { declinacion, ascensionRecta };
}

function posicionLunarHorizonte(fecha, latitud, longitudGeografica) {
  const { declinacion, ascensionRecta } = posicionLunarEcuatorial(fecha);
  const anguloHorario = normalizarGrados(horaSideral(fecha, longitudGeografica) - ascensionRecta);

  const latRad = (latitud * Math.PI) / 180;
  const decRad = (declinacion * Math.PI) / 180;
  const haRad = (anguloHorario * Math.PI) / 180;

  const altura =
    (Math.asin(
      Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad)
    ) *
      180) /
    Math.PI;

  return { altura };
}

function intensidadLunar(alturaLuna, alturaSolar, fraccion) {
  if (alturaLuna <= 0) return 0;
  const INICIO_PLENO = 10; // atenuación propia cerca del horizonte

  const factorHorizonte = Math.max(0, Math.min(1, alturaLuna / INICIO_PLENO));
  const factorNocturno = 1 - intensidadSolar(alturaSolar); // 1 = noche cerrada, 0 = pleno día
  const pisoDiurno = 0.15; // nunca 100% invisible de día, pero sí muy tenue
  const visibilidadCielo = pisoDiurno + factorNocturno * (1 - pisoDiurno);

  return factorHorizonte * visibilidadCielo * fraccion;
}

function anguloZodiaco(fecha) {
  const { longitudEcliptica } = posicionSolar(fecha);
  return normalizarGrados(longitudEcliptica - 300);
}
```

### `scripts/ubicacion.js`

```javascript
const ubicacion = {
  latitud: null,
  longitud: null,
  ciudad: null,
  pais: null,
  esManual: false,
};

function mensajeDeError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Permiso de ubicación denegado.";
    case error.POSITION_UNAVAILABLE:
      return "No se pudo determinar la ubicación.";
    case error.TIMEOUT:
      return "La ubicación tardó demasiado en responder.";
    default:
      return "Error desconocido al obtener la ubicación.";
  }
}

async function obtenerPaisYCiudad(lat, lon) {
  try {
    const respuesta = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`, {
      headers: {
        'Accept-Language': 'es' 
      }
    });
    const datos = await respuesta.json();
    if (datos && datos.address) {
      ubicacion.ciudad = datos.address.city || datos.address.town || datos.address.village || datos.address.county || "";
      ubicacion.pais = datos.address.country || "";
      return {
        ciudad: ubicacion.ciudad,
        pais: ubicacion.pais
      };
    }
  } catch (e) {
    console.error("No se pudo obtener la localidad", e);
  }
  return null;
}

function pedirUbicacion(alExito, alError) {
  if (!("geolocation" in navigator)) {
    alError("Este navegador no soporta geolocalización.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (posicion) => {
      ubicacion.latitud = posicion.coords.latitude;
      ubicacion.longitud = posicion.coords.longitude;
      if (typeof refrescarEventosProximos === "function") refrescarEventosProximos();
      ubicacion.esManual = false;
      
      await obtenerPaisYCiudad(ubicacion.latitud, ubicacion.longitud);
      
      alExito(ubicacion);
    },
    (error) => {
      alError(mensajeDeError(error));
    },
    { timeout: 10000, maximumAge: 600000 }
  );
}

function establecerUbicacionManual(lat, lon) {
  ubicacion.esManual = true;
  ubicacion.latitud = lat;
  ubicacion.longitud = lon;
  if (typeof refrescarEventosProximos === "function") refrescarEventosProximos();
  ubicacion.ciudad = "";
  ubicacion.pais = "";

  obtenerPaisYCiudad(lat, lon).then((resultado) => {
    if (resultado) {
      const partes = [resultado.ciudad, resultado.pais].filter(Boolean);
      document.getElementById("pais-ciudad").textContent = partes.join(", ");
    }
  });

  document.getElementById("ubicacion").textContent =
    `Lat: ${lat.toFixed(4)}°\nLon: ${lon.toFixed(4)}°`;

  dibujarTropicos();
}

function obtenerHusoHorario(fecha) {
  if (ubicacion.latitud === null) return null;
  if (!ubicacion.esManual) return -fecha.getTimezoneOffset() / 60;
  return Math.round(ubicacion.longitud / 15);
}

function textoHusoHorario(huso) {
  if (huso === null) return "";
  const signo = huso < 0 ? "-" : "+";
  const abs = Math.abs(huso);
  const horas = Math.floor(abs);
  const minutos = Math.round((abs - horas) * 60);
  const sufijo = minutos ? `:${String(minutos).padStart(2, "0")}` : "";
  return `(GMT${signo}${horas}${sufijo})`;
}
```

### `scripts/tema.js`

```javascript
// scripts/tema.js
// Control de modo de color de la cabecera: Auto · Sol (día) · Luna (noche).
//   Auto  → sigue el Sol REAL del lugar del dispositivo, nunca el tiempo simulado: así, aunque aceleres el
//           reloj a x1M, el tema no parpadea. Ignora la ubicación manual del cajón "Viajar".
//   Sol / Luna → fuerzan ese modo y recuerdan la elección.
// Los colores de cada modo viven en css/tema.css.

const PREFERENCIA_POR_DEFECTO = "auto";
const UMBRAL_DIA = 0;        // altura del Sol (°) por encima de la cual Auto pasa a modo día (amanecer)
const UMBRAL_NOCHE = -6;     // altura del Sol (°) por debajo de la cual Auto pasa a modo noche (fin del crepúsculo civil)
const REVISION_AUTO_MS = 15000;
const PREFERENCIAS = ["auto", "dia", "noche"];
const TEXTOS_TEMA = {
  auto: "Automático (según el Sol de tu lugar)",
  dia: "Modo día",
  noche: "Modo noche",
};

let preferencia = PREFERENCIA_POR_DEFECTO;
let ubicacionReal = null; // última ubicación del dispositivo (la manual de "Viajar" no cuenta)

function altitudSolarReal() {
  if (ubicacion.latitud !== null && !ubicacion.esManual) {
    ubicacionReal = { latitud: ubicacion.latitud, longitud: ubicacion.longitud };
  }
  if (!ubicacionReal) return null;
  return posicionSolarHorizonte(new Date(), ubicacionReal.latitud, ubicacionReal.longitud).altura;
}

// Modo que corresponde ahora a Auto. Entre los dos umbrales mantiene el modo actual (histéresis).
function temaAutomatico(actual) {
  const altura = altitudSolarReal();
  if (altura === null) {
    const hora = new Date().getHours(); // aún sin ubicación: hora del dispositivo
    return hora >= 6 && hora < 18 ? "dia" : "noche";
  }
  if (altura > UMBRAL_DIA) return "dia";
  if (altura < UMBRAL_NOCHE) return "noche";
  return actual || (altura > (UMBRAL_DIA + UMBRAL_NOCHE) / 2 ? "dia" : "noche");
}

function aplicarTema(tema, animar = false) {
  const raiz = document.documentElement;
  if (raiz.dataset.tema === tema) return;
  const cambiar = () => {
    raiz.dataset.tema = tema;
  };
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animar && document.startViewTransition && !reducirMovimiento) {
    document.startViewTransition(cambiar); // fundido suave (ver ::view-transition en css/estructura.css)
  } else {
    cambiar();
  }
}

function pintarControlTema() {
  document.querySelectorAll("[data-tema-pref]").forEach((boton) => {
    const activo = boton.dataset.temaPref === preferencia;
    boton.classList.toggle("activa", activo);
    boton.setAttribute("aria-pressed", String(activo));
    const texto = TEXTOS_TEMA[boton.dataset.temaPref];
    boton.title = texto;
    boton.setAttribute("aria-label", texto);
  });
}

function establecerPreferencia(nueva, animar = true) {
  preferencia = nueva;
  try {
    localStorage.setItem("tema-preferencia", nueva);
  } catch (e) {
    /* sin almacenamiento: la elección solo dura la visita */
  }
  aplicarTema(nueva === "auto" ? temaAutomatico(document.documentElement.dataset.tema) : nueva, animar);
  pintarControlTema();
}

function revisarTemaAutomatico() {
  if (preferencia !== "auto") return;
  aplicarTema(temaAutomatico(document.documentElement.dataset.tema), true);
}

function inicializarTema() {
  let guardada = null;
  try {
    guardada = localStorage.getItem("tema-preferencia");
  } catch (e) {
    guardada = null;
  }
  preferencia = PREFERENCIAS.includes(guardada) ? guardada : PREFERENCIA_POR_DEFECTO;
  establecerPreferencia(preferencia, false);
  document.querySelectorAll("[data-tema-pref]").forEach((boton) => {
    boton.addEventListener("click", () => establecerPreferencia(boton.dataset.temaPref));
  });
  // La ubicación llega unos segundos después de cargar: se vigila cada segundo hasta tenerla y luego cada 15 s
  const esperaUbicacion = setInterval(() => {
    if (ubicacion.latitud === null) return;
    clearInterval(esperaUbicacion);
    revisarTemaAutomatico();
  }, 1000);
  setInterval(revisarTemaAutomatico, REVISION_AUTO_MS);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) revisarTemaAutomatico();
  });
}

inicializarTema();
```

### `scripts/idioma.js`

```javascript
// scripts/idioma.js
// Botón ES / EN de la cabecera. Por ahora solo CAMBIA el idioma activo y lo recuerda; la traducción de los
// textos se conecta aparte, escuchando el evento "cambio-idioma" o leyendo idiomaActual().
//   document.addEventListener("cambio-idioma", (e) => { /* e.detail.idioma === "es" | "en" */ });

const IDIOMAS = ["es", "en"];
const NOMBRES_IDIOMA = {
  es: { es: "español", en: "Spanish" },
  en: { es: "inglés", en: "English" },
};
let idiomaActivo = "es"; // el sitio está escrito en español: es el idioma por defecto

function idiomaActual() {
  return idiomaActivo;
}

function establecerIdioma(nuevo) {
  idiomaActivo = nuevo;
  document.documentElement.lang = nuevo;
  document.documentElement.dataset.idioma = nuevo;
  const boton = document.getElementById("boton-idioma");
  if (boton) {
    const otro = IDIOMAS.find((i) => i !== nuevo);
    boton.textContent = nuevo.toUpperCase();
    boton.title = `Cambiar a ${NOMBRES_IDIOMA[otro].es} / Switch to ${NOMBRES_IDIOMA[otro].en}`;
    boton.setAttribute("aria-label", boton.title);
  }
  try {
    localStorage.setItem("idioma", nuevo);
  } catch (e) {
    /* sin almacenamiento: el idioma solo dura la visita */
  }
  document.dispatchEvent(new CustomEvent("cambio-idioma", { detail: { idioma: nuevo } }));
}

function inicializarIdioma() {
  let guardado = null;
  try {
    guardado = localStorage.getItem("idioma");
  } catch (e) {
    guardado = null;
  }
  establecerIdioma(IDIOMAS.includes(guardado) ? guardado : "es");
  const boton = document.getElementById("boton-idioma");
  if (boton) {
    boton.addEventListener("click", () => establecerIdioma(idiomaActivo === "es" ? "en" : "es"));
  }
}

inicializarIdioma();
```
