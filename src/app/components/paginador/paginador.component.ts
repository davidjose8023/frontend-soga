import {  Component , Input , OnChanges , Output , EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styles: []
})
export class PaginadorComponent implements OnChanges{  
  @Input() totalRecords: number = 0;  
  @Input() recordsPerPage: number = 0;  

  @Output() onPageChange: EventEmitter<any> = new EventEmitter();  

  public pages: number [] = [];  
  @Input() activePage:number = 1;  
  @Input() direccion:any = false;  

  ngOnChanges(changes: SimpleChanges){  

    const pageCount = this.getPageCount();  
    this.pages = this.getArrayOfPage(pageCount);
    if(changes.firstChange){
      this.onPageChange.emit({activePage:1, direccion: false}); 
    }

    if(changes.previousValue != changes.currentValue){

        
   
      //this.onPageChange.emit(1);  
      this.onPageChange.emit({activePage:this.activePage, direccion: this.direccion});  
    }
  }  

  private  getPageCount(): number {  
    let totalPage:number = 0;  
      
    if(this.totalRecords > 0 && this.recordsPerPage > 0){  
      const pageCount = this.totalRecords / this.recordsPerPage;  
      const roundedPageCount = Math.floor(pageCount);  

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
    }  

    return totalPage;  
  }  

  private getArrayOfPage(pageCount : number) : number [] {  
    let pageArray : number [] = [];  

    if(pageCount > 0){  
        for(var i=1 ; i<= pageCount ; i++){  
          pageArray.push(i);  
        }  
    }  

    return pageArray;  
  }  

  //onClickPage(pageNumber:number){  
  onClickPage(pageNumber:number, direccion:string){  
      if(pageNumber < 1) return;
      if(pageNumber > this.pages.length) return;
      this.activePage = pageNumber;  
      //this.onPageChange.emit({activePage:this.activePage, flechas});  
      this.onPageChange.emit({activePage:this.activePage, direccion});  
  }  
}  