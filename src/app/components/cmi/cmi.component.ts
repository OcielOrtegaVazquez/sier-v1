import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Importar Form  */
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ExcelService } from '../../services/excel.service';

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
  api = 'https://localhost:3000/';

  apiResponse = '';

  constructor(private http: HttpClient, private excelService: ExcelService) { }

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
          this.http.get<any>(`${this.api}reporteCENAPI/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe(resCenapi => {
            this.apiResponse = JSON.stringify(resCenapi);
            console.log(resCenapi);
            console.log(`Generando reporte CENAPI ${this.consulta.startDate} - ${this.consulta.endDate}` );
            this.excelService.exportAsExcelFile(resCenapi, 'COPLADII_CENAPI_' + this.consulta.startDate + '_' + this.consulta.endDate);
          });
        } 
        
        break;

      case "2":
        console.log('Reporte de CGSP');
        if(this.cmi.valid){
          this.http.get<any>(`${this.api}reporteCGSP/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe(resCGSP => {
            this.apiResponse = JSON.stringify(resCGSP);
            console.log(resCGSP);
            console.log(`Generando reporte CGSP ${this.consulta.startDate} - ${this.consulta.endDate}` );
            this.excelService.exportAsExcelFile(resCGSP, 'COPLADII_CGSP_' + this.consulta.startDate + '_' + this.consulta.endDate);
          });
        }

        break;

      case "3":
        console.log('Reporte de PFM_MM');
        if(this.cmi.valid){
          this.http.get<any>(`${this.api}reporte_PFM_MM/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe( resPFM_MM => {
            this.apiResponse = JSON.stringify(resPFM_MM);
            console.log(resPFM_MM);
            console.log(`Generando reporte PFM_MM ${this.consulta.startDate} - ${this.consulta.endDate}` );
            this.excelService.exportAsExcelFile(resPFM_MM, 'COPLADII_PFM_MM_' + this.consulta.startDate + '_' + this.consulta.endDate);
          });
        }
        break;

      case "4":
        console.log('Reporte de PFM_MJ');
        if(this.cmi.valid){
          this.http.get<any>(`${this.api}reporte_PFM_MJ/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe(resPFM_MJ => {
            this.apiResponse = JSON.stringify(resPFM_MJ);
            console.log(resPFM_MJ);
            console.log(`Generando reporte PFM_MJ ${this.consulta.startDate} - ${this.consulta.endDate}`);
            this.excelService.exportAsExcelFile(resPFM_MJ, 'COPLADII_PFM_MJ_' + this.consulta.startDate + '_' + this.consulta.endDate)
          })
        }
        break;
    }
  }

}
