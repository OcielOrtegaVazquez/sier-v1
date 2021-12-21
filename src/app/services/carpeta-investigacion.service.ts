import { Injectable } from '@angular/core';

/* Importamos HttClient para hacer las peticiones HTTP */
import { HttpClient } from '@angular/common/http';

/* Importamos la Interfaz de la Carpeta de Investigacion con todos los atributos */
import { CarpetaInvestigacion } from '../interfaces/carpeta-investigacion';

@Injectable({
  providedIn: 'root'
})
export class CarpetaInvestigacionService {

  /* private api = 'http://localhost:8090/api/'; //desarrollo */

  private api : 'http://localhost:3000/api/'; //desarrollo en servidor

  constructor(
    private http: HttpClient
  ) { }

  /* Creamos la funcion que retorna el total de las carpetas */
  getAllCarpetaInvestigacion(){
    
    return this.http.get<CarpetaInvestigacion[]>('http://localhost:3000/carpetas');
    const path = `${this.api}carpetas/`;
    return this.http.get<CarpetaInvestigacion[]>(path);
  }
}
