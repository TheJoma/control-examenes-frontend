import { CursoDto } from "./curso-dto";
import { PreguntaDto } from "./pregunta-dto";

export class ExamenDto {

    id:number;
    titulo:string;
    descripcion:string;
    puntosMaximos:number;
    numeroDePreguntas:number;
    activo:boolean;
    curso:CursoDto;
    lstPreguntas:PreguntaDto[];
}
