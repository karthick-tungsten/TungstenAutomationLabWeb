import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VariableShareService } from './variable-share.service';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor(
    private router:Router,
    private vShare:VariableShareService) { }

  public validateToken(){
    if(this.getFromLocal("auth")==null){
      localStorage.clear()
      sessionStorage.clear()
      this.router.navigate([""])
      let data = { "title": "Error", "message": "Please login", "type": "failure" }
      this.vShare.showToastValues(data)
    }
  }

  public storeToLocal(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  public getFromLocal(key: any) {
    return localStorage.getItem(key)
  }
  public removeLocal(key: any) {
    localStorage.removeItem(key)
  }

  public storeToSession(key: any, value: any) {
    sessionStorage.setItem(key, value);
  }

  public getFromSession(key: any): any {
    return sessionStorage.getItem(key)
  }

  public removeFromSession(key: any) {
    sessionStorage.removeItem(key);
  }
}
