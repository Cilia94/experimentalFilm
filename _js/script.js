'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

let requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

let socket,
  $svg,
  persons,
  personsLeaving = [],
  seats,
  
  lastTime,
  gameTime;

  let popcorns = [];

import {Person, Seat, Popcorn} from './svg/';

import personObject from '../models/person.js';

const init = () => {

  $svg = $('.cinema');
  console.log('test init');

  socket = io.connect('http://localhost:3000');

  _boardConnect();
  lastTime = Date.now();
    //
    main();



  resetGame();
      
  

};

const resetGame = () => {

  personsLeaving = [];
  popcorns = [];
  _initSeats();
  _initPersons();

    personMoves()
    personMoves()
    personMoves()
    personMoves()
    personMoves()
  

}

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
  
  let count = 1;

  seats.forEach(seat => {


    let person = new Person(personObject, seat.position, seat.position, count);
    count++;

    $svg.append(person.render());

    persons.push(person);



  });

  //console.log(persons[10].id);
};

const personMoves = () => {
  
  let randomPerson = persons[Math.floor(Math.random() * (persons.length - 1 + 1)) + 1];
  randomPerson._move();
  personsLeaving.push(randomPerson);


}

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

const checkCollision = () => {

  for(var i=0; i<personsLeaving.length; i++) {
    let size = [30,30];

    for(var j=0; j<popcorns.length; j++) {

      if(boxCollides(popcorns[j].position, size, personsLeaving[i].position, size)) {
            //console.log('collide');
            personsLeaving[i].setPosition(personsLeaving[i].startPosition)


        
        }

    }
  }

}

const collides = (x, y, r, b, x2, y2, r2, b2) => {
    return !(r <= x2 || x > r2 ||
             b <= y2 || y > b2);
}

const boxCollides = (pos, size, pos2, size2) => {
    return collides(pos.x, pos.y,
                    pos.x + size[0], pos.y + size[1],
                    pos2.x, pos2.y,
                    pos2.x + size2[0], pos2.y + size2[1]);
}

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    //render();

    lastTime = now;
    requestAnimFrame(main);

};


function update(dt) {
    gameTime += dt;
    checkCollision();

        //console.log('upd');
    

};

init();

/*$('.testbutton').click( e => {
    socket.emit('led');
    e.preventDefault();
  });*/
