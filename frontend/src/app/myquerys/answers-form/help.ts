/*ngOnInit(): void {
    this.FormOptions =  this.fb.group({opttext:this.option.opttext,optnext:this.option.nextqid})
 
   }
   private edit(){
    // console.log(this.FormOptions.controls?.['opttext'].value)
       this.questionarie.questions.forEach(el => {
       if(el === this.questions){
        if(el.options.length === 0){
         el.options = [{aID:this.option.qid +'A'+this.option.optId.toString(),atext:this.FormOptions.controls?.['opttext'].value,nextQID:this.option.nextqid}];
        }
        else  if(el.options.length<this.option.optId -2){
           el.options = [...el.options, {aID:this.option.qid +'A'+this.option.optId.toString(),atext:this.FormOptions.controls?.['opttext'].value,nextQID:this.option.nextqid}];
         }else{
         el.options[this.option.optId-1] =  {aID:this.option.qid +'A'+this.option.optId.toString(),atext:this.FormOptions.controls?.['opttext'].value,nextQID:this.option.nextqid};
       }}
     });
     console.log(this.questionarie)
     this.questionarieChange.emit(this.questionarie);
   }
   stillWriting(event:any){
     clearTimeout(this.timeout);
     this.timeout = setTimeout( () => {
    
       this.edit();
       
     }, 1000);
   }
   getquestions(){
     
     let q:Questions [] = [{qID:'-',qtext:'',required:'',type:''}] ;
     this.questionarie.questions.forEach(el=>{
       if(el != this.questions){
         q = [...q,el];
       }
     })
     return q;
   }
   nextQID(){
     let next = this.FormOptions.controls?.['optnext'].value
     this.questionarie.questions.forEach(el => {
       if(el === this.questions){
        if(el.options.length === 0){
         el.options = [{aID:this.option.qid +'A'+this.option.optId.toString(),atext:this.option.opttext,nextQID:this.FormOptions.controls?.['optnext'].value}];
        }
        else  if(el.options.length<this.option.optId -2){
           el.options = [...el.options, {aID:this.option.qid +'A'+this.option.optId.toString(),atext:this.option.opttext,nextQID:this.FormOptions.controls?.['optnext'].value}];
         }else{
         el.options[this.option.optId-1] =  {aID:this.option.qid +'A'+this.option.optId.toString(),atext:this.option.opttext,nextQID:this.FormOptions.controls?.['optnext'].value};
       }}
     });
     console.log(this.questionarie)
     this.questionarieChange.emit(this.questionarie);
   }
 notlast(){
 
   if(this.questions.options.length === this.option.optId){
     return false;
   }
   return true
 }
 private fixed(){
   this.questionarie.questions.forEach(q=>{
     if(q === this.questions){
       q.options.forEach(o=>{
         let split =  o.aID.split('A');
         let id = parseInt(split[1]);
         if(id >this.option.optId){
           --id;
           o.aID = this.questions.qID + 'A' +id;
         } 
       })
     }
   })
   this.options.forEach(o=>{
     if(o.optId > this.option.optId){
        --o.optId;
     }
   })
   console.log(this.questionarie)
 }
 pop(){
   this.removeItemOnce(this.option.optId-1);
   this.fixed();
   this.questionarieChange.emit(this.questionarie)
   this.optionsChange.emit(this.options)
 }
 private removeItemOnce( index:number) {
   this.questionarie.questions.forEach(q=>{
     if(q === this.questions){
     
       console.log(index)
 
       if (index > -1) {
         q.options.splice(index, 1);
       }
       
     }
 
   })
   if(index >-1){
     this.options.splice(index,1)
   }
   this.questionarieChange.emit(this.questionarie);
 
 }
 }*/