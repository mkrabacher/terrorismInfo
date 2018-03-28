import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'GTD';
    displayedAttacks;
    attacks;
    loading;
    years: Array<any>;
    filterYear;

    constructor(private _httpService: HttpService) {
        this.attacks = [];
        this.displayedAttacks = [];
        this.years = ['all'];
        this.filterYear = this.years[0];
        for (let i = 0; i < 40; i++) {
            this.years.push(1970 + i);
        }
    }

    ngOnInit() {
        this.loading = true;
        this.getPointsThroughService();
    }

    getPointsThroughService() {
        const observable = this._httpService.getAttacks();
        observable.subscribe(data => {
            console.log('Initial data grab.');
            this.attacks = data['attacks'];
            this.displayedAttacks = data['attacks'];
            this.loading = false;
        });
    }

    filterByYear() {
        this.displayedAttacks = [];
        this.loading = true;
        if (this.filterYear === 'all') {
            this.displayedAttacks = this.attacks;
        } else {
            // tslint:disable-next-line:radix
            this.displayedAttacks = this.attacks.filter(entry => entry.iyear === parseInt(this.filterYear));
            this.loading = false;
        }
        console.log(this.displayedAttacks);
    }

}
