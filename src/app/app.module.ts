import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ExcelService } from './services/excel.service';
import { NgTerminalModule } from 'ng-terminal';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { NgxChildProcessModule } from 'ngx-childprocess';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

/* Importamos las instancias */
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

/* Importamos los modulos de material */
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';

/* Importacion para interceptor */
import { HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { MsalInterceptor, MsalInterceptorConfiguration, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

/* Componentes */
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarpetaInvestigacionComponent } from './components/carpeta-investigacion/carpeta-investigacion.component';
import { CarpetasUniversoComponent } from './components/carpetas-universo/carpetas-universo.component';
import { Carpetas2019Component } from './components/carpetas2019/carpetas2019.component';
import { Carpetas2021Component } from './components/carpetas2021/carpetas2021.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FecorComponent } from './components/fecor/fecor.component';
import { EstructuraFecorComponent } from './components/estructura-fecor/estructura-fecor.component';
import { Carpetas2022Component } from './components/carpetas2022/carpetas2022.component';
import { ReportesPowerBiComponent } from './components/reportes-power-bi/reportes-power-bi.component';
import { CmiComponent } from './components/cmi/cmi.component';

/* Material Data Grid */
import { AngularMaterialDataGridModule } from 'angular-material-data-grid';
import { MatDialogModule } from '@angular/material/dialog';

/* Libreria PrimeNg */
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';

/* Exporter mat-table */
import { MatTableExporterModule } from 'mat-table-exporter';

/* Spinner */
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './services/interceptor.service';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

/* Local Storage */
import { CoolStorageModule } from '@angular-cool/storage';
import { AuthService } from './services/auth.service';
import { ResumenCMIComponent } from './components/resumen-cmi/resumen-cmi.component';

/* Ngx- Charts */
import { ChartsModule } from 'ng2-charts';
import { PFMViewsComponent } from './components/pfmviews/pfmviews.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';

import { NgGanttEditorModule } from 'ng-gantt';
import { NgxGanttModule } from '@worktile/gantt';
import { FusionChartsModule } from "angular-fusioncharts";

/* Exportar funcion con datos de la aplicacion en portal Azure */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '99d8d763-a0db-46ed-ac60-b09724e570e5',
      authority: "https://login.microsoftonline.com/pgr.gob.mx/",
      redirectUri: 'http://localhost:4200'
    }
  });
}

/* Exportar funcion para Interceptor */
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);
  
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as Gantt from "fusioncharts/fusioncharts.gantt";
import * as Widgets from "fusioncharts/fusioncharts.widgets.js";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, Gantt, FusionTheme);


@NgModule({
  declarations: [
    AppComponent,
    PublicPageComponent,
    RestrictedPageComponent,
    NavbarComponent,
    CarpetaInvestigacionComponent,
    CarpetasUniversoComponent,
    HeaderComponent,
    NotFoundComponent,
    Carpetas2019Component,
    Carpetas2021Component,
    ReportesPowerBiComponent,
    Carpetas2022Component,
    FecorComponent,
    EstructuraFecorComponent,
    CmiComponent,
    UsuariosComponent,
    ResumenCMIComponent,
    PFMViewsComponent,
    AdministrativoComponent
  ],
  imports: [
    BrowserModule,
    MatStepperModule,
    NgGanttEditorModule,
    FusionChartsModule,
    NgxGanttModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MsalModule,
    HttpClientModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSortModule,
    MatSelectModule,
    AngularMaterialDataGridModule,
    ReactiveFormsModule,
    PanelMenuModule,
    ButtonModule,
    TableModule,
    MenubarModule,
    MatDialogModule,
    MatTableExporterModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    ToastModule,
    DialogModule,
    ToolbarModule,
    FileUploadModule,
    ConfirmDialogModule,
    RatingModule,
    CoolStorageModule,
    ChartsModule,
    NgTerminalModule,
    TerminalModule,
    NgxChildProcessModule,
   
    SweetAlert2Module.forRoot()
  ],
  providers: [ExcelService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
   {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },{
      provide: AuthService
    },{
      provide : TerminalService
    }
  ], 
  bootstrap: [AppComponent],
 
})
export class AppModule { }
