import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class PFMViewsService {

  baseUrl = environment.baseUrl;

  api = 'https://localhost:3000/'; //desarrollo en servidor

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  /* Descargar Registros de base de datos PFM */

  getViewCENAPI() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/descargaCENAPI`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  getViewCGSP() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/descargaCGSP`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  getViewPFM_MJ() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/descargaPFM_MJ`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  getViewPFM_MM() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/descargaPFM_MM`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* Insertar Registros en Base de Datos */

  /* CENAPI */
  insertPFM_CENAPI() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/insertPFM_CENAPI`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* CGSP */
  insertPFM_CGSP() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/insertPFM_CGSP`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* PFM_MJ */
  insertPFM_MJ() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/insertPFM_MJ`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* PFM_MM */
  insertPFM_MM() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/insertPFM_MM`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  /* Historico PFM GRAFICA */
  historicoPFM_AIC(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/historico_pfm`, {headers}).toPromise().then(data => {
      return data
    });
  }


}
