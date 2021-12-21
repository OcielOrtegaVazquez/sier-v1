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
            {label: 'Universo 2021', icon: 'pi pi-fw pi-database',  routerLink: "/"},
            {label: 'Universo 2020', icon: 'pi pi-fw pi-database',  routerLink: "/universo"},
            {label: 'Universo 2019', icon: 'pi pi-fw pi-database',  routerLink: "/"},
            {label: 'Carpeta', icon: 'pi pi-fw pi-external-link', routerLink: "/carpeta"}
          ]
      },
      {
          label: 'Consultas',
          icon: 'pi pi-fw pi-search',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
          label: 'Ayuda',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents',
                  icon: 'pi pi-pi pi-bars'
              },
              {
                  label: 'Search', 
                  icon: 'pi pi-pi pi-search', 
                  items: [
                      {
                          label: 'Text', 
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'User',
                          icon: 'pi pi-fw pi-file',
                      }
              ]}
          ]
      },
      {
          label: 'Actions',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Save', icon: 'pi pi-fw pi-save'},
                      {label: 'Update', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      }
  ];
    
  }

  logout(){
    this.cerrarSesion.emit();
  }


}
