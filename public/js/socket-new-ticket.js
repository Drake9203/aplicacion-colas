// Comando para conexion

let socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Connect server');
});

socket.on('disconnect', function() {
    console.log('Disconnect to server');
});

socket.on('currentTicket', function(currentTicket) {
    label.text(currentTicket);
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    })
});