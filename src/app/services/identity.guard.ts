import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class IdentityGuard implements CanActivate{
  constructor(
    private _router: Router,
    private _userService: UserService
  ){

  }

  canActivate():any{
    let identity = this._userService.getIdentity();
    if(identity) return true;
    if(!identity){
      this._router.navigate(["/iniciar_sesion"]);
      return false;
    }
  }
}
