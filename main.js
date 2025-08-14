
// Declaración de funciones-------------------------------------------------------......................................... /* -->


/*Funcion para crear usuario hecha para consola

function registrarUsuario() {
    let nombre = prompt("Ingresá tu nombre:");
    let mail = prompt("Ingresá tu mail:");
    let contraseña = prompt("Ingresá una contraseña de al menos 4 caracteres:");
    validarLongitudContraseña()
    let fechaNacimiento = prompt("Ingresá tu fecha de nacimiento (DD/MM/AAAA):");





    function validarLongitudContraseña() {
        // chequear longitud de la contraseña/* -->
        if (contraseña.length < 4) {
            alert("Contraseña inválida. Por favor, genere una nueva.");
            return registrarUsuario();

        }
    }

} */
// FIN  Funcion para crear usuario  CONSOLA...................................-->*/





// Crear objeto con datos del localStorage
let usuarios = [
    {
        nombre: localStorage.getItem("nombre"),
        email: localStorage.getItem("email"),
        contrasena: localStorage.getItem("contrasena"),
        fechaNacimiento: localStorage.getItem("fechaNacimiento")
    }
];

// Funcion crear Usuario por html y dom
function registrarUsuario() {
    document.getElementById("formLogin").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que recargue la página

        let nombre = document.getElementById("nombre").value.trim();
        let email = document.getElementById("email").value.trim();
        let contrasena = document.getElementById("contrasena").value.trim();
        let fechaNacimiento = document.getElementById("contrasena").value.trim();

        // Guardar datos  iniciar sesion* ...................................-->

        localStorage.setItem("nombre", nombre + "email", email + "contrasena", contrasena + "fechaNacimiento", fechaNacimiento);

        // chequear longitud de la contraseña/* -->
        if (contraseña.length < 4) {
            alert("Contraseña inválida. Por favor, genere una nueva.");
            return registrarUsuario();

        }

    })
};

// FUNCIONES PARA INGRESAR SESIÓN...................................-->

// Funcion  1 Orden Superior Comprobar si ese mail ya fue registrado ...................................-->

let usuarioActual; // LOCALSTORAGE

function VerificarDatos() {

    usuarioActual = usuarios.find((usuario) => usuario.email == email);
    if (usuarioActual.contrasena == contraseña) {
        redireccionLogin()
    } //llamo funcion

}

// Manejo del DOM: redirección de paginas menú en base a si inició sesión...................................-->
let menuLogin = document.getElementById("redireccionporLogin")
let menuSalaSecreta = document.getElementById("redireccionSalaSecreta")

function redireccionLogin() {

    //usuario ingresado
    if (usuarioActual) {
        menuLogin.href = href = "pages/perfil.html";
        menuSalaSecreta = href = "pages/salaabierta.html";
    }

    //por default, usuario POR ingresar 
    else {
        menuLogin.href = href = "pages/logIn.html";
        menuSalaSecreta = href = "pages/salaSecreta.html";
    }
}

// Funcion para Saludar al usuario segun el momento del dia con condicional switch /* -->
function saludarUsuario(nombre, momentoDelDía) {
    let saludo = "";

    switch (momentoDelDía) {
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

    alert(`¡Hola, ${nombre}! qué bueno verte otra vez :D`);

}
// FIN  Funcion  Saludar/* ...................................-->

// fin FUNCIONES PARA INGRESAR SESIÓN...................................-->


//  FuNción para mostrar las salas disponibles  

function mostrarSalasDisponibles() {

    // Array para reservas de salas------------------------------------------------------- 

    const Sala = ["Amanecer de Blair", "Escapando de Latinoamerica", "Operación: ¡Contradefensa de la invasión Gnómica en el Jardín!", "Kiki Delivery Crisis", "Dios ha muerto... y no dejó instrucciones"];

    // Ciclo for of para mostrar las salas disponibles

    // Array salas como objetos------------------------------------------------------- 
    const salas = [
        { nombre: "Amanecer de Blair", disponible: true },
        { nombre: "Escapando de Latinoamerica", disponible: false },
        { nombre: "Operación: ¡Contradefensa de la invasión Gnómica en el Jardín!", disponible: true },
        { nombre: "Kiki Delivery Crisis", disponible: false },
        { nombre: "Dios ha muerto... y no dejó instrucciones", disponible: true },

    ];

    console.log("Salas disponibles:");
    alert(`selecciona una sala para reservar: ${Sala}`);

    // Ciclo for of 
    for (const sala of salas) {
        if (sala.disponible) {
            console.log(`- ${sala.nombre}`);
            alert(`La sala: ${sala.nombre} se encuentra disponible, deseas reservarla?`);
        }
        else {

            alert(`Lo sentimos, la sala ${sala.nombre} se encuentra no disponible`);
        }
    }

}
// FIN  Funcion  Salas disponibles/* ...................................-->








/* Recuperar datos de localStorage
const nombre = localStorage.getItem("nombre");
const email = localStorage.getItem("email");
const contraseña = localStorage.getItem("contraseña"); */

/* remover datos de localStorage
localStorage.removeItem("nombre"); */


// Convertir el objeto a JSON y guardarlo
const usuarioJSON = JSON.stringify(usuario);
console.log(usuarioJSON);
localStorage.setItem("usuario", usuarioJSON);

// Recuperar datos individuales de localStorage
console.log(localStorage.getItem("nombre"));

const datosGuardados = JSON.parse(localStorage.getItem("usuario"));
console.log(datosGuardados.nombre); // Acceder al nombre