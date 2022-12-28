import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamenDto } from 'src/app/model/examen-dto';
import { ExamenService } from 'src/app/services/examen.service';
import { MovedataService } from 'src/app/services/movedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-examenes',
  templateUrl: './ver-examenes.component.html',
  styleUrls: ['./ver-examenes.component.css']
})
export class VerExamenesComponent implements OnInit {

  examenes:ExamenDto[] = [];

  constructor(
    private examenService:ExamenService,
    private moveDataService:MovedataService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listarExamenes();
  }

  listarExamenes():void{
    this.examenService.listarExamenes().subscribe(
      data => {
        this.examenes = data;
      },
      err => {
        Swal.fire('Error','Error al cargar examenes','error');
      }
    );
  }

  eliminarExamen(id:number):void{
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
    
          this.examenService.eliminarExamen(id).subscribe(
            data => {
              this.examenes = this.examenes.filter((lista:ExamenDto)=>lista.id != id);
              Swal.fire('Examen eliminado',data.message,'success');
            },
            err => {
              Swal.fire('Error',err.error.message,'error');
            }
          );
        }
    });
  }


  moverExamen(examen:ExamenDto):void{
    this.moveDataService.sendExamen(examen);
    this.router.navigate(['/profesor/actualizar-examen']);

  }



}
