import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursoDto } from 'src/app/model/curso-dto';
import { ExamenDto } from 'src/app/model/examen-dto';
import { CursoService } from 'src/app/services/curso.service';
import { ExamenService } from 'src/app/services/examen.service';
import { MovedataService } from 'src/app/services/movedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit,OnDestroy {

  examen:ExamenDto = new ExamenDto();
  curso:CursoDto[] = [];
  subscription:Subscription|undefined;

  constructor(
    private examenService:ExamenService,
    private snack:MatSnackBar,
    private router:Router,
    private cursoService:CursoService,
    private moveDataService:MovedataService
  ) { }

  ngOnInit(): void {
    this.listarCursos();
    this.obtenerExamen();
  }

  listarCursos():void{
    this.cursoService.listarCursos().subscribe(
      data=>{
        this.curso = data;
      },
      err => {
        Swal.fire('Error','Error al obtener cursos'+err.error.message,'error');
      }
    );
  }

  actualizarExamen():void{
    this.examenService.actualizarExamen(this.examen).subscribe(
      data => {
        Swal.fire('Examen actualizado',data.message,'success');
        this.router.navigate(['/profesor/ver-examenes']);
      },
      err  => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );
  }

  obtenerExamen():void{
    this.subscription = this.moveDataService.getExamen().subscribe(
      data =>{
        console.log(data.examen);
        this.examen = data.examen;
      },
      err => {
        Swal.fire('Error','Error al cargar datos del examen','error');
      }
    );
  }

  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
