import { Directive, Input } from "@angular/core"
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms"

export function requiredCheckboxGroup(limit:number):ValidatorFn{
return(cltr:AbstractControl) =>{
    const selected = Object.values(cltr.value).filter(Boolean).length
   //console.log(selected)
    let is_valid = selected <= limit;
    if(is_valid){
        return null
    }
    return {limmit:{valid:false}}
}
}