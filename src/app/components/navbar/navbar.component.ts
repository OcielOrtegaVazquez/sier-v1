import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    items: MenuItem[];

    @Input() nombreUsuario: any = '';
    @Output() cerrarSesion = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {

        this.items = [
            {
                label: 'Carpetas',
                icon: 'pi pi-pw pi-folder',
                items: [
                    { label: 'Universo 2022', icon: 'pi pi-fw pi-database', routerLink: "/carpetas2022" },
                    { label: 'Universo 2021', icon: 'pi pi-fw pi-database', routerLink: "/carpetas2021" },
                    { label: 'Universo 2020', icon: 'pi pi-fw pi-database', routerLink: "/carpetas2020" },
                    { label: 'Universo 2019', icon: 'pi pi-fw pi-database', routerLink: "/carpetas2019" },
                    { label: 'Carpeta', icon: 'pi pi-fw pi-external-link', routerLink: "/carpeta" }
                ]
            },
            {
                label: 'PowerBI',
                icon: 'pi pi-fw pi-chart-bar',
                items: [
                    { label: 'Indicadores', icon: 'pi pi-fw pi-chart-pie', routerLink: "/reportesPowerBi" },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            },
            {
                label: 'FECOR',
                icon: 'pi pi-fw pi-building',
                items: [
                    { label: 'Plan de Investigación', icon: 'pi pi-pi pi-search', routerLink: "/plan-investigacion"},
                    { label: 'Listado Personal', icon: 'pi pi-pi pi-sitemap', routerLink: "/estructura-fecor"},
                ]
            },
            {
                label: 'PFM',
                icon: 'pi pi-fw pi-database',
                items: [
                    { label: 'Descarga de Datos', icon: 'pi pi-pi pi-file-o', routerLink: "/cmi"},
                    { label: 'Resumen CMI', icon: 'pi pi-pi pi-chart-bar', routerLink: "/resumen-cmi"},
                ]
            },
            {
                label: 'Admin',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Usuarios', icon: 'pi pi-pi pi-users', routerLink: "/users"
                    },
                    {
                        label: 'Vistas PFM', icon: 'pi pi-fw pi-database', routerLink: "/descarga-pfm"
                    }
                                      
                ]
            },
            {
                label: 'Vacaciones',
                icon: 'pi pi-pi pi-users',
                routerLink: "/administrativo"
            }
        ];

    }

    logout() {
        this.cerrarSesion.emit();
    }


}
