import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'

/* Importamos HttpClient*/
import { HttpClient } from '@angular/common/http';

/* Importamos Observable */
import { Observable } from 'rxjs';

/* Importamos Ag-Grid */
import { ColDef } from 'ag-grid-community';
import { identifierModuleUrl } from '@angular/compiler';
import { AgGridAngular } from 'ag-grid-angular'

@Component({
  selector: 'app-carpetas-universo',
  templateUrl: './carpetas-universo.component.html',
  styleUrls: ['./carpetas-universo.component.css']
})
export class CarpetasUniversoComponent implements OnInit {
  
@ViewChild('agGrid') agGrid!: AgGridAngular;

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'ID_CARPETA', width:75, sortable: true, filter: true, resizable: true,checkboxSelection: true},
    { headerName: 'Carpeta', field: 'NUM_CARPETA_INVESTIGACION', sortable: true, filter: true, resizable: true },
    { headerName: 'Fecha Inicio', field: 'FECHA_INICIO', width:115, filter: 'agDateColumnFilter',resizable: true},
    { headerName: 'Hora Inicio', field: 'HORA_INICIO', width:115, sortable: true, filter: true, resizable: true },
    { headerName: 'Sintesis', field: 'SINTESIS', sortable: true, filter: true, resizable: true },
    { headerName: 'Delegación', field: 'DELEGACION', width:150, sortable: true, filter: true, resizable: true },
    { headerName: 'Sede', field: 'SEDESUBSEDE', width:150, sortable: true, filter: true, resizable: true }
];


/* Definimos las Filas vacias */
  rowData: Observable<any[]>;

  constructor(private httpClient: HttpClient) {
        
    this.rowData = this.httpClient.get<any[]>('http://localhost:8090/api/carpeta');
   }

ngOnInit(): void {
  
  }
}
