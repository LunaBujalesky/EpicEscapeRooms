//elementos de la sala secreta -------------------------------------------------------------------------
document.getElementById("testimonios-searchbar-puzzle").addEventListener("focus", function () {
  alert(" *No hace nada, /n" +
    "Que esperabas de una barra de búsqueda que está en medio de la nada? /n pero, ey! es un testimonio de que la barra de búsqueda está funcionando.  ");
});

//botón de scroll para enfatizar la presentación -------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const botonEscalera = document.getElementById("boton-escalera");
  const escaleraSeccion = document.getElementById("escalera-seccion");

  botonEscalera.addEventListener("click", () => {
    escaleraSeccion.scrollIntoView({ behavior: "smooth" });
  });
});