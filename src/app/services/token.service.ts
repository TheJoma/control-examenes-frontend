import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token:string):void{
    localStorage.setItem(TOKEN_KEY,token);
  }

  public getToken():string|null{
    return localStorage.getItem(TOKEN_KEY);
  }

  public logOut():boolean{
    localStorage.removeItem(TOKEN_KEY);
    return true;
  }

  public isLogged():boolean{
    let tokenStr = this.getToken();
    if(tokenStr == undefined || tokenStr == ''|| tokenStr == null){
      return false;
    }else{
      return  true;
    }
    
  }

  public getRoles():string{
    const token = this.getToken();
    const payload = token!.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if(roles.indexOf('ROLE_ADMIN') >= 0){
      return 'ADMIN';
    } else if (roles.indexOf('ROLE_PROFESOR') >= 0){
      return 'PROFESOR';
    }else if (roles.indexOf('ROLE_ALUMNO') >= 0){
    return 'ALUMNO';  
  }else{
    return '';
  }
  }

  public getNombre():string{
    if(this.isLogged()){
    const token = this.getToken();
    const payload = token!.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const nombre = values.nombre;    
    return nombre;
  }
  return '';
  }

  public getUsername():string{
    if(this.isLogged()){
    const token = this.getToken();
    const payload = token!.split(".")[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;    
    return username;
  }
  return '';
  }
}
