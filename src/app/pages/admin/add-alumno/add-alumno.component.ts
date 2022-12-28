import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.css']
})
export class AddAlumnoComponent implements OnInit {

  usuario:CreateUserDto = new CreateUserDto();

  constructor(
    private usuarioService:UsuarioService,
    private snack:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
  }


  guardarAlumno():void{
    this.usuarioService.guardarAlumno(this.usuario).subscribe(
      data => {
        Swal.fire('Alumno guardado',data.message,'success');
        this.router.navigate(['/admin/ver-alumnos']);
      },
      err => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );    
  }

}
