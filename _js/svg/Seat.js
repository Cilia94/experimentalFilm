'use strict';

import template from '../../_hbs/seat.hbs';

export default class Seat {

  constructor(x, y){

    this.position = {};
    this.position.x = x;
    this.position.y = y;

  }

  render(){
    let svgTemplate = new DOMParser().parseFromString(template(this), 'text/xml');

    return svgTemplate.documentElement;
  }

}
