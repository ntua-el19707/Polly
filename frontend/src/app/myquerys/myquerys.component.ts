import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MyqueryFormComponent } from './myquery-form/myquery-form.component';
import { Poll } from './poll';
import { GetMypollsService } from './services/get-mypolls.service';
import { Mypoll } from './services/intefaces/mypoll';
import { LinkGenaratorService } from './services/link-genarator.service';
import { QuestionsStats } from './stats/questions-stats';

@Component({
  selector: 'app-myquerys',
  templateUrl: './myquerys.component.html',
  styleUrls: ['./myquerys.component.css']
})
export class MyquerysComponent implements OnInit {
  qStats:QuestionsStats [];
  questionarie:Poll [] = [];
  linkform:FormGroup = new FormGroup({});
  private links:string[] = [];
  private linkformvisible = false;
 // myPolls:Mypoll [] = [];
  constructor(private link:LinkGenaratorService,private router:Router,private mypolls:GetMypollsService,private fb:FormBuilder) { }
  routeNavBuilder(){
    this.router.navigate(['/Myquerys/FormBuilder'])
  }
  routeNavBuilderrouter(id){
    this.router.navigate([`/Myquerys/FormBuilder/${id}`])
  }
  routeNavChartrouter(id){
    this.router.navigate([`/Myquerys/Stats/${id}`])
  }
  deleteQuery(id){
    this.mypolls.delete(id).subscribe(i=>{
      this.mypolls.getPolls().subscribe(i=>{
        this.questionarie = i[0].polls;
        console.log( this.questionarie)
      },err=>{
        console.log(err)
      },()=>{
        console.log('complete')
      });
    }
     ,err=>{console.log(err)},()=>{})
  }
  ngOnInit(): void {
   /*this.qStats = [{qID:'Q00',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]},{qID:'Q4',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]}
   ,{qID:'Q01',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]}
  ,{qID:'Q03',qtext:'Who is your favourite Character?',Stats:[{aid:'Q0A1',atext:'Madara',percentage:45},{aid:'Q0A2',atext:'Hashirama',percentage:25},{aid:'Q0A3',atext:'Naruto',percentage:20},{aid:'Q0A4',atext:'Sasuke',percentage:10}]}]
    this.questionarie = [{QuestionarieTitle:"Anime Lover?",id:0},{QuestionarieTitle:"Knolwedgble",id:1}]
}*/
  this.linkform = this.fb.group({total:null,selectform:null})
  this.linkform.controls?.['total'].setValidators([Validators.required])
  this.linkform.controls?.['selectform'].setValidators([Validators.required])
  this.mypolls.getPolls().subscribe(i=>{
    this.questionarie = i[0].polls;
    console.log( this.questionarie)
  },err=>{
    console.log(err)
  },()=>{
    console.log('complete')
  })
  }
  genarate(){

    this.link.genarate(this.linkform.controls?.['selectform'].value,this.linkform.controls?.['total'].value).subscribe(i=>{
      this.links = i.Links;
    },err=>{},()=>{})
  }
  valid(){
    if(this.linkform.controls?.['total'].value <0){
      return false;
    }
    return this.linkform.valid;
  }
  GenarateLinksexist(){
    if(this.links.length >0){
      return true
    }
    return false;
  }
  getLinks(){
    return this.links
  }
  toggle(){
     this.linkformvisible = !this.linkformvisible ;
  }
  getCard(){
    return this.linkformvisible
  }
}
/*asxeto Ubuntu

sudo vim /etc/sysctl.conf

Add a line at the bottom

fs.inotify.max_user_watches=524288

Then save and exit!

sudo sysctl -p*/