import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs';
import { CommonMethodsService } from './common-methods.service';
@Injectable({
  providedIn: 'root'
})
export class ApiSerivceService {


  public static reponseBody = "body";
  public static response = "response"

  private baseUrl: String = "http://localhost:8080"
  // private baseUrl: String = "http://103.218.112.87:8888"

  constructor(
    private httpClient: HttpClient,
    private common: CommonMethodsService
  ) { }

  private getUrl(path:any){
    return this.baseUrl + path;
  }

  public postApiRequest(path: any, body: any) {
    return this.httpClient.post(this.getUrl(path), body, { observe: "response" });
  }

  public getApiRequest(path: any, headersParam: any) {
    return this.httpClient.get(this.getUrl(path), { headers: headersParam, observe: "response" })
  }

  public getAuthHeader() {
    return { 'Authorization': this.common.getFromLocal("auth") };
  }

  getAllUserDetails(path: string, headersParam: any) {
    return this.httpClient.get(this.getUrl(path), { headers: headersParam,observe: "response" } )
  }
}
