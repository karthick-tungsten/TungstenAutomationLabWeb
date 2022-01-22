import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/common-components/popup-toast/toast/toast.service';
import { ToastType } from '../project-enums/projectEnums';
import { ApiSerivceService } from './api-serivce.service';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor(
    private router: Router,
    private toast: ToastService,
    ) { }

  public validateToken() {
    if (this.getFromLocal("auth") == null) {
      localStorage.clear()
      sessionStorage.clear()
      this.router.navigate(["user/login"])
      this.toast.setType(ToastType.FAILURE)
        .setMessage("Please login")
        .setTitle("Error")
        .build()
        .show();
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
