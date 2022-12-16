import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DisplayName, Mail, OfficeLocation } from 'src/app/interfaces/usuario';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdministrativoService } from '../../services/administrativo.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as FusionCharts from "fusioncharts";
import { ExcelService } from '../../services/excel.service';
import { VacacionesTableExcel } from '../../interfaces/vacaciones';

export class VacacionesUsuario {
  id: number;
  fecIni: string;
  fecFin: string;
  estatusReg: string;
  fecRegistro: string;
  descripcion: string;
  periodo: string;
  anio: string;
  username: string;
  nombre: string;
  u_admin: string;
  constructor(fecIni: string,
    fecFin: string,
    estatusReg: string,
    fecRegistro: string,
    descripcion: string,
    periodo: string,
    anio: string,
    username: string,
    nombre: string,
    u_admin: string) {
    this.fecIni = fecIni;
    this.fecFin = fecFin;
    this.estatusReg = estatusReg;
    this.fecRegistro = fecRegistro;
    this.descripcion = descripcion;
    this.periodo = periodo;
    this.anio = anio;
    this.username = username;
    this.nombre = nombre;
    this.u_admin = u_admin;
  }
}

export class DatosUsuario {
  id: string;
  label: string;
  constructor(id: string, label: string,) {
    this.id = id;
    this.label = label
  }
}

@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.css']
})
export class AdministrativoComponent implements OnInit {

  /* Grafica  */
  title: string;

  chart: any;
  task = [
    {
      label: "Actual",
      processid: "1",
      start: "9/11/2022",
      end: "12/11/2022",
      id: "1",
      color: "#008ee4",
      toppadding: "30%",
      height: "30%"
    },
    {
      label: "Actual",
      processid: "2",
      start: "13/11/2022",
      end: "30/11/2022",
      id: "2",
      color: "#008ee4",
      toppadding: "30%",
      height: "30%"
    },
    {
      label: "Actual",
      processid: "3",
      start: "13/11/2022",
      end: "30/11/2022",
      id: "3",
      color: "#008ee4",
      toppadding: "30%",
      height: "30%"
    },
    {
      label: "Actual",
      processid: "4",
      start: "13/11/2022",
      end: "30/11/2022",
      id: "4",
      color: "#008ee4",
      toppadding: "30%",
      height: "30%"
    },
    {
      label: "Actual",
      processid: "5",
      start: "13/11/2022",
      end: "30/11/2022",
      id: "5",
      color: "#008ee4",
      toppadding: "30%",
      height: "30%"
    }
  ]

  process = [
    {
      id: "1",
      label: "Clear site",

    },
    {
      id: "2",
      label: "Excavate Foundation",


    },
    {
      id: "3",
      label: "Concrete Foundation",

    },
    {
      id: "4",
      label: "Footing to DPC",

    },
    {
      id: "5",
      label: "Drainage Services",

    }
  ]

  text = [
    {
      label: "9/11/2022"
    },
    {
      label: "13/11/2022"
    },
    {
      label: "26/11/2022"
    },
    {
      label: "4/11/2022"
    },
    {
      label: "6/11/2022"
    }

  ]
  apiResponseUsers: any;
  apiResponseFechaInicial: any;
  apiResponseFechaFinal: any;
  apiResponseRango: any;
  dataSourceChart: Object;

  /* Variables */
  apiResponse: string;

  baseUrl = environment.baseUrl;

  selectedAnio = '';
  selectedPeriodo = '';
  selectedComentario = '';
  selectedFechaInicio = '';
  selectedDate = '';
  selectedCalendario: Date | null;
  registro: VacacionesUsuario;
  minDate = new Date();
  date: Date;
  recorrido: any;

  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    }

  displayedColumns: string[] = [
    'fecIni',
    'fecFin',
    'fecRegistro',
    'periodo',
    'anio',
    'descripcion',
    'username',
    'nombre',
    'u_admin',
    'edit'];

  dataSourceTable: MatTableDataSource<VacacionesUsuario>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /* stepper */

  periodo: any = '';
  start: any;
  end: any;

  anioFormGroup = this._formBuilder.group({
    anio: ['', Validators.required],
  });

  periodoFormGroup = this._formBuilder.group({
    periodo: ['', Validators.required],
  });

  rangoFormGroup1 = this._formBuilder.group({
    start: ['', Validators.required],
  });

  rangoFormGroup2 = this._formBuilder.group({
    end: ['', Validators.required],
  });

  isLinear = true;
  maxDate: Date;
  minDate2: Date;
  maxDate2: Date;
  /* stepper */

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private administrativoService: AdministrativoService, private excelService: ExcelService) { 
    this.dataGrafica();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 0, 8, 30);

    this.minDate2 = new Date();
    this.maxDate2 = new Date(currentYear + 1, 1, 28);
  }

  initialized($event) {
    this.chart = $event.chart; // Storing the chart instance
  }

  ngOnInit(): void {
    this.getVacacionesByUser();
   
  }

  /* Obtener Vaciones de Usuario */
  getVacacionesByUser() {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    /* Obtener Correo de Usuario */
    this.http.get<any>("https://graph.microsoft.com/v1.0/me/mail").subscribe((mail) => {
      this.apiResponse = JSON.stringify(mail.value);

      /* Obtener Vacaciones y mostrar el Tabla  */
      this.http.post<any>(`${this.baseUrl}/vacaciones/usuario`, { username: mail.value }, { headers }).subscribe((res) => {
        this.dataSourceTable = new MatTableDataSource(res);
        this.dataSourceTable.paginator = this.paginator;
        this.dataSourceTable.sort = this.sort;
      });

    });
  }

  /* Filtro de Busqueda de vacaciones */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTable.filter = filterValue.trim().toLowerCase();
  }

  /* Obtener Datos del Usuario  */
  insertDataUser() {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    this.start = moment(this.rangoFormGroup1.value.start).format("YYYY-MM-DD");
    this.end = moment(this.rangoFormGroup2.value.end).format("YYYY-MM-DD");
    //this.selectedCalendario = moment(this.vacaciones.value.selectedCalendario).format("YYYY-MM-DD");

    /* Obtener Nombre de Usuario */
    this.http.get<DisplayName>("https://graph.microsoft.com/v1.0/me/displayName").subscribe(displayName => {
      this.apiResponse = JSON.stringify(displayName.value);
      console.log(displayName.value);

      /* Obtener Correo de Usuario */
      this.http.get<Mail>("https://graph.microsoft.com/v1.0/me/mail").subscribe((mail) => {
        this.apiResponse = JSON.stringify(mail.value);
        console.log(mail.value);

        /* Obtener Unidad Administrativa */
        this.http.get<OfficeLocation>("https://graph.microsoft.com/v1.0/me/officeLocation").subscribe(officeLocation => {
          this.apiResponse = JSON.stringify(officeLocation.value);
          console.log(officeLocation.value);

          /* POST para dias de vacaciones  */
          console.log("Año seleccionado: " + this.anioFormGroup.value.anio);
          console.log("Periodo seleccionado: " + this.periodoFormGroup.value.periodo);
          console.log("Fecha Inicial Seleccionada: " + this.rangoFormGroup1.value.start);
          console.log("Fecha Final Seleccionada: " + this.rangoFormGroup2.value.end);

          this.http.post(`${this.baseUrl}/vacaciones/agregar`, {
            fecIni: this.rangoFormGroup1.value.start,
            fecFin: this.rangoFormGroup2.value.end,
            estatusReg: "1",
            fecRegistro: Date(),
            descripcion: this.selectedComentario,
            periodo: this.periodoFormGroup.value.periodo,
            anio: this.anioFormGroup.value.anio,
            username: mail.value,
            nombre: displayName.value,
            u_admin: officeLocation.value
          }, { headers }).subscribe((res) => {
            this.apiResponse = JSON.stringify(res)
            console.log("Registro Enviado");
            this.dataGrafica();
          });
          this.getVacacionesByUser();
          this.dataGrafica();
        });
      });
    });
    
  }

  /* Borrar Registro */
  deleteRegistro(id: number) {
    if (confirm("Deseas Borrar el Registro ?")) {
      this.administrativoService.deleteRegistro(id).subscribe(() => {
      });
      confirm("Registro Eliminado Correctamente");
    }
    this.getVacacionesByUser();
    this.dataGrafica();
  }

  dataGrafica() {
    this.http.get<any>(`${this.baseUrl}/vacaciones/grafica`).subscribe((res) => {
      this.apiResponseUsers = (res);

      this.http.get<DatosUsuario>(`${this.baseUrl}/vacaciones/grafica/fecha-inicial`).subscribe((res) => {
        this.apiResponseFechaInicial = (res);
        console.log(this.apiResponseFechaInicial);

        this.http.get<any>(`${this.baseUrl}/vacaciones/grafica/fecha-final`).subscribe((res) => {
          this.apiResponseFechaFinal = (res);
          console.log(this.apiResponseFechaFinal);

          this.http.get<any>(`${this.baseUrl}/vacaciones/grafica/rango`).subscribe((res) => {
            this.apiResponseRango = (res);
            console.log(this.apiResponseRango);

            this.dataSourceChart = {
              chart: {
                theme: "fusion",
                caption: "Días Registrados",
                headerfontsize: "22",
                //subcaption: "Días Registrados",
                dateformat: "dd/mm/yyyy",
                outputdateformat: "ddds mns yy",
                ganttwidthpercent: "60",
                ganttPaneDuration: "40",
                ganttPaneDurationUnit: "d",
                plottooltext:
                  "$processName{br}$label Fecha de Inicio $start{br}$label Fecha Fin $end",
                legendBorderAlpha: "0",
                legendShadow: "0",
                usePlotGradientColor: "0",
                showCanvasBorder: "0",
                flatScrollBars: "1",
                gridbordercolor: "#000000",
                gridborderalpha: "20",
                slackFillColor: "#e44a00",
                taskBarFillMix: "light+0",
                exportEnabled: 1,
                exportFileName: "Plan Vacacional",
        exportTargetWindow: "_self",
              },
              categories: [
                {
                  bgcolor: "#2196F3",
                  category: [ /* periodos */
                    {
                      start: "1/11/2022",
                      end: "31/3/2023",
                      label: "Meses",
                      align: "middle",
                      fontcolor: "#000000",
                      fontsize: "16"
                    }
                  ]
                },
                {
                  bgcolor: "#FF5252",
                  align: "middle",
                  fontcolor: "#ffffff",
                  fontsize: "12",
                  category: [ /* Meses */
                    {
                      start: "1/11/2022",
                      end: "30/11/2022",
                      label: "Noviembre"
                    },
                    {
                      start: "1/12/2022",
                      end: "31/12/2022",
                      label: "Diciembre"
                    },
                    {
                      start: "1/1/2023",
                      end: "30/1/2023",
                      label: "Enero"
                    },
                    {
                      start: "1/2/2023",
                      end: "28/2/2023",
                      label: "Febrero"
                    },
                    {
                      start: "1/3/2023",
                      end: "31/3/2023",
                      label: "Marzo"
                    }
                  ]
                },
                {
                  bgcolor: "#2196F3",
                  fontcolor: "#333333",
                  fontsize: "11",
                  align: "center",
                  category: [ /* Semanas */
                    {
                      start: "1/11/2022",
                      end: "5/11/2022",
                      label: "Semana 44"
                    },
                    {
                      start: "6/11/2022",
                      end: "12/11/2022",
                      label: "Semana 45"
                    },
                    {
                      start: "13/11/2022",
                      end: "19/11/2022",
                      label: "Semana 46"
                    },
                    {
                      start: "20/11/2022",
                      end: "26/11/2022",
                      label: "Semana 47"
                    },
                    {
                      start: "27/11/2022",
                      end: "3/12/2022",
                      label: "Semana 48"
                    },
                    {
                      start: "4/12/2022",
                      end: "10/12/2022",
                      label: "Semana 49"
                    },
                    {
                      start: "11/12/2022",
                      end: "17/12/2022",
                      label: "Semana 50"
                    },
                    {
                      start: "18/12/2022",
                      end: "24/12/2022",
                      label: "Semana 51"
                    },
                    {
                      start: "30/12/2022",
                      end: "31/12/2022",
                      label: "Semana 52"
                    },
                    {
                      start: "1/1/2023",
                      end: "7/1/2023",
                      label: "Semana 1"
                    },
                    {
                      start: "8/1/2023",
                      end: "14/1/2023",
                      label: "Semana 2"
                    },
                    {
                      start: "30/1/2023",
                      end: "21/1/2023",
                      label: "Semana 3"
                    },
                    {
                      start: "23/1/2023",
                      end: "28/1/2023",
                      label: "Semana 4"
                    },
                    {
                      start: "29/1/2023",
                      end: "4/2/2023",
                      label: "Semana 5"
                    },
                    {
                      start: "5/2/2023",
                      end: "11/2/2023",
                      label: "Semana 6"
                    },
                    {
                      start: "12/2/2023",
                      end: "18/2/2023",
                      label: "Semana 7"
                    },
                    {
                      start: "19/2/2023",
                      end: "25/2/2023",
                      label: "Semana 8"
                    },
                    {
                      start: "26/2/2023",
                      end: "4/3/2023",
                      label: "Semana 9"
                    },
                    {
                      start: "5/3/2023",
                      end: "11/3/2023",
                      label: "Semana 10"
                    }
                  ]
                }
              ],
              processes: {
                headertext: "Nombre",
                fontcolor: "#000000",
                fontsize: "16",
                isanimated: "1",
                bgcolor: "#7986cb",
                headervalign: "center",
                headeralign: "center",
                headerbgcolor: "#536DFE",
                headerfontcolor: "#ffffff",
                headerfontsize: "18",
                align: "left",
                isbold: "1",
                bgalpha: "30",
                process: this.apiResponseUsers
              },
              datatable: {
                showprocessname: "1",
                namealign: "left",
                fontcolor: "#000000",
                fontsize: "14",
                valign: "right",
                align: "center",
                headervalign: "center",
                headeralign: "center",
                headerbgcolor: "#536DFE",
                headerfontcolor: "#ffffff",
                headerfontsize: "16",
                isbold: "1",
                datacolumn: [
                  {
                    bgcolor: "#eeeeee",
                    headertext: "Fecha Inicial",
                    text: this.apiResponseFechaInicial
                  },
                  {
                    bgcolor: "#eeeeee",
                    headertext: "Fecha Final",
                    text: this.apiResponseFechaFinal
                  }
                ]
              },/* aqui abajo */
              tasks: [this.apiResponseRango],
              connectors: [
                {
                  connector: [

                  ]
                }
              ],
              milestones: {
                milestone: [
                  {
                    date: "2/6/2022",
                    taskid: "12",
                    color: "#f8bd19",
                    shape: "star",
                    tooltext: "Completion of Phase 1"
                  }
                  /*{
                            "date": "21/8/2008",
                            "taskid": "10",
                            "color": "#f8bd19",
                            "shape": "star",
                            "tooltext": "New estimated moving date"
                        }*/
                ]
              },
              legend: {
                item: [
                  {
                    label: "Dias Solicitados",
                    color: "#008ee4"
                  },
                ]
              },
              trendlines: [
                {
                  line: [
                    {
                      start: "19/6/2022",
                      displayvalue: "AC Testing",
                      color: "333333",
                      thickness: "2",
                      dashed: "1"
                    }
                  ]
                }
              ]
            };
          });
        });
      });
    });
    
  }

  exportChart(e) {
    FusionCharts.batchExport({
      exportFormat: "pdf",
      exportFileName: "Plan Vacacional"
    });
  }

  /* Generar Formato de vacaciones */
  exportFormato(id: number){
    console.log("Descargar Formato de Vacaciones");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

    /* Obtener Correo de Usuario */
    this.http.get<any>("https://graph.microsoft.com/v1.0/me/mail").subscribe((mail) => {
      this.apiResponse = JSON.stringify(mail.value);

      /* Obtener Vacaciones y mostrar el Tabla  */
      this.administrativoService.getVacaciones(id).subscribe((res) =>{
        this.excelService.downloadExcel(res);
        this.apiResponse = JSON.stringify(res);
        
        console.log(this.apiResponse);
        
      });
      
    });
  }



}
