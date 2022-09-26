import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Importar Form  */
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ExcelService } from '../../services/excel.service';
import { SpinnerService } from '../../services/spinner.service';

/* Enviroment */
import { environment } from 'src/environments/environment';

export class Consulta{
  area: string;
  startDate: string;
  endDate: string;
    constructor(area: string, startDate: string, endDate: string){
      this.area = area;
      this.startDate = startDate;
      this.endDate = endDate
    }
}

@Component({
  selector: 'app-cmi',
  templateUrl: './cmi.component.html',
  styleUrls: ['./cmi.component.css'],
  providers: []
})

export class CmiComponent implements OnInit {
  
  /* Variables */
  selectedArea = '';

  /* Iniciamos el Formulario para obtener los datos del Plan de Investigacion */
  cmi: FormGroup;
  submitted = false;
  currentDate: Date = new Date();
  consulta = new Consulta('', '', '');
  baseUrl = environment.baseUrl;
  api = 'https://localhost:3000/admin/';//api desarrollo
  //api = 'https://reveco.fgr.org.mx:3000/amin';//api produccion

  apiResponse = '';

  value: number;

  constructor(private http: HttpClient, private excelService: ExcelService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
      this.cmi = new FormGroup({
      area: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });
  }

  onSubmit() {
    
    this.submitted = true;
    this.consulta.area = this.cmi.value.area;
    this.consulta.startDate = moment(this.cmi.value.startDate).format("YYYY-MM-DD");
    this.consulta.endDate = moment(this.cmi.value.endDate).format("YYYY-MM-DD");

    console.log("Fecha de Inicio: " + this.consulta.startDate);
    console.log("Fecha de Inicio: " + this.consulta.endDate);

    switch (this.cmi.value.area) {
      case "1":
        console.log('Reporte de CENAPI');
        if (this.cmi.valid) {
          /*this.http.get<any>(`${this.api}reporteCENAPI/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe(resCenapi => {
            this.apiResponse = JSON.stringify(resCenapi);
            console.log(resCenapi);
            console.log(`Generando reporte CENAPI ${this.consulta.startDate} - ${this.consulta.endDate}` );
            this.excelService.exportAsExcelFile(resCenapi, 'COPLADII_CENAPI_' + this.consulta.startDate + '_' + this.consulta.endDate);
          }); */
          this.http.post(`${this.baseUrl}/reporteCENAPI/rango`,{startDate: this.consulta.startDate, endDate: this.consulta.endDate}).subscribe( resCenapi => {
            this.apiResponse = JSON.stringify({resCenapi});
            console.log("Fecha 1: " + this.consulta.startDate);
            console.log("fecha 2: " + this.consulta.endDate);
            console.log("Generando reporte CENAPI..."  );
            this.excelService.exportAsExcelFile(resCenapi, 'COPLADII_CENAPI_' + this.consulta.startDate + '_' + this.consulta.endDate);
          });          
        }         
        break;

      case "2":
        console.log('Reporte de CGSP');
        if(this.cmi.valid){
          this.http.post(`${this.baseUrl}/reporteCGSP/rango`,{startDate: this.consulta.startDate, endDate: this.consulta.endDate}).subscribe( resCGSP => {
            this.apiResponse = JSON.stringify({resCGSP});
            console.log("Fecha 1: " + this.consulta.startDate);
            console.log("fecha 2: " + this.consulta.endDate);
            console.log("Generando reporte CGSP..." );
            this.excelService.exportAsExcelFile(resCGSP, 'COPLADII_CCGSP_' + this.consulta.startDate + '_' + this.consulta.endDate);
          });
        }
        break;

      case "3":
        console.log('Reporte de PFM_MM');
        if(this.cmi.valid){
          this.http.post(`${this.baseUrl}/reportePFM_MM/rango`,{startDate: this.consulta.startDate, endDate: this.consulta.endDate}).subscribe( resPFM_MM => {
            this.apiResponse = JSON.stringify({resPFM_MM});
            console.log("Fecha 1: " + this.consulta.startDate);
            console.log("fecha 2: " + this.consulta.endDate);
            console.log("Generando reporte PFM_MM..." );
            this.excelService.exportAsExcelFile(resPFM_MM, 'COPLADII_PFM_MM_' + this.consulta.startDate + '_' + this.consulta.endDate);
          });
        }
        break;

      case "4":
        console.log('Reporte de PFM_MJ');
        if(this.cmi.valid){
          this.http.post(`${this.baseUrl}/reportePFM_MJ/rango`,{startDate: this.consulta.startDate, endDate: this.consulta.endDate}).subscribe( resPFM_MJ => {
            this.apiResponse = JSON.stringify({resPFM_MJ});
            console.log("Fecha 1: " + this.consulta.startDate);
            console.log("fecha 2: " + this.consulta.endDate);
            console.log("Generando reporte PFM_MJ..." );
            this.excelService.exportAsExcelFile(resPFM_MJ, 'COPLADII_PFM_MJ_' + this.consulta.startDate + '_' + this.consulta.endDate);
          });
        }
        break;
    }
  }

}
