import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
//import { QueryComponent } from './query/query.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { QuerysparentComponent } from './querysparent/querysparent.component';
import { QueryComponent } from './querysparent/query/query.component';
import { MyquerysComponent } from './myquerys/myquerys.component';
import { MyqueryFormComponent } from './myquerys/myquery-form/myquery-form.component';
import { KeywordformComponent } from './myquerys/keywordform/keywordform.component';
import { QuestionsComponent } from './myquerys/questions/questions.component';
import { AnswersFormComponent } from './myquerys/answers-form/answers-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import { StatsComponent } from './myquerys/stats/stats.component';
import { ChartComponent } from './myquerys/stats/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
import {MatGridListModule} from '@angular/material/grid-list'
import { HttpRequestInterceptor } from './http-request.interceptor';
import { MyInfoComponent } from './my-info/my-info.component';
import {MatCardModule} from '@angular/material/card';
import { ConfirmPswComponent } from './confirm-psw/confirm-psw.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogChangPassComponent } from './dialog-chang-pass/dialog-chang-pass.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ForgottochangeComponent } from './forgottochange/forgottochange.component';
//import { PassValidDirective } from './validators/pass-valid.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,


    LoginComponent,
    RegisterComponent,
    QuerysparentComponent,
    QueryComponent,
    MyquerysComponent,
    MyqueryFormComponent,
    KeywordformComponent,
    QuestionsComponent,
    AnswersFormComponent,
    StatsComponent,
    ChartComponent,
    MyInfoComponent,
    ConfirmPswComponent,
    DialogChangPassComponent,
    ForgotPassComponent,
    ForgottochangeComponent,

  



    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,MatGridListModule,MatCardModule,MatStepperModule,MatDialogModule,
    MatListModule,HttpClientModule,ReactiveFormsModule,FormsModule,MatTabsModule,ScrollingModule,MatMenuModule,NgChartsModule
  ],  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [HttpRequestInterceptor,{
    provide:HTTP_INTERCEPTORS,
    useClass:HttpRequestInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
