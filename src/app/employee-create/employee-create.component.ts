import { Component, OnInit } from '@angular/core';

import { Router} from "@angular/router";

import { EmployeeService } from "../employee.service";

import { Response } from './../response';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employee={};
  errors={};

  constructor(private employeeService: EmployeeService,private router:Router) { }

  ngOnInit() {
  }
  create(employee) {
    console.log(employee);

    this.employeeService.create(employee).subscribe(
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
