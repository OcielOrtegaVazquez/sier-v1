import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/* enviroment */
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getReport(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`https://localhost:3000/catUnidad` , {headers, responseType: 'blob' as 'json'})
  }
}
