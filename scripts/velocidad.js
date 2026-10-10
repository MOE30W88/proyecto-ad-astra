// scripts/velocidad.js
// Controles flotantes de velocidad del tiempo, a los lados del reloj.
//   Derecha:   ▷▷ adelantar (cada clic sube: x10, x100, x1000…)   ▷ reproducir normal (x1)
//   Izquierda: ◁◁ retroceder (cada clic sube: x10, x100, x1000…)  ◁ reproducir hacia atrás (x-1)
// Para cambiar los escalones, edita PASOS_VELOCIDAD.

const PASOS_VELOCIDAD = [10, 100, 1000, 10000, 100000, 1000000, 10000000];

const controlesVelocidad = { sentido: 1, nivel: 0, pausado: false }; // nivel 0 = reproducción normal; 1..n = escalón rápido

function multiplicadorActual() {
  const { sentido, nivel } = controlesVelocidad;
  return sentido * (nivel === 0 ? 1 : PASOS_VELOCIDAD[nivel - 1]);
}

function textoMultiplicador(valor) {
  return valor >= 1000000 ? `x${valor / 1000000}M` : `x${valor}`;
}

const ICONO_PLAY = "M7 4.5v15l12-7.5z", ICONO_PAUSA = "M6 4.5h4v15H6zM14 4.5h4v15h-4z";

function pintarControlesVelocidad() {
  const { sentido, nivel, pausado } = controlesVelocidad;
  const magnitud = Math.abs(multiplicadorActual());
  [-1, 1].forEach((lado) => {
    const caja = document.getElementById(lado === 1 ? "controles-tiempo-der" : "controles-tiempo-izq");
    const activo = !pausado && sentido === lado;
    const enPausa = pausado && lado === 1; // en pausa, el ▷ de la derecha se muestra como ❚❚ y reanuda a x1
    const normal = caja.querySelector('[data-tipo="normal"]');
    caja.classList.toggle("activa", activo || enPausa);
    caja.querySelector(".control-tiempo-etiqueta").textContent = enPausa ? "pausa" : textoMultiplicador(activo ? magnitud : 1);
    normal.classList.toggle("activa", (activo && nivel === 0) || enPausa);
    normal.classList.toggle("en-pausa", enPausa);
    normal.querySelector("path").setAttribute("d", enPausa ? ICONO_PAUSA : ICONO_PLAY);
    if (lado === 1) {
      const texto = enPausa ? "Tiempo en pausa · reanudar (x1)" : "Reproducir a velocidad normal (x1)";
      normal.title = texto;
      normal.setAttribute("aria-label", texto);
    }
    caja.querySelector('[data-tipo="rapido"]').classList.toggle("activa", activo && nivel > 0);
  });
}

function aplicarVelocidad(sentido, nivel) {
  controlesVelocidad.sentido = sentido;
  controlesVelocidad.nivel = nivel;
  controlesVelocidad.pausado = false;
  establecerMultiplicador(multiplicadorActual());
  pintarControlesVelocidad();
}

// Congela el tiempo (lo usa "ver en reloj" de las viñetas); cualquier botón de velocidad lo reanuda
function pausarControlesVelocidad() {
  controlesVelocidad.sentido = 1;
  controlesVelocidad.nivel = 0;
  controlesVelocidad.pausado = true;
  establecerMultiplicador(0);
  pintarControlesVelocidad();
}

// Lo llama el botón "Ahora" del cajón Viajar
function reiniciarControlesVelocidad() {
  controlesVelocidad.sentido = 1;
  controlesVelocidad.nivel = 0;
  controlesVelocidad.pausado = false;
  pintarControlesVelocidad();
}

function inicializarControlesVelocidad() {
  document.querySelectorAll(".control-tiempo-boton").forEach((boton) => {
    const lado = Number(boton.closest(".controles-tiempo").dataset.sentido);
    boton.addEventListener("click", () => {
      if (boton.dataset.tipo === "normal") {
        if (!controlesVelocidad.pausado && controlesVelocidad.sentido === lado && controlesVelocidad.nivel === 0) return; // ya está así
        aplicarVelocidad(lado, 0);
        return;
      }
      // rápido: sube un escalón; tras el último vuelve a la reproducción normal de ese lado
      const siguiente = controlesVelocidad.sentido === lado ? controlesVelocidad.nivel + 1 : 1;
      aplicarVelocidad(lado, siguiente > PASOS_VELOCIDAD.length ? 0 : siguiente);
    });
  });
  pintarControlesVelocidad();
}

inicializarControlesVelocidad();
