'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

let $svg,
  persons,
  seats;

import {Person, Seat} from './svg/';

import personObject from '../models/person.js';

const init = () => {

  $svg = $('.cinema');

  let socket = io.connect('http://localhost:3000');

  _initSeats();

  _initPersons();

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
  let gridHeight = $svg.height();

  for(var i = 0; i < gridWidth; i += 50){

    for(var j = 75; j < gridHeight; j += 75){

      let seat = new Seat(i, j);

      if(seat.position.x === 100 || seat.position.x === 350 ||
        seat.position.x === 600 || seat.position.x === 850 ||
        seat.position.x === 1100){
        //don't push in array
      }else {
        seats.push(seat);
        $svg.append(seat.render());
      }

    }

  }

};

init();

/*$('.testbutton').click( e => {
    socket.emit('led');
    e.preventDefault();
  });*/