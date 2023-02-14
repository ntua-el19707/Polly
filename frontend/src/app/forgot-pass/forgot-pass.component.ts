import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { relativeTimeThreshold } from 'moment';
import { RequestjwtService } from './requestjwt.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  private msg="Please enter your email";
  private steps:string [] =  ['request','response'] ;
  private index = 0 ; 
  public RequestForm:FormGroup = new FormGroup({});
  private userdoesnotexist = false; 
  constructor(private fb:FormBuilder,private request:RequestjwtService) { }

  ngOnInit(): void {
    this.RequestForm = this.fb.group({email:''})
    this.RequestForm.controls?.['email'].setValidators([Validators.required ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  }
  userdoesexist(){
    return this.userdoesnotexist ;
  }
  get emptyError():boolean{
    if(this.RequestForm.controls?.['email'].errors?.['required']){
      return true ;
    }
    return false;
  }
   get patternError():boolean{
    if(this.RequestForm.controls?.['email'].errors?.['pattern']){
      return true ;
    }
    return false;
  }
  get touchedoddirtyinavlid():boolean{
    if(this.RequestForm.controls?.['email'].invalid && (this.RequestForm.controls?.['email'].dirty || this.RequestForm.controls?.['email'].touched)){
      return true ;
    }
    return false;
  }
 
  getmsg():string{
    return this.msg ; 
  }
  step():boolean{
    if(this.index >= this.steps.length){
      this.index = 0; 
    }
    if(this.steps[this.index] === 'request'){
      return true
    }
    return false;

  }
  update(){
    if(this.RequestForm.controls?.['email'].invalid){
      console.log("invalid")
    }
    let email = this.RequestForm.controls?.['email'].value
    this.request.requestChangePass(email).subscribe( resp =>{
      if(resp.msg === 'link created'){
        this.index = 1 ;
        this.userdoesnotexist = false ; 
      }
    },err=>{console.log(err.error.err)
       let msg = err.error.err; 
      if(msg ==='User not Found in database' ){
        this.userdoesnotexist = true ;
        console.log("catch")
      }
    },()=>{
      console.log("complete")
      
    }
      )
  }
  nextStep(){
    ++this.index;
  }
  disablebtn():boolean{
    return false;
  //  return this.RequestForm.controls?.['email'].invalid
  }
 

}
