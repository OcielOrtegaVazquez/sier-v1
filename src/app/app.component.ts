import { Component, ViewChild } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { delay, filter, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResult } from '@azure/msal-common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/* importamos Interface de Mail */
import { Mail } from './interfaces/usuario';

/* importamos Interface de OfficeLocation (Unidad Administrativa) */
import { OfficeLocation } from './interfaces/usuario';

/* importamos Interface de DisplayName (Nombre Para mostrar) */
import { DisplayName } from './interfaces/usuario';

/* importamos el servicio se UserService */
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'FGR-GRID-V2';

  apiResponse: string;

  displayedColumns: string[] = ['claim', 'value'];
  dataSource: Claim[] = [];
  private readonly _destroying$ = new Subject<void>();

  loginDisplay = false;

  constructor(private msalBroadcastService: MsalBroadcastService, private authService: MsalService, private http: HttpClient, private router: Router, private usuarioService: UsuarioService,
  ) {
  }
  ngOnInit(): void {

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None || status === InteractionStatus.HandleRedirect),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims);
        this.mail();

      });

    this.getName();
    /* this.callProfile(); 
    /* this.getAll(); */
  }

  checkAndSetActiveAccount() {

    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  /* Obtener los datos y token de usuario */
  getClaims(claims: any) {

    let list: Claim[] = new Array<Claim>();

    Object.keys(claims).forEach(function (k, v) {

      let c = new Claim()
      c.id = v;
      c.claim = k;
      c.value = claims ? claims[k] : null;
      list.push(c);

    });
    this.dataSource = list;
  }

  /* Verificar si esta loggeado */
  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null
  }

  login() {
    // this.authService.loginRedirect();
    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
      });
  }

  /* Obtener el nombre del Usario Activo */
  getName(): string {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'unknown'
    }

    return this.authService.instance.getActiveAccount().name
  }

  /* Cerrar sesión y direccionamiento en la pagina de inicio */
  logout() {
    /* this.authService.logoutRedirect({postLogoutRedirectUri: 'https://reveco.fgr.org.mx/'}); */ //Eliminar de comentario para distribucion (build)
    this.authService.logout(); //comentar para distribucio (build)
  }

  /* Obtener todos los datos del usuario  */
  callProfile() {
    this.http.get("https://graph.microsoft.com/v1.0/me").subscribe(resp => {
      this.apiResponse = JSON.stringify(resp);
      console.log(resp);
    });
  }

  /* Obtener todos los usuarios de la DB */
  getAll() {
    this.http.get("http://localhost:3300/users").subscribe(res => {
      this.apiResponse = JSON.stringify(res);
      console.log(res);
    });
  }

  /* Obtener el Display Name (nombre para mostrar) */
  displayName() {
    this.http.get("https://graph.microsoft.com/v1.0/me/displayName").subscribe(displayName => {
      this.apiResponse = JSON.stringify(displayName);
    });
  }

  /* Obtenemos el mail principal del usuario y lo insertamos en la DB */
  mail() {
    this.http.get<Mail>("https://graph.microsoft.com/v1.0/me/mail").subscribe((mail) => {
      const apiResponse = JSON.stringify(mail.value);

      /* Se Obtiene el valor de la Oficina administrativa y lo insertamos en la DB */
      this.http.get<OfficeLocation>("https://graph.microsoft.com/v1.0/me/officeLocation").subscribe(officeLocation => {
        this.apiResponse = JSON.stringify(officeLocation.value);

        /* Se obtiene el valor de Display Name y lo insertamos en la DB */
        this.http.get<DisplayName>("https://graph.microsoft.com/v1.0/me/displayName").subscribe(displayName => {
          this.apiResponse = JSON.stringify(displayName.value);

          /* Insertamos los valores obtenidos de la APIGraph y los insertamos en la DB */
          this.http.post(`http://localhost:3300/users`,
            {
              username: mail.value,
              password: '',
              nombre: displayName.value,
              role: 'user',
              u_admin: officeLocation.value,
              sede: 'CDMX',
              subsede: 'SIER',
              cargo: 'MP'
            })
            .subscribe(res => {
              console.log("Dato Enviado");
            });

          setTimeout(() => {
            this.http.post(`http://localhost:3300/auth/login`,
              {
                username: mail.value,
                password: ''
              }).subscribe(res => {

                console.log("sesion Iniciada");
                console.log("-------------------------------------------");
                console.log("***** Mail: " + mail.value + " *****");
                console.log("-------------------------------------------");
                console.log("***** Usuario: " + displayName.value + " *****");
                console.log("-------------------------------------------");
                console.log("***** Unidad Administrativa: " + officeLocation.value + " *****");
                console.log("-------------------------------------------");
                console.log(res);
              });
          }, 1000)

        });
      });
    });
  }

  /* Obtener Mails Recientes */
  callMessages() {
    this.http.get("https://graph.microsoft.com/v1.0/me/messages").subscribe(resp => {
      this.apiResponse = JSON.stringify(resp);
      console.log(resp);
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
  /* Changes end here. */

}

export class Claim {
  id: number;
  claim: string;
  value: string;
}



