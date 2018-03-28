import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { } from '@types/googlemaps';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
    @ViewChild('gmap') gmapElement: any;
    @Input() attacks;
    @Input() loading;
    map: google.maps.Map;
    mappedAttacks;
    heatmapArr = [];
    heatmap;
    filterYear;
    constructor(private _httpService: HttpService) {
    }

    ngOnInit() {
        this.filterYear = 'all';
        this.initMap();
    }

    ngOnChanges() {
        this.setHeatmap(this.attacksToHeatData());
    }

    setMapType(mapTypeId: string) {
        this.map.setMapTypeId(mapTypeId);
    }

    toggleHeatmap() {
        this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
    }

    setCenter(e: any) {
        e.preventDefault();
        this.map.setCenter(new google.maps.LatLng(this['latitude'], this['longitude']));
    }

    changeGradient() {
        const gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ];
        this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
    }

    addRandPoint() {
        const lat = Math.floor(Math.random() * 90);
        const lng = Math.floor(Math.random() * 180);
        this.heatmap.data.push({ location: new google.maps.LatLng(lat, lng), weight: 1000 });
        console.log('point added at ', lat, lng);
    }

    changeRadius() {
        this.heatmap.set('radius', this.heatmap.get('radius') === 30 ? 20 : 30);
    }

    changeOpacity() {
        this.heatmap.set('opacity', this.heatmap.get('opacity') ? null : 0.2);
    }

    initMap() {
        const mapProp = {
            center: new google.maps.LatLng(27.775, 52.434),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        // this.setHeatmap(this.attacks);
    }

    compressLargeDataSet() {
        const HashMap = {};
        let count = 0;
        let kills = 0;
        let wounds = 0;



        // build initial hashmap

        for (let i = 0; i < this.attacks.length; i++) {
            const key = parseFloat(this.attacks[i]['latitude']).toFixed(0) + '&' + parseFloat(this.attacks[i]['longitude']).toFixed(0);
            if (this.attacks[i]['nkill']) {
                // tslint:disable-next-line:radix
                kills = parseInt(this.attacks[i]['nkill']);

            }
            if (this.attacks[i]['nwounds']) {
                // tslint:disable-next-line:radix
                wounds = parseInt(this.attacks[i]['nwounds']);
            }
            const weight = kills + wounds + 1;
            if (HashMap[key]) {
                HashMap[key] += weight;
            } else {
                HashMap[key] = weight;
                count++;
            }
        }
        console.log('# of points to plot:', count);
        console.log('Hash Map:', HashMap);
        return HashMap;

            }
            if (this.attacks[i]['nwounds']) {
                // tslint:disable-next-line:radix
                wounds = parseInt(this.attacks[i]['nwounds']);
            }
            const weight = kills + wounds + 1;
            if (HashMap[key]) {
                HashMap[key] += weight;
            } else {
                HashMap[key] = weight;
                count++;
            }
        }
        console.log('# of points to plot:', count);
        console.log('Hash Map:', HashMap);

        // // iterate through it repeatedly always shrinking the decimal you round
        // if still greater than 1000 grab every third key and call it a day.
        if (count > 1000) {
            let ct = 0;
            const arr = [];
            for (const key in HashMap) {
                if (HashMap.hasOwnProperty(key)) {
                    if (ct === 2) {
                        // tslint:disable-next-line:radix
                        arr.push(new google.maps.LatLng(parseInt(key.split('&')[0]), parseInt(key.split('&')[1])));
                        ct = 0;
                    } else {
                        ct++;
                    }
                }
            }
            return arr;
        }
        // return HashMap;

    }

    attacksToHeatData() {
        this.clearHeatMap();
        if (this.attacks.length > 1000) { // --------if filter returns more than 1000 points to plot-------------------
            const HashMap = this.compressLargeDataSet();
            let arr = [];
            for (const key in HashMap) {
                if (HashMap.hasOwnProperty(key)) {
                    const element = HashMap[key];
                    // tslint:disable-next-line:radix
                    arr.push(new google.maps.LatLng(parseInt(key.split('&')[0]), parseInt(key.split('&')[1])));
                    if (arr.length >= 1000) {
                        this.setHeatmap(arr);
                        arr = [];
                    }
                }
            }
            return arr;
        } else { // --------if filter returns less than 1000 points to plot-------------------
            const arr = [];
            for (let i = 0; i < this.attacks.length; i++) {
                arr.push(new google.maps.LatLng(this.attacks[i]['latitude'], this.attacks[i]['longitude']));
            }
            return arr;
        }
    }

    clearHeatMap() {
        if (this.heatmap) {
            console.log('clearing map');
            this.heatmap.setMap(null);
        }
    }

    setHeatmap(newData) {
        this.clearHeatMap();
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: newData,
            map: this.map,
            radius: 25
        });
        console.log(this.heatmap);
    }

}
