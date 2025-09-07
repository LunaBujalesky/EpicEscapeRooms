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
        let fechaReserva = document.getElementById("fecha").value.trim();
        let horario = document.getElementById("horario").value.trim();
        let participantes = document.getElementById("participantes").value.trim();
        let emailReserva = document.getElementById("emailReserva").value.trim();

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
            fecha: fechaReserva,
            hora: horario,
            participantes: participantes,
            email: emailReserva,
        };

        //confirmar o cancelar la reserva
        //si la confirmo, entonces aqui debajo pongo que envie los datos al array de reservas en el localstorage

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "desea confirmar la reserva?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, confirmar!",
            cancelButtonText: "No, la quiero cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Reserva confirmada!",
                    text: "Te estaremos esperando :)",
                    icon: "success"
                });
            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Reserva cancelada!",
                    text: "Esperamos que pudas venir en otra ocasion :(",
                    icon: "error"
                });
            }
        });

        //primero el push al array, luego lo almaceno
        reservas.push(reservaNueva);
        localStorage.setItem("reservas", JSON.stringify(reservas));

        //al final de esta funcion, agregare "la boleta" que confirma los datos de la reserva

        // Limpiar formulario
        formReserva.reset();
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
