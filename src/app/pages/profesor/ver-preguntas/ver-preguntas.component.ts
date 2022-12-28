import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenDto } from 'src/app/model/examen-dto';
import { PreguntaDto } from 'src/app/model/pregunta-dto';
import { MovedataService } from 'src/app/services/movedata.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-preguntas',
  templateUrl: './ver-preguntas.component.html',
  styleUrls: ['./ver-preguntas.component.css']
})
export class VerPreguntasComponent implements OnInit {

  examen:ExamenDto= new ExamenDto();
  preguntas:PreguntaDto[] = [];

  constructor(
    private preguntaService:PreguntaService,
    private activatedRoute :ActivatedRoute,
    private snack:MatSnackBar,
    private moveDataService:MovedataService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.examen.id = this.activatedRoute.snapshot.params['id'];
    this.examen.titulo = this.activatedRoute.snapshot.params['titulo'];
    this.listarPreguntasXExamen();

  }

  listarPreguntasXExamen():void{
    this.preguntaService.listarPreguntasDelExamen(this.examen.id).subscribe(
      data=> {
        this.preguntas = data;
      },
      err => {
        this.snack.open('Error','Error al listar examenes',{duration:3000});
      }
    );
  }

  eliminarPregunta(id:number):void{
    
  Swal.fire({
    title:'Eliminar examen',
    text: '¿Estas seguro de eliminar el examen?',
    icon: 'warning',
    showCancelButton:true,
    confirmButtonColor :'#3085d6',
    cancelButtonColor : '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText:'cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
  
      this.preguntaService.eliminarPregunta(id).subscribe(
        data => {
          Swal.fire('Pregunta eliminada',data.message,'success');
          this.preguntas = this.preguntas.filter((lista:any) => lista.id != id );  
        },
        err => {
          Swal.fire('Error','Error al eliminar pregunta','error');
        }
      );
      }
  });
   
  }

  moverPregunta(pregunta:PreguntaDto):void{
    console.log(pregunta);
    this.moveDataService.sendPregunta(pregunta);
    this.router.navigate(['/profesor/actualizar-pregunta']);
  }



}
