//botón de scroll para enfatizar la presentación -------------------------------------------------------------------------

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
  if (!escaleraSeccion || !botonEscalera) {
    return;
  }
  botonEscalera.addEventListener("click", () => {
    escaleraSeccion.scrollIntoView({ behavior: "smooth" });
  });
}

//Sistema de partículas, libreria externa: https://github.com/VincentGarreau/particles.js

function cargarParticulasIndex() {
  //el de inicio
  const particulasIndex = document.getElementById("particles-js");
  if (!particulasIndex) {
    return;
  }
  particlesJS.load('particles-js', 'data.json/particles.json', function () {
    console.log('callback - particles.js config loaded');

  });
}

function cargarParticulasSalaSecreta() {
  //el de sala secreta
  const particulasSalaSecreta = document.getElementById("particles2");
  if (!particulasSalaSecreta) {
    return;
  }
  particlesJS.load('particles2', '../data.json/particlesjs2sala.json', function () {
    console.log('callback - particles.js config loaded');

  });
}

//animación de contacto que debe ejecutarse solo una vez por sesión ------------------------------

window.addEventListener("load", () => {
  const papelito = document.querySelector(".papel-contacto-container");
  if (!papelito) {
    return;
  }
  setTimeout(() => { papelito.classList.add("papel-contacto-animacion"); }, 1500)
});


// Chequear si ya se animó esta sesión
//if (!sessionStorage.getItem("animacionDeslizada")) {
// papelito.classList.add("papel-contacto-animacion");
//sessionStorage.setItem("animacionDeslizada", "true");
//} else {
//estado final
//papelito.style.transform = "translateY(216px)";

//}

function spawnearMapa() {
  //toggle para mostrar la ubicación en el mapa
  const papeles = document.querySelectorAll(".papel-contacto-container");
  const mapa = document.querySelector(".mapa-contacto");
  if (!papeles||!mapa) {
    return;
  }
  papeles.forEach(papel => {
    papel.addEventListener("click", () => {
      mapa.classList.toggle("ocultar-mapa");
    });
  });
}

//api vainilla calendar para reservas de salas ---------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
  const elementoCalendar = document.getElementById('calendar');
  if (!elementoCalendar) {
    return;
  }
  const calendar = new VanillaCalendar('#calendar'); //new:objetonuevo, #id del objeto
  calendar.init();
});



//ejecución de funciones -------------------------------------------------------------------------
EventoBarraBusqueda();
EventoBotonEscalera();
cargarParticulasIndex();
cargarParticulasSalaSecreta();
spawnearMapa();

