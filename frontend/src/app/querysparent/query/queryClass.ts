import { Questionaire } from "../services/questionaire";
import { Questions } from "../services/questions";

export class queryClass{
  private previousq:Questions =  {qID:'',actualid:0,qtext:'',type:'',required:'',options:[],answer:[]};
  private formsmode = false;

    constructor(private question:Questions, private questionarie:Questionaire){
         this.previousq = question;
    }
    firstquestion(){
  
        if(this.question === this.questionarie.questions[0]){
          return true;
        }
        return false;
      }
      lastquestion(){
        if(this.question === this.questionarie.questions[this.questionarie.questions.length -1]){
          return true;
        }
        return false;
      }
      disablebtn(){
        if(this.question.required === 'TRUE'){
          return true;
        }
        return false;
      }
      getcurrent(){
        return this.question
      }
  
      next(next:string){
       let rsp:any =-1;
    
      this.questionarie.questions.forEach(element => {
        if(element.qID === next){
          rsp = element;
        }
        
      });
     
        return rsp;
      }
      set(q){
        this.question = q;
      }
      previous(){
    
        return this.questionarie.questions[0]; 
      }
}