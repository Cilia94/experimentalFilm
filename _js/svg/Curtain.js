'use strict';

let yStart = 664;
let id = 1;

import curtain1 from '../../_hbs/curtain1.hbs';
import curtain2 from '../../_hbs/curtain2.hbs';


export default class Curtain {

   constructor(x){

    this.position = {};
    this.position.x = x;
    this.position.y = yStart;

    // console.log(this.id);

    // this.id = id;

    this.type = id;
    //id++;

    console.log('type:', this.type);

  }

  render(){

    let svgTemplate;

    switch(this.type){
    case 1:
      svgTemplate = new DOMParser().parseFromString(curtain1(this), 'text/xml');
      this.type++;
      break;
    case 2:
      svgTemplate = new DOMParser().parseFromString(curtain2(this), 'text/xml');
      id++;
      break;

    default:
      svgTemplate = new DOMParser().parseFromString(curtain1(this), 'text/xml');
      break;
    }

    return svgTemplate.documentElement;
  }

}

