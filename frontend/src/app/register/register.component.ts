import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { matchpass } from '../validators/passValidatepass2';


import { Register } from './register';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup = new FormGroup({}); 
  pass;
  constructor(private router:Router,private login:LoginService,private fb:FormBuilder,private register:RegisterService) { }
   get passwordMatchError() {
    return (
      this.registerForm.getError('matching')
    );
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({username:'',pass1:'',pass2:['']});
    this.registerForm.setValidators(matchpass('pass1','pass2'));
    
  }
  Register(){
    let user:Register = {user:this.registerForm.value.username,pass1:this.registerForm.value.pass1,pass2:this.registerForm.value.pass2};
    this.register.Register(user).subscribe(r =>{
      console.log(r)
      this.login.setLocalStorage(r.critentials) 
      this.router.navigate(['/Myquerys'])
    },error =>{
      console.log(error)
     
    },
    ()=>{
      console.log('complete')
    }
    );

    }


}
