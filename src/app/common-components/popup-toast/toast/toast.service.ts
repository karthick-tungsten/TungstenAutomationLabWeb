import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ToastType } from 'src/app/support/project-enums/projectEnums';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast = new BehaviorSubject<any>(null);
  private title: any;
  private message: any;
  private type!: ToastType;
  private data: any;

  constructor() { }

  build() {
    this.data = { title: this.title, message: this.message, type: this.type }
    return this;
  }

  setType(type: ToastType) {
    this.type = type;
    return this;
  }

  setMessage(msg: any) {
    this.message = msg;
    return this;
  }

  setTitle(title: any) {
    this.title = title;
    return this;
  }

  show() {
    this.toast.next(this.data)
  }

  getToastValue() {
    return this.toast.asObservable();
  }

}
