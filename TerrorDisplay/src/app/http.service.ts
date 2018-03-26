import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private _http: HttpClient) { }

    getAttacks() {
        console.log('getting attacks in service');
        return this._http.get('/allAttacks');
    }

}
