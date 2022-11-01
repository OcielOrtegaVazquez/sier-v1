import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { MaslGuard } from './masl.guard';
import { AuthGuard } from './auth.guard';
import { CarpetaInvestigacionComponent } from './components/carpeta-investigacion/carpeta-investigacion.component';
import { CarpetasUniversoComponent } from './components/carpetas-universo/carpetas-universo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Carpetas2019Component } from './components/carpetas2019/carpetas2019.component';
import { Carpetas2021Component } from './components/carpetas2021/carpetas2021.component';
import { ReportesPowerBiComponent } from './components/reportes-power-bi/reportes-power-bi.component';
import { Carpetas2022Component } from './components/carpetas2022/carpetas2022.component';
import { FecorComponent } from './components/fecor/fecor.component';
import { EstructuraFecorComponent } from './components/estructura-fecor/estructura-fecor.component';
import { CmiComponent } from './components/cmi/cmi.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ResumenCMIComponent } from './components/resumen-cmi/resumen-cmi.component';
import { MsalGuard } from '@azure/msal-angular';
import { PFMViewsComponent } from './components/pfmviews/pfmviews.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';

const routes: Routes = [
  {path : '',                   component: CarpetaInvestigacionComponent, canActivate: [MaslGuard]},
  {path : 'carpeta',            component: CarpetaInvestigacionComponent, canActivate: [MaslGuard]},
  {path : 'carpetas2021',       component: Carpetas2021Component, canActivate: [MaslGuard]},
  {path : 'carpetas2020',       component: CarpetasUniversoComponent, canActivate: [MaslGuard]},
  {path : 'carpetas2019',       component: Carpetas2019Component, canActivate: [MaslGuard]},
  {path : 'carpetas2022',       component: Carpetas2022Component, canActivate: [MaslGuard]},
  {path : 'reportesPowerBi',    component: ReportesPowerBiComponent, canActivate: [MaslGuard]},
  {path : 'plan-investigacion', component: FecorComponent, canActivate: [MaslGuard]},
  {path : 'estructura-fecor',   component: EstructuraFecorComponent, canActivate: [MaslGuard]},
  {path : 'cmi',                component: CmiComponent, canActivate: [MaslGuard]},
  {path : 'resumen-cmi',        component: ResumenCMIComponent, canActivate: [MaslGuard]},
  {path : 'users',              component: UsuariosComponent, data: {role: 'admin'}, canActivate: [MaslGuard, AuthGuard]},
  {path : 'descarga-pfm',       component: PFMViewsComponent, data: {role: 'admin'}, canActivate: [MaslGuard, AuthGuard]},
  {path : 'administrativo',     component: AdministrativoComponent, canActivate: [MaslGuard]},
  {path : 'restricted-page',    component: RestrictedPageComponent, canActivate: [MaslGuard]},
  {path : '**',                 component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
