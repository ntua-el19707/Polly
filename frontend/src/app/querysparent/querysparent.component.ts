import { InteractivityChecker } from '@angular/cdk/a11y';
import { Component, Input, OnInit, Self } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { StatsService } from '../service/stats.service';
import { FetchquestionareiService } from './services/fetchquestionarei.service';
import { Questionaire } from './services/questionaire';
import { Questions } from './services/questions';
import {Options} from './services/options'
import { identifierName } from '@angular/compiler';
@Component({
  selector: 'app-querysparent',
  templateUrl: './querysparent.component.html',
  styleUrls: ['./querysparent.component.css'],providers:[FetchquestionareiService]
})

export class QuerysparentComponent implements OnInit {
   @Input() questionari:Questionaire = {questionnaireID:'',questionnaireTitle:'',questions:[],creator:'',apid:0};
   @Input() current:Questions =  {qID:'',actualid:0,qtext:'',type:'',required:'',options:[],answer:[]};
   mode = false;
   private formSubmitted = false;
   @Input() first:Questions ={qID:'',qtext:'',type:'',required:'',options:[],answer:[]};
  @Input() mode2:Boolean = false;
  
  constructor(@Self() private questionaire:FetchquestionareiService,private stats:StatsService,private route:ActivatedRoute) { }
  private msg = "";
  private session = '' ;
  ngOnInit(): void {
    const id = this.route.params?.['value']?.['id']
    this.session = this.route.queryParams?.['_value']?.['session_id'];
 
if(!this.mode2){
  const json = {
    session:this.session,
    poll_id:id
  }
  console.log(json)
  this.questionaire.fetch(id).subscribe(r =>{
  //    console.log(r)
     this.questionari = r;
     this.ini();
    this.current = r.questions[0];
    },error =>{
      console.log(error)
    },
    ()=>{
      console.log('complete')
    }
    );}
    else{
      this.ini();
     // console.log(this.first)
     // this.current = this.first;
 
    }

  }
 getKeywords(){
  return this.msg;
 }
  getquestionarie(){
      return this.questionari;
  }
  private  formatStr(str, n) {
     var a = [], start=0;
     while(start<str.length) {
        a.push(str.slice(start, start+n));
     
        start+=n;
     }
     return a;
  }

  ini(){
   let linelength  =  this.questionari.questionnaireTitle.length ;


   this.questionari.keywords.forEach(k =>{
    this.msg +=`#${k.keyword} `; 
      /*counter += k.length ; 
      if(counter > linelength){
        let index  = this.msg.length -1;
        //console.log(index)
        index -=(linelength -counter); 
        this.msg.at(index) = ""

      }*/
    })
 
    
     //console.log(this.formatStr(this.msg,linelength))
    
 this.questionari.questions.forEach(el=>{
  el.answer = [];
  el.showall = false;
   
 })
  }
  is_txt(q:Questions){
 
    let txt = q.qtext;
    //console.log(txt)
    if(txt ==="<open string>"){
     return true
    }
    return false ;
  }
  private is_txtQ(o:Options [])
  {
    if(o.length ===1){
      if(o[0].opttxt === '<open string>'){
        return true;
      }
    }
    return false; 

  }
  private qid(aId){
    let split1 = aId.split('A');
    let split2 =split1[0].split('Q');

    if(isNaN(split1[1]) || isNaN(split2[1])){
      return null
    }
    const aid = (parseInt(split1[1]) -1 )
    const qid = parseInt(split2[1]) 
    if(qid >= this.questionari.questions.length){
      return null 

    }
    if(aid >= this.questionari.questions[qid].options.length){
      return null
    }
    return this.questionari.questions[qid].actualid
  }

  private getAnswerId(aId){
    let split1 = aId.split('A');
    let split2 =split1[0].split('Q');

    if(isNaN(split1[1]) || isNaN(split2[1])){
      return null
    }
    const aid = (parseInt(split1[1]) -1 )
    const qid = parseInt(split2[1]) 
    if(qid >= this.questionari.questions.length){
      return null 

    }
    if(aid >= this.questionari.questions[qid].options.length){
      return null
    }
    return this.questionari.questions[qid].options[aid].actual
  }
  private buildStatsReport(){
    let stats = [] ;
    this.questionari.questions.forEach(q=>{
      if(q.answer.length === 0){
        q.answer[0] = '';
       }
      if(this.is_txtQ(q.options)){
        stats.push({opttxt:q.answer[0].txt,question_id:q.answer[0].id})
      }else{
        stats.push({answer_id:this.getAnswerId(q.answer[0]),question_id:this.qid(q.answer[0])})
      }
    })
    console.log(this.questionari)
    console.log(stats)
    this.stats.submit(stats,this.questionari.apid,this.session).subscribe(i=>{this.formSubmitted =true},err=>{console.log(err)},()=>{
      console.log('ok')
    })
  } 
  submit(){
    console.log('hi')
    this.buildStatsReport();
  } 
  getSubmition(){
    return !this.formSubmitted
  }
  getNotSubmition(){
    return this.formSubmitted
  }
}
