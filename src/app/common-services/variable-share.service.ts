import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableShareService {
  private share = new BehaviorSubject<any>(null);

  constructor() {}

  public showToastValues(data: any) {
    this.share.next(data);
  }

  public getToastValue() {
    return this.share.asObservable();
  }


}
