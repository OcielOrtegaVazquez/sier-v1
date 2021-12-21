import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { MaslGuard } from './masl.guard';
import { CarpetaInvestigacionComponent } from './components/carpeta-investigacion/carpeta-investigacion.component';
import { CarpetasUniversoComponent } from './components/carpetas-universo/carpetas-universo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Carpetas2019Component } from './components/carpetas2019/carpetas2019.component';
import { Carpetas2021Component } from './components/carpetas2021/carpetas2021.component';


const routes: Routes = [
  {path : '', component: CarpetaInvestigacionComponent},
  {path : 'carpeta', component: CarpetaInvestigacionComponent},
  {path : 'carpetas2021', component: Carpetas2021Component},
  {path : 'carpetas2020', component: CarpetasUniversoComponent},
  {path : 'carpetas2019', component: Carpetas2019Component},
  {path: 'restricted-page', component: RestrictedPageComponent, canActivate: [MaslGuard]},
  {path : '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
