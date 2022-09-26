import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ResumenCMIService } from 'src/app/services/resumen-cmi.service';
import { ResumenCMI } from 'src/app/interfaces/resumen-cmi';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ValidaDatos } from '../../interfaces/resumen-cmi';
import { TerminalService } from 'primeng/terminal';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-resumen-cmi',
  templateUrl: './resumen-cmi.component.html',
  styleUrls: ['./resumen-cmi.component.css']
})
export class ResumenCMIComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[];
  public chartColors;

  dataSourceErrorsData: any;
  resultErrors: any;
  resumenTotales: any;
  TablaError: any;
  id: any;
  Tabla: any;
  Fecha_Ini: any;
  Fecha_Fin: any;
  Error_Datos: any;
  Campos_null: any;
  chart: any = []; 
  apiResponse: string;

  displayedColumns: string[] = ['Num', 'Vista', 'Fecha_Ini', 'Fecha_Fin', 'NMes1', 'TMes1', 'NMes2', 'TMes2', 'NMes3', 'TMes3', 'Total'];
  dataSource: MatTableDataSource<ResumenCMI>;

  displayedColumsErrors: string[] = ['id', 'Tabla', 'Fecha_Ini', 'Fecha_Fin', 'Error_Datos', 'Campos_null'];
  dataSourceErrors: MatTableDataSource<ValidaDatos>;

  baseUrl = environment.baseUrl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private resumenService: ResumenCMIService,
              private terminalService: TerminalService,
             ) { 

    this.terminalService.commandHandler.subscribe(command => {
      let response = (command === 'date') ? new Date().toDateString()  : 'Unknown command: ' + command;
      this.terminalService.sendResponse(response);
  });
  }

  ngOnInit(): void {
    this.getResumenCMI();
    this.getResumenErrors();
  }

  getResumenCMI() {
    this.resumenService.getResumenCMI().then(resumenTrim => {
      this.dataSource = new MatTableDataSource(resumenTrim);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      /* Datos para Gráfica */
      this.resumenTotales = resumenTrim;
      console.log(this.resumenTotales);      
    });
  }

   getResumenErrors() {
    this.resumenService.getValidaDatos().then(resumeErrors => {
      this.dataSourceErrors = new MatTableDataSource(resumeErrors);
      this.dataSourceErrors.paginator = this.paginator;
      this.dataSourceErrors.sort = this.sort;

      /* Datos Para Gráfica */
      this.resultErrors = resumeErrors;
      console.log(this.resultErrors);
      this.Error_Datos = this.resultErrors.map((array: any) => array.Error_Datos);
      this.Campos_null = this.resultErrors.map((array: any) => array.Campos_null);
      this.TablaError = this.resultErrors.map((array: any) => array.Tabla);
      console.log(this.Error_Datos, this.TablaError, this.Campos_null);

      /* Mostrar Datos en la Gráfica */
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.TablaError,
          datasets: [{
            label: 'Campos Con Errores',
            data: this.Error_Datos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Campos Null',
            data: this.Campos_null,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3,
            fill: false
          }]
        }
      })
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterErrors(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceErrors.filter = filterValue.trim().toLowerCase();
  }

}

