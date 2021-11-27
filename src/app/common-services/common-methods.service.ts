import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor() { }

  public storeToLocal(key:any,value:any){
    localStorage.setItem(key,value);
  }

  public getFromLocal(key:any){
    return localStorage.getItem(key)
  }
  public removeLocal(key:any){
    localStorage.removeItem(key)
  }

  public storeToSession(key:any,value:any){
    sessionStorage.setItem(key,value);
  }

  public getFromSession(key:any){
    return sessionStorage.getItem(key)
  }

  public removeFromSession(key:any){
    sessionStorage.removeItem(key);
  }
}
