

window.addEventListener("load", () => {



    function darBienvenida() {
        alert("¡Bienvenido/a! :)");
        const mensajeIngreso = prompt("Veo que no ingresaste a una cuenta. ¿Deseas crear una? Ingrese si. ¿Ya te encuentras registrado? Ingrese no");

        if (mensajeIngreso === "si") {
            registrarUsuario();

        } else if (mensajeIngreso === "no") {
            iniciarSesion();

        } else {
            alert("Respuesta inválida. Por favor, responde con 'si' para crear una cuenta o 'no' para iniciar sesión.");
        }
    }
    setTimeout(darBienvenida, 1000);
}
);

// Funcion para crear usuario /* -->

function registrarUsuario() {
    let nombre = prompt("Ingresá tu nombre:");
    let mail = prompt("Ingresá tu mail:");
    let contraseña = prompt("Ingresá una contraseña de al menos 4 caracteres:");
    let fechaNacimiento = prompt("Ingresá tu fecha de nacimiento (DD/MM/AAAA):");

    console.log("Nombres:", nombres);
    console.log("Mails:", mails);
    console.log("Contraseñas:", contraseñas);

    validarLongitudContraseña()

    function validarLongitudContraseña() {
        // chequear longitud de la contraseña/* -->
        if (contraseña.length < 4) {
            alert("Contraseña inválida. Por favor, genere una nueva.");
            return registrarUsuario();

        }
    }

}




function iniciarSesion() {

    let email = prompt("Ingresá tu email:");
    let contraseña = prompt("Ingresá tu contraseña:");


    console.log(`Iniciando sesión para ${nombre}...`);

    // Saludar al usuario
    saludarUsuario()

}

function saludarUsuario(nombre, momentoDelDía) {
    let momentoDelDía = prompt("");

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

// Array para reservas de salas

const Sala = ["Amanecer de Blair", "Escapando de Latinoamerica", "Operación: ¡Contradefensa de la invasión Gnómica en el Jardín!", "Kiki Delivery Crisis", "Dios ha muerto... y no dejó instrucciones"];

// Ciclo for of para mostrar las salas disponibles

const salas = [
    { nombre: "Amanecer de Blair", disponible: true },
    { nombre: "Escapando de Latinoamerica", disponible: false },
    { nombre: "Operación: ¡Contradefensa de la invasión Gnómica en el Jardín!", disponible: true },
    { nombre: "Kiki Delivery Crisis", disponible: false },
    { nombre: "Dios ha muerto... y no dejó instrucciones", disponible: true },

];

console.log("Salas disponibles:");
alert(`selecciona una sala para reservar: ${Sala}`);

for (const sala of salas) {
    if (sala.disponible) {
        console.log(`- ${sala.nombre}`);
    }
}