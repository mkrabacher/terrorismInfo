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
        // this.setHeatmap(this.attacksToHeatData());
        this.setHeatmap(this.fullCompress(this.attacks));
    }

// complete function
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

    clearHeatMap() {
        if (this.heatmap) {
            // console.log('clearing map');
            this.heatmap.setMap(null);
        }
    }

    initMap() {
        const mapProp = {
            center: new google.maps.LatLng(20, 0),
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        // this.setHeatmap(this.attacks);
    }

    compress(data, dec) {
        const HashMap = {};
        let count = 0;
        let kills = 0;
        let wounds = 0;
        for (let i = 0; i < this.attacks.length; i++) {
            const key = parseFloat(this.attacks[i]['latitude']).toFixed(dec) + '&' + parseFloat(this.attacks[i]['longitude']).toFixed(dec);
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
        return HashMap;
    }

    hash2Arr(HashMap) {
        const arr = [];
        for (const key in HashMap) {
            if (HashMap.hasOwnProperty(key)) {
                // tslint:disable-next-line:radix
                const lat = parseInt(key.split('&')[0]);
                // tslint:disable-next-line:radix
                const lng = parseInt(key.split('&')[1]);
                const weight = HashMap[key];
                arr.push({ location: new google.maps.LatLng(lat, lng), weight: HashMap[key] });
            }
        }
        return arr;
    }

    format(attacks) {
        const arr = [];
        for (let i = 0; i < attacks.length; i++) {
            let wght = 1;
            if (this.attacks[i]['nkill']) {
                // tslint:disable-next-line:radix
                wght += parseInt(this.attacks[i]['nkill']);
            }
            if (this.attacks[i]['nwounds']) {
                // tslint:disable-next-line:radix
                wght += (parseInt(this.attacks[i]['nwounds']) / 2);
            }
            const lat = parseFloat(this.attacks[i]['latitude']);
            const lng = parseFloat(this.attacks[i]['longitude']);

            arr.push({ location: new google.maps.LatLng(lat, lng), weight: wght });
        }
        return arr;
    }

    fullCompress(attacks) {
        if (attacks.length < 1000) {
            console.log('attacks less than 1000');
            return this.format(attacks);
        }

        let dec = 4;
        // loop through attacks and add to HashMap with keys as lat&lng and values as weights.
        //      each lat & lng will be rounded to 4 decimals.
        let HashMap = this.compress(attacks, dec);

        // turn hashMap into GMaps HM layer array
        let arr = this.hash2Arr(HashMap);
        // check that array length is <= 1000. if not do above again but with 1 less decimal.
        while (arr.length > 1100 && dec > 0) {
            dec--;
            HashMap = this.compress(attacks, dec);
            arr = this.hash2Arr(HashMap);
            console.log(dec, arr.length);
        }

        // if decimal goes down to 0 with > 1000 points, take a third of the array.
        //      (there is only one situation where this is necessary, with all attacks.)
        if (arr.length > 1100) {
            const thirdArr = [];
            for (let i = 0; i < arr.length; i += 3) {
                thirdArr.push(arr[i]);
            }
            arr = thirdArr;
        }

        // console.log('Hash Map:', HashMap);
        // console.log('# of points to plot:', arr.length);
        // console.log('Plot Points:', arr);

        return arr;
    }

    setHeatmap(newData) {
        this.clearHeatMap();
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: newData,
            map: this.map,
            radius: 20
        });
        console.log('heatmap length: ', this.heatmap.data.length);
    }

}
