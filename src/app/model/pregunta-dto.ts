import { ExamenDto } from "./examen-dto";

export class PreguntaDto {

    id:number;
    contenido:string;
    imagen:string;
    opcion1:string;
    opcion2:string;
    opcion3:string;
    opcion4:string;
    respuestaDada:String;
    respuesta:string;
    examen:ExamenDto;
}
