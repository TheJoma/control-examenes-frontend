import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CursoDto } from '../model/curso-dto';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  
  url = environment.apiBaseURL+'/api/curso';

  constructor(
    private httpClient :HttpClient
  ) { }

  public listarCursos():Observable<CursoDto[]>{
    return this.httpClient.get<CursoDto[]>(this.url+'/');
  }

  public guardarCurso(dto:CursoDto):Observable<any>{
    return this.httpClient.post<any>(this.url+'/',dto);
  }

  public actualizarCurso(dto:CursoDto):Observable<any>{
    return this.httpClient.put<any>(this.url+'/',dto);
  }

  public eliminarCurso(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url+`/${id}`);
  }

}
