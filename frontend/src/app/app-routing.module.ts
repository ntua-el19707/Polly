import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderGuardGuard } from './builder-guard.guard';
import { ForgotGuardGuard } from './forgot-guard.guard';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ForgottochangeComponent } from './forgottochange/forgottochange.component';
import { LoginComponent } from './login/login.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { MyqueryFormComponent } from './myquerys/myquery-form/myquery-form.component';
import { MyquerysComponent } from './myquerys/myquerys.component';
import { StatsComponent } from './myquerys/stats/stats.component';

import { QuerysparentComponent } from './querysparent/querysparent.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'query/:id',component:QuerysparentComponent},
  {path:'Myquerys/FormBuilder',component:MyqueryFormComponent,canActivate:[BuilderGuardGuard]},
  {path:'Myquerys/FormBuilder/:questionarieId',component:MyqueryFormComponent,canActivate:[BuilderGuardGuard]},
  {path:'Myquerys/Stats/:poll_id',component:StatsComponent,canActivate:[BuilderGuardGuard]},
  {path:'MyInfo',component:MyInfoComponent,canActivate:[BuilderGuardGuard]},
  {path:'Myquerys',component:MyquerysComponent,canActivate:[BuilderGuardGuard]}
  ,{path:'login',component:LoginComponent},
  {path:'forgot',component:ForgotPassComponent},
  {path:'activate/forgotPassLink/:tokkenLink',component:ForgottochangeComponent,canActivate:[ForgotGuardGuard]},
  {path:'register',component:RegisterComponent}, {path:'**',redirectTo:'/',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
