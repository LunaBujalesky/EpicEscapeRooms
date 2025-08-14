
// Declaración de funciones-------------------------------------------------------......................................... /* -->


// Funcion para crear usuario /*............................................ -->

function registrarUsuario() {
    let nombre = prompt("Ingresá tu nombre:");
    let mail = prompt("Ingresá tu mail:");
    let contraseña = prompt("Ingresá una contraseña de al menos 4 caracteres:");
    validarLongitudContraseña()
    let fechaNacimiento = prompt("Ingresá tu fecha de nacimiento (DD/MM/AAAA):");

    console.log("Nombre:", nombre);
    console.log("Mail:", mail);
    console.log("Contraseña:", contraseña);



    function validarLongitudContraseña() {
        // chequear longitud de la contraseña/* -->
        if (contraseña.length < 4) {
            alert("Contraseña inválida. Por favor, genere una nueva.");
            return registrarUsuario();

        }
    }

}
// FIN  Funcion para crear usuario /* ...................................-->


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




//  Fución para mostrar las salas disponibles  

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

// Funcion para iniciar sesión /* -->
function iniciarSesion() {
    let nombre = prompt("Ingresá tu nombre:");
    let email = prompt("Ingresá tu email:");
    let contraseña = prompt("Ingresá tu contraseña:");


    console.log(`Iniciando sesión para ${nombre}...`);
    if (!nombre || !email || !contraseña) {
        alert("Todos los campos son obligatorios.");
        return iniciarSesion();
    }
    else {
        saludarUsuario();
        mostrarSalasDisponibles()
    }
}

// FIN  Funcion  iniciar sesion* ...................................-->





// Llamada/utilización de funciones------------------------------------------------------- /* -->

window.addEventListener("load", () => {



    function darBienvenida() {
        alert("¡Bienvenido/a! :)");
        const mensajeIngreso = prompt("Veo que no ingresaste a una cuenta. ¿Deseas crear una? Ingrese si. ¿Ya te encuentras registrado? Ingrese no").toLowerCase();

        if (mensajeIngreso === "si") {
            registrarUsuario();

        } else if (mensajeIngreso === "no") {
            iniciarSesion();

        } else {
            alert("Respuesta inválida. Por favor, responde con 'si' para crear una cuenta o 'no' para iniciar sesión. Reinicie la web para reintentar");
        }
    }
    
}
);

//lo siguiente está a modo de notas de la clase ::::::::::::::::::::::::::::::::::::::::::::::::::::::::



// Guardar datos  iniciar sesion* ...................................-->

localStorage.setItem("nombre", nombre + "email", email + "contraseña", contraseña + "fechaNacimiento", fechaNacimiento);

// Recuperar datos de localStorage
const nombre = localStorage.getItem("nombre");
const email = localStorage.getItem("email");
const contraseña = localStorage.getItem("contraseña");

//remover datos de localStorage
localStorage.removeItem("nombre");

// Crear objeto con datos del localStorage
const usuario = {
    nombre: localStorage.getItem("nombre"),
    email: localStorage.getItem("email"),
    contraseña: localStorage.getItem("contraseña"),
    fechaNacimiento: localStorage.getItem("fechaNacimiento")
};

// Convertir el objeto a JSON y guardarlo
const usuarioJSON = JSON.stringify(usuario);
console.log(usuarioJSON);
localStorage.setItem("usuario", usuarioJSON);

// Recuperar datos individuales de localStorage
console.log(localStorage.getItem("nombre"));

const datosGuardados = JSON.parse(localStorage.getItem("usuario"));
console.log(datosGuardados.nombre); // Acceder al nombre