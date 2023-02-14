import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function matchpass(src:string,dst:string):ValidatorFn{

    return(cltr:AbstractControl) =>{
        const sourceCtrl = cltr.get(src);
        const dstCtrl = cltr.get(dst);
        
        let is_valid = true ;
        const pass1 = sourceCtrl.value as string ;
        const pass2 = dstCtrl.value as string ;
        
      //  console.log(`pass1:${pass1}, pass2:${pass2}\n`)
        //validation 
        if(pass1.length < pass2.length){
            is_valid = false ;
        }
        else if(pass2.length !=0 ){
            for( let i = 0 ;i<pass1.length;i++){
                if(i<pass2.length){
                  if(pass1[i] != pass2[i]){
                    is_valid = false;
                    //console.log("true")
                    break ;
                }}
            }
        }
        
        if(is_valid){
            return null
        }
        return {matching:{valid:false}}
    }
    }
    