// scripts/eventos-solares.js
 
const PASO_MINUTOS = 2; // resolución del degradado: más bajo = más suave, más pesado
 
const PARADAS_COLOR = [
  { altura: -90, color: [4, 6, 18] }, // noche profunda, casi negro azulado
  { altura: -18, color: [10, 12, 40] }, // fin crepúsculo astronómico
  { altura: -12, color: [45, 20, 70] }, // crepúsculo náutico: violeta
  { altura: -8, color: [120, 35, 65] }, // transición violeta → rojo
  { altura: -4, color: [200, 60, 40] }, // crepúsculo civil: rojo/naranja intenso
  { altura: -1, color: [230, 130, 40] }, // naranja cálido cerca del horizonte
  { altura: 0, color: [235, 180, 80] }, // horizonte: dorado
  { altura: 8, color: [80, 120, 170] }, // transición a azul día
  { altura: 30, color: [63, 110, 168] }, // día
  { altura: 90, color: [63, 110, 168] }, // cenit
];
 
function colorPorAltura(altura) {
  if (altura <= PARADAS_COLOR[0].altura) return rgb(PARADAS_COLOR[0].color);
  const ultima = PARADAS_COLOR[PARADAS_COLOR.length - 1];
  if (altura >= ultima.altura) return rgb(ultima.color);
 
  for (let i = 0; i < PARADAS_COLOR.length - 1; i++) {
    const a = PARADAS_COLOR[i];
    const b = PARADAS_COLOR[i + 1];
    if (altura >= a.altura && altura <= b.altura) {
      const t = (altura - a.altura) / (b.altura - a.altura);
      const mezcla = a.color.map((v, idx) =>
        Math.round(v + t * (b.color[idx] - v)),
      );
      return rgb(mezcla);
    }
  }
}
 
function rgb([r, g, b]) {
  return `rgb(${r}, ${g}, ${b})`;
}
 
let sectoresEventosSolares = null; // se crean una sola vez, luego solo se actualiza su color
 
function crearSectoresEventosSolares(capa) {
  const RADIO_INTERNO = 480;
  const RADIO_EXTERNO = 600;
  const sectores = [];
 
  for (let minuto = 0; minuto < 1440; minuto += PASO_MINUTOS) {
    const anguloInicio = minuto / 4 - 180;
    const anguloFin = (minuto + PASO_MINUTOS) / 4 - 180;
 
    const p1 = polar(RADIO_EXTERNO, anguloInicio);
    const p2 = polar(RADIO_EXTERNO, anguloFin);
    const p3 = polar(RADIO_INTERNO, anguloFin);
    const p4 = polar(RADIO_INTERNO, anguloInicio);
 
    const d = `M ${p1.x} ${p1.y} A ${RADIO_EXTERNO} ${RADIO_EXTERNO} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${RADIO_INTERNO} ${RADIO_INTERNO} 0 0 0 ${p4.x} ${p4.y} Z`;
 
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "sector-evento-solar");
    capa.appendChild(path);
    sectores.push({ path, minutoMedio: minuto + PASO_MINUTOS / 2 });
  }
 
  return sectores;
}
 
function dibujarEventosSolares() {
  const capa = document.getElementById("capa-eventos-solares");
  if (ubicacion.latitud === null) return;
 
  if (!sectoresEventosSolares) {
    sectoresEventosSolares = crearSectoresEventosSolares(capa);
  }
 
  // Medianoche (00:00 de pared) del día en curso EN EL LUGAR activo, como instante real
  const inicioDelDia = medianocheLocal(obtenerFechaActual()).getTime();
 
  sectoresEventosSolares.forEach(({ path, minutoMedio }) => {
    const fechaMinuto = new Date(inicioDelDia + minutoMedio * 60000);
    const { altura } = posicionSolarHorizonte(
      fechaMinuto,
      ubicacion.latitud,
      ubicacion.longitud,
    );
    path.style.fill = colorPorAltura(altura);
  });
}
 
// Redibuja el anillo solo cuando cambia algo que lo afecta:
// el día de pared, el huso o la ubicación (reemplaza al setInterval de 60 s).
let claveEventosSolares = null;
 
function actualizarEventosSolaresSiCambio(ahora) {
  if (ubicacion.latitud === null) return;
  const p = aHoraDePared(ahora);
  const clave = `${p.getUTCFullYear()}-${p.getUTCMonth()}-${p.getUTCDate()}|${husoDelLugar(ahora)}|${ubicacion.latitud}|${ubicacion.longitud}`;
  if (clave === claveEventosSolares) return;
  claveEventosSolares = clave;
  dibujarEventosSolares();
}