'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

let socket,
  $svg,
  releasePersonsSec;

let persons,
  personsLeaving,
  seats,
  peopleLeft;

let popcorns = [];

import {Person, Seat, Popcorn} from './svg/';

import personObject from '../models/person.js';

const init = () => {
  $svg = $('.cinema');


  socket = io.connect('http://localhost:3000');

  resetGame();
};

const resetGame = () => {
  personsLeaving = [];
  peopleLeft = [];
  popcorns = [];
  releasePersonsSec = 5000;

  _initSeats();
  _initPersons();
  _boardConnect();
};

const _boardConnect = () => {
  socket.on('boardConnect', () => {
    $('.connected').attr('fill', 'green');
    $('.connectedTxt').text('Connection');

    _pressedButton();

    checkCollision();

    setInterval(checkLeftPeople, 1000);

    personMoves();

    setInterval(personMoves, releasePersonsSec);

    for(var i=0; i<personsLeaving.length; i++) {
      if(personsLeaving[i].position.x < 0 || personsLeaving[i].position.x > 1250){
        peopleLeft.push(personsLeaving[i]);
        personsLeaving[i].setStatus(3);
        personsLeaving.splice(personsLeaving[i]);
        $('.peopleLeftTxt').text(String(peopleLeft.length));
      }
    }
  });
};

const personMoves = () => {
  let randomPerson = persons[Math.floor(Math.random() * (persons.length - 1 + 1)) + 1];

  if(!randomPerson.happy){
    randomPerson._move();
    personsLeaving.push(randomPerson);
  }else{
    personMoves();
  }
};

const checkLeftPeople = () => {

  peopleLeft = [];

  for(var i=0; i< personsLeaving.length; i++) {
    if(personsLeaving[i].status === 3){
      peopleLeft.push(personsLeaving[i]);
      $(`.person#${personsLeaving[i].id}`).remove();
    }
    //console.log(`peopleLeft array: ${peopleLeft}`);

    //console.log(`personsLeaving array: ${personsLeaving}`);

    $('.peopleLeftTxt').text(String(peopleLeft.length));
  }

  switch(personsLeaving.length){
    case 10:
    releasePersonsSec-=500;
      break;
    case 20:
    releasePersonsSec-=500;
      break;
    case 30:
    releasePersonsSec-=500;
      break;
    case 40:
    releasePersonsSec-=500;
      break;
  }

  console.log(releasePersonsSec, personsLeaving.length);
};

const _pressedButton = () => {
  let count = 0;

  socket.on('pressed', (buttonPin, buttonId) => {
    //console.log(`Pressed button connected to pin: ${buttonPin} with id: ${buttonId}`);

    count++;

    let popcorn = new Popcorn(buttonPin, count);
    popcorns.push(popcorn);
    $svg.append(popcorn.render());
  });

};

const checkCollision = () => {
  for(var i=0; i<personsLeaving.length; i++) {
    let size = [30, 30];

    for(var j=0; j<popcorns.length; j++) {

      if(boxCollides(popcorns[j].position, size, personsLeaving[i].position, size)) {
        personsLeaving[i].makeHappy(personsLeaving[i].startPosition);
        personsLeaving[i].happy = true;

        $(`.popcorn${popcorns[j].class}`).remove();

        popcorns.splice(popcorns[j]);

        //personMoves();

        //releasePersonsSec-=200; //mssn iets te veel
      }

    }
  }

  requestAnimationFrame(() => checkCollision());
};

const _initPersons = () => {
  persons = [];

  let count = 1;

  seats.forEach(seat => {

    let person = new Person(personObject, seat.position, seat.position, count);
    count++;

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

const collides = (x, y, r, b, x2, y2, r2, b2) => {
  return !(r <= x2 || x > r2 ||
    b <= y2 || y > b2);
};

const boxCollides = (pos, size, pos2, size2) => {
  return collides(pos.x, pos.y,
    pos.x + size[0], pos.y + size[1],
    pos2.x, pos2.y,
    pos2.x + size2[0], pos2.y + size2[1]);
};

init();

/*$('.testbutton').click( e => {
    socket.emit('led');
    e.preventDefault();
  });*/
