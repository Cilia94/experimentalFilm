'use strict';

module.exports.register = (server, options, next) => {

  let io = require('socket.io')(server.listener),
    five = require('johnny-five');

  let board = new five.Board();

  board.on('ready', () => {

    io.on('connection', socket => {
      socket.emit('boardConnect');

      //ledUse(socket);
      buttonUse(socket);

    });

  });

  const buttonUse = (socket) => {

    let button1 = new five.Button(2),
      button2 = new five.Button(4),
      button3 = new five.Button(7),
      button4 = new five.Button(8),
      button5 = new five.Button(12);

    /*board.repl.inject({
      button1: button1,
      button2: button2,
      button3: button3,
      button4: button4,
      button5: button5
    });*/

    button1.on('down', () => {
      socket.emit('pressed', button1.pin, button1.id);
    });

    button2.on('down', () => {
      socket.emit('pressed', button2.pin, button2.id);
    });

    button3.on('down', () => {
      socket.emit('pressed', button3.pin, button3.id);
    });

    button4.on('down', () => {
      socket.emit('pressed', button4.pin, button4.id);
    });

    button5.on('down', () => {
      socket.emit('pressed', button5.pin, button5.id);
    });

  };

  /*const ledUse = (socket) => {

    let led = new five.Led(13);

    socket.on('led', () => {
      led.toggle();
    });

  };*/

  next();

};

module.exports.register.attributes = {
  name: 'game',
  version: '0.1.0'
};
