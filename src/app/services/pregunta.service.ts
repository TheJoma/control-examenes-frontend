import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreguntaDto } from '../model/pregunta-dto';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  url = environment.apiBaseURL+'/api/pregunta';

  constructor(
    private httpClient:HttpClient
  ) { }

  public guardarPregunta(dto:PreguntaDto):Observable<any>{
    return this.httpClient.post<any>(this.url+'/',dto);
  }

  public actualizarPregunta(dto:PreguntaDto):Observable<any>{
    return this.httpClient.put<any>(this.url+'/',dto);
  }

  public listarPreguntasDelExamen(id:number):Observable<PreguntaDto[]>{
    return this.httpClient.get<PreguntaDto[]>(this.url+'/preguntasexamen2'+`/${id}`);
  }

  public eliminarPregunta(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url+`/${id}`);
  }

  public obtenerPregunta(id:number):Observable<PreguntaDto>{
    return this.httpClient.get<PreguntaDto>(this.url+'/obtener'+`/${id}`);
  }

  public evaluarExamen(preguntas:any):Observable<any>{
    return this.httpClient.post<any>(this.url+'/evaluar-examen',preguntas);
  }


}
