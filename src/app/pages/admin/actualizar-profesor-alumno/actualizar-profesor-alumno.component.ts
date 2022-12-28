import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MovedataService } from 'src/app/services/movedata.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-profesor-alumno',
  templateUrl: './actualizar-profesor-alumno.component.html',
  styleUrls: ['./actualizar-profesor-alumno.component.css']
})
export class ActualizarProfesorAlumnoComponent implements OnInit,OnDestroy {

  usuario:CreateUserDto =  new CreateUserDto();
  subscription:Subscription|undefined;
  rol:[] = [];

  test:string;

  constructor(
    private usuarioService:UsuarioService,
    private moveDataService:MovedataService,
    private router:Router,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  actualizarDatos():void{
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      data => {
        Swal.fire('Usuario Actualizado',data.message,'success');
        this.rol.forEach((p:any) =>{
          this.test = p['name'];
        });
        if(this.test == "ROLE_ALUMNO"){
          this.router.navigate(['/admin/ver-alumnos/']);
        }
        if(this.test == "ROLE_PROFESOR"){
          this.router.navigate(['/admin/ver-profesores/']);
        }
        
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
        this.rol = data.usuario.roles;
        console.log(this.rol);
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
