import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Login } from './service/login';
import { LoginService } from './service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup = new FormGroup({});
  private errmsg:string = "";
  constructor(private router:Router ,private fb:FormBuilder,private login:LoginService,private cookieService: CookieService) {
    
   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({email:'',password:''})}
test(){
   let user:Login = {user:this.loginForm.value.email,pass:this.loginForm.value.password};
  
  this.login.login(user).subscribe(r =>{
    console.log(r)
     //this.cookieService.set('Authorization',r.user)
     this.login.setLocalStorage(r.user)
     this.router.navigate(['/Myquerys']);

  },error =>{
    console.log(error)
    if(error.error?.['status']){
      if(error.error.status==='Wrong pass'){
        this.errmsg = "Wrong password";
       // console.log('yes')
      }
    }

    console.log(error)
  },
  ()=>{
    console.log('complete')
  }
  );
  //this.auth()
  }
  auth(){
    this.login.authenticate();
  }
  errohappen(){
    if(this.errmsg !== ""){
      return true ;
    }
    return false;
  }
}
