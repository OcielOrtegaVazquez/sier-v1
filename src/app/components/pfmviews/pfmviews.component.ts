import { Component, OnInit, ViewChild } from '@angular/core';
import { PFMViewsService } from 'src/app/services/pfmviews.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pfmviews',
  templateUrl: './pfmviews.component.html',
  styleUrls: ['./pfmviews.component.css']
})
export class PFMViewsComponent implements OnInit {

  apiResponse: string;

  chart: any = [];

  displayedColumns: string[] = ['Nombrefuente', 'Periodicidad', 'TotalRegistros', 'Validado', 'Fecha'];
  dataSource: MatTableDataSource<any>;

  Nombrefuente: any;
  Periodicidad: any;
  TotalRegistros: any;
  Validado: any;
  Fecha: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private resumenPFM: PFMViewsService) { }

  ngOnInit(): void {
    //this.getViewCENAPI();
    //this.getViewCGSP();
    //this.getViewPFM_MJ();
    //this.getViewPFM_MM();
    this.historicoPFM_AIC();
    this.descargaHistoricoPFM_AIC();
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

  ngOnDestroy(): void {
    if (this.intervalCENAPI) {
      clearInterval(this.intervalCENAPI)
    }
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
  insertCENAPI() {
    this.resumenPFM.insertPFM_CENAPI().then(insertCENAPI => {
      this.apiResponse = JSON.stringify(insertCENAPI);
      Swal.fire({
        icon: 'success',
        title: 'Correcto... !!!',
        text: 'Se Insertaron: ' + this.apiResponse + ' Registros',
      })
      console.log(insertCENAPI);
      this.historicoPFM_AIC();
    });
  }

  /* CGSP */
  insertCGSP() {
    this.resumenPFM.insertPFM_CGSP().then(insertCGSP => {
      this.apiResponse = JSON.stringify(insertCGSP);
      Swal.fire({
        icon: 'success',
        title: 'Correcto... !!!',
        text: 'Se Insertaron: ' + this.apiResponse + ' Registros',
      })
      console.log(insertCGSP);
      this.historicoPFM_AIC();
    });
    
  }

  /* PFM_MJ */
  insertPFM_MJ() {
    this.resumenPFM.insertPFM_MJ().then(insertPFM_MJ => {
      this.apiResponse = JSON.stringify(insertPFM_MJ);
      Swal.fire({
        icon: 'success',
        title: 'Correcto... !!!',
        text: 'Se Insertaron: ' + this.apiResponse + ' Registros',
      })
      console.log(insertPFM_MJ);
      this.historicoPFM_AIC();
    });
    
  }

  /* PFM_MM */
  insertPFM_MM() {
    this.resumenPFM.insertPFM_MM().then(insertPFM_MM => {
      this.apiResponse = JSON.stringify(insertPFM_MM);
      Swal.fire({
        icon: 'success',
        title: 'Correcto... !!!',
        text: 'Se Insertaron: ' + this.apiResponse + ' Registros',
      })
      console.log(insertPFM_MM);
      this.historicoPFM_AIC();
    });
    
  }

  /* Historico */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  historicoPFM_AIC() {
    this.resumenPFM.historicoPFM_AIC().then(historicoPFM_AIC => {
      this.dataSource = new MatTableDataSource(historicoPFM_AIC);
      this.dataSource.paginator = this.paginator;
      this.apiResponse = JSON.stringify(historicoPFM_AIC);
      console.log(historicoPFM_AIC);
    });
  }

  descargaHistoricoPFM_AIC() {
    this.resumenPFM.descargaHistoricoPFM_AIC().then(descargaHistoricoPFM_AIC => {
      this.apiResponse = JSON.stringify(descargaHistoricoPFM_AIC);
      console.log(descargaHistoricoPFM_AIC);
    });
  }

}
