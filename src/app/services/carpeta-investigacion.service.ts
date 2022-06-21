import { Injectable } from '@angular/core';

/* Importamos HttClient para hacer las peticiones HTTP */
import { HttpClient } from '@angular/common/http';

/* Importamos la Interfaz de la Carpeta de Investigacion con todos los atributos */
import { CarpetaInvestigacion } from '../interfaces/carpeta-investigacion';

/* Enviroment */
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarpetaInvestigacionService {

  baseUrl = environment.baseUrl;

  /* private api = 'http://localhost:8090/api/'; //desarrollo */

  api = 'https://localhost:3000/admin/'; //desarrollo en servidor

  // api = 'https;//reveco.fgr.org.mx:3000/admin/' produccion

  constructor(
    private http: HttpClient
  ) { }
  /* Creamos la funcion que retorna el total de las capetaas 2022 */
  getCarpetas2022() {
    /* const path = `${this.api}carpetas2022/`;
    return this.http.get<CarpetaInvestigacion[]>(path); */
    return this.http.get<any>(`${this.baseUrl}/carpetas2022/`).toPromise().then(res => <CarpetaInvestigacion[]>res).then(data => { return data; });
  }

  /* Creamos la funcion que retorna el total de las carpetas 2021 */
  getCarpetas2021() {
    /*    const path = `${this.api}carpetas2021/`;
       return this.http.get<CarpetaInvestigacion[]>(path); */
    return this.http.get<any>(`${this.baseUrl}/carpetas2021/`).toPromise().then(res => <CarpetaInvestigacion[]>res).then(data => { return data; });
  }

  /* Creamos la funcion que retorna el total de las carpetas 2020 */
  getCarpetas2020() {
    /*    const path = `${this.api}carpetas2020/`;
       return this.http.get<CarpetaInvestigacion[]>(path); */
    return this.http.get<any>(`${this.baseUrl}/carpetas2020/`).toPromise().then(res => <CarpetaInvestigacion[]>res).then(data => { return data });
  }

  /* Creamos la funcion que retorna el total de las carpetas 2019 */
  getCarpetas2019() {
    /*  const path = `${this.api}carpetas2019/`;
     return this.http.get<CarpetaInvestigacion[]>(path); */
    return this.http.get<any>(`${this.baseUrl}/carpetas2019/`).toPromise().then(res => <CarpetaInvestigacion[]>res).then(data => { return data });
  }
}
