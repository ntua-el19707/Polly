//import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

import { FetchquestionareiService } from 'src/app/querysparent/services/fetchquestionarei.service';
import { Keywords } from 'src/app/querysparent/services/keywords';
import { Questionaire } from 'src/app/querysparent/services/questionaire';
import { Questions } from 'src/app/querysparent/services/questions';
//import { Destoyqandop } from 'src/app/service/destoyqandop';
import { DataInsertService } from '../services/data-insert.service';
import { typeQ } from '../type-q';

@Component({
  selector: 'myquery-form',
  templateUrl: './myquery-form.component.html',
  styleUrls: ['../myquerys.component.css']
})
export class MyqueryFormComponent implements OnInit {
  keywordsarray:Keywords[] = [] ;
  questionarie:Questionaire
  QuestionarieForm:FormGroup;
  private keywordButton:Boolean =true;
  public Questions:Questions [] = [] ;
  private qid:number = 0 ; 
  private view =true;
  private types:typeQ []  = [typeQ.mult,typeQ.txt]
  thereAreQuestions(){
    if(this.questionarie.questions.length != 0){
      return true

    }
    return false 
  }
  constructor(private router:Router,private route:ActivatedRoute,private  insertData:DataInsertService,private fb:FormBuilder,private questionaireSe:FetchquestionareiService) { }
 // public destroy:Destoyqandop = {optId:[], qid:[]};
  ngOnInit(): void {
    this.questionarie = {questionnaireID:'',questionnaireTitle:'',questions:[],creator:'',destroy:{optId:[], qid:[],keyword:[]}};
    let poll_id:number = 0 ; 
    let id
    this.route.params.forEach(p =>{
      if(p?.['questionarieId']){
         id  = p?.['questionarieId']
         if(!isNaN(id)){
            poll_id = parseInt(id) ;
            this.questionaireSe.fetch(poll_id).subscribe(r =>{
            //  console.log('hi')
              console.log(r)
             this.questionarie = r;
             this.questionarie.destroy = {optId:[], qid:[],keyword:[]};     
             this.keywordsarray =r.keywords;
             this.QuestionarieForm = this.fb.group({title:this.questionarie.questionnaireTitle})
            // this.ini();
            //this.current = r.questions[0];
            },error =>{
              console.log(error)
            },
            ()=>{
              console.log('complete')
            })
          }
          else{
            this.router.navigate(['/Myquerys']);
          }
      }
     })
 
   
   
    this.QuestionarieForm = this.fb.group({title:this.questionarie.questionnaireTitle})
  }
  first():Questions{
    console.log(this.questionarie)
    if(this.questionarie.questions.length !=0){
      console.log(this.questionarie.questions[0])
      return this.questionarie.questions[0];
    }
    return  {qID:'',qtext:'',required:'',type:'',options:[]};
  }
  pushQuestion(typeO:typeQ){
    console.log(typeO)
    if(this.questionarie.questions.length > 0){
    this.qid = parseInt(this.questionarie.questions[this.questionarie.questions.length -1].qID.split('Q')[1])
      ++this.qid
  }
    
    else{
      this.qid = 0;
    }

    let question:Questions = {qID:'Q'+this.qid.toString(),qtext:'',required:'',type:'',options:[],typeO:typeO,};
    
    if(this.qid > 0){
      console.log(this.questionarie)
      let len = this.questionarie.questions[this.qid-1].options.length;
       if(len!=0){
        if(typeO === typeQ.mult){
        this.questionarie.questions[this.qid-1].options[len-1].nextqID = `Q${this.qid++}` ;}
        this.questionarie.questions.push(question);
       }
    }else{
    ++this.qid ; 
    this.questionarie.questions.push(question);}

  }
  addAnewKeyWord(){
    this.keywordsarray.push({keyword:''});
  }
  thereAreKeywords(){
    if(this.keywordsarray.length != 0){
      return true

    }
    return false  

  }
  disable(){
    this.keywordButton = true;
    this.keywordsarray.forEach(
      el =>{
        if(el.keyword.trim() === ''){
          this.keywordButton=false;
        }
      }
    )
    if(this.keywordButton){
      return true
    }
    return false;
  }
  private edit(){
    this.questionarie.questionnaireTitle = this.QuestionarieForm.controls?.['title'].value;
    console.log(this.questionarie)
  }
  public getTy(i:number){
    if(i < this.types.length){
      return this.types[i]
    }
    return this.types[0]
  }
  private timeout:any;
  stillWriting(event:any){

    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
   
       this.edit();
      
    }, 1000);
  }
  getView(){
return this.view;
  }
  setView(){
    this.view=false;
  }
  setQueryBuilder(){
    this.view = true;
  }
  private buildrequest(){
    let newsurvey:boolean = false; 
    if(!this.questionarie.apid){
      this.questionarie.apid = 0  ;
      newsurvey =true ; 
    }
    let questionarie:any = {
      questionnaireID:`Q${this.questionarie.apid}`,
      questionnaireTitle:this.questionarie.questionnaireTitle,
      keywords:this.questionarie.keywords,
      destroy:this.questionarie.destroy
    }
    if(newsurvey){
      
      questionarie.questions =  this.questionarie.questions ; 
      if(!this.questionarie.questions){
        questionarie.questions = [];
      }

    }else{
      let oldq:any = [] ;
       let newq:any = [] ;
      
       this.questionarie.questions.forEach(q =>{
        let  question:any = {
          qID: q.qID,
          qtext: q.qtext,
          required: q.required,
          type: q.type ,
          actual_id:q.actualid,
          
        } ;
        let oldopt:any = [];
        let newopt:any = [] ;
       /// let op:any= {}
        q.options.forEach(o=>{
          //console.log(o)
          if(o.actual){
            console.log('Option exist');
            console.log(o)
            oldopt = [...oldopt,o]

          }else{
            //o.actual = 0 ;
            console.log('Option does  not  exist');
            console.log(o)
            newopt = [...newopt,o]
          }
        })
       const  op = {
        oldop: oldopt,
        newop: newopt
       }
          question.options = op ;
          if(q.actualid){
              oldq = [...oldq,question]
          }else{
            //q.actualid = 0 ;
            newq = [...newq ,question]
          }
       })
       questionarie.oldq = oldq;
       questionarie.newq = newq;

    }
    if(!newsurvey){
      console.log(questionarie)/*
        Promise.all([this.insertPromise(questionarie.newq),this.updatePromise(questionarie.oldq)]).then(()=>{
          this.handleOptions().then(()=>{
            console.log('ok')
           // this.destoyOptions().then(()=>{
              //console.log('ok')
           // })
          }).catch(err=>{
            console.log(err)
          })
         
        })*/
      this.insertData.update(this.questionarie.apid,questionarie).subscribe(r =>{
        console.log(r)
      },err=>{
        console.log(err)
      },()=>{
        console.log('complete');
      })
    }else{
      let correct = false;
      let poll_id:any;
      this.insertData.insertsenario(this.questionarie).subscribe(i=>{
        console.log(i)
        correct = true;
        poll_id = i;
      },err=>{
        console.log(err)
      },()=>{

        console.log('complete')
        if(correct){
          const pll_id = poll_id.poll_id;
          this.router.navigate([`/Myquerys/FormBuilder/${pll_id}`]);
        }
      })
    }

    console.log(this.questionarie)
    console.log(questionarie);
  }
  build(){
    this.buildrequest();
 
  }
  private  insertPromise(questionsobj:any ){
    return new Promise((resolve,reject)=>{
          const size = questionsobj.length ; 
          if(size === 0 ){
            resolve('') ;
          }
          let counter = 0;
          questionsobj.forEach(q =>{
            const question = {
              qID:q.qID,
              qtext:q.qtext,
              type:q.type,
              required:q.required,
              options:[]
            }
            this.insertData.sendquestion(this.questionarie.apid,question).subscribe( i=>{
             
              console.log(i)
              const index = (parseInt(i.question
                .sequence));
              console.log(index)
              console.log(`question_id:${i.question_id}`)
              this.questionarie.questions[index].actualid  = i.question.question_id;

            },err=>{
              console.log(err);
            
              
            },()=>{
              ++counter;
              if(counter === size){
                console.log(this.questionarie)
                resolve('ok');
              }
            })
          }

          )


    });
  }

  private updatePromise(q:any){
    return new Promise((resolve,reject)=>{
      const size = q.length ; 
      if(size === 0 ){
        resolve('') ;
      }
      let counter = 0;
      q.forEach(el =>{
        const question = {
          qID:el.qID,
          qtext:el.qtext,
          type:el.type,
          required:el.required,
          options:[],
          actual_id:el.actual_id

        }
        this.insertData.updatequestion(this.questionarie.apid,question).subscribe( i=>{
         
          //console.log(i)
        },err=>{
          console.log(err);
        
          
        },()=>{
          ++counter;
          if(counter === size){
            resolve('ok');
          }
        })
      }

      )


});
  }
  private  destoyOptions(){
    return  new Promise((resolve,reject)=>{
      this.insertData.destroy(this.questionarie.destroy).subscribe((i)=>{
        console.log('ok delete')
      },err=>{
        console.log(err)
      },()=>{
        
        resolve('');
      })
    })
  }
  private  handleOptions(){
    return new Promise((resolve,reject)=>{
    if(!this.questionarie.questions){
      resolve('')
    }
    const size = this.questionarie.questions.length ;
    if(size === 0){
      resolve('')
    }
    let counter = 0 ; 
    this.questionarie.questions.forEach(q=>{
      let que:any = q ;
      console.log(q)
      let oldop = [] ;
      let newop = [] ;
      q.options.forEach(o=>{
        if(o.actual){
          oldop.push(o)
        }else{
          newop.push(o)
        }
      })
      Promise.all([this.updateOptions(que.actualid,oldop),this.createOptions(que.actualid,newop)]).then(()=>{

      }).catch(err=>{
        console.log(err)
      }).finally(()=>{
        ++counter ;
        if(size===counter){
          resolve('');
        }
      })
    })
  })
  }
  private updateOptions(question_id ,options){
    return new Promise((resolve,reject)=>{
      const size = options.length ; 
      if(size === 0 ){
        resolve('') ;
      }
      let counter = 0;
      let optionsjson = [] ;
      options.forEach(o =>{
      optionsjson = [...optionsjson, {
          optID:o.optID,
          opttxt:o.opttxt,
          nextqID:o.nextqID,
          actual:o.actual
        }]
       
      })
      this.insertData.updateoption(this.questionarie.apid,optionsjson,question_id).subscribe( i=>{
        console.log(optionsjson)
        console.log(i)
      },err=>{
        console.log(err);
      
        
      },()=>{
        ++counter;
        if(counter === size){
          resolve('ok');
        }
      })
    })

    }
  private createOptions(question_id ,options){
    return new Promise((resolve,reject)=>{
      const size = options.length ; 
      if(size === 0 ){
        resolve('') ;
      }
      let counter = 0;
      let optionsjson = [] ;
      options.forEach(o =>{
      optionsjson = [...optionsjson, {
          optID:o.optID,
          opttxt:o.opttxt,
          nextqID:o.nextqID,
   
        }]
       
      })
      this.insertData.createOption(this.questionarie.apid,optionsjson,question_id).subscribe( i=>{
         
        console.log(i)
      },err=>{
        console.log(err);
      
        
      },()=>{
        ++counter;
        if(counter === size){
          resolve('ok');
        }
      })
    })
  }
}
