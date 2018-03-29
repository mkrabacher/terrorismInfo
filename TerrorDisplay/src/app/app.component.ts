import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Terrorism by Numbers';
    displayedAttacks;
    attacks;
    loading;
    filters;
    filterYear;
    years: Array<any>;
    filterAtkType;
    atkTypes: Array<any>;
    filterRegion;
    regions: Array<any>;
    filterCountry;
    countries: Array<any>;

    constructor(private _httpService: HttpService) {
        this.displayedAttacks = [];
        this.attacks = [];

        this.years = ['all'];
        this.countries = ['all'];
        this.regions = ['all'];
        this.atkTypes = ['all'];
        this.filters = {
            year: this.years[0],
            country: this.countries[0],
            region: this.regions[0],
            atkType: this.atkTypes[0]
        };
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
            this.buildSelectors();
            this.loading = false;
        });
    }

    buildSelectors() {
        for (let i = 0; i < this.attacks.length; i++) {
            if (!this.years.includes(this.attacks[i]['iyear'])) {
                this.years.push(this.attacks[i]['iyear']);
            }
            if (!this.countries.includes(this.attacks[i]['country_txt'])) {
                this.countries.push(this.attacks[i]['country_txt']);
            }
            if (!this.regions.includes(this.attacks[i]['region_txt'])) {
                this.regions.push(this.attacks[i]['region_txt']);
            }
            if (!this.atkTypes.includes(this.attacks[i]['attacktype1_txt'])) {
                this.atkTypes.push(this.attacks[i]['attacktype1_txt']);
            }
        }
        this.years.sort();
        this.countries.sort();
        this.regions.sort();
        this.atkTypes.sort();
    }

    filter() {
        this.loading = true;
        this.displayedAttacks = this.attacks;
        if (this.filters.year !== 'all') {
            // tslint:disable-next-line:radix
            this.displayedAttacks = this.displayedAttacks.filter(entry => entry.iyear === parseInt(this.filters.year));
        }
        if (this.filters.country !== 'all') {
            // tslint:disable-next-line:radix
            this.displayedAttacks = this.displayedAttacks.filter(entry => entry.country_txt === this.filters.country);
        }
        if (this.filters.region !== 'all') {
            // tslint:disable-next-line:radix
            this.displayedAttacks = this.displayedAttacks.filter(entry => entry.region_txt === this.filters.region);
        }
        if (this.filters.atkType !== 'all') {
            // tslint:disable-next-line:radix
            this.displayedAttacks = this.displayedAttacks.filter(entry => entry.attacktype1_txt === this.filters.atkType);
        }

        this.loading = false;
    }
}
