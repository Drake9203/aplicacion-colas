const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TikectControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.resetCounter();
        }

    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.burnFile();

        return `Ticket ${this.last}`;
    }

    resetCounter() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        console.log('Restart System');
        this.burnFile();
    }

    burnFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        let stringJsonData = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', stringJsonData);
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFourTicket() {
        return this.lastFour;
    }

    receiveTicekt(desk) {
        if (this.tickets.length === 0) {
            return 'No hay mas tickets';
        }

        let numberTicekt = this.tickets[0].number;
        this.tickets.shift(); // Se elimina primera posicion del arreglo

        let receiveTicekt = new Ticket(numberTicekt, desk);
        this.lastFour.unshift(receiveTicekt); // Se agrega tk al inicio del arreglo

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // borra el último
        }

        this.burnFile();
        return receiveTicekt;
    }

}

module.exports = {
    TikectControl
}