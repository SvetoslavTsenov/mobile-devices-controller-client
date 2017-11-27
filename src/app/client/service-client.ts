import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServiceClientBase } from "./service-client-base";

@Injectable()
export class ServiceClient extends ServiceClientBase {
  constructor(_http: HttpClient) {
    super(_http);
  }

  get<T>(baseUrl, controller, ...args): Observable<T> {
    return this.http.get<T>(`${baseUrl}/${this.endPoint}/${controller}`, ServiceClientBase.getRequestOptions(...args));
  }

  getByQuerry<T>(baseUrl, controller, querry): Observable<T> {
    return this.http.get<T>(`${baseUrl}/${this.endPoint}/${controller}`, ServiceClientBase.getRequestOptionsByObj(querry));
  }

  update<T>(baseUrl, controller, token, obj): Observable<T> {
    return this.http.get<T>(`${baseUrl}/${this.endPoint}/${controller}`, ServiceClientBase.getRequestOptionsByObj(obj));
  }

  post(baseUrl, controller, body, ...args) {
    this.http.post(`${baseUrl}/${this.endPoint}/${controller}`, body).subscribe();
  }
}