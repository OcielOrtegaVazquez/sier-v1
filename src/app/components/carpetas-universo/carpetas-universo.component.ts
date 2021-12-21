import { Component, OnInit } from '@angular/core';

/* Importamos el servicio CarpetaInvestigacion */
import { CarpetaInvestigacionService } from '../../services/carpeta-investigacion.service';

/* Importamos la interface CarpetaInvestigacion */
import { CarpetaInvestigacion } from '../../interfaces/carpeta-investigacion';

/* Importamos libreria para exportar archivos CSV y EXCEL */
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-carpetas-universo',
  templateUrl: './carpetas-universo.component.html',
  styleUrls: ['./carpetas-universo.component.css']
})
export class CarpetasUniversoComponent implements OnInit {

  /* declaramos una variable para el arreglo de carpetas */
  carpetas: CarpetaInvestigacion[] = [];

  /* declaramos una variable para el loader */
  loading: boolean;

  /* declaramos una variable para el arreglo de las columnas */
  cols: any[];

  /* declaramos las variables para el paginador */
  first = 0;
  rows = 10;

  /* Declaramos las variables para las filas seleccionadas */
  selectedCarpetas: any[];
  totalRecords: number = 100;

  /* Declaramos el arreglo para exportar las columnas en excel */
  exportColumns: any[];

  constructor(
    private carpetaInvestigacionService : CarpetaInvestigacionService
  ) {  }

ngOnInit(): void {
  this.getAllCarpetas();
 }

 /* Creamos la funcion para hacer el llamado del universo de carpetas GetAll */
getAllCarpetas(){
  this.loading = true;
  this.carpetaInvestigacionService.getAllCarpetaInvestigacion()
  .subscribe(
    data =>{
      this.carpetas = data;
      this.loading = false;
    }
  )
  this.cols = [
    { field: 'idRow', header: 'idRow' },
    { field: 'NumCar', header: 'NumCar' },
    { field: 'FechaCI', header: 'FechaCI' },
    { field: 'EdoJur', header: 'EdoJur' },      
    { field: 'Ley', header: 'Ley' },
    { field: 'Articulo', header: 'Articulo' },
    { field: 'TipoDelito', header: 'TipoDelito' },
    { field: 'Hecho', header: 'Hecho' },
    { field: 'ModalidadDelito', header: 'ModalidadDelito' }
];

this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

}

/* Paginador siguiente */
next(){
  this.first = this.first + this.rows;
}

/* Paginador atras */
prev(){
  this.first = this.first - this.rows;
}

/* Reiniciar paginador */
reset(){
  this.first = 0;
}

/* Estando en la ultima página */
isLastPage(){
  return this.carpetas ? this.first === (this.carpetas.length - this.rows): true;
}

/* Estando en la Primer página */
isFirstPage(){
  return this.carpetas ? this.first === 0 : true;
}

/* Exportar el universo de la consulta en excel */
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.carpetas);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Universo_Carpetas_2020");
  });
}

/* Exportar los datos filtrados del universo en CSV */
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}








}
