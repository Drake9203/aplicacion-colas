// Comando para conexion
let socket = io();

socket.on('currentTicket', function(data) {
    //   console.log(data, "data");
    if (!data.lastFour) {
        return;
    }
    for (var i = 1; i < data.lastFour.length + 1; i++) {
        $('#lblTicket' + i).text('Ticket ' + data.lastFour[(i - 1)].number);
        $('#lblEscritorio' + i).text('Escritorio ' + data.lastFour[(i - 1)].desk);
    }
});

socket.on('lastFour', function(data) {
    //   console.log(data, "data");
    if (!data.lastFour) {
        return;
    }
    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    for (var i = 1; i < data.lastFour.length + 1; i++) {
        $('#lblTicket' + i).text('Ticket ' + data.lastFour[(i - 1)].number);
        $('#lblEscritorio' + i).text('Escritorio ' + data.lastFour[(i - 1)].desk);
    }
});