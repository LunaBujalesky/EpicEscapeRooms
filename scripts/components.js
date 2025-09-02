
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
  particlesJS.load('particles-js', 'data/particles.json', function () {
    console.log('callback - particles.js config loaded');

  });
}

function cargarParticulasSalaSecreta() {
  //el de sala secreta
  const particulasSalaSecreta = document.getElementById("particles2");
  if (!particulasSalaSecreta) {
    return;
  }
  particlesJS.load('particles2', '../data/particlesjs2sala.json', function () {
    console.log('callback - particles.js config loaded');

  });
}

//animación de contacto que debe ejecutarse al cargar la pagina ------------------------------

function animacionContacto() {
  const papelito = document.querySelector(".papel-contacto-container");
  const textoContacto = document.getElementById("aparecerTexto");
  const textoPapelitos = document.querySelectorAll(".aparecerDatos");
  if (!papelito || !textoContacto) {
    return;
  }
  setTimeout(() => { papelito.classList.add("papel-contacto-animacion"); }, 800)
  setTimeout(() => { textoContacto.classList.add("contacto-texto"); }, 2500)
  setTimeout(() => {
    textoPapelitos.forEach(texto => {
      texto.classList.remove("aparecerDatos");
      texto.classList.add("datos-contacto");
    });
  }, 2500);
};


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
  if (!papeles || !mapa) {
    return;
  }
  papeles.forEach(papel => {
    papel.addEventListener("click", () => {
      mapa.classList.toggle("ocultar-mapa");
    });
  });
}

function cambiarCardInicio() {
  //toggle para ver mas info de las salas personalizadas, en inicio
  const botonComoFunciona = document.querySelectorAll(".boton-funciona");
  const cardSalaIndex = document.querySelector(".sala-personalizada-container.cambioCardInvisible");
  if (!botonComoFunciona || !cardSalaIndex) {
    return;
  }

  botonComoFunciona.forEach(boton => {
    boton.addEventListener("click", () => {
      cardSalaIndex.classList.remove("cambioCardInvisible");
      cardSalaIndex.classList.toggle("cambioCardVisible");
    });
  });
}

function deslizarCalltoAction() {
  //funcion para que se dezlice el calltoaction al hacer click en el boton de flecha card personalizada
  const botoncalltoaction = document.querySelector(".fondo-botton");
  const papelCalltoaction = document.querySelector(".calltoactionInvisible");
  const deslizaBoton = document.querySelector(".deslizaboton");
  if (!botoncalltoaction || !papelCalltoaction || !deslizaBoton) {
    return;
  }
  botoncalltoaction.addEventListener("click", () => {
    //reemplazo clase con un click
    papelCalltoaction.classList.toggle("calltoactionInvisible");
    papelCalltoaction.classList.toggle("calltoactionVisible");
    papelCalltoaction.classList.toggle("calltoactionMove");

    if (papelCalltoaction.classList.contains("calltoactionVisible, calltoactionMove")) {
      deslizaBoton.classList.add("calltoactionMove");
    } else {
      deslizaBoton.classList.remove("calltoactionMove");
    }
  });

}

//api vainilla calendar para reservas de salas ---------------------------------------------------


function reservarSalaCalendario() {
  const calendarioReserva = document.getElementById("calendar");
  if (!calendarioReserva) {
    return;
  }

  // Verificar que la librería esté cargada
  if (!window.VanillaCalendarPro) {
    console.error('VanillaCalendarPro no está cargado');
    return;
  }

  // Destructure the Calendar constructor
  const { Calendar } = window.VanillaCalendarPro;

  const options = {
    type: 'default',
    locale: 'es-AR',
    selector: '#fecha', // Input donde se guardará la fecha seleccionada

    disableDatesPast: true,
    displayDisabledDates: false,
    timeMinHour: 13,
    timeMaxHour: 22,
    dateMin: new Date(2025, 7, 27),
    dateMax: new Date(2038, 11, 31),
    displayDateMin: new Date(2025, 7, 27),
    displayDateMax: new Date(2038, 11, 31),

    input: true,
    actions: {
      changeToInput(e, self) {
        if (!self.HTMLInputElement) return;
        if (self.selectedDates[0]) {
          self.HTMLInputElement.value = self.selectedDates[0];
          // si querés que se cierre al elegir:
          self.hide();
        } else {
          self.HTMLInputElement.value = "";
        }
      },
      initCalendar(self) {
        const btnEl = self.HTMLElement.querySelector("#btn-close");
        if (!btnEl) return;
        btnEl.addEventListener("click", self.hide);
      },
    },

    DOMTemplates: {
      default: `
        <div class="vanilla-calendar-header">
          <#ArrowPrev />
          <div class="vanilla-calendar-header__content">
            <#Month />
            <#Year />
          </div>
          <#ArrowNext />
        </div>
        <div class="vanilla-calendar-wrapper">
          <#WeekNumbers />
          <div class="vanilla-calendar-content">
            <#Week />
            <#Days />
          </div>
        </div>
        <#ControlTime />
        <button id="btn-close" type="button">Close</button>
      `,
    },

    settings: {
      selection: {
        time: true,
      },
      visibility: {
        positionToInput: "center",
      },
    },
  };

  // Create a calendar instance and initialize it.
  const calendar = new Calendar('#calendar', options);
  calendar.init();
}

//ejecución de funciones -------------------------------------------------------------------------
EventoBarraBusqueda();
EventoBotonEscalera();
cargarParticulasIndex();
cargarParticulasSalaSecreta();
spawnearMapa();
cambiarCardInicio();
deslizarCalltoAction();
animacionContacto();
reservarSalaCalendario();