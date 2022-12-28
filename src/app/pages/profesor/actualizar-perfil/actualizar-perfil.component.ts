import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { MovedataService } from 'src/app/services/movedata.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-perfil',
  templateUrl: './actualizar-perfil.component.html',
  styleUrls: ['./actualizar-perfil.component.css']
})
export class ActualizarPerfilComponent implements OnInit,OnDestroy {

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

  actualizarProfesor():void{
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      data => {
        Swal.fire('Usuario Actualizado',data.message,'success');
        this.router.navigate(['/profesor/perfil/'+this.usuario.username]);
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
        Swal.fire('Error','Error al cargar datos del profesor','error');
      }
    );
  }

  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
