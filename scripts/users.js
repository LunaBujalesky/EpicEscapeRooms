let email;
let contrasena;
let usuarioActual;

let usuarios = [
  {
    nombre: "Luna",
    email: "lunitabruja@gmail.com",
    contrasena: "1234",
    fechaNacimiento: "1997-10-10"
  },
  {
    nombre: "Pipo",
    email: "pipo@gmail.com",
    contrasena: "abcd",
    fechaNacimiento: "2025-12-20"
  }
];
CargarUsuarios()
//funcion async y manejo de error para cuando no tiene datos cargados en el storage
function CargarUsuarios() {
  //Si ya se cargo la base de datos, no hacer nada
  if (localStorage.getItem("usuarios")) {
    console.log("Usuarios ya cargados en localStorage");
    return;
  }

  fetch("../data/users.json").then(respuesta => respuesta.json())
    .then(data => {
      usuarios = data;
      console.log("carga usuario exitosa")
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    })
    .catch(err => console.error("Error al leer JSON:", err));
}

// Funcion crear Usuario por html y dom
function registrarUsuario() {
  const formRegistro = document.getElementById("formRegistro")
  if (!formRegistro) {
    return
  }
  formRegistro.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que recargue la página

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    console.log(usuarios + "estan registrados")
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let contrasena = document.getElementById("contrasena").value.trim();
    let fechaNacimiento = document.getElementById("fechaNacimiento").value.trim();

    let usuario = {
      nombre: nombre,
      email: email,
      contrasena: contrasena,
      fechaNacimiento: fechaNacimiento,
    };
    console.log(usuario + "se esta registrando")
    // chequear longitud de la contraseña/* -->
    if (contrasena.length < 4) {
      Swal.fire({
        icon: "error",
        title: "Ey...",
        text: "Parece que tu contraseña le faltan un par de caracteres...",
        footer: '<a href="#">Por favor, genera una de más de 4 digitos</a>'
      });
      return;
    }

    //chequear que el mail esté registrado en el array
    usuarioActual = usuarios.find((usuario) => usuario.email == email);
    console.log(usuarioActual + email + "se encontro")
    if (usuarioActual) {
      Swal.fire({
        icon: "error",
        title: "Ohno..",
        text: "Parece que este mail ya fue registrado.",
        footer: '<a href="#">O quizás deberías chequear como lo escribiste?</a>'
      });
      return;
    }

    usuarios.push(usuario);

    console.log("📋 Lista de usuarios registrados:");
    for (var i = 0; i < usuarios.length; i++) {
      console.log(
        (i + 1) + " → Nombre: " + usuarios[i].nombre +
        ", Email: " + usuarios[i].email +
        ", Fecha: " + usuarios[i].fechaNacimiento +
        ", contraseña: " + usuarios[i].contrasena
      );
    }

    // Guardar nuevo objeto en el array ...................................-->

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Verificar que se guardó correctamente antes de redirigir
    let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    let confirmado = usuariosGuardados.find(usuario => usuario.email === email);
    
    if (confirmado) {
      let timerInterval;
      Swal.fire({
        title: "¡Felicidades, ya eres oficialmente un detective!",
        html: "Serás redirigido a tu oficina en <b></b> ms.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          // Redirige después del timer
          window.location.href = "logIn.html";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Espias intervienen nuestra señal!",
        footer: '<a href="#">Intenta nuevamente</a>'
      });
    }
  });
}


// FUNCIONES PARA INGRESAR SESIÓN...................................-->

// Funcion  1 Orden Superior Comprobar si ese mail ya fue registrado ...................................-->


function VerificarDatos() {

  const formLogin = document.getElementById("formLogin");

  if (!formLogin) { return }

  formLogin.addEventListener("submit", function (event) {

    event.preventDefault(); // Evita que recargue la página

    email = document.getElementById("email").value.trim();
    contrasena = document.getElementById("contrasena").value.trim();

    console.log(contrasena + "che que onda");
    console.log(email + "che que onda");

    // Leer usuarios guardados en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    //chequear que el mail esté registrado en el array
    usuarioActual = usuarios.find((usuario) => usuario.email === email);


    if (!usuarioActual) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Este mail no ha sido registrado aún",
        footer: '<a href="registrarse.html">¿Quieres registrarte?</a>'
      });
      return;
    }

    //chequear que la contraseña coincida con la del array
    if (usuarioActual.contrasena !== contrasena) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Contraseña incorrecta",
        footer: '<a href="#">¿Olvidaste tu contraseña?</a>'
      });
      return;
    }

    //Redirije si todo conside:
    if (usuarioActual.contrasena === contrasena) {
      // Guardar su nombre para saludarlo en su perfil
      localStorage.setItem("nombreUsuario", usuarioActual.nombre);
      window.location.href = "perfil.html";
    }
  })
};


// Manejo del DOM: redirección de paginas menú en base a si inició sesión...................................-->


function redireccionLogin() {
  let menuLogin = document.getElementById("redireccionporLogin")
  //let menuSalaSecreta = document.getElementById("redireccionSalaSecreta")

  if (!menuLogin) { return }

  const usuarioLogeado = localStorage.getItem("nombreUsuario");

  //sala secreta redireccion comentada porque falta implementar dicho sistema

  //usuario ingresado
  if (usuarioLogeado) {
    menuLogin.href = "/pages/perfil.html";
    //menuSalaSecreta.href = "/pages/salaabierta.html";
  }

  //por default, usuario POR ingresar 
  else {
    menuLogin.href = "/pages/logIn.html";
    // menuSalaSecreta.href = "/pages/salaabierta.html";
  }

}


// Funcion para Saludar al usuario segun el momento del dia con condicional switch 

// switch lo usamos para decidir el saludo según la hora del día. /* -->
function obtenerMomentoDelDia() {
  const hora = new Date().getHours();

  if (hora >= 6 && hora < 12) return "mañana";
  if (hora >= 12 && hora < 20) return "tarde";
  return "noche";
}

//reutilizo la variable de nombre usuario que genere en la funcion de log in
function saludarUsuario() {
  const nombre = localStorage.getItem("nombreUsuario");
  const saludoUsuario = document.getElementById("saludoUsuario")
  if (!saludoUsuario) return;

  const momentoDelDia = obtenerMomentoDelDia();

  let saludo;
  switch (momentoDelDia) {
    case "mañana":
      saludo = "Buenos días";
      break;
    case "tarde":
      saludo = "Buenas tardes";
      break;
    case "noche":
      saludo = "Buenas noches";
      break;
    default:
      saludo = "Hola";
  }

  saludoUsuario.textContent = `${saludo}, ${nombre}! Qué bueno verte otra vez :) `;
}

// FIN  Funcion  Saludar/* ...................................-->

function cerrarSesion() {

  const botoncerrarsesion = document.getElementById("logout-button");

  if (!botoncerrarsesion) { return }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  botoncerrarsesion.addEventListener("click", () => {
   
    swalWithBootstrapButtons.fire({
      title: "¿Cerrar sesión?",
      text: "¡Esperamos verte de nuevo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "No, quedarme",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        // remover usuario del localStorage
        localStorage.removeItem("nombreUsuario");

        // revertir funciones y redirigir
        redireccionLogin();

       
        swalWithBootstrapButtons.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          
          window.location.href = "../index.html";
        });

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Acción cancelada",
          text: "Sigues conectado :)",
          icon: "info",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  });
}
//funcion para precargar datos y obviar registro para la correccion

function precargarLogin() {
  
  const emailPrueba = "profesor@ejemplo.com";
  const contrasenaPrueba = "1234";
  const emailInput = document.getElementById("email");
  const contrasenaInput = document.getElementById("contrasena");

  if (!emailInput || !contrasenaInput) return;

  emailInput.value = emailPrueba;
  contrasenaInput.value = contrasenaPrueba;

  let usuarios = JSON.parse(localStorage.getItem("usuarios"));

  if (!usuarios.some(user => user.email === emailPrueba)) {
    usuarios.push({
      nombre: "Profesor Ejemplo",
      email: emailPrueba,
      contrasena: contrasenaPrueba,
      fechaNacimiento: "1970-01-01"
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  emailInput.onfocus = function() {
    this.value = "";
  };
  contrasenaInput.onfocus = function() {
    this.value = "";
  };

}




/*Notas uso  de la clase JSON

/* Recuperar datos de localStorage
const nombre = localStorage.getItem("nombre");
const email = localStorage.getItem("email");
const contraseña = localStorage.getItem("contraseña"); */

/* remover datos de localStorage
localStorage.removeItem("nombre"); */

/*

// Convertir el objeto a JSON y guardarlo
const usuarioJSON = JSON.stringify(usuario);
console.log(usuarioJSON);
localStorage.setItem("usuario", usuarioJSON);

// Recuperar datos individuales de localStorage
console.log(localStorage.getItem("nombre"));

const datosGuardados = JSON.parse(localStorage.getItem("usuario"));
console.log(datosGuardados.nombre); // Acceder al nombre */


VerificarDatos();
registrarUsuario();
obtenerMomentoDelDia();
saludarUsuario();
redireccionLogin();
cerrarSesion();
precargarLogin();