import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast = new BehaviorSubject<any>(null);
  private title: any;
  private message: any;
  private type: any;
  private data: any;

  constructor() { }

  build() {
    this.data = { title: this.title, message: this.message, type: this.type }
    return this;
  }

  setType(type: any) {
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

  showToast() {

  }

  show() {
    this.toast.next(this.data)
  }

  getToastValue() {
    return this.toast.asObservable();
  }

}
