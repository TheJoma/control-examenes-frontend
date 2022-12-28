import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginUserDto } from 'src/app/model/login-user-dto';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : LoginUserDto = new LoginUserDto();

  constructor(private  loginService:LoginService,
    private tokenService:TokenService,
    private snack:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.loginService.login(this.login).subscribe(
      data =>{
        this.tokenService.setToken(data.token);

        if(this.tokenService.getRoles()=='ADMIN'){
          this.router.navigate(['admin']);
          this.loginService.loginStatusSubject.next(true);
        
        } else if(this.tokenService.getRoles()=='PROFESOR'){
          this.router.navigate(['profesor']);
          this.loginService.loginStatusSubject.next(true);
        
        } else if(this.tokenService.getRoles()=='ALUMNO'){
          this.router.navigate(['alumno']);
          this.loginService.loginStatusSubject.next(true);
        }
        else {
          this.tokenService.logOut();
        }
      },
      err =>{
        this.snack.open(err.error.message,'Error',{
          duration:3000
        })
      }
    );

  }

}
