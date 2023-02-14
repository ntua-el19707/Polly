import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questionaire } from 'src/app/querysparent/services/questionaire';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataInsertService {
  private ulr = environment.urladmin + '/questionnaire_upd';
  constructor(private http:HttpClient) { }
  update(id:number,data:any):Observable<any>{
    return this.http.put(`${this.ulr}/${id}`,data);
  }
  insertsenario(senario:Questionaire){
    /*const senario = {
      "questionnaireID": "QQ000",
      "questionnaireTitle": "My first research questionnaire",
      "keywords": [
      "footbal",
      "islands",
      "timezone"
      ],"user":"madara@root.com",
      "questions": [
      {
      "qID": "Q00",
      "qtext": "Ποιο είναι το mail σας;",
      "required": "FALSE",
      "type": "profile",
      "options": [
      {
      "optID": "Q00TXT",
      "opttxt": "<open string>",
      "nextqID": "Q01"
      }
      ]
      },
      {
      "qID": "Q01",
      "qtext": "Ποια είναι η ηλικία σας;",
      "required": "TRUE",
      "type": "profile",
      "options": [
      {
      "optID": "Q01A1",
      "opttxt": "<30",
      "nextqID": "Q02"
      },
      {
      "optID": "Q01A2",
      "opttxt": "30-50",
      "nextqID": "Q02"
      },
      {
      "optID": "Q01A3",
      "opttxt": "50-70",
      "nextqID": "Q02"
      },
      {
      "optID": "Q01A4",
      "opttxt": ">70",
      "nextqID": "Q02"
      }
      ]
      },
      {
      "qID": "Q02",
      "qtext": "Ποιο είναι το αγαπημένο σας χρώμα;",
      "required": "TRUE",
      "type": "question",
      "options": [
      {
      "optID": "Q02A1",
      "opttxt": "Πράσινο",
     
      "nextqID": "Q03"
      },
     
     {
      "optID": "Q02A2"
     ,
      "opttxt":"Κόκκινο"
     ,
      "nextqID": "Q03"
      },
     
     {
      "optID": "Q02A3"
     ,
      "opttxt":
     "Κίτρινο"
     ,
      "nextqID": "Q03"
     
     }
     
     ]
      },
     
     {
      "qID": "Q03"
     ,
      "qtext":
     "Ασχολείστε με το ποδόσφαιρο;"
     ,
      "required": "TRUE"
     ,
      "type": "question"
     ,
      "options": [
     
     {
      "optID": "Q03A1"
     ,
      "opttxt":"Ναι",
      "nextqID": "Q04"
      },
     
     {
      "optID": "Q03A2"
     ,
      "opttxt":
     "Οχι"
     ,
      "nextqID": "Q05"
     
     }
     
     ]
      },
     
     {
      "qID": "Q04"
     ,
      "qtext":
     "Τι ομάδα είστε;"
     ,
      "required": "TRUE"
     ,
      "type": "question"
     ,
      "options": [
     
     {
      "optID": "Q04A1"
     ,
      "opttxt":"Παναθηναϊκός"
     ,
      "nextqID": "Q05"
      },
     
     {
      "optID": "Q04A2"
     ,
      "opttxt":
     "Ολυμπιακός "
     ,
      "nextqID": "Q05"
      },
     
     {
      "optID": "Q04A3"
     ,
      "opttxt":
     "ΑΕΚ"
     ,
      "nextqID": "Q05"
     
     }
     
     ]
      },
     
     {
      "qID": "Q05"
     ,
      "qtext":
     "Έχετε ζήσει σε νησί;"
     ,
      "required": "TRUE"
     ,
      "type": "question"
     ,
      "options": [
     
     {
      "optID": "Q05A1"
     ,
      "opttxt":
     "Ναι"
     ,
      "nextqID": "Q06"
      },
     
      {
      "optID": "Q04A2",
      "opttxt": "Οχι",
      "nextqID": "Q07"
      }
      ]
      },
      {
      "qID": "Q06",
      "qtext": "Με δεδομένο ότι απαντήσατε [*Q04A1] στην ερώτηση [*Q04]: Ποια ησχέση σας με το θαλάσσιο σκι;",
      "required": "TRUE",
      "type": "question",
      "options": [
      {
      "optID": "Q06A1",
      "opttxt": "Καμία",
      "nextqID": "Q08"
      },
      {
      "optID": "Q06A2",
      "opttxt": "Μικρή",
      "nextqID": "Q08"
      },
      {
      "optID": "Q06A3",
      "opttxt": "Μεγάλη",
      "nextqID": "Q08"
      }
      ]
      },
      {
      "qID": "Q07",
      "qtext": "Είστε χειμερινός κολυμβητής",
      "required": "TRUE",
      "type": "question",
      "options": [
      {
      "optID": "Q07A1",
      "opttxt": "Ναι",
      "nextqID": "Q08"
      },
      {
      "optID": "Q07A2",
      "opttxt": "Οχι",
      "nextqID": "Q08"
      }
      ]
      },
      {
      "qID": "Q08",
      "qtext": "Κάνετε χειμερινό σκι;",
      "required": "TRUE",
      "type": "question",
      "options": [
      {
      "optID": "Q08A1",
      "opttxt": "Σπάνια - καθόλου",
      "nextqID": "Q09"
      },
      {
      "optID": "Q08A2",
      "opttxt": "Περιστασιακά",
      "nextqID": "Q09"
      },
      {
      "optID": "Q08A3",
      "opttxt": "Τακτικά",
      "nextqID": "Q09"
      }
      ]
      },
      {
      "qID": "Q09",
      "qtext": "Συμφωνείτε να αλλάζει η ώρα κάθε χρόνο;",
      "required": "TRUE",
      "type": "question",
      "options": [
      {
      "optID": "Q09A1",
      "opttxt": "Ναι",
      "nextqID": "Q10"
      },
      {
      "optID": "Q09A2",
      "opttxt": "Οχι",
      "nextqID": "-"
      }
      ]
      },
      {
      "qID": "Q10",
      "qtext": "Με δεδομένο ότι απαντήσατε [*Q08A2] στην ερώτηση [*Q08]: Προτιμάτετη θερινή ή την χειμερινή ώρα;",
      "required": "TRUE",
      "type": "question",
      "options": [
      {
      "optID": "Q09A1",
      "opttxt": "Θερινή",
      "nextqID": "-"
      },
      {
      "optID": "Q09A2",
      "opttxt": "Χειμερινή",
      "nextqID": "-"
      }
      ]
      }
      ]
     }*/
     return this.http.post(this.ulr,senario);
  }
  private urlQuestions = environment.urladmin +'/QuestionMangment';
  public sendquestion(poll_id,question):Observable<any>{
    const json = {
      questions:question,
      poll_id:poll_id}
    return this.http.post(this.urlQuestions,json)
  }
  updatequestion(poll_id,question){
    const json = {
      question:question
    }
    return this.http.put(`${this.urlQuestions}/${poll_id}`,json);
  }
  private optionsurl = environment.urladmin+ '/options';
  updateoption(poll_id,option,question_id):Observable<any>{
    const body ={
      options:option
    }
   return  this.http.put(`${this.optionsurl}/${poll_id}/${question_id}`,body)
  }
  createOption(poll_id,option,question_id):Observable<any>{
    const body ={
      options:option
    }
   return  this.http.post(`${this.optionsurl}/${poll_id}/${question_id}`,body)
  }
  destroy(destroy):Observable<any>{
    console.log(destroy)
    return this.http.delete(this.optionsurl,destroy);
      
  }
}
