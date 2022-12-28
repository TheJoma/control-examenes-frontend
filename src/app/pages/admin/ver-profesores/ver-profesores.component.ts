import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { MovedataService } from 'src/app/services/movedata.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-profesores',
  templateUrl: './ver-profesores.component.html',
  styleUrls: ['./ver-profesores.component.css']
})
export class VerProfesoresComponent implements OnInit {
  
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'email','telefono','acciones'];

  usuario:CreateUserDto[] = [];
  dataSource:any;

  constructor(
    private usuarioService:UsuarioService,
    private moveDataService:MovedataService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.listarProfesores();
  }

  listarProfesores():void{
    this.usuarioService.listarProfesores().subscribe(
      data => {
        this.usuario = data;
        this.dataSource = new MatTableDataSource(data);
      },
      err => {
        console.log(err)
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  eliminarUsuario(id:number):void{
    Swal.fire({
      title:'Eliminar profesor',
      text:'¿Estas seguro de eliminar el profesor?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonColor :'#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){          
    this.usuarioService.eliminarUsuario(id).subscribe(
      data => {
        this.listarProfesores();
        Swal.fire('Profesor eliminado',data.message,'success');
      },
      err => {
        Swal.fire('Error al eliminar',err.error.message,'error');
      }
    );
        }
      }
    );
  }


  moveData(usuario:CreateUserDto):void{
    this.moveDataService.sendUsuario(usuario);
    this.router.navigate(['/admin/actualizar-datos']);
  }

}
