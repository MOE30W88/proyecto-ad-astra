// scripts/eclipses.js
// Motor de eclipses sobre efemerides-precisas.js. Todo en ms UTC.
//   buscarEclipses(desdeMs, hastaMs)      → lista de eclipses solares y lunares (tipo, clase, máximo, magnitud, gamma)
//   condicionesSolares(ms, lat, lon)      → geometría Sol–Luna vista desde un lugar (separación, radios, ocultación, magnitud, alturas)
//   condicionesLunares(ms)                → geometría Luna–sombra de la Tierra (magnitudes umbral/penumbral, radios, cobertura)
// Depende de: efemerides-precisas.js, calendario-chino-calculo.js (lunaNuevaMeeus, solo para localizar las lunaciones)

const ECL = { DIA_MS: 86400000, SINODICO_DIAS: 29.530588861, ENSANCHE_SOMBRA: 1 + 1 / 85 };

// Área de la intersección de dos círculos (radios r1, r2; separación d)
function areaInterseccion(r1, r2, d) {
  if (d >= r1 + r2) return 0;
  if (d <= Math.abs(r1 - r2)) return Math.PI * Math.min(r1, r2) ** 2;
  const a1 = Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1));
  const a2 = Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
  return r1 * r1 * a1 + r2 * r2 * a2 - 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));
}

// ───── Solar: geometría local ─────
function condicionesSolares(ms, latitud, longitud, alturaM = 0) {
  const sol = vectorSol(ms), luna = vectorLuna(ms);
  const obs = vectorObservador(ms, latitud, longitud, alturaM);
  const s = epResta(sol, obs.posicion), l = epResta(luna, obs.posicion);
  const separacion = epAngulo(s, l);                                       // °
  const radioSol = Math.asin(EP.RADIO_SOL_KM / epNorma(s)) / EP.RAD;       // °
  const radioLuna = Math.asin(EP.RADIO_LUNA_KM / epNorma(l)) / EP.RAD;     // °
  const alturaSol = Math.asin(epDot(s, obs.zenit) / epNorma(s)) / EP.RAD;
  const alturaLuna = Math.asin(epDot(l, obs.zenit) / epNorma(l)) / EP.RAD;
  const cubierto = areaInterseccion(radioSol, radioLuna, separacion);
  return {
    separacion, radioSol, radioLuna, alturaSol, alturaLuna,
    magnitud: Math.max(0, (radioSol + radioLuna - separacion) / (2 * radioSol)),  // fracción del diámetro solar cubierta
    ocultacion: cubierto / (Math.PI * radioSol * radioSol),                        // fracción del área solar cubierta (0–1)
    // dirección Luna respecto al Sol (en el plano del cielo, norte eclíptico arriba) para dibujar el disco lunar sobre el solar
    desfase: separacion,
  };
}

// ───── Lunar: geometría geocéntrica con la sombra de la Tierra ─────
function condicionesLunares(ms) {
  const sol = vectorSol(ms), luna = vectorLuna(ms);
  const c = epNorma(sol);                                   // distancia Sol–Tierra (km)
  const eje = [-sol[0] / c, -sol[1] / c, -sol[2] / c];      // del Sol hacia la Tierra y más allá
  const z = epDot(luna, eje);                               // distancia de la Luna a lo largo del eje
  const perp = epResta(luna, [eje[0] * z, eje[1] * z, eje[2] * z]);
  const d = epNorma(perp);                                  // distancia de la Luna al eje (km)
  const Re = EP.RADIO_TIERRA_KM * ECL.ENSANCHE_SOMBRA;      // la atmósfera agranda la sombra
  const tanU = (EP.RADIO_SOL_KM - Re) / Math.sqrt(c * c - (EP.RADIO_SOL_KM - Re) ** 2);
  const tanP = (EP.RADIO_SOL_KM + Re) / Math.sqrt(c * c - (EP.RADIO_SOL_KM + Re) ** 2);
  const radioUmbra = Re - z * tanU, radioPenumbra = Re + z * tanP, rL = EP.RADIO_LUNA_KM;
  const magUmbral = (radioUmbra + rL - d) / (2 * rL);
  const magPenumbral = (radioPenumbra + rL - d) / (2 * rL);
  return {
    distanciaAlEje: d, radioUmbra, radioPenumbra, radioLuna: rL, magUmbral, magPenumbral,
    // fracción del disco lunar dentro de la umbra (0–1): sirve para sombrear y para el color
    coberturaUmbra: areaInterseccion(radioUmbra, rL, d) / (Math.PI * rL * rL),
    coberturaPenumbra: areaInterseccion(radioPenumbra, rL, d) / (Math.PI * rL * rL),
    // posición de la Luna respecto al centro de la sombra, en radios lunares (para dibujar la umbra sobre el disco)
    proyeccion: perp,
  };
}

// ───── Mínimo de una función en [a, b] (sección áurea) ─────
function minimoAureo(f, a, b, tolMs = 500) {
  const g = (Math.sqrt(5) - 1) / 2;
  let x1 = b - g * (b - a), x2 = a + g * (b - a), f1 = f(x1), f2 = f(x2);
  while (b - a > tolMs) {
    if (f1 < f2) { b = x2; x2 = x1; f2 = f1; x1 = b - g * (b - a); f1 = f(x1); }
    else { a = x1; x1 = x2; f1 = f2; x2 = a + g * (b - a); f2 = f(x2); }
  }
  return (a + b) / 2;
}

// ───── Solar: elementos de Bessel simplificados (eje de la sombra frente al centro de la Tierra) ─────
function geometriaEjeSolar(ms) {
  const sol = vectorSol(ms), luna = vectorLuna(ms);
  const eje0 = epResta(luna, sol), cSL = epNorma(eje0);                 // del Sol hacia la Luna
  const eje = eje0.map((v) => v / cSL);
  const t = -epDot(luna, eje);                                          // de la Luna al plano fundamental (por el centro de la Tierra)
  const punto = [luna[0] + eje[0] * t, luna[1] + eje[1] * t, luna[2] + eje[2] * t];
  const Re = EP.RADIO_TIERRA_KM;
  const sinF1 = (EP.RADIO_SOL_KM + EP.RADIO_LUNA_KM) / cSL, sinF2 = (EP.RADIO_SOL_KM - EP.RADIO_LUNA_KM) / cSL;
  const l1 = (t + EP.RADIO_LUNA_KM / sinF1) * Math.tan(Math.asin(sinF1));         // radio de la penumbra en el plano
  const l2 = (EP.RADIO_LUNA_KM / sinF2 - t) * Math.tan(Math.asin(sinF2));         // radio de la umbra (<0 = anular)
  return { gamma: epNorma(punto) / Re, penumbra: l1 / Re, umbra: l2 / Re };
}

function claseSolar(g) {
  const u = Math.abs(g.umbra);
  if (g.gamma < 0.9972) return u < 0.0047 ? "híbrido" : g.umbra > 0 ? "total" : "anular";
  if (g.gamma < 0.9972 + u) return g.umbra > 0 ? "total" : "anular";   // no central
  if (g.gamma < 0.9972 + g.penumbra) return "parcial";
  return null;
}

function claseLunar(c) {
  if (c.magUmbral >= 1) return "total";
  if (c.magUmbral > 0) return "parcial";
  if (c.magPenumbral > 0) return "penumbral";
  return null;
}

// Lista de eclipses entre dos instantes (ms UTC), ordenados por fecha
function buscarEclipses(desdeMs, hastaMs) {
  const eclipses = [];
  const k0 = Math.floor((desdeMs / ECL.DIA_MS + 2440587.5 - 2451550.09766) / ECL.SINODICO_DIAS) - 1;
  const k1 = Math.ceil((hastaMs / ECL.DIA_MS + 2440587.5 - 2451550.09766) / ECL.SINODICO_DIAS) + 1;
  for (let k = k0; k <= k1; k++) {
    const nueva = lunaNuevaMeeus(k);
    // Solar: mínimo de gamma alrededor de la luna nueva
    const tS = minimoAureo((t) => geometriaEjeSolar(t).gamma, nueva - ECL.DIA_MS, nueva + ECL.DIA_MS);
    const gS = geometriaEjeSolar(tS), cS = claseSolar(gS);
    if (cS && tS >= desdeMs && tS <= hastaMs) {
      eclipses.push({ tipo: "solar", clase: cS, maximo: tS, gamma: gS.gamma, umbra: gS.umbra });
    }
    // Lunar: mínimo de la distancia Luna–eje alrededor de la luna llena siguiente
    const llena = nueva + (ECL.SINODICO_DIAS / 2) * ECL.DIA_MS;
    const tL = minimoAureo((t) => condicionesLunares(t).distanciaAlEje, llena - ECL.DIA_MS, llena + ECL.DIA_MS);
    const cL = condicionesLunares(tL), claseL = claseLunar(cL);
    if (claseL && tL >= desdeMs && tL <= hastaMs) {
      eclipses.push({ tipo: "lunar", clase: claseL, maximo: tL, magUmbral: cL.magUmbral, magPenumbral: cL.magPenumbral });
    }
  }
  return eclipses.sort((a, b) => a.maximo - b.maximo);
}

// ───── Fase lunar precisa (sustituye al cálculo con el período medio, que se desvía hasta ±14 h) ─────
// Fracción iluminada (Meeus cap. 48, con ángulo de fase) y si la Luna va creciendo
function faseLunarPrecisa(ms) {
  const luna = vectorLuna(ms), sol = vectorSol(ms);
  const psi = epAngulo(luna, sol) * EP.RAD;                    // elongación geocéntrica
  const delta = epNorma(luna), R = epNorma(sol);
  const i = Math.atan2(R * Math.sin(psi), delta - R * Math.cos(psi)); // ángulo de fase
  const lunaLon = Math.atan2(luna[1], luna[0]), solLon = Math.atan2(sol[1], sol[0]);
  const dif = ((lunaLon - solLon) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  return { fraccion: (1 + Math.cos(i)) / 2, creciente: dif < Math.PI, elongacion: psi / EP.RAD };
}

// Qué tan "roja" debe verse la Luna (0–1): crece cuando casi todo el disco entra en la umbra (totalidad)
function factorEclipseLunar(ms) {
  const c = condicionesLunares(ms);
  const x = Math.max(0, Math.min(1, (c.coberturaUmbra - 0.85) / 0.15));
  return x * x * (3 - 2 * x);
}