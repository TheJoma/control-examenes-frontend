import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { MovedataService } from 'src/app/services/movedata.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-perfil-admin',
  templateUrl: './actualizar-perfil-admin.component.html',
  styleUrls: ['./actualizar-perfil-admin.component.css']
})
export class ActualizarPerfilAdminComponent implements OnInit,OnDestroy {

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

  actualizarAdmin():void{
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      data => {
        Swal.fire('Usuario Actualizado',data.message,'success');
        this.router.navigate(['/admin/perfil/'+this.usuario.username]);
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
        Swal.fire('Error','Error al cargar datos del admin','error');
      }
    );
  }

  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
