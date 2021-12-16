import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subscriber } from 'rxjs';
import { CommonMethodsService } from './common-methods.service';
@Injectable({
  providedIn: 'root'
})
export class ApiSerivceService {


  public static reponseBody = "body";
  public static response = "response"

  // private baseUrl: String = "http://localhost:8080"
  private baseUrl: String = "http://tungstenautomation.ddns.net:8888"

  constructor(
    private httpClient: HttpClient,
    private common: CommonMethodsService
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
}

