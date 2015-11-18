'use strict';

import template from '../../_hbs/popcorn.hbs';

let yStart = 750;

let speed,
  aisle1,
  aisle2,
  aisle3,
  aisle4,
  aisle5;

export default class Popcorn {

  constructor(buttonPin, count){
    this.class = count;

    aisle1 = 110; //pin 2 = button 1
    aisle2 = 360; //pin 4 = button 2
    aisle3 = 610; //pin 7 = button 3
    aisle4 = 860; //pin 8 = button 4
    aisle5 = 1110; //pin 12 = button 5

    this.position = {};

    switch(buttonPin){
    case 2:
      this.position.x = aisle1;
      this.position.y = yStart;
      break;
    case 4:
      this.position.x = aisle2;
      this.position.y = yStart;
      break;
    case 7:
      this.position.x = aisle3;
      this.position.y = yStart;
      break;
    case 8:
      this.position.x = aisle4;
      this.position.y = yStart;
      break;
    case 12:
      this.position.x = aisle5;
      this.position.y = yStart;
      break;
    }

    this._move();
  }

  _move(){
    speed = 7;

    let tag = `.popcorn${this.class}`;

    if(this.move){
      this.position.y -= speed;

      if(this.position.y >= -60){
        $(tag).attr('y', this.position.y);
      }else {
        $(tag).remove();
        return;
      }

    }

    requestAnimationFrame(() => this._move());
  }

  render(){
    let svgTemplate = new DOMParser().parseFromString(template(this), 'text/xml');
    this.element = svgTemplate;

    this.move = true;

    return svgTemplate.documentElement;
  }

}
