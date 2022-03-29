import { Injectable } from '@angular/core';

/* Importamos HttClient para hacer las peticiones HTTP */
import { HttpClient } from '@angular/common/http';

/* Importamos la Interfaz del usuario con todos los atributos */
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = 'https://localhost:3000/'; //desarrollo en servidor

  constructor( private http: HttpClient) { }

  /* Obtenemos para prueba los usuarios en la base de datos */
  getUsers(){
    const path = `${this.api}users`;
  return this.http.get<Usuario[]>(path);
  }

  /* Insertar Usuario */
  newUser(user: Usuario){
    const path = `${this.api}users`;
    var body = {...user}
    return this.http.post<Usuario>(path + body, {Headers});
  }
}
