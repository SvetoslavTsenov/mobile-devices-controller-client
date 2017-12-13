import { Injectable } from '@angular/core';
import { ServiceClient } from "./service-client";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ServiceContext {

    private static DEVICES_CONTROLLER = "devices";

    constructor(private _serviceClient: ServiceClient) { }

    getDevices(baseUrl, ...args): Observable<any> {
        return this._serviceClient.get<any>(baseUrl, ServiceContext.DEVICES_CONTROLLER, ...args);
    }

    getDevicesByQuerry(baseUrl, args): Observable<any> {
        return this._serviceClient.getByQuerry<any>(baseUrl, ServiceContext.DEVICES_CONTROLLER, args);
    }

    refresh(baseUrl, args): Observable<any> {
        return this._serviceClient.getByQuerry<any>(baseUrl, `${ServiceContext.DEVICES_CONTROLLER}/refresh`, args);
    }


    update(baseUrl, token, device) {
        return this._serviceClient.update<any>(baseUrl, `${ServiceContext.DEVICES_CONTROLLER}/udpate`, token, device);
    }

    stopDevice(baseUrl, ...args): Observable<any> {
        return this._serviceClient.get<any>(baseUrl, `${ServiceContext.DEVICES_CONTROLLER}/kill`, ...args);
    }

    bootDevice(baseUrl, ...args): Observable<any> {
        return this._serviceClient.get<any>(baseUrl, `${ServiceContext.DEVICES_CONTROLLER}/boot`, ...args);
    }
}