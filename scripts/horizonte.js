// scripts/horizonte.js
// Capa Día y noche: horizonte fijo al centro del reloj + observador de pie sobre él.
// Solo se ve con el enfoque "Día y noche" (ver css/dia-noche.css).
// Para cambiar el observador: reemplaza svg/observador/observador.svg o ajusta OBSERVADOR.

const HORIZONTE = {
  centro: 600,
  anilloInterno: 480,  // el horizonte no cruza el anillo día/noche (480–600): así no tapa su degradado
  anilloExterno: 600,
  margenAnillo: 12,    // aire entre la línea y los bordes del anillo
  radioExterior: 690,  // fin de la línea por fuera (a 900 pisaba las etiquetas de salida y puesta)
  margenObservador: 26, // aire entre el observador y los extremos de la línea central
};
const OBSERVADOR = {
  ruta: "svg/observador/observador.svg",
  alto: 290,      // alto máximo de la figura visible; los pies quedan sobre el horizonte
  anchoMax: 150,  // ancho máximo: un icono ancho (varias personas) se reduce hasta caber
};

let horizonteConstruido = false;

function elementoSvgHorizonte(nombre, atributos, padre) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", nombre);
  Object.entries(atributos).forEach(([k, v]) => el.setAttribute(k, v));
  if (padre) padre.appendChild(el);
  return el;
}

// Tramo de horizonte entre dos x (misma altura que el centro)
function tramoHorizonte(capa, x1, x2) {
  if (x2 - x1 < 4) return;
  const c = HORIZONTE.centro;
  elementoSvgHorizonte("line", { class: "horizonte-linea", x1, y1: c, x2, y2: c }, capa);
}

// Mide la forma REAL del SVG (ignora los márgenes del archivo) para centrarla y apoyarla en el horizonte.
// Devuelve { cw, ch, x0, x1, y0, y1 } en píxeles de un lienzo de prueba.
function medirContenidoSvg(ruta) {
  return new Promise((resolver, rechazar) => {
    const url = new URL(ruta, document.baseURI).href;
    fetch(url)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("sin archivo"))))
      .then((texto) => {
        // proporción del SVG: viewBox, o width/height
        const raiz = new DOMParser().parseFromString(texto, "image/svg+xml").documentElement;
        const vb = (raiz.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
        const ancho = vb.length === 4 && vb[2] > 0 ? vb[2] : parseFloat(raiz.getAttribute("width")) || 100;
        const alto = vb.length === 4 && vb[3] > 0 ? vb[3] : parseFloat(raiz.getAttribute("height")) || 100;
        const lado = 600;
        const cw = ancho >= alto ? lado : Math.round((lado * ancho) / alto);
        const ch = ancho >= alto ? Math.round((lado * alto) / ancho) : lado;
        const imagen = new Image();
        imagen.onload = () => {
          const lienzo = document.createElement("canvas");
          lienzo.width = cw;
          lienzo.height = ch;
          const ctx = lienzo.getContext("2d");
          ctx.drawImage(imagen, 0, 0, cw, ch);
          const datos = ctx.getImageData(0, 0, cw, ch).data;
          let x0 = cw, x1 = -1, y0 = ch, y1 = -1;
          for (let y = 0; y < ch; y++) {
            for (let x = 0; x < cw; x++) {
              if (datos[(y * cw + x) * 4 + 3] > 24) {
                if (x < x0) x0 = x;
                if (x > x1) x1 = x;
                if (y < y0) y0 = y;
                if (y > y1) y1 = y;
              }
            }
          }
          x1 >= 0 ? resolver({ cw, ch, x0, x1: x1 + 1, y0, y1: y1 + 1 }) : rechazar(new Error("SVG vacío"));
        };
        imagen.onerror = () => rechazar(new Error("no se pudo leer el SVG"));
        imagen.src = url;
      })
      .catch(rechazar);
  });
}

// Halo suave y sombra en el suelo: dan presencia al observador
function dibujarPresenciaObservador(capa, c, pies, anchoVisible, alto) {
  const defs = elementoSvgHorizonte("defs", {}, capa);
  const grad = elementoSvgHorizonte("radialGradient", { id: "grad-observador", cx: "50%", cy: "50%", r: "50%" }, defs);
  elementoSvgHorizonte("stop", { offset: "0%", style: "stop-color: var(--oro); stop-opacity: 0.26" }, grad);
  elementoSvgHorizonte("stop", { offset: "100%", style: "stop-color: var(--oro); stop-opacity: 0" }, grad);
  elementoSvgHorizonte("circle", { class: "observador-halo", cx: c, cy: pies - alto * 0.5, r: alto * 0.72, fill: "url(#grad-observador)" }, capa);
  elementoSvgHorizonte("ellipse", { class: "observador-sombra", cx: c, cy: pies + 3, rx: Math.max(anchoVisible * 0.62, 34), ry: 7 }, capa);
}

// Figura sencilla que se usa mientras no exista el SVG del observador (devuelve su ancho visible)
function dibujarObservadorProvisional(capa, c, pies) {
  const g = elementoSvgHorizonte("g", { class: "observador-provisional" }, capa);
  elementoSvgHorizonte("circle", { cx: c, cy: pies - 262, r: 24 }, g);
  elementoSvgHorizonte("path", { d: `M ${c} ${pies - 234} V ${pies - 118} M ${c - 48} ${pies - 182} L ${c} ${pies - 212} L ${c + 48} ${pies - 182} M ${c} ${pies - 118} L ${c - 34} ${pies} M ${c} ${pies - 118} L ${c + 34} ${pies}` }, g);
  return 96;
}

function construirHorizonte() {
  const capa = document.getElementById("capa-horizonte");
  const c = HORIZONTE.centro;
  const { anilloInterno, anilloExterno, margenAnillo, radioExterior, margenObservador } = HORIZONTE;

  // Tramos exteriores (más allá del anillo), a cada lado
  tramoHorizonte(capa, c - radioExterior, c - anilloExterno - margenAnillo);
  tramoHorizonte(capa, c + anilloExterno + margenAnillo, c + radioExterior);

  // Tramos interiores: del borde interno del anillo hasta el observador (se dibujan al conocer su ancho)
  const centro = elementoSvgHorizonte("g", {}, capa);
  const completarCentro = (anchoVisible) => {
    const mitad = anchoVisible / 2 + margenObservador;
    tramoHorizonte(centro, c - anilloInterno + margenAnillo, c - mitad);
    tramoHorizonte(centro, c + mitad, c + anilloInterno - margenAnillo);
  };

  medirContenidoSvg(OBSERVADOR.ruta)
    .then((m) => {
      const escala = Math.min(OBSERVADOR.alto / (m.y1 - m.y0), OBSERVADOR.anchoMax / (m.x1 - m.x0)); // unidades del SVG por píxel de prueba
      const anchoVisible = (m.x1 - m.x0) * escala;
      const altoVisible = (m.y1 - m.y0) * escala;
      const xImagen = c - escala * ((m.x0 + m.x1) / 2);         // la forma visible queda centrada en x
      const yImagen = c - escala * m.y1;                        // y sus pies justo sobre el horizonte
      dibujarPresenciaObservador(centro, c, c, anchoVisible, altoVisible);
      centro.appendChild(iconoEnmascarado(OBSERVADOR.ruta, xImagen, yImagen, m.cw * escala, m.ch * escala, "observador-icono"));
      completarCentro(anchoVisible);
    })
    .catch(() => {
      const ancho = dibujarObservadorProvisional(centro, c, c);
      dibujarPresenciaObservador(centro, c, c, ancho, OBSERVADOR.alto);
      completarCentro(ancho);
    });
  horizonteConstruido = true;
}

function actualizarHorizonte() {
  if (!horizonteConstruido) construirHorizonte();
}