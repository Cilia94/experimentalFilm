'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

let socket,
  $svg,
  releasePersonsSec,
  releaseBool,
  gameStart;

let startTime = 60;

let persons,
  personsLeaving,
  seats,
  peopleLeft,
  counter;

let intervalTime,
    intervalRelease,
    intervalCheck;

let popcorns = [];

import {Person, Seat, Popcorn} from './svg/';

import personObject from '../models/person.js';

const init = () => {
  gameStart = false;

  $svg = $('.cinema');

  socket = io.connect('http://localhost:3000');

  resetGame();
};

const resetGame = () => {
  gameStart = false;

  personsLeaving = [];
  peopleLeft = [];
  popcorns = [];
  releasePersonsSec = 5000;
  releaseBool = true;
  counter = 0;

  boardConnect();
};

const boardConnect = () => {
  socket.on('boardConnect', () => {
    $('.connected').attr('fill', 'green');
    $('.connectedTxt').text('Connection');

    if(gameStart === false){
      pressedIntro();
    }
  });
};

const startGameNow = () => {
  pressedButton();
  checkCollision();
  personMoves();

  intervalRelease = setInterval(personMoves, releasePersonsSec);
  intervalCheck = setInterval(checkLeftPeople, 1000);

  countTime();

  //check number of persons who left
  for(var i=0; i<personsLeaving.length; i++) {
    if(personsLeaving[i].position.x < 0 || personsLeaving[i].position.x > 1250){
      peopleLeft.push(personsLeaving[i]);
      personsLeaving[i].setStatus(3);
      personsLeaving.splice(personsLeaving[i]);
      $('.peopleLeftTxt').text(String(peopleLeft.length));
    }
  }
};

const reset = () => {
  console.log('reset');
  let restart = 10;

  setInterval(() => {
    restart--;
    $('.restart').text(restart);
  }, 1000);

  setTimeout(() => {
    window.location.reload();
  }, 10000);
};

const finishGame = () => {
  //dropdown
  console.log('finished game');
  clearInterval(intervalTime);
  clearInterval(intervalRelease);
  clearInterval(intervalCheck);

  setTimeout(() => {
    $('.gameTime').nextAll().remove();
  }, 1000);

  reset();

  return;
};

const countTime = () => {
  intervalTime = setInterval(() => {
    if(startTime > 0){
      startTime--;
      $('.gameTime').text(`Time: ${startTime}`);
    }else{
      finishGame();
      $('.end').addClass('opEnd');
      $('.holded').text(counter);
      return;
    }
  }, 1000);
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

    $('.peopleLeftTxt').text(String(peopleLeft.length));
  }

  console.log(`Release person after: ${releasePersonsSec}ms`);
};

const pressedIntro = () => {
    socket.on('pressed', (buttonPin) => {
      if(gameStart === false){
        if(buttonPin === 7){
          _initSeats();
          _initPersons();

          gameStart = true;

          $('.start').addClass('opStart');
          $('.end').removeClass('opEnd');

          setTimeout(() => {
            startGameNow();
            $('.start').addClass('hidden');
          }, 2000);
        }
      }
    });
};

const pressedButton = () => {
  let count = 0;

  socket.on('pressed', (buttonPin) => {
    console.log(`Pressed button connected to pin: ${buttonPin}`);

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

        counter++;

        $('.hitPeople').text(`Hit: ${counter} persons`);

        if(releaseBool){
          personMoves();
          releaseBool = false;
        }else {
          releaseBool = true;
        }

        if(releasePersonsSec > 3500){
          releasePersonsSec-=200;
        }

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
