let events = require('events');

let eventEmitter = new events.EventEmitter();

const eventHandler = () => console.log('I hear a scream');

eventEmitter.on('scream', eventHandler);

eventEmitter.emit('scream')
