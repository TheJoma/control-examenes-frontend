import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenDto } from 'src/app/model/examen-dto';
import { ExamenService } from 'src/app/services/examen.service';
import { MovedataService } from 'src/app/services/movedata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-examen',
  templateUrl: './cargar-examen.component.html',
  styleUrls: ['./cargar-examen.component.css']
})
export class CargarExamenComponent implements OnInit {
  cursoid:any;
  examenes:ExamenDto[] = [];

  constructor(
    private examenService:ExamenService,
    private activatedRoute:ActivatedRoute,
    private moveDataService:MovedataService,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.cargarExamenes();
  }

  cargarExamenes():void{
    this.activatedRoute.params.subscribe((params) =>{
      this.cursoid = params['id'];

      if(this.cursoid == null){
        this.examenService.listarExamenesActivos().subscribe(
          data => {
            this.examenes = data;
            
          },
          err => {
            Swal.fire('Error','Error al cargar examanes','error');
          }
        );
      } else {
        
        this.examenService.listarExamenesActivosPorCurso(this.cursoid).subscribe(
          data => {
            this.examenes = data;
            
          },
          err => {
            Swal.fire('Error','Error al cargar examanes','error');
          }
        );
      }

    });
  }

  moverExamen(examen:ExamenDto):void{
    this.moveDataService.sendExamen(examen);
    this.router.navigate(['/alumno/instrucciones']);
  }


}
