import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { MovedataService } from 'src/app/services/movedata.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actualizar-perfil-alumnon',
  templateUrl: './actualizar-perfil-alumnon.component.html',
  styleUrls: ['./actualizar-perfil-alumnon.component.css']
})
export class ActualizarPerfilAlumnonComponent implements OnInit,OnDestroy {

  usuario:CreateUserDto =  new CreateUserDto();
  subscription:Subscription|undefined;

  constructor(
    private usuarioService:UsuarioService,
    private moveDataService:MovedataService,
    private router:Router,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  actualizarAlumno():void{
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      data => {
        Swal.fire('Usuario Actualizado',data.message,'success');
        this.router.navigate(['/alumno/perfil/'+this.usuario.username]);
      },
      err => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );
  }


  obtenerUsuario():void{
    this.subscription = this.moveDataService.getExamen().subscribe(
      data => {
        this.usuario = data.usuario;
        this.usuario.password = '';
      },
      err => {
        Swal.fire('Error','Error al cargar datos del alumno','error');
      }
    );
  }

  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
