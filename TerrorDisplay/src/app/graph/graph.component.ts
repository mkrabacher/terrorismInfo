import { Component, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnChanges {
  @Input() attacks;
  attack_dict: any ;
  barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };
  barChartLabels: any = [];
  barChartType: string = 'horizontalBar';
  barChartLegend: boolean = true;
  barChartData: any = [ { data: [], label: 'Total Attacks per Region' }];

  constructor(private _httpService: HttpService) { }

  ngOnChanges(){
    this.takeData();
  }

  takeData(){
    var dict = {}
    for(var i=0; i< this.attacks.length;i++){ 
      if(dict[this.attacks[i].region_txt]){
        dict[this.attacks[i].region_txt] += 1;
      }else{
        dict[this.attacks[i].region_txt] = 1;
      }
    }
    this.makeTable(dict);
  }

  makeTable(dict){
    this.barChartData[0]['data'] = [];

    for(let x in dict){
      this.barChartData[0]['data'].push(dict[x]);
      if(this.barChartLabels.length < 12){
        this.barChartLabels.push(x);
      }
    }
    this.initializeTable();
  }

  initializeTable(){
    // really just making a clone so Angular can 
    // actually render the page
    let data = this.barChartData[0]['data'];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
  changeGraph(){
    if(this.barChartType == "bar"){
      this.barChartType = "doughnut";
      return;
    }
    
    if(this.barChartType == "doughnut"){
      this.barChartType = "horizontalBar";
      return;
    }
    if(this.barChartType == "horizontalBar"){
      this.barChartType = "pie";
      this.barChartData[0]['backgroundColor'] = [
        '#1f77b4', '#ff7f0e', '#2ca02c', '#b8d7b4',
        '#7f7f7f', '#ff0000', '#00ff00', '#0000ff',
        '#000000', '##2c7389', '#2c7389', '#17becf' ]
        return;
      }
      if(this.barChartType == "pie"){
        this.barChartType = "bar";
      }
    }

    // chart.js events for onclick/onhover
    chartClicked(e:any):void {  console.log(e);  }
    chartHovered(e:any):void {  console.log(e);  }
  }
 
  