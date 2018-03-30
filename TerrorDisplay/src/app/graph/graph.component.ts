import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnChanges, OnInit {
  switch: boolean=false;
  deathBool: boolean=true;
  @Input() attacks;

  barChartLabels: any = [];
  barChartType: string = 'horizontalBar';
  barChartLegend: boolean = true;
  killdict: any;
  dict: any;
  attackdict: any;
  singleattackdict: any;
  barChartData: any = [ { data: [], label: '# of Deaths per Region' }, {data:[], label: "# of Wounded per Region"}];
  regionData: any = [ { data: [], label: 'Total Attacks per Region' }];
  
  attackTypeData: any = [ { data: [], label: 'Types of Attacks' }];
  attackChartLabels: any = [];
  
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    title: {display: true, text: ""}
  };
  
  constructor(private _httpService: HttpService) { }
  ngOnInit(){
    this.deathBool = true;
  }
  ngOnChanges(){
    this.takeData();
  }

  takeData(){
    this.dict = {};
    this.killdict = {};
    this.attackdict = {};
    for(var i=0; i< this.attacks.length;i++){
      if(this.deathBool){
        var kills = this.attacks[i].nkill;
        var wounds = this.attacks[i].nwound;
        if(typeof(kills)=="string"){
          kills = parseInt(kills);
        }else{ kills = 0 }
        if(typeof(wounds)=="string"){
          wounds = parseInt(wounds);
        }else{ wounds = 0 }
        
        if(this.killdict[this.attacks[i].region_txt]){
          this.killdict[this.attacks[i].region_txt][0] += kills;
          this.killdict[this.attacks[i].region_txt][1] += wounds;
  
        }else{
          this.killdict[this.attacks[i].region_txt] = [kills, wounds];
        }

      }
      if(this.dict[this.attacks[i].region_txt]){
        this.dict[this.attacks[i].region_txt] += 1;
      }else{
        this.dict[this.attacks[i].region_txt] = 1;
      }


      if(this.attackdict[this.attacks[i].attacktype1_txt]){
        this.attackdict[this.attacks[i].attacktype1_txt] += 1;
      }else{
        this.attackdict[this.attacks[i].attacktype1_txt] = 1;
      }

    }
    console.log("kill", this.killdict)
    console.log("dict", this.dict)
    
    this.makeTable(this.killdict, this.dict, this.attackdict);
  }

  makeTable(dict, totals, attackdict){

    this.barChartData[0]['data'] = [];
    
    if(this.barChartData[1]['data']){
      this.barChartData[1]['data'] = [];
    }

    for(let x in attackdict){

      if(this.attackChartLabels.length < 7 && x !=undefined){
        this.attackChartLabels.push(x);
        this.attackTypeData[0]['data'].push(attackdict[x])
      }

    }

    for(let x in dict){
      this.barChartData[0]['data'].push(dict[x][0]);
      this.barChartData[1]['data'].push(dict[x][1]);
      this.regionData[0]['data'].push(totals[x]);
      if(this.barChartLabels.length < 12){
        this.barChartLabels.push(x);
      }
    }

    if(Object.keys(totals).length == 1 && this.switch == false){
      this.switch = true;
      this.changeData();
    }
    if(Object.keys(totals).length != 1 && this.switch == true){
      this.switch = false;
      this.changeData()
    }
    this.initializeTable();
  }

  initializeTable(){
    // really just making a clone so Angular can 
    // actually render the page
    console.log("initializing table with", this.barChartData[0]['data'])
    let data = this.barChartData[0]['data'];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
  changeData(){
    var temp = this.barChartData;
    this.barChartData = this.attackTypeData;
    this.attackTypeData = temp;
    
    var temp_labels = this.barChartLabels;
    this.barChartLabels = this.attackChartLabels;
    this.attackChartLabels = temp_labels;
    this.initializeTable();
  }


  changeGraph(){
    if(this.barChartType == "bar"){
      this.barChartOptions.title.text = "";
      this.barChartType = "horizontalBar";
      return;
    }
    if(this.barChartType == "horizontalBar"){
      this.barChartType = "pie";
      this.barChartOptions.title.text = "Amount of deaths (outer) vs. Amount of wounded (inner)";
      
      this.barChartData[0]['backgroundColor'] = [
        // '#1f77b4', '#ff7f0e', '#2ca02c', '#b8d7b4',
        '#7f7f7f', '#ff0000', '#00ff00', '#0000ff',
        '#000000', '##2c7389', '#2c7389', '#17becf' ]
        return;
      }
      if(this.barChartType == "pie"){
        this.barChartType = "doughnut";
      }
      if(this.barChartType == "doughnut"){
        this.barChartType = "bar";
        this.barChartOptions.title.text = "";
        return;
      }
      
    }

  }