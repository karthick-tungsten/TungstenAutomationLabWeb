import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonMethodsService } from './common-methods.service';
@Injectable({
  providedIn: 'root'
})
export class ApiSerivceService {

  public static reponseBody = "body";
  public static response = "response"

  private baseUrl: String = "http://localhost:8888"
  constructor(
    private httpClient: HttpClient,
    private common: CommonMethodsService
  ) { }

  public postApiRequest(path: any, body: any) {
    return this.httpClient.post(this.baseUrl + path, body, { observe: "response" });
  }

  public getApiRequest(path: any, headersParam: any) {
    return this.httpClient.get(this.baseUrl + path, { headers:headersParam, observe: "response" })
  }

  public getAuthHeader() {
    return { 'Authorization': this.common.getFromLocal("auth") };
  }
}
