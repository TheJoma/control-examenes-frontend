import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route } from '@angular/router';
import { ExamenDto } from 'src/app/model/examen-dto';
import { PreguntaDto } from 'src/app/model/pregunta-dto';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit {
  
  examen:ExamenDto = new ExamenDto();
  pregunta:PreguntaDto = new PreguntaDto();

  constructor(
    private preguntaService:PreguntaService,
    private activeRoute:ActivatedRoute,
    private snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.examen.id = this.activeRoute.snapshot.params['id'];
    this.examen.titulo = this.activeRoute.snapshot.params['titulo'];
    this.pregunta.examen = this.examen;    
    
  }

  agregarPregunta():void{
    this.preguntaService.guardarPregunta(this.pregunta).subscribe(
      data => {
        Swal.fire('Pregunta guardada','La pregunta fue guardada exitosamente','success');
        this.pregunta.contenido = '';
        this.pregunta.opcion1 = '';
        this.pregunta.opcion2 = '';
        this.pregunta.opcion3 = '';
        this.pregunta.opcion4 = '';
        this.pregunta.respuesta = '';
      },
      err => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );
  }

}

