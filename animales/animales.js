// Referencias iniciales
const contenedorLetras = document.getElementById("contenedor-letras");
const seccionEntradaUsuario = document.getElementById("seccion-entrada-usuario");
const contenedorNuevoJuego = document.getElementById("contenedor-nuevo-juego");
const botonNuevoJuego = document.getElementById("boton-nuevo-juego");
const imagenAhorcado = document.getElementById("imagen-ahorcado");
const textoResultado = document.getElementById("texto-resultado");

// Valores de opciones para los botones
const opciones = {
  animales: ["ERIZO", "RINOCERONTE", "ARDILLA", "PANTERA", "MORSA", "CEBRA"]
};

// Contadores
let contadorGanador = 0;
let contadorErrores = 0;

let palabraElegida = "";

// Bloquear todos los botones
const bloquearBotones = () => {
  const botonesLetras = document.querySelectorAll(".letras");
  // Deshabilitar todas las letras
  botonesLetras.forEach((button) => {
    button.disabled = true;
  });
  contenedorNuevoJuego.classList.remove("hide");
};

// Generador de palabras
const generarPalabra = () => {
  contenedorLetras.classList.remove("hide");
  seccionEntradaUsuario.innerText = "";

  const arrayOpcion = opciones.animales;
  // Elegir palabra aleatoria
  palabraElegida = arrayOpcion[Math.floor(Math.random() * arrayOpcion.length)];
  palabraElegida = palabraElegida.toUpperCase();

  // Reemplazar cada letra con un span que contenga un guión
  const itemMostrar = palabraElegida.replace(/./g, '<span class="guiones">_</span>');

  // Mostrar cada elemento como span
  seccionEntradaUsuario.innerHTML = itemMostrar;
};

// Función inicial (Se llama cuando la página carga/el usuario presiona nuevo juego)
const inicializador = () => {
  contadorGanador = 0;
  contadorErrores = 0;

  // Inicialmente borrar todo el contenido y ocultar letras y botón de nuevo juego
  seccionEntradaUsuario.innerHTML = "";
  contenedorLetras.innerHTML = "";
  contenedorLetras.classList.add("hide");
  contenedorNuevoJuego.classList.add("hide");
  imagenAhorcado.src = "../links/ahorcado0.png";
  imagenAhorcado.style.display = "none"; // Ocultar la imagen al iniciar el juego

  // Para crear botones de letras
  for (let i = 65; i < 91; i++) {
    const button = document.createElement("button");
    button.classList.add("letras");
    // Número a ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    // Click del botón de carácter
    button.addEventListener("click", () => {
      const arrayCaracteres = palabraElegida.split("");
      const guiones = document.getElementsByClassName("guiones");
      // Si el array contiene el valor clickeado, reemplazar el guión con la letra, de lo contrario, cambiar la imagen
      if (arrayCaracteres.includes(button.innerText)) {
        arrayCaracteres.forEach((char, index) => {
          // Si el carácter en el array es igual al botón clickeado
          if (char === button.innerText) {
            // Reemplazar guión con letra
            guiones[index].innerText = char;
            // Incrementar contador
            contadorGanador += 1;
            // Si contadorGanador es igual a la longitud de la palabra
            if (contadorGanador === arrayCaracteres.length) {
              textoResultado.innerHTML = `<h2 class='win-msg'>¡Ganaste!</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
              // Bloquear todos los botones
              bloquearBotones();
            }
          }
        });
      } else {
        // Contador de fallos
        contadorErrores += 1;
        // Cambiar imagen del ahorcado
        actualizarImagen(contadorErrores);
        // contadorErrores === 6 porque cabeza, cuerpo, brazo izquierdo, brazo derecho, pierna izquierda, pierna derecha
        if (contadorErrores === 6) {
          textoResultado.innerHTML = `<h2 class='lose-msg'>¡Perdiste!</h2><p>La palabra era <span>${palabraElegida}</span></p>`;
          bloquearBotones();
        }
      }
      // Deshabilitar botón clickeado
      button.disabled = true;
    });
    contenedorLetras.append(button);
  }

  generarPalabra();
};

// Actualizar imagen del ahorcado
const actualizarImagen = (contadorErrores) => {
  imagenAhorcado.src = `../links/ahorcado_${contadorErrores + 1}.png`;
  imagenAhorcado.style.display = "block"; // Mostrar la imagen del ahorcado al cometer un error
};

// Nuevo juego
botonNuevoJuego.addEventListener("click", inicializador);
window.onload = inicializador;
