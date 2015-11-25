'use strict';

import cup from '../../_hbs/cup.hbs';

export default class Cup {

  constructor(x, y){

    this.position = {};
    this.position.x = x - 5;
    this.position.y = y + 7;

  }

  render(){
    let svgTemplate = new DOMParser().parseFromString(cup(this), 'text/xml');

    return svgTemplate.documentElement;
  }

}
