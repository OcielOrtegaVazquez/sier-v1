import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumenCMIService {

  baseUrl = environment.baseUrl;

  api = 'https://localhost:3000/'; //desarrollo en servidor

  constructor(private http: HttpClient) { }

  getResumenCMI() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.get<any>(`${this.baseUrl}/resumen-cmi`,{headers});
  }

  getValidaDatos() {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.get<any>(`${this.baseUrl}/resumen-cmi-valida`,{headers});
  }

}
