import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovedataService } from 'src/app/services/movedata.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar-profesor',
  templateUrl: './sidebar-profesor.component.html',
  styleUrls: ['./sidebar-profesor.component.css']
})
export class SidebarProfesorComponent implements OnInit {
  
  username:string = '';

  constructor(
    private token:TokenService
  ) { }

  ngOnInit(): void {
    this.username = this.token.getUsername();
  }



  logOut():void{
    this.token.logOut();
    window.location.reload();
  }

}
