import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class UserService{

  public url: string;
  public user: User;
  public identity: any;
  public token: any;

  constructor(
    public _http: HttpClient
  ){
    this.url = global.url;
    this.user = new User(1,"","","","","","");
  }

  prueba(){
    return "Hola mundo desde un servicio de angular";
  }

  register(user:any):Observable<any>{
    let json = JSON.stringify(user);
    let params = "json="+json;
    let headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");
    return this._http.post(this.url+"registrarse",params,{headers:headers});
  }

  signup(user:any,gettoken=false):Observable<any>{
    if(gettoken) user.gettoken = "true";
    let json = JSON.stringify(user);
    let params = "json="+json;
    let headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");
    return this._http.post(this.url+"iniciar_sesion",params,{headers:headers});
  }

  update(token:any, user:any):Observable<any>{
    let json = JSON.stringify(user);
    let params = "json="+json;
    let headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
                                    .set("Authorization",token);
    return this._http.put(this.url+"user/edit",params,{headers:headers});
  }

  getIdentity(){
    let identity = localStorage.getItem("identity");
    try {
      identity = JSON.parse(<string>identity);
    } catch (error) {
      identity = null;
    }
    if(identity && identity != "undefined") this.identity = identity;
    else this.identity = null;
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem("token");
    if(token && token!="undefined")this.token = token;
    else this.token = null;
    return this.token;
  }
}
