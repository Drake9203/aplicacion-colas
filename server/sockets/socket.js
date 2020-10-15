const { io } = require('../server');

const { TikectControl } = require('../class/ticket-control');

const tikectControl = new TikectControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let nextTicket = tikectControl.nextTicket();
        console.log(nextTicket);
        callback(nextTicket);
    });

    client.emit('currentTicket', {
        current: tikectControl.getLastTicket(),
        lastFour: tikectControl.getLastFourTicket()
    });

    client.on('receiveTicket', (data, callback) => {

        if (!data.desktop) {
            return callback({
                err: true,
                message: 'Require desktop'
            });
        }

        let receiveTicket = tikectControl.receiveTicekt(data.desktop);
        callback(receiveTicket);

        client.broadcast.emit('lastFour', {
            lastFour: tikectControl.getLastFourTicket()
        })
    });
});