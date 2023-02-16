import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/service/login.service';
import { Route, Router } from '@angular/router';
import { Routes } from './routes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit{
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private authentcated():boolean{
    if(localStorage.getItem('token')){
      return true
    }else{
      return false;
    }
  }
  private routesVertical:Routes [] = [] ;
  private logoutb:boolean = false;
  constructor(private router:Router,private breakpointObserver: BreakpointObserver,private login:LoginService) {}
  ngOnInit(): void {
   this.init();
  }
  private  init(){
    if(this.authentcated()){
      this.routesVertical =  [{path:'/Myquerys',display:'FormBulder'},{path:'MyInfo',display:'MyInfo'}] 
    this.logoutb =true;
    }else{
      this.routesVertical =  [{path:'/login',display:'login'},{path:'/register',display:'Register'}] 
     this.logoutb = false;
    }
  }
  getVertical(){
    this.init();
    return this.routesVertical
  }
  exist(){

    this.init();
    return this.logoutb;
  }

  logout(){
    
    this.login.logout();
    console.log(this.router)
    this.router.navigate(['/login']);
  }
}
