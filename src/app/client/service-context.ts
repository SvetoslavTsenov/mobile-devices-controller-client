import { Injectable } from '@angular/core';
import { ServiceClient } from "./service-client";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ServiceContext {

    private static DEVICES_CONTROLLER = "devices";

    constructor(private _serviceClient: ServiceClient) { }

    getDevices(...args): Observable<any> {
        return this._serviceClient.get<any>(ServiceContext.DEVICES_CONTROLLER, ...args);
    }
}