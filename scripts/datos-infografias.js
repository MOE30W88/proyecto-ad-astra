// scripts/datos-infografias.js
// PLANTILLA DE CONTENIDO: aquí solo se pega la información; scripts/infografias.js la dibuja.
// Cada evento alimenta el carrusel de arriba (icono + título con enlace) y la galería (una tarjeta por imagen).
// Los puntos de selección y las tarjetas salen solos de las imágenes que listes.
//
// Copia el bloque de ejemplo, quítale los /* */ y edítalo:
//   id          nombre interno único (sin espacios)
//   titulo      texto del carrusel
//   fecha       texto libre (opcional; sale al pasar el cursor)
//   alcance     texto libre (opcional; sale al pasar el cursor)
//   icono       SVG pequeño que se pinta con el color del tema
//   destino     enlace interno del título (por defecto "#eventos-proximos")
//   imagenes    lista de imágenes de la galería (en assets/infografias/)
//     ruta, titulo (leyenda bajo la tarjeta y título del panel), tema (rótulo pequeño del panel),
//     descripcion (texto o lista de párrafos), detalle (línea final opcional), alt (texto alternativo)
const EVENTOS_PROXIMOS_INFOGRAFIAS = [
  /* Ejemplo:
  {
    id: "eclipse-solar-2028",
    titulo: "Eclipse solar parcial",
    fecha: "12 ago 2028",
    alcance: "Visible desde tu ubicación",
    icono: "assets/iconos/eclipse-solar.svg",
    destino: "#eventos-proximos",
    imagenes: [
      {
        ruta: "assets/infografias/eclipse-solar-vista.svg",
        titulo: "Eclipse solar total",
        tema: "Eclipse solar · observación local",
        descripcion: ["Primer párrafo.", "Segundo párrafo."],
        detalle: "Hora local, magnitud u otro dato calculado.",
        alt: "Representación del eclipse visto desde el horizonte local"
      },
      {
        ruta: "assets/infografias/eclipse-luna.svg",
        titulo: "Eclipse de Luna",
        tema: "Eclipse lunar",
        descripcion: "Un solo párrafo también funciona."
      }
    ]
  },
  */
];

// Punto único de entrada: hoy devuelve la lista de arriba; cuando existan los cálculos de eclipses
// y astrales, esta función los combinará con este contenido y solo devolverá los próximos.
function obtenerEventosProximos() {
  const calculados = typeof eventosParaCarrusel === "function" ? eventosParaCarrusel(obtenerFechaActual().getTime()) : [];
  return [...calculados, ...EVENTOS_PROXIMOS_INFOGRAFIAS];
}
