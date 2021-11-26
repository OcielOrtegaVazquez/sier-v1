import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

/* Importamos los servicios creados */
import { CarpetaInvestigacionService } from '../../services/carpeta-investigacion.service';

/* Importamos la interface CarpetaInvestigacion */
import { CarpetaInvestigacion } from '../../interfaces/carpeta-investigacion';

/* Importamos Mat Table Source */
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

/* Creamos un arreglo de objetos vacio */


@Component({
  selector: 'app-carpeta-investigacion',
  templateUrl: './carpeta-investigacion.component.html',
  styleUrls: ['./carpeta-investigacion.component.css']
})
export class CarpetaInvestigacionComponent implements OnInit {

  displayedColumnsCarpeta: string[] = ['ID_CARPETA', 'NUM_CARPETA_INVESTIGACION', 'FECHA_INICIO',
                                        'HORA_INICIO', 'SINTESIS', 'DELEGACION', 'SEDESUBSEDE'];
  ELEMENT_DATA_CARPETA : CarpetaInvestigacion[] = [];                 
  dataSourceCarpeta = new MatTableDataSource<CarpetaInvestigacion>(this.ELEMENT_DATA_CARPETA);
 

  /* Implementamos Sort y Paginator */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort ;

  /* Creamos en nombre de los filtro por columna */
  idCarpetaFilter =               new FormControl('');
  numCarpetaInvestigacionFilter = new FormControl('');
  fechaInicioFilter =             new FormControl('');
  horaInicioFilter =              new FormControl('');
  sintesisFilter =                new FormControl('');
  delegacionFilter =              new FormControl('');
  sedeSubsedeFilter =             new FormControl('');

  filterValues = {
    ID_CARPETA:'',
    NUM_CARPETA_INVESTIGACION:'',
    FECHA_INICIO:'',
    HORA_INICIO:'',
    SINTESIS:'',
    DELEGACION:'',
    SEDESUBSEDE:''
  };

  /* Inyectamos el servicio en el constructor */
  constructor(
    private carpetaInvestigacionService: CarpetaInvestigacionService
  ) { 
    this.dataSourceCarpeta.data = this.ELEMENT_DATA_CARPETA;
    this.dataSourceCarpeta.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.getAllCarpetaInvestigacion();

    /* Filtro por numero de carpeta */
    this.numCarpetaInvestigacionFilter.valueChanges
    .subscribe(
      NUM_CARPETA_INVESTIGACION => {
        this.filterValues.NUM_CARPETA_INVESTIGACION = NUM_CARPETA_INVESTIGACION;
        this.dataSourceCarpeta.filter = JSON.stringify(this.filterValues);
      }
    );

    /* Filtro por sintesis */
    this.sintesisFilter.valueChanges
    .subscribe(
      SINTESIS => {
        this.filterValues.SINTESIS = SINTESIS;
        this.dataSourceCarpeta.filter = JSON.stringify(this.filterValues);
      }
    );

    /* Filtro por Delegacion */
    this.delegacionFilter.valueChanges
    .subscribe(
      DELEGACION => {
        this.filterValues.DELEGACION = DELEGACION;
        this.dataSourceCarpeta.filter = JSON.stringify(this.filterValues);
      }
    )
  }

  ngAfterViewInit(){
  
    /* Paginator Carpetas de Investigacion */
    this.dataSourceCarpeta.paginator = this.paginator;
    this.dataSourceCarpeta.sort = this.sort;
  }

  getAllCarpetaInvestigacion(){
    this.carpetaInvestigacionService.getAllCarpetaInvestigacion()
    .subscribe(allCarpeta => this.dataSourceCarpeta.data = allCarpeta as CarpetaInvestigacion[])
  }

  /* Filtro de busqueda carpetas de Investigacion */  
  applyFilterCarpeta(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCarpeta.filter = filterValue.trim().toLowerCase();
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data: any, filter:string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.NUM_CARPETA_INVESTIGACION.toLowerCase().indexOf(searchTerms.NUM_CARPETA_INVESTIGACION) !== -1
        /* && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1 */
        && data.SINTESIS.toLowerCase().indexOf(searchTerms.SINTESIS) !== -1
        && data.DELEGACION.toLowerCase().indexOf(searchTerms.DELEGACION) !== -1;
    }
    return filterFunction;
  }

}

