import { Component, OnInit, ViewChild } from '@angular/core';

/* Importamos los servicios creados */
import { CarpetaInvestigacionService } from '../../services/carpeta-investigacion.service';

/* Importamos la interface CarpetaInvestigacion */
import { CarpetaInvestigacion } from '../../interfaces/carpeta-investigacion';

/* Importamos Mat Table Source */
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


/* Creamos un arreglo de objetos vacio */
const ELEMENT_DATA_CARPETA : CarpetaInvestigacion[] = [];

@Component({
  selector: 'app-carpeta-investigacion',
  templateUrl: './carpeta-investigacion.component.html',
  styleUrls: ['./carpeta-investigacion.component.css']
})
export class CarpetaInvestigacionComponent implements OnInit {

  displayedColumnsCarpeta: string[] = ['ID_CARPETA', 'NUM_CARPETA_INVESTIGACION', 'FECHA_INICIO',
                                        'HORA_INICIO', 'SINTESIS', 'DELEGACION', 'SEDESUBSEDE'];
                   
  dataSourceCarpeta = new MatTableDataSource<CarpetaInvestigacion>(ELEMENT_DATA_CARPETA);
 

  /* Implementamos Sort y Paginator */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort ;

  /* Inyectamos el servicio en el constructor */
  constructor(
    private carpetaInvestigacionService: CarpetaInvestigacionService
  ) { }

  ngOnInit(): void {
    this.getAllCarpetaInvestigacion();    
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


}

