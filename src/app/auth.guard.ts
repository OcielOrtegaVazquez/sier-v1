import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { UsuarioService } from './services/usuario.service';
import { CoolLocalStorage } from '@angular-cool/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let usuarioactivo = JSON.parse(localStorage.getItem("userActive"));
    
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    let usuarioLocal = JSON.parse(localStorage.getItem("userActive"));
    console.log(usuarioLocal[0].role);

    if(usuarioLocal[0].role.includes(route.data.role)){
      return true;
    }else{
      this.router.navigateByUrl("/**")
      return false;
    }
    
  }

}
