import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { MovedataService } from 'src/app/services/movedata.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  usuario:CreateUserDto = new CreateUserDto();
  username:string;

  constructor(
    private usuarioService:UsuarioService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private moveDataService:MovedataService
  ) { }

  ngOnInit(): void {

    this.username = this.activatedRoute.snapshot.params['username'];
    this.obtenerUsuario();
  }


  obtenerUsuario():void{
    this.usuarioService.obtenerUsuario(this.username).subscribe(
      data => {
        this.usuario = data;
      },
      err => {
        Swal.fire('Error','Error al cargar datos de usuario','error');
        console.log(err);
      }
    );
  }

  moveData(usuario:CreateUserDto):void{
    this.moveDataService.sendUsuario(usuario);
    this.router.navigate(['/profesor/actualizar-perfil']);
  }

}
