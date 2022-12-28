import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreguntaDto } from 'src/app/model/pregunta-dto';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empezar-examen',
  templateUrl: './empezar-examen.component.html',
  styleUrls: ['./empezar-examen.component.css']
})
export class EmpezarExamenComponent implements OnInit {


  preguntas:PreguntaDto[] = [];
  timer:any;
  examenid:number;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;
  esEnviado = false;


  constructor(
    private locationSt:LocationStrategy,
    private preguntaService:PreguntaService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.prevenirBotonRetroceso();
    this.examenid = this.activatedRoute.snapshot.params['id'];
    this.cargarPreguntas();
  } 

  cargarPreguntas():void{
    this.preguntaService.listarPreguntasDelExamen(this.examenid).subscribe(
      data=> {
        this.preguntas = data;
        this.timer = this.preguntas.length*2*60;
        this.preguntas.forEach((p:any) => {
          p['respuestaDada'] ='';
        });
        this.iniciarTemporizador();

      },
      err => {
          Swal.fire('Error','Error al cargar las preguntas del examen','error');
      }
    );
  }

  iniciarTemporizador():void{
    let tiempo = window.setInterval(() =>{
      if(this.timer<=0){
        this.evaluarExamen();
        clearInterval(tiempo);
      }else{
        this.timer --;
      }
    },1000);
  }

  prevenirBotonRetroceso():void{
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,null!,location.href);
    });
  }

  enviarCuestionario():void{
    Swal.fire({
      title:'¿Queires enviar el examen?',
      icon:'info',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Enviar',
      cancelButtonText:'Cancelar'
    }).then(e=>{
      if(e.isConfirmed){
        this.evaluarExamen();
      }
    });
  }

  obtenerHoraFormateada(){
    let minutos = Math.floor(this.timer/60);
    let segundos = this.timer - minutos * 60;
    return `${minutos} : min : ${segundos} seg`;
  }

  evaluarExamen():void{
    this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      data => {
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
        this.esEnviado = true;
      },
        err => {
          Swal.fire('Error','Error al enviar examen','error');
        }
    );
  }

  imprimirPagina(){
    window.print(); 
  }

}
