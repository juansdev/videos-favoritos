import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[
    UserService
  ]
})
export class LoginComponent implements OnInit {

  public page_title:string;
  public user: User;
  public token: any;
  public status: string;
  public identity: any;

  constructor(
    private _userService:UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = "Iniciar sesión";
    this.user = new User(1,"","","","","ROLE_USER","");
    this.status = "";
    this.identity = "";
    this.token = "";
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form:any){
    //SACAR IDENTITY
    this._userService.signup(this.user).subscribe(
      response=>{
        if(response.status !== 'error') {
          this.status = "success";
          this.identity = response;
          //SACAR TOKEN
          this._userService.signup(this.user,true).subscribe(
            response=>{
              if(response.status !== 'error') {
                this.status = "success";
                this.token = response;
                localStorage.setItem("token",this.token);
                localStorage.setItem("identity",JSON.stringify(this.identity));
                this._router.navigate(["/inicio"]);
              }
              else this.status = "error";
            },
            error=>{
              console.log(<any>error);
              this.status = "error";
            }
          );
        }
        else this.status = "error";
      },
      error=>{
        console.log(<any>error);
        this.status = "error";
      }
    );
  }

  logout(){
    this._route.params.subscribe(
      params=>{
        let sure = +params["sure"];
        if(sure){
          localStorage.removeItem("identity");
          localStorage.removeItem("token");
          this.identity = null;
          this.token = null;
          this._router.navigate(["/inicio"]);
        }
      }
    );
  }

}
