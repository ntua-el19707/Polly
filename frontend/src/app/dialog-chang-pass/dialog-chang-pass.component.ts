import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { RequestjwtService } from '../forgot-pass/requestjwt.service';
import {ChangepassService} from '../forgottochange/changepass.service'
@Component({
  selector: 'app-dialog-chang-pass',
  templateUrl: './dialog-chang-pass.component.html',
  styleUrls: ['./dialog-chang-pass.component.css']
})
export class DialogChangPassComponent implements OnInit {

  constructor(private changePass:ChangepassService ,private fb:FormBuilder,public dialogRef: MatDialogRef<DialogChangPassComponent>,private requestJwt:RequestjwtService) { }

  ngOnInit(): void {
    this.oldForm = this.fb.group({oldpass:''});
  }
  private msg:String = "Change your password";
  public pass1:String = '';
  public pass2:String = '';
  public valid:boolean = false ;
  private steps:string [] =  ['OldPsw','NewPsw','done'] ;
  private Jwt:string ="";
  private  index = 0 ;
 public  oldForm:FormGroup = new FormGroup({})
  getSteP():string{
    if(this.index >= this.steps.length){
      this.index = 0 ;
    }
    return this.steps[this.index];
  }
  getmsg():String{
    return this.msg;
  }
  toConfirmComponet(){
    
      this.requestJwt.requestChangePassUserAuthed(this.oldForm.controls?.['oldpass'].value).subscribe(i=>{
        this.Jwt = i?.['tokkenLink'];
        console.log(this.Jwt);
        this.index = 1;
      },err=>{
        console.log(err);
      },()=>{
        console.log('request change pass completed');
      })
    
  
  }
  toDone(){
    if(this.pass1 === this.pass2){
this.changePass.changepass(this.pass1,this.Jwt?.['token']).subscribe(i=>{
  this.index = 2; 
},err=>{
console.log(err)  
},()=>{
  
})
    }


  }
}
