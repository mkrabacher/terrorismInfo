import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnChanges {
    @Input() attacks;
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

    ngOnChanges() {
        console.log('shit changed yo.');
        this.loadData(this.attacks);
        this.loading = false;
    }

    ngOnInit() {
        this.rangeStart = 0;
        this.rangeEnd = 100;
        this.loading = true;
    }

    filter() {
        this.displayAttacks = [];
        this.loading = true;
        if (this.filterYear === 'all') {
            this.displayAttacks = this.attacks;
        } else {
            // tslint:disable-next-line:radix
            this.displayAttacks = this.attacks.filter(entry => entry.iyear === parseInt(this.filterYear));
            this.loading = false;
        }
        console.log(this.displayAttacks);
    }

    loadData(data) {
        this.displayAttacks = this.attacks.slice(this.rangeStart, this.rangeEnd);
    }

}
