import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiSerivceService {

  public static reponseBody = "body";
  public static response = "response"

  private baseUrl: String = "http://localhost:8080"
  constructor(private httpClient: HttpClient) { }

  public postApiRequest(path: any, body: any) {
    return this.httpClient.post(this.baseUrl + path, body,{observe:"response"});
  }
}
