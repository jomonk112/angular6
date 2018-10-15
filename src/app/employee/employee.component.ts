import { Component, OnInit } from '@angular/core';

import { GlobalProvider } from "./../globalprovider";

import { Router} from "@angular/router";

import { EmployeeService } from "../employee.service";

import { Response } from './../response';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  listData=[];

  page=1;
  limit=8;
  totalCount=0;
  search_data={};
  sortby="name";
  order="asc";
  constructor(public global: GlobalProvider,private router:Router,private employeeService: EmployeeService) {
    //this.global.isGuest=false;
    this.global.currentPage='employees';

    if(this.global.isGuest){
      console.log("Guest");
      this.router.navigate(['login']);
    }

     
  }

  ngOnInit() {
    this.list();
  }
  search(){
    console.log(this.search_data);
    this.listData=[];
    this.page=1;
    this.list();
    
  }
  sort(sortby) {
    this.sortby=sortby;
    if(this.order=='asc'){
      this.order='desc';
    }else {
      this.order='asc';
    }
    this.listData=[];
    this.page=1;
    this.list();
  }
  deleteEmployee(id) {

        this.employeeService.delete(id).subscribe(
          (response: Response) => { 
            console.log("Deleted");
            console.log(response);
            this.list();
            
          }
      );

  }
  loadMore() {
    this.page++;
    this.list();
  }
  
  list() {
    console.log("page:"+this.page);
    console.log("Sort by:"+this.sortby+" "+this.order);

    this.employeeService.list(this.search_data,this.page,this.limit,this.sortby,this.order)
    .subscribe(

      (response:Response) => {

          console.log(response);
          this.listData=this.listData.concat(response.data);
          this.totalCount=response.totalCount;
          
      },
      (err) => {
          console.log(err);

      },
      () => {
          //Completed

      }
     );

  }



}
