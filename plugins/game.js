'use strict';

module.exports.register = (server, options, next) => {

  let io = require('socket.io')(server.listener),
    five = require('johnny-five');

  let board = new five.Board();

  board.on('ready', () => {

    io.on('connection', socket => {
      socket.emit('boardConnect');

      ledUse(socket);
      buttonUse(socket);

    });

  });

  const buttonUse = (socket) => {

    let button1 = new five.Button(2),
      button2 = new five.Button(4),
      button3 = new five.Button(7),
      button4 = new five.Button(8),
      button5 = new five.Button(12);

    board.repl.inject({
      button1: button1,
      button2: button2,
      button3: button3,
      button4: button4,
      button5: button5
    });

    button1.on('down', () => {
      socket.emit('pressed', button1.pin);
    });

    button2.on('down', () => {
      socket.emit('pressed', button2.pin);
    });

    button3.on('down', () => {
      socket.emit('pressed', button3.pin);
    });

    button4.on('down', () => {
      socket.emit('pressed', button4.pin);
    });

    button5.on('down', () => {
      socket.emit('pressed', button5.pin);
    });
  };

  const ledUse = (socket) => {

    let led1 = new five.Led(3);
    let led2 = new five.Led(5);
    let led3 = new five.Led(6);
    let led4 = new five.Led(9);
    let led5 = new five.Led(10);

    socket.on('led', () => {
      led1.pulse(1500);
      led2.pulse(1500);
      led3.pulse(1500);
      led4.pulse(1500);
      led5.pulse(1500);
    });

    socket.on('ledStop', () => {
      led1.stop().off();
      led2.stop().off();
      led3.stop().off();
      led4.stop().off();
      led5.stop().off();

      led1.on();
      led2.on();
      led3.on();
      led4.on();
      led5.on();
    });

  };

  next();

};

module.exports.register.attributes = {
  name: 'game',
  version: '0.1.0'
};
