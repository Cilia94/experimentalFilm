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

//let walkAway;

export default class Person {

  constructor(object, position, startPosition, id){
    this.id = id;
    this.status = object.status;
    this.type = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    this.happy = object.happy;
    this.position = position;
    this.walkAway = false;
    this.mayMove = true;
    //console.log(startPosi.y);
    
    //this.startPosition= {xPos,yPos};
    this.startPosition = {};
    this.startPosition.x = startPosition.x;
    this.startPosition.y = startPosition.y;
   // console.log(startPosition.x);
    //this.startPos = startPos.x;
  }

  render(){
    //console.log('render');
    

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

    //this.move = true;
    return svgTemplate.documentElement;
  }

    _move(){

      if(this.mayMove){

      if(this.position.x < -60 || this.position.x > 1250){

        this.setStatus(3);
        this.mayMove = false;

      }

      // $('.person' + '#' + this.id).attr("transform", "translate(100) rotate(-45 25 25)");

      if(!this.walkAway){

      if(this.position.y < (this.startPosition.y +30)){
      this.position.y++;

      $(`.person#${this.id}`).attr('y', this.position.y);

    }else {

      this.status = 1;

      if(this.startPosition.x === 0 || this.startPosition.x === 50){
        if(this.position.x < 100){
          
        this.position.x++;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

      if(this.startPosition.x === 150 || this.startPosition.x === 200){
        if(this.position.x > 100){
          
        this.position.x--;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

     

      if(this.startPosition.x === 250 || this.startPosition.x === 300){
        if(this.position.x < 350){
          
        this.position.x++;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

      if(this.startPosition.x === 400 || this.startPosition.x === 450){
        if(this.position.x > 350){
          
        this.position.x--;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

      if(this.startPosition.x === 500 || this.startPosition.x === 550){
        if(this.position.x < 600){
          
        this.position.x++;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

      if(this.startPosition.x === 650 || this.startPosition.x === 700){
        if(this.position.x > 600){
          
        this.position.x--;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

      if(this.startPosition.x === 750 || this.startPosition.x === 800){
        if(this.position.x < 850){
          
        this.position.x++;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }
      ////

      if(this.startPosition.x === 900 || this.startPosition.x === 950){
        if(this.position.x > 850){
          
        this.position.x--;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

      if(this.startPosition.x === 1000 || this.startPosition.x === 1050){
        if(this.position.x < 1100){
          
        this.position.x++;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }

      if(this.startPosition.x === 1150 || this.startPosition.x === 1200){
        if(this.position.x > 1100){
          
        this.position.x--;
        $(`.person#${this.id}`).attr('x', this.position.x);

      }else if (this.position.y < 675){
   
      this.position.y++;
      $(`.person#${this.id}`).attr('y', this.position.y);

        }else{

          this.status = 2;
          this.walkAway = true;
        }
      }


    }
  }else{
      if(this.startPosition.x <700){
        this.position.x--;

      }else{
        this.position.x++;
      }
    
      //$('.person' + '#' + this.id).attr("transform", "translate(30) rotate(-45 25 25)");
          
      $(`.person#${this.id}`).attr('x', this.position.x);
    }


    if(!this.happy){
    requestAnimationFrame(() => this._move());
  }
  }
}

  setPosition(position){
    this.position.x= position.x;
    $(`.person#${this.id}`).attr('x', this.position.x);

    this.position.y= position.y;
    $(`.person#${this.id}`).attr('y', this.position.y);
  }

  makeHappy(position){
    this.position.x= position.x;
    $(`.person#${this.id}`).attr('x', this.position.x);

    this.position.y= position.y;
    $(`.person#${this.id}`).attr('y', this.position.y);

    this.happy = true;
    this.status = 4;
  }

  setStatus(status){
    switch (status){
      case 1:
      this.status = 1;
      break;

      case 2:
      this.status = 2;
      break;

      case 3:
      this.status = 3;
      break;

      case 4:
      this.status = 4;
      break;
    }
    
  }

  

}
