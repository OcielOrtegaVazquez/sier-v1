import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VacacionesTableExcel, Vacaciones } from '../interfaces/vacaciones';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  baseUrl = environment.baseUrl;

  api = 'https://localhost:3000/'; //desarrollo en servidor

  constructor(private http: HttpClient) { }

  deleteRegistro(id){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.delete<any>(`${this.baseUrl}/vacaciones/${id}`,{headers});
  }

  getVacaciones(id){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.get<Vacaciones[]>(`${this.baseUrl}/vacaciones/number/${id}`,{headers});
      
  }


  }
  

  

