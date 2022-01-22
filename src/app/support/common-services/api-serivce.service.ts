import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscriber } from 'rxjs';
import { ToastService } from 'src/app/common-components/popup-toast/toast/toast.service';
import { ToastType } from '../project-enums/projectEnums';
import { CommonMethodsService } from './common-methods.service';
@Injectable({
  providedIn: 'root'
})
export class ApiSerivceService {


  public static reponseBody = "body";
  public static response = "response"

  private baseUrl: String = "http://localhost:8080"
  // private baseUrl: String = "http://tungstenautomation.ddns.net/secure"

  constructor(
    private httpClient: HttpClient,
    private common: CommonMethodsService,
    private router:Router,
    private toast:ToastService
  ) { }

  private getUrl(path: any) {
    return this.baseUrl + path;
  }

  public postApiRequest(path: any, body: any) {
    return this.httpClient.post(this.getUrl(path), body, { observe: "response" });
  }

  public postApiRequestWithHeader(path: any, body: any, headerParam: any) {
    return this.httpClient.post(this.getUrl(path), body, { headers: headerParam, observe: "response" });
  }

  public getApiRequest(path: any, headersParam: any) {
    return this.httpClient.get(this.getUrl(path), { headers: headersParam, observe: "response" })
  }

  public getAuthHeader() {
    return { 'Authorization': this.common.getFromLocal("auth") };
  }

  getAllUserDetails(path: string, headersParam: any) {
    return this.httpClient.get(this.getUrl(path), { headers: headersParam, observe: "response" })
  }

  public getApiWithModal<ResponseModal>(path: String, headersParam: any) {
    return this.httpClient.get(this.getUrl(path), { headers: headersParam, observe: "response" })
      .pipe(map(response => {
        return <ResponseModal>response.body
      }))
  }

  public deleteApi(path: any, headerParam: any) {
    return this.httpClient.delete(this.getUrl(path), { headers: headerParam, observe: "response" })
  }

  public validateToken(){
  this.getApiRequest("/validateSession", this.getAuthHeader()).subscribe({
    next: (resp) => {

    }, error: (err) => {
      localStorage.clear()
      sessionStorage.clear()
      this.router.navigate(["user/login"])
      this.toast.setType(ToastType.FAILURE)
        .setMessage("Please login")
        .setTitle("Error")
        .build()
        .show();
    }, complete: () => {

    }
  });
}
}

