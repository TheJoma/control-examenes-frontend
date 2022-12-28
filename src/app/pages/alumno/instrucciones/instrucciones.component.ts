import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExamenDto } from 'src/app/model/examen-dto';
import { ExamenService } from 'src/app/services/examen.service';
import { MovedataService } from 'src/app/services/movedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent implements OnInit,OnDestroy {

  examen:ExamenDto = new ExamenDto();

  subscription:Subscription|undefined;

  constructor(
    private examenService:ExamenService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private moveDataService:MovedataService
  ) { }

  ngOnInit(): void {
    this.obtenerExamen();
  }

  obtenerExamen():void{
    this.subscription = this.moveDataService.getExamen().subscribe(
      data =>{
        this.examen = data.examen;
      },
      err => {
        Swal.fire('Error','Error al cargar examen','error');
      }
    );
  }

  empezarExamen():void{
    Swal.fire({
      title:'¿Quieres comenzar el examen?',
      showCancelButton:true,
      cancelButtonText:'Cancelar',
      confirmButtonText:'Empezar',
      icon:'info'
    }).then((result:any)=>{
      if(result.isConfirmed){
        this.router.navigate(['/empezar-examen/'+this.examen.id]);
      }
    });
  }

  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
