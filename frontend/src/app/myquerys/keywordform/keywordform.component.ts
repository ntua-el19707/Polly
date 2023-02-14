import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Keywords } from 'src/app/querysparent/services/keywords';
import { Questionaire } from 'src/app/querysparent/services/questionaire';

@Component({
  selector: 'keyword',
  templateUrl: './keywordform.component.html',
  styleUrls: ['./keywordform.component.css','../myquerys.component.css']
})
export class KeywordformComponent implements OnInit {
@Input() keyword:Keywords ={keyword:''} ;

@Input() keywordsarray:Keywords[] = [];
@Output() keywordsarrayChange = new EventEmitter<Keywords [] >;
@Input() questionaire:Questionaire = {questionnaireID:'',questionnaireTitle:'',questions:[],creator:''}
@Output() questionaireChange= new EventEmitter<Questionaire>;

private timeout:any =null;

  constructor(private fb:FormBuilder) { }
  keywordForm:FormGroup = new FormGroup({});
  ngOnInit(): void {
  
    this.keywordForm = this.fb.group({keyword:this.keyword.keyword});
  }

   pop(){
    
    this.removeItemOnce(this.keyword);
     this.questionaire.keywords = this.keywordsarray;
     this.questionaireChange.emit(this.questionaire)
    this.keywordsarrayChange.emit(this.keywordsarray)
   }
 
   private removeItemOnce(value) {
    var index =  this.keywordsarray.indexOf(value);
    if(value.keyword_id){
      this.questionaire.destroy.keyword.push(value.keyword_id);
    }
    console.log(index)
    console.log(this.keywordsarray)
    if (index > -1) {
      this.keywordsarray.splice(index, 1);
    }
    
  }
 stillWriting(event:any){

    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
   
       this.edit();
      
    }, 1000);
  }
  edit(){
   const id = this.keywordsarray.indexOf(this.keyword)
 if(id>=0){
  this.keywordsarray[id] = {keyword:this.keywordForm.controls?.['keyword'].value,keyword_id:this.keywordsarray[id].keyword_id}
  
 }
   console.log(this.keywordsarray);
   this.questionaire.keywords = this.keywordsarray
   this.questionaireChange.emit(this.questionaire)
   this.keywordsarrayChange.emit(this.keywordsarray);
   
    console.log(this.questionaire)
  }

   disable(){
    if(this.keyword === this.keywordForm.controls?.['keyword'].value){
      return false
    }
    return true;
   }
}
