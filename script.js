document.addEventListener('DOMContentLoaded', function() {
    let playButton = document.getElementById('play');
    let musicaFondo = document.getElementById('musicaFondo');
    
    playButton.addEventListener('click', function() {
        musicaFondo.play();
    });
});

  function mostrarModal() {
    let modal = document.getElementById("modalFacil");
    modal.style.display = "block";
}

function cerrarModal() {
    let modal = document.getElementById("modalFacil");
    modal.style.display = "none";
}

document.getElementById("play").addEventListener("click", mostrarModal);

document.getElementsByClassName("close")[0].addEventListener("click", cerrarModal);

document.addEventListener('DOMContentLoaded', function() {
    // Agregar eventos a los botones de dificultad
    document.getElementById("facil").addEventListener("click", function() {
        iniciarJuego("Facil");
    });
    document.getElementById("medio").addEventListener("click", function() {
        iniciarJuego("Medio");
    });
    document.getElementById("dificil").addEventListener("click", function() {
        iniciarJuego("Dificil");
    });
});

function iniciarJuego(dificultad) {
    // Redirigir a la página ahorcado.html
    window.location.href = "./ahorcado.html";
}

// Variables globales
let palabrasAnimales = ["LEON", "ELEFANTE", "GATO", "PERRO", "CABALLO"];
let palabrasColores = ["ROJO", "VERDE", "AZUL", "AMARILLO", "BLANCO"];
let palabrasPaises = ["FRANCIA", "MEXICO", "ITALIA", "ESPAÑA", "CHINA"];
let palabraSeleccionada = "";
let intentos = 7;
let letrasUsadas = [];

// Función para activar la categoría seleccionada
function activarCategoria(categoriaId) {
    console.log("Categoría seleccionada:", categoriaId); // Verificar en la consola si se está llamando correctamente

    // Desactiva todas las categorías primero
    const categorias = document.querySelectorAll('.cat a');
    categorias.forEach(categoria => {
        categoria.classList.remove('active');
    });

    // Activa la categoría seleccionada
    const categoriaSeleccionada = document.getElementById(categoriaId);
    categoriaSeleccionada.classList.add('active');

    // Muestra el juego de ahorcado en la parte derecha
    mostrarAhorcado(categoriaId);
}

// Event listener para clic en las categorías
document.querySelectorAll('.cat a').forEach(categoria => {
    categoria.addEventListener('click', () => {
        activarCategoria(categoria.id);
    });
});

function mostrarAhorcado(categoria) {
    let palabraArray = [];
    switch (categoria) {
        case "animales":
            palabraArray = palabrasAnimales;
            break;
        case "colores":
            palabraArray = palabrasColores;
            break;
        case "paises":
            palabraArray = palabrasPaises;
            break;
        default:
            return; // Salir de la función si la categoría no es válida
    }

    // Reiniciar variables globales
    palabraSeleccionada = palabraArray[Math.floor(Math.random() * palabraArray.length)];
    intentos = 7;
    letrasUsadas = [];
    document.getElementById("intentosContador").textContent = intentos;

    // Mostrar la palabra oculta
    mostrarPalabraOculta();

    // Mostrar el juego de ahorcado
    document.querySelector(".ahorcado").style.display = "block";
    document.querySelector(".categorias").style.display = "none";
}

// Función para mostrar la palabra oculta
function mostrarPalabraOculta() {
    let palabraOculta = "";
    for (let letra of palabraSeleccionada) {
        if (letrasUsadas.includes(letra)) {
            palabraOculta += letra + " ";
        } else {
            palabraOculta += "_ ";
        }
    }
    document.getElementById("word").textContent = palabraOculta.trim();
}

// Función para adivinar una letra
function guessLetter(letra) {
    if (letrasUsadas.includes(letra)) {
        return; // La letra ya fue utilizada
    }
    letrasUsadas.push(letra);
    if (!palabraSeleccionada.includes(letra)) {
        intentos--;
        document.getElementById("intentosContador").textContent = intentos;
        mostrarImagenAhorcado();
        if (intentos === 0) {
            alert("¡Has perdido! La palabra era: " + palabraSeleccionada);
            reiniciarJuego();
            return;
        }
    }
    mostrarPalabraOculta();
    if (palabraCompleta()) {
        alert("¡Felicidades! Has adivinado la palabra correctamente.");
        reiniciarJuego();
    }
}

// Función para mostrar la imagen del ahorcado según los intentos restantes
function mostrarImagenAhorcado() {
    let imagenAhorcado = document.getElementById("ahorcado" + (7 - intentos));
    imagenAhorcado.style.display = "inline";
}

// Función para verificar si se completó la palabra
function palabraCompleta() {
    for (let letra of palabraSeleccionada) {
        if (!letrasUsadas.includes(letra)) {
            return false;
        }
    }
    return true;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    document.querySelector(".ahorcado").style.display = "none";
    document.querySelector(".categorias").style.display = "block";
    document.querySelectorAll(".tecla-row button").forEach(button => {
        button.disabled = false;
    });
    document.querySelectorAll("#personaje img").forEach(img => {
        img.style.display = "none";
    });
}

// Dentro de la función mostrarAhorcado(categoria) al final de tu archivo JavaScript

