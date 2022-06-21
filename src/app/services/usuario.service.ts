import { Injectable } from '@angular/core';

/* Importamos HttClient para hacer las peticiones HTTP */
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* Importamos la Interfaz del usuario con todos los atributos */
import { Usuario } from '../interfaces/usuario';

/* Enviroment */
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.baseUrl;

  api = 'https://localhost:3000/'; //desarrollo en servidor

  constructor( private http: HttpClient) { }

  /* Obtenemos para prueba los usuarios en la base de datos */
  getUsers(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
   return this.http.get<any>(`${this.baseUrl}/users`,{headers});
   //return this.http.get<any>(`${this.baseUrl}/users?desde=${desde}`,{headers}).toPromise().then(res =><Usuario>res).then(data => {return data;});
  }

  /* Insertar Usuario */
  newUser(user: Usuario){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const path = `${this.baseUrl}/users`;
    var body = {...user}
    return this.http.post<Usuario>(path + body, {headers});
  }

  deleteUser(id){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`,{headers});
  }

  /* Obtener 1 Usuario por Id */
  getUser(id){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.get<any>(`${this.baseUrl}/users/${id}`, {headers});
  }

  edituser(user: Usuario){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var body = {...user}
    return this.http.put<any>(`${this.baseUrl}/update` ,{body} , {headers});
  }
}
