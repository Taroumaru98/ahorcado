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