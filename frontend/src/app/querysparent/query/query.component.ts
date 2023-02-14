import { registerLocaleData } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ignoreElements } from 'rxjs';
import { requiredCheckboxGroup } from 'src/app/validators/queryvalidator';
import { Options } from '../services/options';
import { Questionaire } from '../services/questionaire';
import { Questions } from '../services/questions';
import { queryClass } from './queryClass';



@Component({
  selector: 'query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {


  @Input() question:Questions = {qID:'',actualid:0,qtext:'',type:'',required:'',options:[],answer:[]};
  
  @Input() checkArray:any [] = [] ;
  @Input() current:Questions =  {qID:'',actualid:0,qtext:'',type:'',required:'',options:[],answer:[]};
  @Output() currentChange = new EventEmitter<Questions>();
  @Input() questionarie:Questionaire = {questionnaireID:'',questionnaireTitle:'',questions:[],creator:'',apid:0}
  @Output() questionarieChange = new EventEmitter<Questionaire>();
 @Output() checkArrayChange = new EventEmitter<any [] >();
  @Input() mode:boolean;
  @Output() modeChange = new EventEmitter<boolean>();
  queryFormmulti: FormGroup = new FormGroup({}) ;
  querytxtform:FormGroup = new FormGroup({});
  @Input() formSubmited:boolean = false;
  private nextq:string;
   
  ngOnInit(): void {
    this.qclass = new queryClass(this.current,this.questionarie);
    //console.log("hi madara" + this.current)
    if(this.current.options.length !=0){
    this.nextq = this.current.options[0].nextqID;}
    else{
      this.nextq = null
    }
    
  }

  private qclass:queryClass
  constructor(private fb:FormBuilder) { 
    this.queryFormmulti = this.fb.group({answer:new FormArray([])})
    this.querytxtform = this.fb.group({opttxt:''});
    if(this.istxt()){
      if(this.question.answer.length ===1 ){
      this.querytxtform = this.fb.group({opttxt:this.question.answer[0]});}
    }
    this.queryFormmulti.controls['answer'].setValidators(requiredCheckboxGroup(1))
    this.ini()
  }
  private rule(){
    if(this.current.options.length !=0){
    this.nextq = this.current.options[this.current.options.length -1].nextqID;}
    else{
      this.nextq =null
    }
  }
  private ini(){
    let checkArray = this.queryFormmulti.get('answer') as FormArray
     
      this.checkArray = this.current.answer
     // console.log(this.checkArray)
      if(this.checkArray.length=0){
        this.checkArray= [];
      }
      
     /*this.checkArray.forEach((element)=>{
    
        checkArray.push(new FormControl(element))})
      */
      
  }
  check(answer:string,next:string){
     //let checkArray = this.queryForm.get('answer') as FormArray
     let rtn = false;
     this.checkArray = this.question.answer
     
     if(!this.checkArray){
      this.checkArray = []
     }
     
    if(this.checkArray.length === 0){
      this.rule();

    }

    this.checkArray.forEach((element)=>{
    //console.log(element)
     if(element === `${answer}`){
       //checkArray.push(new FormControl(element))
       this.nextq =next; 
       rtn =true;
     }
    });
       //console.log(this.checkArray)
     return rtn;
   }
   onCheckboxChange(e) {
    let checkArray = this.queryFormmulti.get('answer') as FormArray
    // this.checkArray = this.question.answer; 
     let o = e.target.value;
     //console.log(o);
    //console.log(this.checkArray);
     if (e.target.checked) {
      
      checkArray.push(new FormControl(e.target.value));
       this.checkArrayChange.emit(
         
       this.checkArray= [...this.checkArray,e.target.value]
       );
       
     } else {
      this.removeItemOnce(e.target.value);
  
       let i: number = 0;
       checkArray.controls.forEach((item: FormControl) => {
         if (item.value == e.target.value) {
           checkArray.removeAt(i);
           
           return;
         }
         i++; }
         
         );
       
         
      
     
     }
     if(this.mode){
       this.makechange(this.question.qID);
     }
   }
   private  formserrors(){
    if(this.queryFormmulti.controls['answer'].errors?.['limmit']){
      return true ;
    }
    return false;
   }
   private findindex(qid:string):number{
    let spli = qid.split('Q')
     return parseInt(spli[1]);
   }
   private findindexaid(aid:string):number{
    let spli = aid.split('Q')
    
     return parseInt(spli[1].split('A')[1]);
   }
  
   private makechange(qid:string){
   
     this.questionarie.questions[this.findindex(qid)].answer = this.checkArray
     //onsole.log(this.questionarie)
     this.questionarieChange.emit(this.questionarie);
      if(!this.formserrors()){
            let answer = this.question.answer[0];

            let next =   this.questionarie.questions[this.findindex(qid)].options[this.findindexaid(answer)-1];
            this.questionarie.questions.forEach(el=>{
              if(el.actualid === next.dpented){
                el.showall=true;
              }
            })
            this.questionarieChange.emit(this.questionarie);

      }
     
    }
   
   private removeItemOnce( value) {
    var index = this.checkArray.indexOf(value);
    if (index > -1) {
      this.checkArray.splice(index, 1);
    }
    
  }
  private popshow(){
    this.questionarie.questions.forEach(el=>{
      if(el === this.current){
        el.showall= false;
        
      }
    })
    this.questionarieChange.emit(this.questionarie);
  }
  
  previous(){
    this.queryFormmulti.reset();
    this.popshow();
    this.modeChange.emit(false);
    
    //this.checkArrayChange.emit([]);
   // let previous = this.previousq[this.previousq.length -1]
    //this.previousq.pop()
    this.currentChange.emit(this.current.previous);

   
  }
  getmode(){
    return !this.mode 
  }
  next(){
    if(this.istxt()){
      //console.log(this.querytxtform)
       
    // if(this.checkArray.length )
      //console.log(this.checkArray)
      this.checkArray = [{txt:this.querytxtform.controls['opttxt'].value,id:this.current.actualid}];
    }
    let any:any  = this.qclass.next(this.nextq);
    if(any != -1){
    this.current.answer = this.checkArray;
    this.buildanswer();
    this.questionarieChange.emit(this.questionarie)
    //console.log(this.questionarie)
    this.currentChange.emit(this.current);
    //console.log(this.current)
    this.qclass.set(any)
    any.previous = this.current ;
  
    
    this.currentChange.emit(any)
  }
  if(this.nextq=== null || this.nextq=== `-`){
   // console.log(this.current)
    
    
    this.modeChange.emit(true);
    //emit last qusetion 
   }
  }
  getclass(){
    return this.qclass;
  }
 
  getoptions(){
    return this.question.options;
  }
  showq(){
    let ini ={qID:'',actualid:0,qtext:'',type:'',required:'',options:[]};
    //console.log(this.question);
    if(this.question === this.getcurrent() && this.current != ini ){
	    
      return true ;
    }
    return false ;


  }
  getcurrent(){
  //	  this.currentChange.emit(this.question);
	  return this.current;
  }
  istxt(){
  //  this.currentChange.emit(this.current);


    if(this.question.options.length === 1 ){
      if(this.question.options[0].opttxt === '<open string>' ){
        return true
      }
    }
    return false;
  }
  firstquestion(){
  
    if(this.current === this.questionarie.questions[0]){
      return true;
    }
    return false;
  }
  lastquestion(){
    if(this.current === this.questionarie.questions[this.questionarie.questions.length -1]){
      return false;
    }
    return false;
  }
  disableleft(){
    if(this.queryFormmulti.controls['answer'].errors?.['limmit']){
      return true ;
    }
    return false;
  }
  disablebtn(){
    if(this.queryFormmulti.controls['answer'].errors?.['limmit']){
      return true ;
    }
    if(this.current.required === 'TRUE'){
       if(this.checkArray.length == 1){
        return false
       }
       return true;
    }
    return false;
  }


get required():boolean{
  if(this.question.required === 'TRUE'){
    return true ;
  }
  return false;
}
private buildanswer(){
  this.questionarie.questions.forEach((el)=>{
    if(el.qID === this.current.qID){
      el.answer = this.checkArray;
      el.showall =true;
    }
  })
}
public ForceChangeMode(){
  this.modeChange.emit(false);
}
getSubmition(){
  return this.formSubmited
}
}
