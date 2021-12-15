import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { VariableShareService } from './variable-share.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor {

  constructor(private vShare:VariableShareService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.vShare.progressbar.next(true)
    return next.handle(req).pipe(
      finalize(()=>{
        this.vShare.progressbar.next(false)
      })
    )
  }
}
