import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {

  nombre:string = '';

  constructor(
    private tokenService:TokenService
  ) { }

  ngOnInit(): void {

    this.nombre = this.tokenService.getNombre();
  }

}
