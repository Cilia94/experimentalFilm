'use strict';

let yStart = 720;
let id = 1;

import curtain1 from '../../_hbs/curtain1.hbs';
import curtain2 from '../../_hbs/curtain2.hbs';

export default class Curtain {

   constructor(x, style){

    this.position = {};
    this.position.x = x;
    this.position.y = yStart;
    this.style = style; // rechts of links


    //uitgang = position{0,675}
    //uitgang = position{}

  }

  render(){

    let svgTemplate;

    switch(this.style){
    case 1:
      svgTemplate = new DOMParser().parseFromString(curtain1(this), 'text/xml');
      // id++;
      break;
    case 2:
      svgTemplate = new DOMParser().parseFromString(curtain2(this), 'text/xml');
      // id++;
      break;
    default:
      svgTemplate = new DOMParser().parseFromString(curtain1(this), 'text/xml');
      break;
    }

    return svgTemplate.documentElement;
  }

}

