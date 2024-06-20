// Referencias iniciales
const contenedorLetras = document.getElementById("contenedor-letras");
const seccionEntradaUsuario = document.getElementById("seccion-entrada-usuario");
const contenedorNuevoJuego = document.getElementById("contenedor-nuevo-juego");
const botonNuevoJuego = document.getElementById("boton-nuevo-juego");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const textoResultado = document.getElementById("texto-resultado");
const cronometro = document.getElementById("cronometro");
const tiempoRestanteElemento = document.getElementById("tiempo-restante");
const botonPista = document.getElementById("boton-pista");
const divPista = document.getElementById("pista");

// Opciones de palabras para colores (nivel difícil) con pistas
const opciones = [
  { palabra: "Esmeralda", pista: "Color verde brillante y profundo como la piedra preciosa" },
  { palabra: "Amaranto", pista: "Color rojo púrpura similar a una flor" },
  { palabra: "Indigo", pista: "Color azul oscuro intenso similar al añil" },
  { palabra: "Albumina", pista: "Blanco brillante como la clara del huevo" },
  { palabra: "Bermellon", pista: "Rojo brillante y fuerte como el pigmento mineral" },
  { palabra: "Celadon", pista: "Verde pálido típico de la cerámica china" }
];

// Contadores
let contadorAciertos = 0;
let contadorErrores = 0;
let palabraElegida = "";
let tiempoRestante = 30; // Tiempo para nivel difícil
let juegoFinalizado = false;

// Mostrar letras disponibles
const mostrarLetras = () => {
  contenedorLetras.innerHTML = ''; // Limpiar botones anteriores si los hay
  for (let i = 65; i < 91; i++) {
    let boton = document.createElement("button");
    boton.classList.add("letras");
    boton.innerText = String.fromCharCode(i);
    boton.addEventListener("click", () => manejarLetra(boton));
    contenedorLetras.append(boton);
  }
};

// Manejar la selección de una letra
const manejarLetra = (boton) => {
  if (juegoFinalizado) return;

  const letra = boton.innerText;
  const arrayPalabra = palabraElegida.split("");
  const guiones = document.getElementsByClassName("guiones");
  let acierto = false;

  arrayPalabra.forEach((char, index) => {
    if (char === letra) {
      guiones[index].innerText = char;
      contadorAciertos++;
      acierto = true;
    }
  });

  if (!acierto) {
    contadorErrores++;
    imagenAhorcado.src = `../links/ahorcado_${contadorErrores}.png`;
    imagenAhorcado.style.display = 'block'; // Mostrar la imagen del ahorcado en caso de error
  }

  if (contadorAciertos === arrayPalabra.length) {
    textoResultado.innerHTML = `<h2 class='win-msg'>¡Ganaste!</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
    finalizarJuego();
  }

  if (contadorErrores === 6) {
    textoResultado.innerHTML = `<h2 class='lose-msg'>¡Perdiste!</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
    finalizarJuego();
  }

  boton.disabled = true;
};

// Generar una palabra al azar
const generarPalabra = () => {
  const indiceAleatorio = Math.floor(Math.random() * opciones.length);
  palabraElegida = opciones[indiceAleatorio].palabra.toUpperCase();
  pistaActual = opciones[indiceAleatorio].pista;
  seccionEntradaUsuario.innerHTML = palabraElegida.replace(/./g, '<span class="guiones">_</span>');
};

// Mostrar la pista
const mostrarPista = () => {
  divPista.innerText = `Pista: ${pistaActual}`;
  divPista.classList.remove("hide");
};

// Iniciar cronómetro
const iniciarCronometro = () => {
  const intervalo = setInterval(() => {
    tiempoRestante--;
    tiempoRestanteElemento.innerText = tiempoRestante;

    if (tiempoRestante === 0) {
      clearInterval(intervalo);
      if (!juegoFinalizado) {
        textoResultado.innerHTML = `<h2 class='lose-msg'>¡Se acabó el tiempo!</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
        finalizarJuego();
      }
    }
  }, 1000);
};

// Finalizar el juego
const finalizarJuego = () => {
  juegoFinalizado = true;
  const botonesLetras = document.querySelectorAll(".letras");
  botonesLetras.forEach((boton) => (boton.disabled = true));
  contenedorNuevoJuego.classList.remove("hide");
  cronometro.style.display = "none"; // Ocultar el cronómetro
  divPista.classList.add("hide"); // Ocultar la pista
};

// Inicializar el juego
const inicializarJuego = () => {
  juegoFinalizado = false;
  contadorAciertos = 0;
  contadorErrores = 0;
  tiempoRestante = 30;
  imagenAhorcado.src = `../links/ahorcado_1.png`;
  imagenAhorcado.style.display = 'none'; // Ocultar la imagen del ahorcado al inicio
  textoResultado.innerHTML = "";
  contenedorLetras.innerHTML = "";
  contenedorNuevoJuego.classList.add("hide");
  cronometro.style.display = "block"; // Mostrar el cronómetro
  tiempoRestanteElemento.innerText = tiempoRestante; // Reiniciar el cronómetro
  divPista.classList.add("hide"); // Ocultar la pista

  generarPalabra();
  mostrarLetras();
  iniciarCronometro();
};

botonNuevoJuego.addEventListener("click", inicializarJuego);
botonPista.addEventListener("click", mostrarPista);
window.onload = inicializarJuego;
