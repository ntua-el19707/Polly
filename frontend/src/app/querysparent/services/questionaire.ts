
import { Destoyqandop } from "src/app/service/destoyqandop";
import { Keywords } from "./keywords";
import { Questions } from "./questions";

export interface Questionaire {
    questionnaireID: string,
    questionnaireTitle:string,
    creator: string,
    apid?: number,
    questions: Questions[],
    keywords?: Keywords[],
    destroy?:Destoyqandop
   
   
  
}

