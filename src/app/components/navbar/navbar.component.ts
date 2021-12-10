import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() nombreUsuario: any = '';
  @Output() cerrarSesion = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    this.cerrarSesion.emit();
  }


}
