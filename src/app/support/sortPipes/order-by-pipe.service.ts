import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'orderBy' })
export class OrderByPipeService implements PipeTransform {

  constructor() { }

  transform(value: any[], sortKey: any,reverse:boolean) {
    if(reverse){
      return value.sort((a,b)=>{
        return (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) ? -1 : 1      
      }).reverse()  
    }
    return value.sort((a,b)=>{
      return (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) ? -1 : 1      
    })
  }
}
