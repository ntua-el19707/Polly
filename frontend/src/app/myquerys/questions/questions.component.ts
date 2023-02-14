import { ThisReceiver, TypeofExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Questionaire } from 'src/app/querysparent/services/questionaire';
import { Questions } from 'src/app/querysparent/services/questions';
import { Destoyqandop } from 'src/app/service/destoyqandop';
import { Option } from '../option';
import { typeQ } from '../type-q';

@Component({
  selector: 'questionsForm',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css','../myquerys.component.css']
})
export class QuestionsComponent implements OnInit {
  @Input() question:Questions = {qID:'-',required:'FALSE',qtext:'',options:[],type:''};
  @Input() questionArray:Questions [] = [] ;
  @Input() questionarie:Questionaire ={questionnaireID:'',questions:[],questionnaireTitle:'',creator:''}
  @Output() questionarieChange = new EventEmitter<Questionaire>;

   options:Option [] = [];
    whatType(){
//console.log(this.question.typeO)
    if(this.question.options){
      if(this.question.options.length === 0 ){
        return false;
      }
      //console.log(`Question${this.question.qID} and ${this.question.options[0].opttxt}`)
      if(this.question.options[0].opttxt === '<open string>'){
        this.question.typeO = typeQ.txt
      }else{
        this.question.typeO = typeQ.mult
      }
    }
    if(this.question.typeO === typeQ.mult){
      return false
    }
    return true;
  }
  constructor(private fb:FormBuilder) { }
  QuestionsForm:FormGroup;
  ngOnInit(): void {

    this.QuestionsForm = this.fb.group({qtext:this.question.qtext,require:this.question.required,qtype:this.question.type})
    ///this.question.options.forEach(o=>{
      //const id = parseInt((o.optID).split('A')[1]);
     // this.options = [...this.options,{optId:id,opttext:o.opttxt,nextqid:o.nextqID,qid:this.question.qID}];
      
    //})
    if(this.question.typeO === typeQ.txt){
      
      if(this.question.options.length > 0 ){}else{
          //console.log(this.question)
          this.question.options = [{optID:this.question.qID+"TXT",opttxt:"<open string>",nextqID:'-'}] 
          let id:number = parseInt(this.question.qID.split('Q')[1])
          if(id < this.questionarie.questions.length){
            this.questionarie.questions[id].options = this.question.options
            this.questionarie.questions[id].required = "FALSE";
          }
          this.questionarieChange.emit(this.questionarie)
    }}
  }
  pushopt(){
  
    let id = parseInt(((this.question.qID).split('Q')[1]));
    let next =`-`;
    if(id < this.questionarie.questions.length){
      let  opid = 1 ; 
      if(this.question.options.length !=0 ){
        opid = parseInt(this.question.options[this.question.options.length-1].optID.split('A')[1]) +1 ;
        
      }else{
       this.questionarie.questions[id].options = [] ;
      }
      const aid = this.question.qID + `A${opid}`;
      this.questionarie.questions[id].options = [...this.questionarie.questions[id].options,{optID:aid , opttxt:'',nextqID:next}]
    }
    console.log(this.questionarie)
    /*
  //  console.log(`hi ${id+1} < ${this.questionarie.questions.length-1} `)
    if(id+1 <= this.questionarie.questions.length-1){
      next = `Q${id+1}`
    }
    if(this.options.length === 0 ){
      this.options.push({qid:this.question.qID,optId:1,opttext:'',nextqid:next});
    }else{
      this.options = [...this.options,{qid:this.question.qID,optId:this.options.length+1,opttext:'',nextqid:next}]
    }
    this.questionarie.questions.forEach(q =>{
      if(q === this.question){
       q.options = [] ;
       this.options.forEach(o=>{
        q.options = [...q.options,{optID:o.qid + 'A'+o.optId.toString(),opttxt:o.opttext,nextqID:o.nextqid}]
       })
      
      }
    })*/
    this.questionarieChange.emit(this.questionarie)
 
  }
 
  private edit(){
   this.questionarie.questions.forEach(el =>{
    if(el === this.question){
      el.qtext = this.QuestionsForm.controls?.['qtext'].value;
    }
   })
    console.log(this.questionarie)
    this.questionarieChange.emit(this.questionarie);
  }
  private timeout:any ;
  stillWriting(event:any){

    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
   
      this.edit();
      
    }, 1000);
  }

  typeofquestion(){
    this.questionarie.questions.forEach(el =>{
      if(el === this.question){
      el.type = this.QuestionsForm.controls?.['qtype'].value
      }
     })
     console.log(this.questionarie)
     this.questionarieChange.emit(this.questionarie)
  }
  public requiremethod(){
    this.questionarie.questions.forEach(el =>{
      if(el === this.question){
      el.required = this.QuestionsForm.controls?.['require'].value
      }
     })
     console.log(this.questionarie)
     this.questionarieChange.emit(this.questionarie)
  }

  private popQ(){
    let qid = this.question.qID ;
    const oldqid = qid ;
    if(this.question.actualid){
      this.questionarie.destroy.qid.push(this.question.actualid)
    }
    let index = parseInt(qid.split('Q')[1]);
    if (index > -1) {
          this.questionarie.questions.splice(index, 1);
          this.questionarie.questions.forEach(q =>{
           
            if(q.qID > qid){
              let id = parseInt(q.qID.split('Q')[1]);
             // let oldqid = q.qID
              q.qID = `Q${--id}`
              if(q.options.length === 1){
                if(q.options[0].opttxt === "<open string>"){
                  if(this.questionarie.questions.length-1 === id ){
                    q.options[0].nextqID = '-';
                    q.options[0].optID = `${q.qID}TXT`
                  }else{
                    let next:number = id +1 ;
                    q.options[0].nextqID = `Q${next}`;
                    q.options[0].optID = `${q.qID}TXT`
                  }}else{
                    const aid = q.options[0].optID.split('A')[1];
                    q.options[0].optID = `${q.qID}A${aid}`
                    if(q.options[0].nextqID === oldqid){
                      q.options[0].nextqID= '-';}else{
                        const idNop = (parseInt(q.options[0].nextqID.split('Q')[1]) -1 );
                        q.options[0].nextqID=`Q${idNop}`
                      }
                  }
                }
                else{
                  q.options.forEach(o=>{
                    const aid = o.optID.split('A')[1] ;
                    o.optID = `${q.qID}A${aid}`
                    if(o.nextqID === oldqid){
                    o.nextqID = '-';
                    
                    
                   }else{
                    if(o.nextqID !== null &&  o.nextqID !=='-'){
                    let idNop = (parseInt(o.nextqID.split('Q')[1]));
                

                    
                    o.nextqID=`Q${--idNop}`}else{
                      o.nextqID = '-'
                    }
                     
                    
                   }
                  })
                }
              }
            
            }
              )
            }
            //null delete next qid 
          this.questionarie.questions.forEach(q =>{
              q.options.forEach(o=>{
                if(o.nextqID === oldqid){
                  o.nextqID = '-';
                }
              })
          })
          
          console.log(this.questionarie)
          this.questionarieChange.emit(this.questionarie)
    }
        
   

  
  
  
  
  public pop(){
    this.popQ();
  }
}
