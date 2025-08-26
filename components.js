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

//animación de contacto que debe ejecutarse solo una vez por sesión ------------------------------
window.addEventListener("load",() => {
 
  const papelito = document.querySelector(".papel-contacto-container");
  setTimeout(() => { papelito.classList.add("papel-contacto-animacion");} , 1000)
});
  // Chequear si ya se animó esta sesión
  //if (!sessionStorage.getItem("animacionDeslizada")) {
   // papelito.classList.add("papel-contacto-animacion");
    //sessionStorage.setItem("animacionDeslizada", "true");
  //} else {
    //estado final
    //papelito.style.transform = "translateY(216px)";
  
  //}

  //toggle para mostrar la ubicación en el mapa
  papeles.forEach(papel => {
    papel.addEventListener("click", () => {
      mapa.classList.toggle("ocultar-mapa");
    });
  });