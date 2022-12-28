import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username:string = '';

  constructor(private token:TokenService) { }

  ngOnInit(): void {
    this.username = this.token.getUsername();
  }

  logOut():void{
    this.token.logOut();
    window.location.reload();
  }

}
