import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authori = environment.auth;
  bearer = environment.bearer;

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let intReq = request;
    
    const token = this.tokenService.getToken();

    if(token != null){
      intReq = request.clone({
        headers: request.headers.set(this.authori,this.bearer+token)
      });
    }
    return next.handle(intReq);
  }
}

export const authInterceptorProviders = [{
  provide : HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi:true
}]
