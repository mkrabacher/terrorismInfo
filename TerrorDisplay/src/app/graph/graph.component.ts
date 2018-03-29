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

  ngOnInit() {
    
  }

  ngOnChanges(){
    console.log(this.attacks,"ohhooh")
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
        if(this.attacks[i].nkill != null){
          killdict[this.attacks[i].country_txt] += parseInt(this.attacks[i].nkill);
        }
        if(this.attacks[i].nwound != null){
          killdict[this.attacks[i].country_txt] += parseInt(this.attacks[i].nwound);
        }
      }
      else{
        dict[this.attacks[i].country_txt] = 1;

        if(typeof(this.attacks[i].nkill) == "number" && this.attacks[i].nwound == "number"){
          killdict[this.attacks[i].country_txt] = parseInt(this.attacks[i].nkill) + parseInt(this.attacks[i].nwound);
        }
        if(typeof(this.attacks[i].nkill) == "number" && this.attacks[i].nwound != "number"){
          killdict[this.attacks[i].country_txt] = parseInt(this.attacks[i].nkill);
        }
        else{
          killdict[this.attacks[i].country_txt] = parseInt(this.attacks[i].nwound)
        }

      }
    }
    console.log(killdict)
    this.makeTable(dict);
  }

  makeTable(dict){
    this.barChartData = [ {data: [], label: 'Total Attacks per Country'} ]
    this.barChartLabels;
    this.barChartLegend;
    for(let x in dict){
      this.barChartData[0]['data'].push(dict[x]);
      this.barChartLabels.push(x);
    }
    console.log("BarGraph data:",this.barChartData[0])
    console.log("BarGraph labels:",this.barChartLabels)
    this.initializeTable();
  }

  // events
  public chartClicked(e:any):void {  console.log(e);  }
  public chartHovered(e:any):void {  console.log(e);  }
 
  public initializeTable():void {
    // really just making a clone so 
    let data = this.barChartData[0]['data'];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
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
