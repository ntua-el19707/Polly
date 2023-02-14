import { Component, Input, OnInit } from '@angular/core';
import { ChartI } from '../chart';
import Chart, { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js/auto';
import { raceWith } from 'rxjs';
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chart:ChartI = {labels:[],colors:[],data:[],type:""};

  public mychart:any;
  private charttype:string ;
  constructor() { }
  barChartData:ChartData ;
  barChartOptions:ChartOptions;
  horizontal:ChartOptions;
  ngOnInit(): void {
    console.log(this.chart)
    let colors = []
    this.charttype = this.chart.type
    let label = '%Total'
    if(this.chart.type === 'bar'){
       colors = ['#606060'] 
       this.horizontal = {indexAxis:'y',responsive:true}
       label = 'Total answers'
    }
    this.barChartData = {
      labels:this.chart.labels,
      datasets:[{
      label:label,
      data: this.chart.data,
    backgroundColor: [...colors,
      '#CCFF99',//1
      '#cc99ff',

      '#99ffcc',//3
      '#99ffff',

      '#99ccff',//5
      '#99ffff',//6
      '#9999ff',//7
       '#99ff99',//8
      '#ff99ff',//9

    ],
    borderColor: [...colors,
      '#80FF00',//1
      '#ff00ff',
      '#00ff80',//3
      '#0000ff',
      '#0080ff',//5
      '#00ffff',//6
      '#7f00ff',//7
      '#00ff00',//8
      '#ff007f',//9
    ],
    borderWidth: 1
  
    }]}
    this.barChartOptions ={ responsive: false}

  }
getCharttype(){
  return this.charttype
}
}
