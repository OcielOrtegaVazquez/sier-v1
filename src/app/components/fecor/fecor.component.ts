import { Component, OnInit } from '@angular/core';

/* importar HTTP client para realizar peticiones HTTPS */
import { HttpClient } from '@angular/common/http';

/* importar form builder */
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fecor',
  templateUrl: './fecor.component.html',
  styleUrls: ['./fecor.component.css']
})
export class FecorComponent implements OnInit {

  constructor(private http: HttpClient) { }

  /* Creamos El objeto de cat_estados */
  estados = [
    {
      "cve": "AGS",
      "nombre": "AGUASCALIENTES"
    }
  ];

  /* creamos el objeto de cat_unidades */
  unidades = [{
    "estado": "AGS",
    "unidad": "AGS"
  }];

  /* objeto de plan de investigacion */
  public NumCar?: string;
  public Equipo?: string;
  public FechaCI?: string;
  public HoraCI?: string;
  public Fiscalia?: string;
  public AMPF?: string;
  public IdMP?: number;
  public jefeEIL?: string;
  public jefeUIL?: string;
  public titularUnidad?: string;

  /* Iniciamos APIResponse  */
  apiResponse: string;

  /* Iniciamos variables para Select de Formulario */
  selected: string;

  /* Iniciamos las variables del formulario de busqueda */
  selectedTipo = '';
  selectedEDO = '';
  selectedUnidad = '';
  numCar = '';
  anio = '';

  /* Iniciamos el Formulario para obtener los datos del Plan de Investigacion */
  numeroCarpeta = new FormGroup({
    tipo: new FormControl(''),
    edo: new FormControl(''),
    unidad: new FormControl(''),
    numCar: new FormControl(''),
    anio: new FormControl('')
  });

  ngOnInit(): void {
    this.getEstados();
    this.getUnidades();
  }

  /* Obtener todos los Planes de Investigacion */
  getPlanInvestigacion() {
    this.http.get("https://localhost:3000/planInvestigacion").subscribe(res => {
      this.apiResponse = JSON.stringify(res);
    })
  };

  /* Obtener Cat_Estados */
  getEstados() {
    this.http.get<any>("https://localhost:3000/catEstados").subscribe(res => {
      this.estados = res;
    })
  };

  /* Obtener Cat_Unidades */
  getUnidades() {
    this.http.get<any>("https://localhost:3000/catUnidad").subscribe(res => {
      this.unidades = res;
    })
  };

  /* Busqueda de Plan de investigacion Por Numero de carpeta */
  onSubmit() {
    if (this.numeroCarpeta.valid) {
      this.http.get<any>(`https://localhost:3000/planInvestigacion/${this.numeroCarpeta.value.tipo}/${this.numeroCarpeta.value.edo}/${this.numeroCarpeta.value.unidad}/${this.numeroCarpeta.value.numCar}/${this.numeroCarpeta.value.anio}`).subscribe(res => {

        /* Captura Numero de carpeta */
        this.NumCar = res[0].NumCar;

        /* Captura Nucleo */
        this.Equipo = res[0].Equipo;

        /* Captura Fecha Unidad */
        this.FechaCI = res[0].FechaCI;

        /* Captura Unidad */
        this.Fiscalia = res[0].Fiscalia;

        /* Captura AMPF */
        this.AMPF = res[0].AMPF;

        /* Captura Id AMPF */
        this.IdMP = res[0].AMPF_ID

        /* Obtener la estructura del la Celula  */
        this.http.get<any>(`https://localhost:3000/mpEstructura/${this.IdMP}`).subscribe(res => {

          /* Capturar Jefe EIL */
          this.jefeEIL = res[0].Nombre2;

          /* Capturar Jefe UIL */
          this.jefeUIL = res[0].Nombre3;

          /* Captura Titular Unidad */
          this.titularUnidad = res[0].Nombre4;

          /* Obtener Plan de Investigacion Asignado */
          this.http.get<any>(`https://localhost:3000/planDiligenciaCi/${this.numeroCarpeta.value.tipo}/${this.numeroCarpeta.value.edo}/${this.numeroCarpeta.value.unidad}/${this.numeroCarpeta.value.numCar}/${this.numeroCarpeta.value.anio}`).subscribe( res => {
            this.apiResponse = (res[0].Diligencia_id)
            console.log(res[0].Diligencia_id);
          })

        });
      });

    } else {
      alert("Rellena Todos los campos correctamente")
    }
  };

}
