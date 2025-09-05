

//Funciones para salas

// Array salas como objetos------------------------------------------------------- 
let salas = [
    {
        idSala: 1,
        sala: "Amanecer de Blair",
        cantidadParticipantesMinima: 3,
        participantesMax: 8,
        horarios: [
            "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00"
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        idSala: 2,
        sala: "Escapando de Latinoamerica",
        cantidadParticipantesMinima: 2,
        participantesMax: 8,
        horarios: [
            "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00"
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        idSala: 3,
        sala: "Operación: ¡Contradefensa de la invasión Gnómica en el Jardín!",
        cantidadParticipantesMinima: 3,
        participantesMax: 8,
        horarios: [
            "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00"
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        idSala: 4,
        sala: "Kiki Delivery Crisis",
        cantidadParticipantesMinima: 2,
        participantesMax: 8,
        horarios: [
            "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00"
        ],
        aplicarDescuentoCumpleano: false,
    },
    {
        idSala: 5,
        sala: "Dios ha muerto... y no dejó instrucciones",
        cantidadParticipantesMinima: 2,
        participantesMax: 8,
        horarios: [
            "13:00", "14:00", "15:00", "16:00", "17:00",
            "18:00", "19:00", "20:00", "21:00", "22:00"
        ],
        aplicarDescuentoCumpleano: false,
    },

]

localStorage.setItem("salas", JSON.stringify(salas));

//array de reservas de salas, guardar reservas pasadas en el localstorage
let reservas = [
    {
        sala: "Dios ha muerto... y no dejó instrucciones",
        fecha: "2025-09-15",
        hora: "18:00",
        nombre: "Luna",
        email: "lunabujalesky@gmail.com",
        participantes: 4
    }
];

localStorage.setItem("reservas", JSON.stringify(reservas));

function reservarSala() {
    //ubicar donde se activa la funcion, osea, en el formulario de reservas del html
    const formReserva = document.querySelector(".formReserva")

    //return para prevenir errores en otras paginas de la web
    if (!formReserva) {
        return
    }
    //tomar datos de los array
    let salas = JSON.parse(localStorage.getItem("salas"));
    let reservas = JSON.parse(localStorage.getItem("reservas"));

    console.log(reservas + "estos son los reservas")
    console.log(salas + "si detecto las salas")
    console.log(salas[0].sala + "")

    //escuchar cambio al seleccionar sala
    let Sala = document.getElementById("sala");
    console.log(Sala + "che que onda");
    if (!Sala) { return }

    //change escucha a los cambios de los input seleccionados por su id
    Sala.addEventListener("change", (e) => {
        console.log("El usuario eligió:", Sala.value);
        console.log("El usuario quiere:", e.target.value);
        console.log(e)
    });

    //evento para que se detone al enviar confirmación del formulario
    formReserva.addEventListener("submit", (event) => {
        event.preventDefault();

        //tomar datos del formulario
        let nombreSala = Sala.value;
        let fechaReserva = document.getElementById("fecha").value.trim();
        let horario = document.getElementById("horario").value.trim();
        let participantes = document.getElementById("participantes").value.trim();
        let emailReserva = document.getElementById("emailReserva").value.trim();


        //chequear que la cantidad de participantes coincida en su min y max por sala
        participantes = Number(participantes);
        console.log(salas)
        console.log(Sala.value)
        const salaSeleccionada = salas.find(sala => sala.sala === Sala.value);

        console.log(salaSeleccionada)

        if (participantes < salaSeleccionada.cantidadParticipantesMinima) {
            Swal.fire(`La cantidad mínima de participantes para esta sala es ${salaSeleccionada.cantidadParticipantesMinima}.`);
            return;
        }


        //chequear que la fecha no esté ocupada: ------------------------------------------------

        //declaramos como variable para reutilizar despues
        const salaOcupada = reservas.find(reserva =>
            reserva.sala === nombreSala && reserva.fecha === fechaReserva && reserva.hora === horario
        );
        console.log(reservas)
        //condicional que impida que se reserve dos veces la misma sala con los mismos datos
        if (salaOcupada !== undefined) {
            Swal.fire({
                title: "Lo sentimos :c!",
                text: "Parece que esa sala está ocupada. Puedes probar en otro día u horario",
                imageUrl: "img/sad-cat.png",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "sad cat :c"
            });
            return; // detiene la función para que no se guarde la reserva
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
        alert("desea confirmar la reserva?");

        //primero el push al array, luego lo almaceno
        reservas.push(reservaNueva);
        localStorage.setItem("reservas", JSON.stringify(reservas));

        //al final de esta funcion, debería agregar "la boleta" que confirma los datos de la reserva
        alert("Reserva confirmada!");

        // Limpiar formulario
        formReserva.reset();
    });


}





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







// Llamado a funciones-------------------------------------------------------......................................... /* -->

//SalasDisponibles();
reservarSala();
// FIN Llamado a funciones-------------------------------------------------------......................................... /* -->

