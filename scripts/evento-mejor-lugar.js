// scripts/evento-mejor-lugar.js
// "Ir al mejor lugar": para los eventos que no se ven bien desde tu ubicación (lluvias de estrellas), busca en la Tierra el punto de TIERRA donde se ven mejor
// en el instante del pico: el radiante lo más alto posible, con el Sol bajo el horizonte y la menor luz lunar.
// Lo usa evento-detalle.js (evdMejorLugar). Eclipses: su punto óptimo ya es el de "ver en reloj". No cubre nubes ni contaminación lumínica.
// Depende de: evento-detalle.js (evdMejorPunto), eventos-lluvias.js (LLUVIAS), mapa-datos.js (MAPA_TIERRA), astronomia.js (horaSideral, posicionSolarHorizonte, posicionLunarHorizonte), eclipses.js (faseLunarPrecisa)

// ¿Cae (lat, lon) sobre tierra firme? Trazado de rayos sobre las costas simplificadas del mapa (±0,5° de margen de error)
function evmEnTierra(lat, lon) {
  return MAPA_TIERRA.some((poligono) => {
    let dentro = false;
    for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
      const [xi, yi] = poligono[i], [xj, yj] = poligono[j];
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) dentro = !dentro;
    }
    return dentro;
  });
}

// Altura (°) de un punto del cielo (ascensión recta y declinación en °) visto desde (lat, lon) en el instante ms
function evmAltura(ra, dec, ms, lat, lon) {
  const H = (horaSideral(new Date(ms), lon) - ra) * GRAD, f = lat * GRAD, d = dec * GRAD;
  return Math.asin(Math.sin(f) * Math.sin(d) + Math.cos(f) * Math.cos(d) * Math.cos(H)) / GRAD;
}

// Devuelve { ms, punto: { lat, lon } } o null si el evento no tiene un "mejor lugar" con sentido
function evdMejorLugar(e) {
  const lluvia = (e.tipo || "").startsWith("lluvia-") && LLUVIAS.find((x) => e.tipo === `lluvia-${x.nombre}`);
  if (!lluvia || typeof lluvia.ra !== "number") return null;
  const ms = e.maximo, fecha = new Date(ms), luna = faseLunarPrecisa(ms).fraccion;
  const punto = evdMejorPunto((lat, lon) => {
    const alt = evmAltura(lluvia.ra, lluvia.dec, ms, lat, lon);
    const noche = posicionSolarHorizonte(fecha, lat, lon).altura < -12;
    const lunaArriba = posicionLunarHorizonte(fecha, lat, lon).altura > 0;
    return alt - (noche ? 0 : 1000) - (lunaArriba ? luna * 40 : 0) - (evmEnTierra(lat, lon) ? 0 : 500) - (lat < -56 || lat > 66 ? 300 : 0); // sin océano ni latitudes polares deshabitadas
  });
  return { ms, punto };
}