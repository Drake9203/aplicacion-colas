// Comando para conexion
let socket = io();

let searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('The desktop is requiere')
}

let desktop = searchParams.get('desk');
let label = $('small');
$('h1').text('Escritorio ' + desktop);

$('button').on('click', function() {
    socket.emit('receiveTicket', { desktop }, function(resp) {
        if (resp === 'No hay mas tickets') {
            $(label).text(resp);
            alert(resp);
            return;
        }
        $(label).text(resp.number);
    });
});