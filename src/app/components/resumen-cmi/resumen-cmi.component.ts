import { Component, OnInit, ViewChild } from '@angular/core';
import { ResumenCMIService } from 'src/app/services/resumen-cmi.service';
import { ResumenCMI } from 'src/app/interfaces/resumen-cmi';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ValidaDatos } from '../../interfaces/resumen-cmi';

@Component({
  selector: 'app-resumen-cmi',
  templateUrl: './resumen-cmi.component.html',
  styleUrls: ['./resumen-cmi.component.css']
})
export class ResumenCMIComponent implements OnInit {

  displayedColumns: string[] = ['Num', 'Vista', 'Fecha_Ini', 'Fecha_Fin', 'NMes1', 'TMes1', 'NMes2', 'TMes2', 'NMes3', 'TMes3', 'Total'];
  dataSource: MatTableDataSource<ResumenCMI>;

  displayedColumsErrors: string[] = ['id', 'Tabla', 'Fecha_Ini', 'Fecha_Fin', 'Error_Datos', 'Campos_null'];
  dataSourceErrors: MatTableDataSource<ValidaDatos>;

  baseUrl = environment.baseUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private resumenService: ResumenCMIService) { }

  ngOnInit(): void {
    this.getResumenCMI();
    this.getResumenErrors();
  }

  getResumenCMI(){
    this.resumenService.getResumenCMI().subscribe( resumenTrim => {
      this.dataSource = new MatTableDataSource(resumenTrim);   
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getResumenErrors(){
    this.resumenService.getValidaDatos().subscribe(resumeErrors => {
      this.dataSourceErrors = new MatTableDataSource(resumeErrors);
      this.dataSourceErrors.paginator = this.paginator;
      this.dataSourceErrors.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterErrors(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceErrors.filter = filterValue.trim().toLowerCase();
  }

}
