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

    aisle1 = 110; //pin 2 = button 1 => meest linkse gang
    aisle2 = 360; //pin 4 = button 2 => tweede linkse gang
    aisle3 = 610; //pin 7 = button 2 => tweede linkse gang
    aisle4 = 860; //pin 8 = button 2 => tweede linkse gang
    aisle5 = 1110; //pin 12 = button 2 => tweede linkse gang

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
    default:
      this.position.x = aisle1;
      this.position.y = yStart;
      break;
    }

    this._move();
  }

  _move(){

    speed = 5;

    let tag = '.popcorn' + this.class;

    if(this.move){
      this.position.y -= speed;

      if(this.position.y > -60){
        $(tag).attr('y', this.position.y);
      }else {
        $('.popcorn1').remove();
        this.position.y = yStart;
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
