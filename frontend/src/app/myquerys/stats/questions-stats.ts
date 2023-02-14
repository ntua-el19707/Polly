export interface QuestionsStats {
    qID:string ,
    qtext:string ,
    Stats:stats []
}
export interface stats{
    aid:string,
    atext:string,
    percentage:number,
    total:number,
    freq:number,

}