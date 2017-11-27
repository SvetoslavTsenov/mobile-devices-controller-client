import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export class ServiceClientBase {
    private static API = 'api';
    private static VERSION = 'v1';
    // private static REST_URL = 'http://localhost:8000';
    private _endPoint: string = `${ServiceClientBase.API}/${ServiceClientBase.VERSION}`;

    constructor(private _http: HttpClient) { }

    protected get http(): HttpClient {
        return this._http;
    }

    protected get endPoint() {
        return this._endPoint;
    }

    protected static getRequestOptions(...args) {
        const reqOpts = {
            params: new HttpParams(),
        };

        reqOpts.params = ServiceClientBase.serializeArg(reqOpts.params, ...args);
        console.log("ReqOpts", reqOpts);
        return reqOpts;
    }

    protected static getRequestOptionsByObj(args) {
        const reqOpts = {
            params: new HttpParams(),
        };

        reqOpts.params = ServiceClientBase.serializeObj(reqOpts.params, args);
        console.log("ReqOpts", reqOpts);
        return reqOpts;
    }


    private static serializeArg(httpParams, ...args) {
        for (let index = 0; index < args.length; index += 2) {
            const value = args[index + 1];
            httpParams = httpParams.set(args[index], value);
        }

        return httpParams;
    }

    private static serializeObj(httpParams, from: Object) {
        Object.getOwnPropertyNames(from).forEach((prop) => {
            if (from[prop]) {
                httpParams = httpParams.set(prop, from[prop]);
            }
        });

        return httpParams;
    }
}