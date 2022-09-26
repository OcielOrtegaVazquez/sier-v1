import { Component, OnInit } from '@angular/core';
import { PFMViewsService } from 'src/app/services/pfmviews.service';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from '../../services/spinner.service';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pfmviews',
  templateUrl: './pfmviews.component.html',
  styleUrls: ['./pfmviews.component.css']
})
export class PFMViewsComponent implements OnInit {

  apiResponse: string;
  dataSource: MatTableDataSource<any>;
  chart: any = [];

  constructor(private resumenPFM: PFMViewsService) { }

  ngOnInit(): void {
    //this.getViewCENAPI();
    //this.getViewCGSP();
    //this.getViewPFM_MJ();
    //this.getViewPFM_MM();
    //this.historicoPFM_AIC();
  }

  timeLeftCENAPI: number = 135;
  elementCENAPI: Boolean;
  intervalCENAPI;

  timeLeftCGSP: number = 255;
  elementCGSP: Boolean;
  intervalCGSP;

  timeLeftPFM_MJ: number = 135;
  elementPFM_MJ: Boolean;
  intervalPFM_MJ;

  timeLeftPFM_MM: number = 535;
  elementPFM_MM: Boolean;
  intervalPFM_MM;

  /* DESCARGAR VISTA CENAPI */

  getViewCENAPI() {
    this.startTimerCENAPI();
    this.resumenPFM.getViewCENAPI().then(viewCENAPI => {
      this.apiResponse = JSON.stringify(viewCENAPI);
      console.log(viewCENAPI);
    });
  }

  startTimerCENAPI() {
    this.intervalCENAPI = setInterval(() => {
      if (this.timeLeftCENAPI > 1) {
        this.timeLeftCENAPI--;
      } else {
        this.timeLeftCENAPI = 0;
      }
    }, 1000)
  }

  showCENAPI() {
    this.elementCENAPI = true
  }

  /* DESCARGAR VISTA CGSP */

  getViewCGSP() {
    this.startTimerCGSP();
    this.resumenPFM.getViewCGSP().then(viewCGSP => {
      this.apiResponse = JSON.stringify(viewCGSP);
      console.log(viewCGSP);
    });
  }

  startTimerCGSP() {
    this.intervalCGSP = setInterval(() => {
      if (this.timeLeftCGSP > 1) {
        this.timeLeftCGSP--;
      } else {
        this.timeLeftCGSP = 0;
      }
    }, 1000)
  }

  showCGSP() {
    this.elementCGSP = true
  }

  /* DESCARGAR VISTA PFM_MJ */

  getViewPFM_MJ() {
    this.startTimerPF_MJ();
    this.resumenPFM.getViewPFM_MJ().then(viewPFM_MJ => {
      this.apiResponse = JSON.stringify(viewPFM_MJ);
      console.log(viewPFM_MJ);
    });
  }

  startTimerPF_MJ() {
    this.intervalPFM_MJ = setInterval(() => {
      if (this.timeLeftPFM_MJ > 1) {
        this.timeLeftPFM_MJ--;
      } else {
        this.timeLeftPFM_MJ = 0;
      }
    }, 1000)
  }

  showPFM_MJ() {
    this.elementPFM_MJ = true
  }

  /* DESCARGAR VISTA PFM_MM */

  getViewPFM_MM() {
    this.startTimerPFM_MM();
    this.resumenPFM.getViewPFM_MM().then(viewPFM_MM => {
      this.apiResponse = JSON.stringify(viewPFM_MM);
      console.log(viewPFM_MM);
    });
  }

  startTimerPFM_MM() {
    this.intervalPFM_MM = setInterval(() => {
      if (this.timeLeftPFM_MM > 1) {
        this.timeLeftPFM_MM--;
      } else {
        this.timeLeftPFM_MM = 0;
      }
    }, 1000)
  }

  showPFM_MM() {
    this.elementPFM_MM = true
  }

  /* Cargar registros a la base de datos */

  /* CENAPI */
  insertCENAPI(){
    this.resumenPFM.insertPFM_CENAPI().then(insertCENAPI => {
      this.apiResponse = JSON.stringify(insertCENAPI);
      console.log(insertCENAPI);
    });
  }

  /* CGSP */
  insertCGSP(){
    this.resumenPFM.insertPFM_CGSP().then(insertCGSP=> {
      this.apiResponse = JSON.stringify(insertCGSP);
      console.log(insertCGSP);
    });
  }

  /* PFM_MJ */
  insertPFM_MJ(){
    this.resumenPFM.insertPFM_MJ().then(insertPFM_MJ=>{
      this.apiResponse = JSON.stringify(insertPFM_MJ);
      console.log(insertPFM_MJ);
    });
  }

  /* PFM_MM */
  insertPFM_MM(){
    this.resumenPFM.insertPFM_MM().then(insertPFM_MM=>{
      this.apiResponse = JSON.stringify(insertPFM_MM);
      console.log(insertPFM_MM);
    });
  }


/* Grafica */

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

historicoPFM_AIC(){
  this.resumenPFM.historicoPFM_AIC().then(historicoPFM_AIC => {
    this.apiResponse = JSON.stringify(historicoPFM_AIC);
    console.log(historicoPFM_AIC);
  });
}




}
