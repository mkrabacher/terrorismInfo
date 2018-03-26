import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
    attacks: Array<any>;
    displayAttacks;
    rangeStart;
    rangeEnd;
    loading;
    years: Array<any>;
    filterYear;
    constructor(private _httpService: HttpService) {
        this.years = ['all'];
        this.filterYear = this.years[0];
        for (let i = 0; i < 50; i++) {
            this.years.push(1970 + i);
        }
    }

    ngOnInit() {
        this.rangeStart = 0;
        this.rangeEnd = 100;
        this.loading = true;
        this.getAttacksThroughService();
    }

    filter() {
        if (this.filterYear === 'all') {
            this.displayAttacks = this.attacks;
        } else {
            // tslint:disable-next-line:radix
            this.displayAttacks = this.attacks.filter(entry => entry.iyear === parseInt(this.filterYear));
        }
        console.log(this.displayAttacks);
    }

    getAttacksThroughService() {
        const observable = this._httpService.getAttacks();
        observable.subscribe(data => {
            this.attacks = data['attacks'];
            this.displayAttacks = this.attacks.slice(this.rangeStart, this.rangeEnd);
            console.log(this.attacks);
            this.loading = false;
        });
    }

}
