import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import {} from '@types/googlemaps';
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
    heatmap;
    filterYear;
    constructor(private _httpService: HttpService) {
    }

    ngOnInit() {
        this.filterYear = 'all';
        this.initMap();
        // this.rawDataToHeatData();
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
        const lng =  Math.floor(Math.random() * 180);
        this.heatmap.data.push({location: new google.maps.LatLng(lat, lng), weight: 1000});
        console.log('point added at ', lat, lng);
    }

    changeRadius() {
        this.heatmap.set('radius', this.heatmap.get('radius') ? null : 50);
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
        this.setHeatmap(this.attacks);
    }

    attacksToHeatData() {
        const arr = [];
        for (let i = 0; i < this.attacks.length; i++) {
            arr.push(new google.maps.LatLng(this.attacks[i]['latitude'], this.attacks[i]['longitude']));
        }
        return arr;
    }

    setHeatmap(newData) {
        if (this.heatmap) {
            this.heatmap.setMap(null);
        }
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: newData,
            map: this.map,
            radius: 50
        });
    }

    clearHeat() {
        this.heatmap = null;
    }

}
