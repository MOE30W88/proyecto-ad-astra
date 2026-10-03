// scripts/infografias.js
// Contenido editable de la sección: agrega próximos eventos y sus imágenes SVG aquí.
// Las fichas de la galería se generan solo a partir de las imágenes del listado de eventos.
const EVENTOS_PROXIMOS_INFOGRAFIAS = [
  /* Ejemplo para copiar cuando exista el cálculo del evento y sus imágenes:
  {
    id: "eclipse-solar-2028",
    titulo: "Eclipse solar parcial",
    fecha: "12 ago 2028 · hora local",
    alcance: "Visible desde tu ubicación",
    icono: "assets/iconos/eclipse-solar.svg",
    destino: "#eventos-proximos",
    imagenes: [
      {
        ruta: "assets/infografias/eclipse-solar-vista.svg",
        titulo: "Vista desde el horizonte",
        tema: "Eclipse solar · observación local",
        descripcion: "Describe aquí qué verá el observador y cómo evoluciona el fenómeno.",
        detalle: "Añade la hora local, la magnitud o cualquier dato calculado.",
        alt: "Representación del eclipse solar visto desde el horizonte local"
      }
    ]
  },
  */
];

function crearEventoTicker(evento, plantilla) {
  const nodo = plantilla.content.firstElementChild.cloneNode(true);
  nodo.href = evento.destino || "#eventos-proximos";
  nodo.setAttribute("aria-label", `${evento.titulo}${evento.fecha ? `, ${evento.fecha}` : ""}`);
  nodo.querySelector(".evento-ticker-texto strong").textContent = evento.titulo;
  nodo.querySelector(".evento-ticker-texto small").textContent = [evento.fecha, evento.alcance].filter(Boolean).join(" · ");
  if (evento.icono) {
    const imagen = nodo.querySelector(".evento-icono img");
    imagen.src = evento.icono;
    imagen.alt = "";
    imagen.hidden = false;
    imagen.addEventListener("error", () => { imagen.hidden = true; }, { once: true });
    nodo.querySelector(".evento-icono-fallback").hidden = true;
  }
  return nodo;
}

function renderizarEventosProximos(eventos) {
  const pista = document.getElementById("eventos-pista");
  const plantilla = document.getElementById("plantilla-evento");
  const botonPausa = document.getElementById("pausar-eventos");
  pista.replaceChildren();

  if (!eventos.length) {
    const estado = document.createElement("p");
    estado.className = "estado-eventos";
    estado.textContent = "Los próximos eventos aparecerán aquí cuando estén disponibles los cálculos.";
    pista.appendChild(estado);
    botonPausa.hidden = true;
    return;
  }

  eventos.forEach((evento) => pista.appendChild(crearEventoTicker(evento, plantilla)));
  if (eventos.length > 1) {
    const repeticion = document.createDocumentFragment();
    eventos.forEach((evento) => repeticion.appendChild(crearEventoTicker(evento, plantilla)));
    const duplicado = document.createElement("div");
    duplicado.className = "eventos-pista-clon";
    duplicado.setAttribute("aria-hidden", "true");
    duplicado.inert = true;
    duplicado.style.display = "contents";
    duplicado.appendChild(repeticion);
    pista.appendChild(duplicado);
    pista.classList.add("hay-eventos");
    botonPausa.hidden = false;
  } else {
    botonPausa.hidden = true;
  }
}

function renderizarGaleria(eventos) {
  const imagenes = eventos.flatMap((evento) => (evento.imagenes || []).map((imagen) => ({ ...imagen, evento: evento.titulo })));
  const pista = document.getElementById("galeria-pista");
  const puntos = document.getElementById("galeria-puntos");
  const fondo = document.getElementById("infografia-fondo");
  const vacia = document.getElementById("infografia-vacia");
  const datos = document.getElementById("infografia-datos");
  const galeriaVacia = document.getElementById("galeria-vacia");
  const anterior = document.getElementById("galeria-anterior");
  const siguiente = document.getElementById("galeria-siguiente");
  const plantilla = document.getElementById("plantilla-imagen-infografia");
  let seleccion = 0;

  pista.replaceChildren();
  puntos.replaceChildren();
  if (!imagenes.length) {
    fondo.hidden = true;
    vacia.hidden = false;
    datos.hidden = true;
    galeriaVacia.hidden = false;
    anterior.hidden = true;
    siguiente.hidden = true;
    return;
  }

  vacia.hidden = true;
  datos.hidden = false;
  galeriaVacia.hidden = true;
  anterior.hidden = false;
  siguiente.hidden = false;

  function seleccionar(indice) {
    seleccion = (indice + imagenes.length) % imagenes.length;
    const imagen = imagenes[seleccion];
    fondo.src = imagen.ruta;
    fondo.hidden = false;
    fondo.onerror = () => { fondo.hidden = true; };
    document.getElementById("infografia-tema").textContent = imagen.tema || imagen.evento;
    document.getElementById("infografia-titulo").textContent = imagen.titulo || imagen.evento;
    document.getElementById("infografia-descripcion").textContent = imagen.descripcion || "";
    document.getElementById("infografia-detalle").textContent = imagen.detalle || "";

    [...pista.children].forEach((tarjeta, i) => {
      tarjeta.setAttribute("aria-current", String(i === seleccion));
    });
    [...puntos.children].forEach((punto, i) => {
      punto.setAttribute("aria-current", String(i === seleccion));
    });
    const movimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    pista.children[seleccion].scrollIntoView({ behavior: movimiento, block: "nearest", inline: "center" });
  }

  imagenes.forEach((imagen, indice) => {
    const tarjeta = plantilla.content.firstElementChild.cloneNode(true);
    const foto = tarjeta.querySelector("img");
    foto.src = imagen.ruta;
    foto.alt = "";
    foto.addEventListener("error", () => { foto.hidden = true; }, { once: true });
    tarjeta.querySelector("span").textContent = imagen.titulo || imagen.evento;
    tarjeta.setAttribute("aria-label", `Mostrar ${imagen.titulo || imagen.evento}`);
    tarjeta.addEventListener("click", () => seleccionar(indice));
    pista.appendChild(tarjeta);

    const punto = document.createElement("button");
    punto.type = "button";
    punto.className = "galeria-punto";
    punto.setAttribute("aria-label", `Mostrar imagen ${indice + 1}: ${imagen.titulo || imagen.evento}`);
    punto.setAttribute("aria-current", "false");
    punto.addEventListener("click", () => seleccionar(indice));
    puntos.appendChild(punto);
  });

  anterior.addEventListener("click", () => seleccionar(seleccion - 1));
  siguiente.addEventListener("click", () => seleccionar(seleccion + 1));
  seleccionar(0);
}

function inicializarInfografias() {
  renderizarEventosProximos(EVENTOS_PROXIMOS_INFOGRAFIAS);
  renderizarGaleria(EVENTOS_PROXIMOS_INFOGRAFIAS);
  const pista = document.getElementById("eventos-pista");
  const botonPausa = document.getElementById("pausar-eventos");
  botonPausa.addEventListener("click", () => {
    const pausado = pista.classList.toggle("eventos-pausados");
    botonPausa.textContent = pausado ? "Reanudar" : "Pausar";
    botonPausa.setAttribute("aria-label", `${pausado ? "Reanudar" : "Pausar"} movimiento de eventos`);
  });
}

inicializarInfografias();
