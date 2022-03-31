import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[
    UserService
  ]
})
export class RegisterComponent implements OnInit {

  public page_title:string;
  public user: User;
  public status: string;

  constructor(
    private _userService:UserService
  ) {
    this.page_title = "Registro";
    this.user = new User(1,"","","","","ROLE_USER","");
    this.status = "";
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response=>{
        if(response.status==="success") {
          this.status = "success";
          console.log(this.user);
          form.reset();
        }
        else this.status = "error";
      },
      error=>{
        console.log(<any>error);
        this.status = "error";
      }
    );
  }

}
