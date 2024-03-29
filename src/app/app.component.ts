import { Component } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationResult } from '@azure/msal-common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/* Enviroment */
import { environment } from 'src/environments/environment';

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

  baseUrl = environment.baseUrl;

  apiResponse: string;

  displayedColumns: string[] = ['claim', 'value'];
  dataSource: Claim[] = [];
  private readonly _destroying$ = new Subject<void>();
  loginDisplay = false;

  /* Prime Faces */
  userDialog: boolean = true;
  userService: any;
  user ='1';
  constructor(private msalBroadcastService: MsalBroadcastService,
              private authService: MsalService,
              private http: HttpClient,
              private router: Router,
              private usuarioService: UsuarioService,
           
  ) {  }

  ngOnInit(): void {
 
    //localStorage.setItem('SeesionUser',this.res)

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
    /* this.callProfile(); */
    /* this.getAll();  */


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
    this.authService.logoutRedirect({postLogoutRedirectUri: 'https://reveco.fgr.org.mx/'}); //Eliminar de comentario para distribucion (build)
    /* this.authService.logout();  */ //comentar para distribucioón (build)
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
    this.http.get(`${this.baseUrl}/users`).subscribe(res => {
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

    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    this.http.get<Mail>("https://graph.microsoft.com/v1.0/me/mail").subscribe((mail) => {
      this.apiResponse = JSON.stringify(mail.value);

      /* Se Obtiene el valor de la Oficina administrativa y lo insertamos en la DB */
      this.http.get<OfficeLocation>("https://graph.microsoft.com/v1.0/me/officeLocation").subscribe(officeLocation => {
        this.apiResponse = JSON.stringify(officeLocation.value);

        /* Se obtiene el valor de Display Name y lo insertamos en la DB */
        this.http.get<DisplayName>("https://graph.microsoft.com/v1.0/me/displayName").subscribe(displayName => {
          this.apiResponse = JSON.stringify(displayName.value);

          /* Insertamos los valores obtenidos de la APIGraph y los insertamos en la DB */
          this.http.post(`${this.baseUrl}/users`,
            {
              username: mail.value,
              password: '',
              nombre: displayName.value,
              role: 'user',
              u_admin: officeLocation.value,
              sede: 'CDMX',
              subsede: 'SIER',
              cargo: 'MP'
            },  {headers})
            .subscribe(res => {
              this.apiResponse = JSON.stringify(res)
              console.log("Dato Enviado");
            });

          setTimeout(() => {
            this.http.post(`${this.baseUrl}/users/login`,
              {
                username: mail.value,
                password: 'Usytem@Reveco.fgr.org'
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
                console.log(res[0].id);
                localStorage.setItem("userActive", JSON.stringify(res));

              });
          }, 1000);
        });
      });
    });
  }

  userLogged(id: number) {   
      this.userService.sesionUser(id).subscribe( userLogged => {
        this.apiResponse = JSON.stringify(userLogged)
        console.log(userLogged);
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



