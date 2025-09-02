let email;
let contrasena;
let usuarioActual;


// Llamado a funciones-------------------------------------------------------......................................... /* -->
registrarUsuario();
VerificarDatos();
SalasDisponibles(salas);
redireccionLogin();
saludarUsuario(nombre, momentoDelDía);



// Funcion crear Usuario por html y dom
function registrarUsuario() {
    const formRegistro = document.getElementById("formRegistro")
    if (!formRegistro) {
        return
    }
    formRegistro.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que recargue la página

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));

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

        usuarios.push(usuario);

        // Guardar nuevo objeto en el array ...................................-->
        //localStorage.setItem(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // chequear longitud de la contraseña/* -->
        if (contrasena.length < 4) {
            alert("Contraseña inválida. Por favor, genere una nueva.");
            return registrarUsuario();
        }
        window.open("logIn.html", "_self");
    })
};



// FUNCIONES PARA INGRESAR SESIÓN...................................-->

// Funcion  1 Orden Superior Comprobar si ese mail ya fue registrado ...................................-->


function VerificarDatos() {

    const formLogin = document.getElementById("formLogin");

    if (!formLogin) { return }

    formLogin.addEventListener("submit", function (event) {


        event.preventDefault(); // Evita que recargue la página

        email = document.getElementById("email").value;
        contrasena = document.getElementById("contrasena").value;

        //chequear que el mail esté registrado en el array
        usuarioActual = usuarios.find((usuario) => usuario.email == email);

        if (!usuarioActual) {
            alert("El email no está registrado.");
            return;
        }
        //chequear que la contraseña coincida con la del array
        if (usuarioActual.contrasena !== contrasena) {
            alert("Contraseña incorrecta.");
            return;
        }

        //Redirije si todo conside:
        if (usuarioActual.contrasena === contrasena) {
            // Guardar su nombre para saludarlo en su perfil
            localStorage.setItem("nombreUsuario", usuarioActual.nombre);
            window.open("perfil.html", "_self");
        }


    })
};


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

// Funcion para Saludar al usuario segun el momento del dia con condicional switch 
// En proceso de construcción
// if lo usamos para verificar si hay un nombre registrado. 
// switch lo usamos para decidir el saludo según la hora del día. /* -->
function saludarUsuario(nombre, momentoDelDía) {
    let saludo = "";
    //obtener nombre del storage
    const nombre = localStorage.getItem("nombreUsuario");

    if (nombre) {
        saludarUsuario(nombre);
    }

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

// fin FUNCIONES PARA Usuarios...................................-->

// Array salas como objetos------------------------------------------------------- 
let salas = [
    {
        sala: "Amanecer de Blair",
        cantidadParticipantesMinima: "6",
        diaDisponible: [
            { 14: true },
            { 15: true },
            { 16: true }
        ],

        horariosDisponibles: [
            { 1500: true },
            { 1600: true },
            { 1700: true }
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        sala: "Escapando de Latinoamerica",
        cantidadParticipantesMinima: "2",
        diaDisponible: [
            { 14: true },
            { 15: true },
            { 16: true }
        ],

        horariosDisponibles: [
            { 1500: true },
            { 1600: true },
            { 1700: true }
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        sala: "Operación: ¡Contradefensa de la invasión Gnómica en el Jardín!",
        cantidadParticipantesMinima: "3",
        diaDisponible: [
            { 14: true },
            { 15: true },
            { 16: true }
        ],

        horariosDisponibles: [
            { 1500: true },
            { 1600: true },
            { 1700: true }
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        sala: "Kiki Delivery Crisis",
        cantidadParticipantesMinima: "2",
        diaDisponible: [
            { 14: true },
            { 15: true },
            { 16: true }
        ],

        horariosDisponibles: [
            { 1500: true },
            { 1600: true },
            { 1700: true }
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        sala: "Dios ha muerto... y no dejó instrucciones",
        cantidadParticipantesMinima: "2",
        diaDisponible: [
            { 14: true },
            { 15: true },
            { 16: true }
        ],

        horariosDisponibles: [
            { 1500: true },
            { 1600: true },
            { 1700: true }
        ],
        aplicarDescuentoCumpleano: false,
    },

]

// 2 funcion superior------------------------------------------------------- 
function SalasDisponibles(salas) {
    return salas.filter(sala => {
        // filtrar dia
        const diaDisponible = sala.diaDisponible.every(dia => Object.values(dia)[0] === true);
        // filtrar horario
        const horariosDisponibles = sala.horariosDisponibles.every(horario => Object.values(horario)[0] === true);

        // La sala es disponible si cumple ambas condiciones
        return diaDisponible && horariosDisponibles;
    });
}

const disponibles = SalasDisponibles(salas);


function reservarSala ()
{
    
}


/*Notas uso JSON

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

