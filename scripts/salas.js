//funcion async y manejo de error para cuando no tiene datos cargados en el storage
async function cargarSalas() {
    //Si ya se cargo la base de datos, no hacer nada
    if (localStorage.getItem("salas")) return;

    try {
        const respuesta = await fetch("../data/salas.json");
        const salas = await respuesta.json();
        localStorage.setItem("salas", JSON.stringify(salas));
    } catch (err) {
        console.error("Error al leer JSON:", err);
    }
}

async function cargarReservas() {
    if (localStorage.getItem("reservas")) return;
    try {
        const respuesta = await fetch("../data/reservas.json");
        const reservas = await respuesta.json();
        localStorage.setItem("reservas", JSON.stringify(reservas));
    } catch (err) {
        console.error("Error al leer JSON:", err);
    }
}

function reservarSala() {
    //ubicar donde se activa la funcion, osea, en el formulario de reservas del html
    const formReserva = document.querySelector(".formReserva");
    if (!formReserva) return;

    let Sala = document.getElementById("sala");
    if (!Sala) return;

    //tomar datos del localStorage
    let salas = JSON.parse(localStorage.getItem("salas"));
    let reservas = JSON.parse(localStorage.getItem("reservas"));

    //evento para que se detone al enviar confirmación del formulario
    formReserva.addEventListener("submit", (event) => {
        event.preventDefault();

        //tomar datos del formulario
        let nombreSala = Sala.value;
        let detectiveJefe = document.getElementById("nombre").value.trim();
        let fechaReserva = document.getElementById("fecha").value.trim();
        let horario = document.getElementById("horario").value.trim();
        let participantes = document.getElementById("participantes").value.trim();
        let emailReserva = document.getElementById("emailReserva").value.trim();
        let comentarios = document.getElementById("comentarios").value.trim();

        //buscar la sala elegida en el array y verifica el minimo de jugadores
        const salaSeleccionada = salas.find((_sala) => _sala.sala === nombreSala);
        if (!comprobarMinJugadores(participantes, salaSeleccionada)) {
            return;
        }

        //chequear que la fecha no esté ocupada
        if (!comprobarReservaLibre(reservas, nombreSala, fechaReserva, horario)) {
            return;
        }

        //mandar al array que almacena las reservas los datos de la nueva reserva
        let reservaNueva = {
            sala: nombreSala,
            nombre: detectiveJefe,
            fecha: fechaReserva,
            hora: horario,
            participantes: participantes,
            email: emailReserva,
            comentarios: comentarios,
        };


        //primero el push al array, luego lo almaceno
        reservas.push(reservaNueva);
        localStorage.setItem("reservas", JSON.stringify(reservas));


        const boletaReserva = document.querySelector(".boletaContainer");


        //Confirma los datos de la reserva

        boletaReserva.classList.remove("boletaInvisible");
        boletaReserva.classList.toggle("boletaVisible");

        mostrarReserva(reservaNueva)

        botonesReservas()



        // Limpiar formulario
        formReserva.reset();

    });
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});

//Funcion para los botones que se muestran en la boleta luego de llenar formulario de reservas
function botonesReservas() {

    const boletaCerrar = document.querySelector(".boletaCerrar");
    const botonCancelar = document.querySelector(".botonCancelar");
    const botonConfirmar = document.querySelector(".botonConfirmar");

    [botonConfirmar, botonCancelar].forEach(boton => {
        if (!boton) {return};
        boton.addEventListener("click", () => {

            boletaCerrar.classList.remove("boletaInvisible");
            boletaCerrar.classList.toggle("boletaVisible");


            if (boton.id === "confirmarReserva") {
                swalWithBootstrapButtons.fire({
                    title: "Reserva confirmada!",
                    text: "Te estaremos esperando :)",
                    icon: "success"
                });
                boletaCerrar.classList.remove("boletaVisible");
                boletaCerrar.classList.add("boletaInvisible");
            } else if (boton.id === "cancelarReserva") {
                // Falta borrar la reserva del array y del localStorage
                swalWithBootstrapButtons.fire({
                    title: "Reserva cancelada!",
                    text: "Esperamos que pudas venir en otra ocasion :(",
                    icon: "error"
                });
                boletaCerrar.classList.remove("boletaVisible");
                boletaCerrar.classList.add("boletaInvisible");
            }
        });
    });
}

//Funciones usadas dentro de "reservarSala"
function comprobarMinJugadores(_participantes, _salaSeleccionada) {
    _participantes = Number(_participantes);
    if (_participantes < _salaSeleccionada.cantidadParticipantesMinima) {
        Swal.fire(
            `La cantidad mínima de participantes para esta sala es ${_salaSeleccionada.cantidadParticipantesMinima}.`
        );
        return false;
    }
    return true;
}

function comprobarReservaLibre(_reservas, _sala, _fecha, _horario) {
    const salaOcupada = _reservas.find((reserva) =>
        reserva.sala === _sala &&
        reserva.fecha === _fecha &&
        reserva.hora === _horario
    );
    if (salaOcupada === undefined) {
        return true;
    } else {
        mostrarMensajeReservaOcupada();
        return false;
    }
}

function mostrarMensajeReservaOcupada() {
    Swal.fire({
        title: "Lo sentimos :c!",
        text: "Parece que esa sala está ocupada. Puedes probar en otro día u horario",
        imageUrl: "/assets/sad-cat.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "sad cat :c",
    });
}


function mostrarReserva(reservaNueva) {
    //contenido de la reserva
    const salaP = document.getElementById("salaElegida");
    const fechaP = document.getElementById("fechaElegida");
    const horaP = document.getElementById("horaElegida");
    const nombreP = document.getElementById("nombreReserva");
    const emailP = document.getElementById("emailReservaconfrm");
    const equipoP = document.getElementById("equipoReserva");
    const comentariosP = document.getElementById("comentariosReservahecha");
    if (!salaP) { return }
    if (!reservaNueva) { return }

    // reemplazar texto con el de la reserva:
    salaP.textContent = reservaNueva.sala;
    fechaP.textContent = reservaNueva.fecha;
    horaP.textContent = reservaNueva.hora;
    nombreP.textContent = reservaNueva.nombre;
    emailP.textContent = reservaNueva.email;
    equipoP.textContent = reservaNueva.participantes;
    comentariosP.textContent = reservaNueva.comentarios || "";

}


// Llamado a funciones-------------------------------------------------------......................................... /* -->
async function init() {
    await cargarSalas();
    await cargarReservas();
    reservarSala();
}
init();

// 2 funcion superior----Para meter despues "elije tu sala por el día/hora que quieras venir:"---------------------------------------------------
//function SalasDisponibles(salas) {
//    return salas.filter(sala => {
//        // filtrar dia
//       const diaDisponible = sala.diaDisponible.every(dia => Object.values(dia)[0] === true);
// filtrar horario
//        const horariosDisponibles = sala.horariosDisponibles.every(horario => Object.values(horario)[0] === true);

// La sala es disponible si cumple ambas condiciones
//       return diaDisponible && horariosDisponibles;
//    });
//}

mostrarReserva();
botonesReservas();