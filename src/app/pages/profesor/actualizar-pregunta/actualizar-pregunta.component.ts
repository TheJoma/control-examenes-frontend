import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PreguntaDto } from 'src/app/model/pregunta-dto';
import { MovedataService } from 'src/app/services/movedata.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css']
})
export class ActualizarPreguntaComponent implements OnInit,OnDestroy {

  pregunta:PreguntaDto = new PreguntaDto();

  subscription:Subscription|undefined;

  constructor(
    private preguntaService : PreguntaService,
    private router:Router,
    private snack:MatSnackBar,
    private moveDataService:MovedataService

  ) { }

  ngOnInit(): void {
    this.obtenerExamen();
  }

  actualizarPregunta():void{
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe(
      data => {
        Swal.fire('Pregunta guardada',data.message,'success');
        this.router.navigate(['/profesor/ver-preguntas/'+this.pregunta.examen.id+'/'+this.pregunta.examen.titulo]);
      },
      err => {
        this.snack.open(err.error.message,'Error',{duration:3000});
      }
    );
  }

  obtenerExamen():void{
    this.subscription = this.moveDataService.getPregunta().subscribe(
      data => {
        this.pregunta = data.pregunta;
      },
      err => {
        Swal.fire('Error','Error al cargar pregunta','error');
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
