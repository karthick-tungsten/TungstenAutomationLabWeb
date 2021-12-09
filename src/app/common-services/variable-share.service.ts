import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableShareService {
  private share = new BehaviorSubject<any>(null);
  public progressbar:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);

  constructor() {}

  public showToastValues(data: any) {
    this.share.next(data);
  }

  public getToastValue() {
    return this.share.asObservable();
  }


}
