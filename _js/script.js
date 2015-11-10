'use strict';

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

const init = () => {

  let socket = io.connect('http://localhost:3000');

  $('.testbutton').click( e => {
    socket.emit('led');
    e.preventDefault();
  });

};

init();
