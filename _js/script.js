'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

let socket,
  $svg,
  persons,
  seats,
  popcorns = [];

import {Person, Seat, Popcorn} from './svg/';

import personObject from '../models/person.js';

const init = () => {

  $svg = $('.cinema');

  socket = io.connect('http://localhost:3000');

  _boardConnect();

  _initSeats();

  _initPersons();

};

const _pressedButton = () => {

  let count = 0;

  socket.on('pressed', (buttonPin, buttonId) => {

    console.log(`Pressed button connected to pin: ${buttonPin} with id: ${buttonId}`);

    count++;

    let popcorn = new Popcorn(buttonPin, count);

    popcorns.push(popcorn);

    $svg.append(popcorn.render());

  });

};

const _initPersons = () => {
  persons = [];

  seats.forEach(seat => {

    let person = new Person(personObject, seat.position);

    $svg.append(person.render());

    persons.push(person);

  });
};

const _initSeats = () => {

  seats = [];

  let gridWidth = $svg.width();
  let gridHeight = 650;

  for(var i = 0; i < gridWidth; i += 50){

    for(var j = 75; j < gridHeight; j += 75){

      let seat = new Seat(i, j);

      if(seat.position.x === 100 || seat.position.x === 350 ||
        seat.position.x === 600 || seat.position.x === 850 ||
        seat.position.x === 1100){
        //don't push in array and do nothing
      }else {
        seats.push(seat);
        $svg.append(seat.render());
      }

    }

  }

};

const _boardConnect = () => {

  socket.on('boardConnect', () => {
    $('.connected').attr('fill', 'green');
    $('.connectedTxt').text('Connection');

    _pressedButton();
  });

};

init();

/*$('.testbutton').click( e => {
    socket.emit('led');
    e.preventDefault();
  });*/
