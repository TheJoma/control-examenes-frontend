import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursoDto } from 'src/app/model/curso-dto';
import { CursoService } from 'src/app/services/curso.service';
import { MovedataService } from 'src/app/services/movedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-curso',
  templateUrl: './actualizar-curso.component.html',
  styleUrls: ['./actualizar-curso.component.css']
})
export class ActualizarCursoComponent implements OnInit,OnDestroy {

  curso:CursoDto = new CursoDto();

  subscription:Subscription|undefined;

  constructor(
    private cursoService:CursoService,
    private snack:MatSnackBar,
    private router:Router,
    private moveDataService:MovedataService
  ) { }
 

  ngOnInit(): void {
    this.obtenerProducto();
  }

  actualizarCurso():void{
    this.cursoService.actualizarCurso(this.curso).subscribe(
      data => {
        Swal.fire('Curso Actualizado',data.message,'success');
        this.router.navigate(['/admin/ver-cursos']);
      },
      err => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );

  }

  obtenerProducto():void{
    this.subscription =this.moveDataService.getObject().subscribe(
      data =>{
        this.curso = data.curso;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
