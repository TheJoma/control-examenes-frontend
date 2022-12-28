import { Injectable } from '@angular/core';
import { Subject,Observable, BehaviorSubject } from 'rxjs'
import { CreateUserDto } from '../model/create-user-dto';
import { CursoDto } from '../model/curso-dto';
import { ExamenDto } from '../model/examen-dto';
import { PreguntaDto } from '../model/pregunta-dto';

@Injectable({
  providedIn: 'root'
})
export class MovedataService {

  subject = new BehaviorSubject<any>('null');

  public sendObject(curso:CursoDto):void{
    this.subject.next({curso:curso});
  }

  public getObject():Observable<any>{
    return this.subject.asObservable();
  }

  public sendExamen(examen:ExamenDto):void{
    this.subject.next({examen:examen});
  }

  public getExamen():Observable<any>{
    return this.subject.asObservable();
  }

  public sendPregunta(pregunta:PreguntaDto):void{
    this.subject.next({pregunta:pregunta});
  }
  public getPregunta():Observable<any>{
    return this.subject.asObservable();
  }

  public sendUsuario(usuario:CreateUserDto):void{
    this.subject.next({usuario:usuario});
  }
  public getUsuario():Observable<any>{
    return this.subject.asObservable();
  }

  constructor() { }
}
