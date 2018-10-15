import { Component, OnInit,Input } from '@angular/core';

import { GlobalProvider } from "./../globalprovider";

import { User } from '../user';

import { UserService } from "../user.service";


import { Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    user: User = {
        username: '',
        email: '',
        password: ''
    };
    errors={};

    constructor(public global: GlobalProvider,private userService: UserService,private router:Router) {

    this.global.currentPage='signup';

       if(!this.global.isGuest){
            this.router.navigate(['employees']);
        }


  }

  ngOnInit() {
  }

    createUser(user:User): void {

        console.log("Inside Create User Function");

       // this.userService.create(user);

        this.userService.create(user).subscribe(
            (response: Response) => { 
              console.log(response);
              this.router.navigate(['login']);
            
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
