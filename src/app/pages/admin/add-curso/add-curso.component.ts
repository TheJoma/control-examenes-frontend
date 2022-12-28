import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CursoDto } from 'src/app/model/curso-dto';
import { CursoService } from 'src/app/services/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  curso:CursoDto = new CursoDto();

  constructor(
    private cursoService:CursoService,
    private snack : MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  guardarCurso():void{
    this.cursoService.guardarCurso(this.curso).subscribe(
      data => {
        Swal.fire('Curso guardado',data.message,'success');
        this.router.navigate(['/admin/ver-cursos']);
      },
      err => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );

  }

}
