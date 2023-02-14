import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { matchpass } from '../validators/passValidatepass2';

@Component({
  selector: 'confirmPsw',
  templateUrl: './confirm-psw.component.html',
  styleUrls: ['./confirm-psw.component.css']
})
export class ConfirmPswComponent implements OnInit {
  @Input() Msg:String = "";
  @Input() pass1:String = "";
  @Output()pass1Change = new EventEmitter<String>;
  @Input() pass2:String = "";
  @Output()pass2Change = new EventEmitter<String>;
  @Input() valid:boolean = false;
  @Output() validChange  = new EventEmitter<boolean>;
  private timeout:any;
  confirmPsw:FormGroup = new FormGroup({});
  constructor(private fb:FormBuilder) { }
  get passwordMatchError() {
    return (
      this.confirmPsw.getError('matching')
    );
  }
  ngOnInit(): void {
    this.confirmPsw = this.fb.group({username:'',pass1:this.pass1,pass2:[this.pass2]});
    this.confirmPsw.setValidators(matchpass('pass1','pass2'));
    
  }
  private Update(){
    this.pass1Change.emit(this.confirmPsw.controls?.['pass1'].value);
    this.pass2Change.emit(this.confirmPsw.controls?.['pass2'].value);
    if(this.confirmPsw.controls?.['pass1'].value.trim() === ''){
      this.validChange.emit(false);
    }else if(this.confirmPsw.controls?.['pass1'].value === this.confirmPsw.controls?.['pass2'].value){
      this.validChange.emit(true);
    }
    else if(this.passwordMatchError){
      this.validChange.emit(false);
    }else{
      this.validChange.emit(false);
    }

  }
  stillWriting(event:any){

    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
   
       this.Update();
      
    }, 1000);
  }
  
}
