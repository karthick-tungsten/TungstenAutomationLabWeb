import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableShareService {
  public progressbar:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);

  constructor() {}
}
