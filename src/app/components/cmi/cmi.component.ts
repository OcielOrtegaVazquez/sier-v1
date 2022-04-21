import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Importar Form  */
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

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
  providers: [DatePipe]
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

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.cmi = new FormGroup({
      area: new FormControl(''),
      startDate: new FormControl(''), 
      /* startDate: new FormControl(''), */
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
          this.http.get<any>(`${this.api}reporteCENAPI/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe(res => {
            this.apiResponse = JSON.stringify(res);
            console.log(res);
          });
        }

        break;

      case "2":
        console.log('Reporte de CGSP');
        if(this.cmi.valid){
          this.http.get<any>(`${this.api}reporteCGSP/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe(res => {
            this.apiResponse = JSON.stringify(res);
            console.log(res);
          });
        }

        break;

      case "3":
        console.log('Reporte de PFM_MM');
        if(this.cmi.valid){
          this.http.get<any>(`${this.api}reporte_PFM_MM/${this.consulta.startDate}/${this.consulta.endDate}`).subscribe( res => {
            this.apiResponse = JSON.stringify(res);
            console.log(res);
          });
        }
        break;

      case "4":
        console.log('Reporte de PFM_MJ');
        break;
    }
  }

}
