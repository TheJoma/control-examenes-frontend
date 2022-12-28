import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CursoDto } from 'src/app/model/curso-dto';
import { ExamenDto } from 'src/app/model/examen-dto';
import { CursoService } from 'src/app/services/curso.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit {

  curso:CursoDto[] = [];
  examen:ExamenDto = new ExamenDto();

  constructor(
    private examenService:ExamenService,
    private cursoService:CursoService,
    private snack:MatSnackBar,
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
      err=>{
        Swal.fire('Error','Eror al cargar cursos'+err.error.message,'error');
        
      }
    );
  }

  guardarExamen():void{
    if(this.examen.curso == null){
      this.snack.open("El Curso es requerido",'Aceptar',{
        duration :3000
      })
      return;
    }

    this.examenService.guardarExamen(this.examen).subscribe(
      data => {
        Swal.fire('Examen guardado',data.message,'success');
        this.router.navigate(['/profesor/ver-examenes']);
      },
      err => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );

  }

}
