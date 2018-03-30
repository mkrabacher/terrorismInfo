import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-display',
    templateUrl: './display.component.html',
    styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnChanges {
    @Input() attacks;
    @Input() loading;
    displayAttacks;
    rangeStart;
    rangeEnd;
    constructor(private _httpService: HttpService) {
        // console.log(Tablesorter);
    }

    ngOnChanges() {
        this.loadData(this.attacks);
    }

    ngOnInit() {
        this.rangeStart = 0;
        this.rangeEnd = 100;
    }

    loadData(data) {
        this.displayAttacks = this.attacks.slice(this.rangeStart, this.rangeEnd);
    }


}
