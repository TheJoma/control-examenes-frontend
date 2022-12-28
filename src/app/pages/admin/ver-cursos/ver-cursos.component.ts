import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CursoDto } from 'src/app/model/curso-dto';
import { CursoService } from 'src/app/services/curso.service';
import { MovedataService } from 'src/app/services/movedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-cursos',
  templateUrl: './ver-cursos.component.html',
  styleUrls: ['./ver-cursos.component.css']
})
export class VerCursosComponent implements OnInit {

  curso:CursoDto[] =[];

  constructor(
    private cursoService:CursoService,
    private snack:MatSnackBar,
    private moveDataService:MovedataService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos():void{
    this.cursoService.listarCursos().subscribe(
      data =>{
        this.curso = data;
      },
      err =>{
        this.snack.open(err.error.message,'Error',{
          duration:3000
        });
      }
      );
  }

  eliminarCurso(id:number):void{
    Swal.fire({
      title:'Eliminar Curso',
      text:'¿Estas seguro de eliminar el curso?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor :'#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText:'cancelar'
    }).then((result)=>{
      if(result.isConfirmed){          
    this.cursoService.eliminarCurso(id).subscribe(
      data => {
        this.listarCursos();
        Swal.fire('Curso eliminado',data.message,'success');
      },
      err => {
        this.snack.open(err.error.message,'Error',{
          duration:3000
        });
      }
    );
        }
      }
    );
  }

  moverCurso(curso:CursoDto):void{
    this.moveDataService.sendObject(curso);
    this.router.navigate(['/admin/actualizar-curso']);
  }

}
