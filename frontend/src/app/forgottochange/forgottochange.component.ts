import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Login } from '../login/service/login';
import { LoginService } from '../login/service/login.service';
import { ChangepassService } from './changepass.service';

@Component({
  selector: 'app-forgottochange',
  templateUrl: './forgottochange.component.html',
  styleUrls: ['./forgottochange.component.css']
})
export class ForgottochangeComponent implements OnInit {
  private msg:String = "Change your password";
  public pass1:String = '';
  public pass2:String = '';
  public valid:boolean = false ;

  constructor(private routerA:Router,private login:LoginService,private forgotpsw:ChangepassService,private router:ActivatedRoute) { }

  ngOnInit(): void {
  }
  getmsg():String{
    return this.msg;
  }
  update(){
    if(this.pass1  === this.pass2){
      let jwt 
     this.router.params.forEach(p =>{
      if(p?.['tokkenLink']){
        jwt  = p?.['tokkenLink']
      }
     })
     let loggedin = false; 
          // console.log(this.router.params?.['tokkenLink'])
      this.forgotpsw.changepass(this.pass1,/*this.router.params?.['tokkenLink']*/jwt).subscribe(r=>{
        if(r.subforlogin){
          let login:Login =  {
            user:r.subforlogin ,
            pass:this.pass1};
          this.login.login(login).subscribe(l =>{
            console.log(l);
            loggedin = true ;
            this.login.setLocalStorage(l.user.token)
            this.routerA.navigate(['/Myquerys']);
          },err=>{
            console.log(err); 
          },() =>{
            console.log('log in subcribe complete')
          })
          
        }
      },err=>{
        console.log(err)
      },()=>{console.log('complete')
            if(loggedin){
              this.routerA.navigate(['/Myquerys']);
            }
    })
    } 

  }
}
