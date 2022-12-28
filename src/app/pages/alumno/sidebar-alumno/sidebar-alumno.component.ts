import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoDto } from 'src/app/model/curso-dto';
import { CursoService } from 'src/app/services/curso.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar-alumno',
  templateUrl: './sidebar-alumno.component.html',
  styleUrls: ['./sidebar-alumno.component.css']
})
export class SidebarAlumnoComponent implements OnInit {

  curso:CursoDto[] = [];

  username:string = '';
  constructor(
    private cursoService:CursoService,
    private snack:MatSnackBar,
    private token:TokenService
  ) { }

  ngOnInit(): void {
    this.cargarCursos();
    this.username = this.token.getUsername();
  }

  cargarCursos():void{
    this.cursoService.listarCursos().subscribe(
      data=>{
        this.curso = data;
      },
      err => {
        this.snack.open('Error al cargar cursos','Error',{duration:3000});
      }
    );
  }

}
