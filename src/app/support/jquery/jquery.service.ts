import { Injectable } from '@angular/core';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class JqueryService {

  private element:any;

  constructor() { }

  
  getId(id:any){
    this.element=$("#"+id)
    return this;
  }

  getClass(cls:any){
    this.element=$(cls);
    return this;
  }

  disable(){
    this.element.attr("disable","true");
  }

  enable(){
    this.element.attr("disable","false");
  }

  modalToggle() {
   this.element.modal('toggle');
  }
}
