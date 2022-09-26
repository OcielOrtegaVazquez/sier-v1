import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TerminalService } from 'primeng/terminal';

@Injectable({
  providedIn: 'root'
})


export class ResumenCMIService {

  baseUrl = environment.baseUrl;

  api = 'https://localhost:3000/'; //desarrollo en servidor

  constructor(private http: HttpClient, private terminalService: TerminalService) {
    this.terminalService.commandHandler.subscribe(command => {
      let response =
        command === 'cd abc'
          ? 'changed Current Directory to abc'
          : 'Please Enter a Valid Command: ';
      this.terminalService.sendResponse(response);
    });

  }

  getResumenCMI() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    //return this.http.get<any>(`${this.baseUrl}/resumen-cmi`,{headers});
    return this.http.get<any>(`${this.baseUrl}/resumen-cmi`, { headers }).toPromise().then(data => {
      return data;
    });
  }

  getValidaDatos() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    //return this.http.get<any>(`${this.baseUrl}/resumen-cmi-valida`,{headers});
    return this.http.get<any>(`${this.baseUrl}/resumen-cmi-valida`, { headers }).toPromise().then(data => {
      return data;
    })
  }

  getRes() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.get<any>(`${this.baseUrl}/resumen-cmi-valida`, { headers }).toPromise().then(data => {
      return data;
    })
  }

}
