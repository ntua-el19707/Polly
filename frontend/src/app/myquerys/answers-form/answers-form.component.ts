
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Options } from 'src/app/querysparent/services/options';
import { Questionaire} from 'src/app/querysparent/services/questionaire';
import { Questions } from 'src/app/querysparent/services/questions';
import { Option } from '../option';


@Component({
  selector: 'optionsForm',
  templateUrl: './answers-form.component.html',
  styleUrls: ['./answers-form.component.css','../myquerys.component.css']
})
export class AnswersFormComponent implements OnInit {
  qid ='Q01'
  oid = '1'
  @Input () questionarie:Questionaire;
  @Output () questionarieChange = new EventEmitter<Questionaire>;
  @Input () questions:Questions ;
  @Input() option:Option ={qid:'',optId:0,opttext:''};
  @Input() options:Option [] = [] ;
  @Output() optionsChange = new EventEmitter<Option [] >;
  @Input() realOptions:Options [] = [] ;
  @Output() realOptionsChange = new EventEmitter<Options []>;
  @Input() realOption: Options = {optID:'',opttxt:''}
  FormOptions:FormGroup ;
  private timeout:any
  constructor(private fb:FormBuilder) { }
  public  value ='-';
  ngOnInit(): void {

   this.FormOptions =  this.fb.group({opttext:this.realOption.opttxt,optnext:this.realOption.nextqID})
   this.value = this.realOption.nextqID;
  //  /console.log(`Option nextqid =${this.realOption.nextqID} `)

  }
  private editBo = false; 
  toggle(){
    this.editBo = !this.editBo;
  }
  getedit(){
    return this.editBo
  }
  private edit(){
   // console.log(this.FormOptions.controls?.['opttext'].value)
      /*this.questionarie.questions.forEach(el => {
      if(el === this.questions){
       if(el.options.length === 0){
        el.options = [{optID:this.option.qid +'A'+this.option.optId.toString(),opttxt:this.FormOptions.controls?.['opttext'].value,nextqID:this.option.nextqid}];
       }
       else  if(el.options.length<this.option.optId -2){
          el.options = [...el.options, {optID:this.option.qid +'A'+this.option.optId.toString(),opttxt:this.FormOptions.controls?.['opttext'].value,nextqID:this.option.nextqid}];
        }else{
        el.options[this.option.optId-1] =  {optID:this.option.qid +'A'+this.option.optId.toString(),opttxt:this.FormOptions.controls?.['opttext'].value,nextqID:this.option.nextqid};
      }
    });*/
    let aidsplit = this.realOption.optID.split('A');
    let qid:string = aidsplit[0];
    let id  = parseInt(qid.split('Q')[1]);
    let opid  = parseInt(aidsplit[1]) -1 ;
    if(id < this.questionarie.questions.length){  
        if(opid < this.questionarie.questions[id].options.length){
        this.questionarie.questions[id].options[opid] = 
        {optID:this.realOption.optID,opttxt:this.FormOptions.controls?.['opttext'].value,nextqID:this.realOption.nextqID} ;
        if(this.realOption.actual){
          this.questionarie.questions[id].options[opid].actual = this.realOption.actual
        }
      }
      }
    console.log(this.questionarie)
    this.questionarieChange.emit(this.questionarie);
  }
  stillWriting(event:any){
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
   
      this.edit();
      
    }, 1000);
  }
  getquestions(){
    let q:Questions [] = [{qID:'-',qtext:'',required:'',type:''}] ;
    this.questionarie.questions.forEach(el=>{
      if(el != this.questions){
        q = [...q,el];
      }
    })
    return q;
  }
  nextqID(event:any){
   //let next = this.FormOptions.controls?.['optnext'].value//}
   /* this.questionarie.questions.forEach(el => {
      if(el === this.questions){
       if(el.options.length === 0){
        el.options = [{optID:this.option.qid +'A'+this.option.optId.toString(),opttxt:this.option.opttext,nextqID:this.FormOptions.controls?.['optnext'].value}];
       }
       else  if(el.options.length<this.option.optId -2){
          el.options = [...el.options, {optID:this.option.qid +'A'+this.option.optId.toString(),opttxt:this.option.opttext,nextqID:this.FormOptions.controls?.['optnext'].value}];
        }else{
        el.options[this.option.optId-1] =  {optID:this.option.qid +'A'+this.option.optId.toString(),opttxt:this.option.opttext,nextqID:this.FormOptions.controls?.['optnext'].value};
      }}
    });
    console.log(this.questionarie)
    this.questionarieChange.emit(this.questionarie);*/
    //console.log(next)
     const id = parseInt(this.questions.qID.split('Q')[1]);
     if(id< this.questionarie.questions.length){
      const  opid = parseInt(this.realOption.optID.split('A')[1])-1;
      //console.log(`Options :${opid}`)
      //console.log(event.target.value)
      if(opid < this.questions.options.length){
        this.questionarie.questions[id].options[opid].nextqID = event.target.value//event.target.value;
      }

     }
     console.log(this.questionarie)
     this.toggle()
     this.questionarieChange.emit(this.questionarie);

  }
notlast(){

  if(this.questions.options.length === parseInt(this.realOption.optID.split('A')[1])){
    return false;
  }
  return true
}
private fixed(){
  const id = parseInt(this.realOption.optID.split('A')[0].split('Q')[1]);
  const opId = parseInt(this.realOption.optID.split('A')[1])
  console.log(`try to remove` )
  console.log(this.realOption)
  this.removeItemOnce(opId-1);

 // console.log(opId)
  if(id < this.questionarie.questions.length){
    this.questionarie.questions[id].options.forEach(element => {
      let idold = parseInt(element.optID.split('A')[1]);
      console.log(`${opId} ${idold} `)
      if(opId < idold  ){
        element.optID = this.questions.qID + `A${--idold}`
      }
  
  

      
    });
  }


}
pop(){
  if(this.realOption.actual){
  this.questionarie.destroy.optId.push(this.realOption.actual)
}
  this.fixed();
  //this.removeItemOnce(parseInt(this.realOption.optID.split('A')[1])-1);
  
  this.questionarieChange.emit(this.questionarie)
  //this.realOptionsChange.emit(this.realOptions)
}
private removeItemOnce( index:number) {
  const id = parseInt(this.realOption.optID.split('A')[0].split('Q')[1])
  if(id < this.questionarie.questions.length){
     if(index < this.questionarie.questions[id].options.length){
      if (index > -1) {
        this.questionarie.questions[id].options.splice(index, 1);
      }
     }
  }
  /*
  this.questionarie.questions.forEach(q=>{
    if(q === this.questions){
    
   //   console.log(index)

      if (index > -1) {
        q.options.splice(index, 1);
      }
      
    }

  })
  if(index >-1){
    this.realOptions.splice(index,1)
  }*/
 // this.questionarieChange.emit(this.questionarie);

}
}