import { typeQ } from "src/app/myquerys/type-q";
import { Options } from "./options";

export interface Questions {
    qID:string,
    qtext:string,
    type:string,
    required:string,
    actualid?:number,
    options?:Options[],
    answer?:any[];
    previous?:Questions,
    showall?:boolean,
    typeO?:typeQ;

}

export interface Answer{
    qID:string,
  
}