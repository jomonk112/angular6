import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";

import { EmployeeService } from "../employee.service";

import { Response } from './../response';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employee={};
  errors={};
  constructor(private route: ActivatedRoute,private employeeService: EmployeeService,private router:Router) { 
    this.route.params.subscribe( params => console.log(params) );
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      if(params.id){
      
        this.employeeService.view(params.id).subscribe(
           (response: Response) => { 
             console.log(response);
             this.employee=response.data;

           }
        );
        
        
      }
    
    } );
  }
  save(employee) {
    console.log(employee);

    this.employeeService.save(employee).subscribe(
      (response: Response) => { 
        console.log(response);
        this.employee=response.data;
        this.router.navigate(['/employees/'+response.data.id]);

      },
      (err) => {

        this.errors=err.error.errors;

      },
      () => {
        //Completed

      }
      
   );

  }
}
