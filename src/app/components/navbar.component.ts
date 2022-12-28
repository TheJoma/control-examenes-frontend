import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  nombre:string;
  test:string;
  username:string;

  constructor(private tokenService:TokenService,
    private loginService : LoginService) { }

  ngOnInit(): void {
    
    
  this.isLoggedIn = this.tokenService.isLogged();
  this.nombre = this.tokenService.getNombre();
  this.username = this.tokenService.getUsername();
  if(this.isLoggedIn){
    this.test= this.roles();
  }


    this.loginService.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.tokenService.isLogged();
        this.nombre = this.tokenService.getNombre();
        this.test = this.roles();
        this.username = this.tokenService.getUsername();
      }
    );

  }

  public logOut(){
    this.tokenService.logOut();
    window.location.reload();
  }

  roles():string{
    if(this.tokenService.getRoles() == 'ADMIN'){
    return 'admin';
    }else if(this.tokenService.getRoles() == 'PROFESOR'){
      return 'profesor';
    }else if(this.tokenService.getRoles() == 'ALUMNO'){
      return 'alumno';    
    }else{
      return '';
    }
    
  }

}
