'use strict';

let yStart = 720;
let id = 1;

import cannon1 from '../../_hbs/cannon1.hbs';
import cannon2 from '../../_hbs/cannon2.hbs';
import cannon3 from '../../_hbs/cannon3.hbs';
import cannon4 from '../../_hbs/cannon4.hbs';
import cannon5 from '../../_hbs/cannon5.hbs';

export default class Cannon {

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
      svgTemplate = new DOMParser().parseFromString(cannon1(this), 'text/xml');
      id++;
      break;
    case 2:
      svgTemplate = new DOMParser().parseFromString(cannon2(this), 'text/xml');
      id++;
      break;
    case 3:
      svgTemplate = new DOMParser().parseFromString(cannon3(this), 'text/xml');
      id++;
      break;
    case 4:
      svgTemplate = new DOMParser().parseFromString(cannon4(this), 'text/xml');
      id++;
      break;
    case 5:
      svgTemplate = new DOMParser().parseFromString(cannon5(this), 'text/xml');
      break;
    default:
      svgTemplate = new DOMParser().parseFromString(cannon1(this), 'text/xml');
      break;
    }

    return svgTemplate.documentElement;
  }

}

