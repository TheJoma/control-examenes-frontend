import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExamenDto } from '../model/examen-dto';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  url = environment.apiBaseURL+'/api/examen';  

  constructor(
    private httpClient:HttpClient
  ) { }
  
  public listarExamenes():Observable<ExamenDto[]>{
    return this.httpClient.get<ExamenDto[]>(this.url+'/');
  }

  public guardarExamen(dto:ExamenDto):Observable<any>{
    return this.httpClient.post<any>(this.url+'/',dto);
  }

  public eliminarExamen(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url+`/${id}`);
  }

  public actualizarExamen(dto:ExamenDto):Observable<any>{
    return this.httpClient.put<any>(this.url+'/',dto);
  }

  public listarExamenesActivos():Observable<ExamenDto[]>{
    return this.httpClient.get<ExamenDto[]>(this.url+'/activos');
  }

  public listarExamenesActivosPorCurso(id:number):Observable<ExamenDto[]>{
    return this.httpClient.get<ExamenDto[]>(this.url+'/activoscurso'+`/${id}`);
  }

}
