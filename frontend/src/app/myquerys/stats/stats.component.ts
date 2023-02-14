import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Questionaire } from 'src/app/querysparent/services/questionaire';
import Chart from 'chart.js/auto';
import { ChartI } from './chart';
import { QuestionsStats, stats } from './questions-stats';
import { fromEvent } from 'rxjs';
import { StatsService } from '../services/stats.service';
import { ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  @Input() questionStats:QuestionsStats[] = [] ;
  private colums:number = 2
  @ViewChild('box', {static: true}) box: ElementRef;
  constructor(private elementRef: ElementRef,private statsService:StatsService,private route:ActivatedRoute) { }
   public chart:ChartI;
   private title ='';
  ngOnInit(): void {
    //let htmlRef = this.elementRef.nativeElement.querySelector(`#MyChart`);
    const poll_id = this.route.params?.['_value']?.['poll_id'];
    this.statsService.getStats(poll_id).subscribe(i=>{
      console.log(i)
      this.questionStats = i.rsp.questions;
      this.title = i.rsp.title;
    },err=>{},()=>{})
   /* this.questionStats = [{qID:'Q00',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]},{qID:'Q4',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]}
   ,{qID:'Q01',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]}
  ,{qID:'Q03',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]}]
   */ this.chart = {
      type: 'pie', //this denotes tha type of chart

      data: [80,10,20],// values on X-Axis
      labels:["answer1","anser2","answer3"],
      colors:["blue"]
        
      
    }  
    this.setcolums();
    console.log(poll_id)
    console.log(this.questionStats)
  }
  getcols(){
    return this.colums
  }
  setcolums(){
    
    this.colums = Math.floor(this.box.nativeElement.clientWidth / 400);
    //console.log(this.colums)
  }

  createchart(stats:stats [],id:string):ChartI{
    let datac =  [] ;
    let labels = [];
    stats.forEach(s=>{
      datac =[...datac,s.percentage];
      labels = [...labels,s.atext];
    })
    const data = {
      labels: labels,
      datasets: [{
        labels:labels,
        data: this.chart.data,
        backgroundColor: [
          'rgba(204, 255, 153, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    return  {labels:labels,data:datac,type:'pie',colors:[]}
        
  }
  createid(id){
    return "chart"+id;
  }
  getTitle(){
    return this.title
  }
  createchartBar(stats:stats[],id:string):ChartI{
    let datac =  [] ;
   // let total = 0;
    let labels = [];
    if(stats.length >0){
      datac.push(stats[0].total)
      labels.push('total')
    }
    stats.forEach(s=>{
      datac =[...datac,s.freq];
      labels = [...labels,s.atext];
   //   total = s.total
    })
    return  {labels:labels,data:datac,type:'bar',colors:[]}
  }
   requestmail(){
     this.statsService.getmail(this.questionStats).subscribe(i=>{
      console.log(i)
     },err=>{
      console.log(err)
     },()=>{
      
     })}
   
  }


