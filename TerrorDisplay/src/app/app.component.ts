import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'GTD';
    attacks;

    constructor(private _httpService: HttpService) {
        this.attacks = [];
    }

    ngOnInit() {
        this.getPointsThroughService();
    }

    getPointsThroughService() {
        const observable = this._httpService.getAttacks();
        observable.subscribe(data => {
            console.log('Initial data grab.');
            this.attacks = data['attacks'];
        });
    }
}
