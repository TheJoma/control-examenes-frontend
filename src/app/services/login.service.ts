import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtTokenDto } from '../model/jwt-token-dto';
import { LoginUserDto } from '../model/login-user-dto';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject  = new Subject<boolean>();

  url = environment.apiBaseURL;

  constructor(
    private httpClient:HttpClient
  ) { }


  public login(dto:LoginUserDto):Observable<JwtTokenDto>{
    return this.httpClient.post<JwtTokenDto>(this.url+'/auth/login',dto);
  }
}
