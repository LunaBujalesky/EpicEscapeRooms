//botón de scroll para enfatizar la presentación -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  EventoBarraBusqueda();
  EventoBotonEscalera();
  
});

function EventoBarraBusqueda() {
  const barraBusqueda = document.getElementById("testimonios-searchbar-puzzle");
  if (!barraBusqueda) {//Cuando no encuentra ningun elemento con ese ID
    return;//Si este if se cumple, TODO lo que este debajo, no se ejecuta
  }

  //elementos de la sala secreta -------------------------------------------------------------------------
  barraBusqueda.addEventListener("focus", function () {
    alert(" *No hace nada, /n" +
      "Que esperabas de una barra de búsqueda que está en medio de la nada? /n pero, ey! es un testimonio de que la barra de búsqueda está funcionando.  ");
  });

}

function EventoBotonEscalera() {
  const botonEscalera = document.getElementById("boton-escalera");
  const escaleraSeccion = document.getElementById("escalera-seccion");
  if (!escaleraSeccion || !botonEscalera ) {
    return;
  }
  botonEscalera.addEventListener("click", () => {
    escaleraSeccion.scrollIntoView({ behavior: "smooth" });
  });
}

//Sistema de partículas, libreria externa: https://github.com/VincentGarreau/particles.js
//el de inicio
particlesJS.load('particles-js',   'data.json/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

//el de sala secreta
particlesJS.load('particles2',  '../data.json/particlesjs2sala.json',  function() {
  console.log('callback - particles.js config loaded');
});
