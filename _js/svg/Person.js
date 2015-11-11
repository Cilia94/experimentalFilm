'use strict';

import person1 from '../../_hbs/person1.hbs';
import person2 from '../../_hbs/person2.hbs';
import person3 from '../../_hbs/person3.hbs';
import person4 from '../../_hbs/person4.hbs';
import person5 from '../../_hbs/person5.hbs';
import person6 from '../../_hbs/person6.hbs';
import person7 from '../../_hbs/person7.hbs';
import person8 from '../../_hbs/person8.hbs';
import person9 from '../../_hbs/person9.hbs';
import person10 from '../../_hbs/person10.hbs';
import person11 from '../../_hbs/person11.hbs';
import person12 from '../../_hbs/person12.hbs';

export default class Person {

  constructor(object, position){
    this.status = object.status;
    this.type = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    this.happy = object.happy;
    this.position = position;
  }

  render(){

    let svgTemplate;

    switch(this.type){
    case 1:
      svgTemplate = new DOMParser().parseFromString(person1(this), 'text/xml');
      break;
    case 2:
      svgTemplate = new DOMParser().parseFromString(person2(this), 'text/xml');
      break;
    case 3:
      svgTemplate = new DOMParser().parseFromString(person3(this), 'text/xml');
      break;
    case 4:
      svgTemplate = new DOMParser().parseFromString(person4(this), 'text/xml');
      break;
    case 5:
      svgTemplate = new DOMParser().parseFromString(person5(this), 'text/xml');
      break;
    case 6:
      svgTemplate = new DOMParser().parseFromString(person6(this), 'text/xml');
      break;
    case 7:
      svgTemplate = new DOMParser().parseFromString(person7(this), 'text/xml');
      break;
    case 8:
      svgTemplate = new DOMParser().parseFromString(person8(this), 'text/xml');
      break;
    case 9:
      svgTemplate = new DOMParser().parseFromString(person9(this), 'text/xml');
      break;
    case 10:
      svgTemplate = new DOMParser().parseFromString(person10(this), 'text/xml');
      break;
    case 11:
      svgTemplate = new DOMParser().parseFromString(person11(this), 'text/xml');
      break;
    case 12:
      svgTemplate = new DOMParser().parseFromString(person12(this), 'text/xml');
      break;
    default:
      svgTemplate = new DOMParser().parseFromString(person1(this), 'text/xml');
      break;
    }

    return svgTemplate.documentElement;
  }

}
