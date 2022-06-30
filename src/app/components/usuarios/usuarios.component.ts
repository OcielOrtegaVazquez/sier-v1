import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

/* Prime Ng */
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from 'src/app/interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

const users: Usuario[] = [];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService, MessageService, ConfirmationService]
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'displayName', 'mail', 'officeLocation', 'role', 'sede', 'subsede', 'cargo', 'edit'];
  dataSource: MatTableDataSource<Usuario>;

  user: Usuario;
  apiResponse: any;
  baseUrl = environment.baseUrl;
  userForm;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsuarioService, private http: HttpClient, private formBuilder: FormBuilder) {
     this.userForm = this.formBuilder.group({
      Id: [""],
      Correo: ["", [Validators.required, Validators.email]],
      Nombre : [""],
      Rol: [""],
      Unidad: [""],
      Sede: [""],
      Subsede: [""],
      Cargo: [""],
  });
   }

  ngOnInit(): void {
    this.getUsers();   
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteUser(id: number) {   
    if (confirm("Deseas Borrar el Usuario ?")) {
      this.userService.deleteUser(id).subscribe(() => {
      });
      confirm("Usuario Eliminado Correctamente");
    }
    this.getUsers();
  }

  loadUserEdit(id: number){
     this.userService.getUser(id).subscribe( resUser => {
      this.apiResponse = resUser;
      this.userForm.controls['Id'].setValue(this.apiResponse[0].id);
      this.userForm.controls['Nombre'].setValue(this.apiResponse[0].nombre);
      this.userForm.controls['Correo'].setValue(this.apiResponse[0].username);
      this.userForm.controls['Unidad'].setValue(this.apiResponse[0].u_admin);
      this.userForm.controls['Sede'].setValue(this.apiResponse[0].sede);
      this.userForm.controls['Subsede'].setValue(this.apiResponse[0].subsede);
      this.userForm.controls['Cargo'].setValue(this.apiResponse[0].cargo);
      this.userForm.controls['Rol'].setValue(this.apiResponse[0].role)
     });
       
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(userData: Usuario){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});   
    this.http.put(`${this.baseUrl}/update` ,{
              id: this.userForm.controls['Id'].value,
              username: this.userForm.controls['Correo'].value,
              password: '',
              nombre: this.userForm.controls['Nombre'].value,
              role: this.userForm.controls['Rol'].value,
              u_admin: this.userForm.controls['Unidad'].value,
              sede: this.userForm.controls['Sede'].value,
              subsede: this.userForm.controls['Subsede'].value,
              cargo: this.userForm.controls['Cargo'].value
    }, {headers}).subscribe( updateUser => {
    this.apiResponse = JSON.stringify(updateUser);      
    console.log( "Datos Actualizados Correctamente ==== >");
    });
    confirm("Usuario Actualizado Correctamente")
    this.getUsers();
  }

  resetForm(){
    this.userForm.reset();
  }

}
