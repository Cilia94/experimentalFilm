'use strict';

module.exports.register = (server, options, next) => {

  let io = require('socket.io')(server.listener),
    five = require('johnny-five');

  let board = new five.Board();

  board.on('ready', () => {

    io.on('connection', socket => {

      ledUse(socket);
      buttonUse();

    });

  });

  const buttonUse = () => {

    let button = new five.Button(2);

    board.repl.inject({
      button: button
    });

    button.on('down', () => {
      console.log('down');
    });

    //defaults to 500ms (1/2 second) can be set ott
    button.on('hold', () => {
      console.log('hold');
    });

    button.on('up', () => {
      console.log('up');
    });

  };

  const ledUse = (socket) => {

    let led = new five.Led(13);

    socket.on('led', () => {
      led.toggle();
    });

  };

  next();

};

module.exports.register.attributes = {
  name: 'game',
  version: '0.1.0'
};
