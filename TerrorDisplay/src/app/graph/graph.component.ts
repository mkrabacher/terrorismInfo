import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() attacks;
  attack_dict: any ;
  barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };
  barChartLabels: any = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData = [ {data: [], label: 'Total Attacks per Country'} ];

  makeTrue = false;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {}

  ngOnChanges(){
    this.takeData();
  }

  doThis(){
    this.makeTrue = true;
  }
  takeData(){
    var dict = {}
    var killdict = {}
    for(var i=0; i< this.attacks.length;i++){

      if(dict[this.attacks[i].country_txt]){
        dict[this.attacks[i].country_txt] += 1;
      }
      else{
        dict[this.attacks[i].country_txt] = 1;
      }
    }
    console.log("GOTEEEM",dict);
    this.makeTable(dict);
  }

  makeTable(dict){
    for(let x in dict){
      this.barChartData[0]['data'].push(dict[x]);
      this.barChartLabels.push(x);
    }
    console.log("barchart data:",this.barChartData[0])
    console.log("barchart labels:",this.barChartLabels)
    this.initializeTable();
  }

  // events
  public chartClicked(e:any):void {  console.log(e);  }
  public chartHovered(e:any):void {  console.log(e);  }
 
  public initializeTable():void {
    // really just making a clone so 
    let data = this.barChartData[0]['data'];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    console.log("clone",clone)
    clone[0].data = data;
    this.barChartData = clone;
  }
  changeGraph(){
    if(this.barChartType == "bar"){
      this.barChartType = "line";
      return;
    }
    if(this.barChartType == "line"){
      this.barChartType = "horizontalBar";
      return;
    }
    if(this.barChartType == "horizontalBar"){
      this.barChartType = "bar";
      return;
    }
  }
}
