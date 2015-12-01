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
let audio, music;

let persons,
  curtains,
  cannons,
  personsLeaving,
  seats,
  peopleLeft,
  counter;

  let cups = [];

let intervalTime,
    intervalRelease,
    intervalCheck;

let popcorns = [];

import {Person, Cannon, Curtain, Cup, Seat, Popcorn} from './svg/';

import personObject from '../models/person.js';

const init = () => {
  gameStart = false;
  music = document.querySelector('.bgMusic');
  audio = document.querySelector('.sound');


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

    socket.emit('led');

    if(gameStart === false){
      pressedIntro();
    }
  });
};

const play = (file) => {
  let src= file;

  if(audio.canPlayType('audio/mp4; codecs="mp4a.40.2')){
    src += '.mp3';

  }else if(audio.canPlayType('audio/ogg; codecs="vorbis"')){
    src += '.ogg';
  }

  audio.setAttribute('src', `assets/sound/${src}`);
  audio.play();
};

const startGameNow = () => {
  //$('.bgMusic').play();

  pressedButton();
  checkCollision();
  personMoves();
  playMusic();

  intervalRelease = setInterval(personMoves, releasePersonsSec);
  intervalCheck = setInterval(checkLeftPeople, 1000);

  countTime();

  //check number of persons who left
  for(let i=0; i<personsLeaving.length; i++) {
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
      $('.gameTime').text(`Tijd: ${startTime}`);
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


const playMusic = () => {
  let src= 'bgMusic';

  if(music.canPlayType('audio/mp4; codecs="mp4a.40.2')){
    src += '.mp3';

  }else if(music.canPlayType('audio/ogg; codecs="vorbis"')){
    src += '.ogg';
  }

  music.setAttribute('src', `assets/sound/${src}`);
  music.volume = 0.1;
  music.addEventListener('ended', () => {
    this.currentTime = 0;
    this.play();
  }, false);

  music.play();
};


const checkLeftPeople = () => {

  peopleLeft = [];

  for(let i=0; i< personsLeaving.length; i++) {
    if(personsLeaving[i].status === 3){
      peopleLeft.push(personsLeaving[i]);
          //console.log('people');

      $(`.person#${personsLeaving[i].id}`).remove();
    }

    $('.peopleLeftTxt').text(String(peopleLeft.length));
  }

  console.log(`Release person after: ${releasePersonsSec}ms`);
};

const pressedIntro = () => {
    socket.on('pressed', (buttonPin) => {
      if(gameStart === false){
        socket.emit('ledStop');

        if(buttonPin === 7){
          document.querySelector('video').pause();
          _initSeats();
          _initPersons();
          _initDecoration();

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
  for(let i=0; i<personsLeaving.length; i++) {
    let size = [30, 30];

    for(let j=0; j<popcorns.length; j++) {

      if(boxCollides(popcorns[j].position, size, personsLeaving[i].position, size)) {
        play('hitSound');
        personsLeaving[i].makeHappy(personsLeaving[i].startPosition);
        personsLeaving[i].happy = true;

        $(`.popcorn${popcorns[j].class}`).remove();

        popcorns.splice(popcorns[j]);

        counter++;
        popcornHappy(personsLeaving[i]);

        $('.hitPeople').text(`${counter} Gelukkige personen`);

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


const popcornHappy = person => {
  let cup = new Cup(person.startPosition.x, person.startPosition.y);
  cups.push(cup);

  console.log(cups);
  $svg.append(cup.render());
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

const _initDecoration = () => {
  cannons = [];
  curtains = [];

  console.log('draw decoration');

  let gridWidth = $svg.width();

  for(var i = 75; i < gridWidth; i += 250){
    let cannon = new Cannon(i);
    cannons.push(cannon);
    $svg.append(cannon.render());
  }


  for(var i = 0; i < gridWidth; i += gridWidth - 42){

    let curtain = new Curtain(i);
    curtains.push(curtain);
    $svg.append(curtain.render());

    console.log(curtain.render());
  }

};

const _initSeats = () => {
  console.log('draw seats');
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
