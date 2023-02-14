import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DialogChangPassComponent } from '../dialog-chang-pass/dialog-chang-pass.component';
import { MyinfoService } from './myinfo.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {
  private Name  = "";
  private Email = ""
  private  TotalSarveys = 0;
  private  formS= false;



  
  
  InfoForm :FormGroup= new FormGroup({});
  constructor(private fb:FormBuilder,private dialog: MatDialog,private infoSer:MyinfoService) { }

  ngOnInit(): void {
    this.InfoForm = this.fb.group({Name:this.Name,Email:this.Email })
    this.infoSer.getmyinfo().subscribe(i=>{
      this.Name = i.fullName ;
      this.Email = i.user ;
      this.TotalSarveys = i.total;
      this.InfoForm = this.fb.group({Name:this.Name,/*Email:this.Email */})
    },err=>{},()=>{})
  }
  getName():string{
    return this.Name;
  }
  getEmail():string{
    return this.Email;
  }
  getPolls(

  ):number{
    return this.TotalSarveys;
  }
  save(){
    //console.log('hi')
    this.Name = this.InfoForm.controls?.['Name'].value;
    //this.Email = this.InfoForm.controls?.['Email'].value;
    this.formS = false;
  }
  show(){
    this.formS = !this.formS;
  }
  showForm(){
 
    return this.formS;

  }
  saveF(){
    this.infoSer.putinfo(this.InfoForm.controls?.['Name'].value,this.Email).subscribe((i)=>{
      this.Name = this.InfoForm.controls?.['Name'].value;
      //this.Email = this.InfoForm.controls?.['Email'].value;
    },err=>{},()=>{
      this.formS = false;
    })
  }
  open(){
    this.dialog.open(DialogChangPassComponent,{
      
width:'320px'
,height:'400px'
    })
  }
}
