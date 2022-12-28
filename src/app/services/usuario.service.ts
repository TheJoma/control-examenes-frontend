import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDto } from '../model/create-user-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.apiBaseURL+'/api/usuario';

  constructor(private httpClient:HttpClient) { }

  public guardarProfesor(dto:CreateUserDto):Observable<any>{
    return this.httpClient.post<any>(this.url+'/guardar-profesor',dto);
  }

  public guardarAlumno(dto:CreateUserDto):Observable<any>{
    return this.httpClient.post<any>(this.url+'/guardar-alumno',dto);
  }

  public obtenerUsuarioActual():Observable<CreateUserDto>{
    return this.httpClient.get<CreateUserDto>(this.url+'/usuario-actual');
  }

  public obtenerUsuario(username:String):Observable<CreateUserDto>{
    return this.httpClient.get<CreateUserDto>(this.url+'/obtener-usuario'+`/${username}`);
  }

  public actualizarUsuario(usuario:CreateUserDto):Observable<any>{
    return this.httpClient.put<any>(this.url+'/actualizar-usuario',usuario);
  }

  public eliminarUsuario(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url+`/${id}`);
  }


  public listarAlumnos():Observable<CreateUserDto[]>{
    return this.httpClient.get<CreateUserDto[]>(this.url+'/listar-alumnos');
  }

  public listarProfesores():Observable<CreateUserDto[]>{
    return this.httpClient.get<CreateUserDto[]>(this.url+'/listar-profesores');
  }

}
