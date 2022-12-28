import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.css']
})
export class AddProfesorComponent implements OnInit {

  usuario:CreateUserDto = new CreateUserDto();

  constructor(
    private usuarioService:UsuarioService,
    private snack:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  guardarProfesor():void{
    this.usuarioService.guardarProfesor(this.usuario).subscribe(
      data => {
        Swal.fire('Profesor guardado',data.message,'success');
        this.router.navigate(['/admin/ver-profesores']);
      },
      err => {
        this.snack.open(err.error.message,'Error',{
          duration:3000
        });
      }
    );

  }

}
