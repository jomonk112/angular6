import { Component, OnInit } from '@angular/core';

import { GlobalProvider } from "./../globalprovider";

import { LoginForm } from '../loginform';


import { UserService } from "../user.service";

import { Router} from "@angular/router";

import { Response } from './../response';

import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginform: LoginForm  = {
    username: '',
    password: '',
  };
  errors={};

  constructor(public global: GlobalProvider,private userService: UserService,private router:Router,private cookieService: CookieService) {

    if(!this.global.isGuest){
      this.router.navigate(['employees']);
    }
    this.global.currentPage='login';

  }

  ngOnInit() {

  }

  
  login(loginform:LoginForm ): void {

    console.log("Inside Login Function");

    this.userService.authorize(loginform)
    .subscribe(

      (response:Response) => {

          console.log(response);
          console.log("Auth Code:"+response.data.authorization_code);
          this.accessToken(response.data.authorization_code);
          
      },
      (err) => {

        this.errors=err.error.errors;
          console.log(this.errors);

      },
      () => {
        //Completed

      }
  );

  }

  accessToken(authcode):void {

    this.userService.accesstoken(authcode)
                  .subscribe(

                    (response:Response) => {
            
                      console.log(response);
            
                       // let expires_at=response.data.expires_at.replace("T", " ");
                        this.cookieService.set('accesstoken', response.data.access_token,new Date(response.data.expires_at),"/");
            
                        this.global.isGuest=false;
                        /*
                        if(this.cookieService.check('accesstoken')){
                            this.global.isGuest=false;
                        }else {
                            this.global.isGuest=true;
                        }
                         */
        
                        this.userinfo(response.data.access_token);
      
                    },
                    (err) => {
                      console.log(err);
            
                    },
                    () => {
                      //Completed
            
                    }
                );

  }
  userinfo(accesstoken) :void {
    this.userService.userinfo(accesstoken)
    .subscribe(

      (response:Response) => {
          console.log(response);
          this.cookieService.set( 'username', response.data.username );
          this.global.username=this.cookieService.get('username');
          this.router.navigate(['employees']);
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
