// scripts/nodos-lunares.js
// Nodos de la órbita lunar (donde cruza la eclíptica) y posición matemática de la Luna en su órbita.
//   nodoLunarVerdadero(ms)   → longitud eclíptica (°) del nodo ascendente (norte); el descendente (sur) está a 180°
//   posicionOrbitalLunar(ms) → { u, nodo, nodoActivo, distanciaNodo, distanciaSolNodo, temporadaEclipses }
//     u = argumento de latitud (°): 0 = en el nodo ascendente, 90 = máximo al norte, 180 = nodo descendente, 270 = máximo al sur
// Fórmulas: Meeus cap. 47 (nodo medio + correcciones del nodo verdadero). Depende de: efemerides-precisas.js

const NODOS = {
  INCLINACION: 5.145,        // ° (media; varía 4,99–5,30)
  LIMITE_ECLIPSE: 18.5,      // ° del Sol al nodo para que pueda haber eclipse (solar: hasta 18,5°; lunar: hasta ~15,5°)
};

const nodoNorm = (g) => ((g % 360) + 360) % 360;

function nodoLunarVerdadero(ms) {
  const T = siglosTT(ms);
  const Om = 125.0445479 - 1934.1362891 * T + 0.0020754 * T ** 2 + T ** 3 / 467441 - T ** 4 / 60616000;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T ** 2;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T ** 2;
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T ** 2;
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T ** 2;
  const verdadero = Om
    - 1.4979 * epSin(2 * (D - F)) - 0.15 * epSin(M) - 0.1226 * epSin(2 * D) + 0.1176 * epSin(2 * F) - 0.0801 * epSin(2 * (Lp - F));
  return nodoNorm(verdadero);
}

// Distancia angular (0–90°) de una longitud al eje de nodos (ascendente y descendente forman una recta)
function distanciaAlEjeDeNodos(longitud, nodo) {
  const d = Math.abs(nodoNorm(longitud - nodo)) % 180;
  return Math.min(d, 180 - d);
}

function posicionOrbitalLunar(ms) {
  const luna = posicionLunarPrecisa(ms), sol = posicionSolarPrecisa(ms);
  const nodo = nodoLunarVerdadero(ms);
  const u = nodoNorm(luna.longitud - nodo);
  const hastaNodo = u <= 180 ? Math.min(u, 180 - u) : Math.min(u - 180, 360 - u); // ° hasta el nodo más cercano
  const distanciaSol = distanciaAlEjeDeNodos(sol.longitud, nodo);
  return {
    u,
    nodo,
    latitud: luna.latitud,
    nodoActivo: u < 90 || u >= 270 ? "norte" : "sur", // el nodo más cercano en la órbita
    distanciaNodo: hastaNodo,
    distanciaSolNodo: distanciaSol,
    temporadaEclipses: distanciaSol <= NODOS.LIMITE_ECLIPSE,
  };
}