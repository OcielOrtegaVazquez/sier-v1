import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CatEstado } from '../interfaces/cat-estado';
import { CatUnidad } from '../interfaces/cat-unidad';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  baseUrl = environment.baseUrl

  api = 'https://localhost:3000/'; //desarrollo en servidor

  constructor(private http: HttpClient) { }

  getCatEstados(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    //return this.http.get<any>(`${this.baseUrl}/resumen-cmi`,{headers});
    return this.http.get<any>(`${this.baseUrl}/catEstados`,{headers}).toPromise().then(data => {
      return data;
    });
  }

  getCatUnidades(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    //return this.http.get<any>(`${this.baseUrl}/resumen-cmi`,{headers});
    return this.http.get<CatUnidad>(`${this.baseUrl}/catUnidades`,{headers}).toPromise().then(data => {
      return data;
    });
  }
}
