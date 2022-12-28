import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CreateUserDto } from 'src/app/model/create-user-dto';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ver-mis-alumnos',
  templateUrl: './ver-mis-alumnos.component.html',
  styleUrls: ['./ver-mis-alumnos.component.css']
})
export class VerMisAlumnosComponent implements OnInit{
  
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'email','telefono'];

  usuario:CreateUserDto[] = [];
  dataSource:any;

  constructor(
    private usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    this.listarAlumnos();
  }

  listarAlumnos():void{
    this.usuarioService.listarAlumnos().subscribe(
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



}