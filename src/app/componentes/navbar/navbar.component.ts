import { Component } from '@angular/core';
import { Router, } from '@angular/router';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars as fasBars } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, FontAwesomeModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
estadoMenu: boolean = false;

usuario : any;

constructor(private router: Router, 
              public authService : AuthService,
              public library: FaIconLibrary, 
)
{
  library.addIcons(fasBars);
}

ngOnInit()
{
  this.usuario = localStorage.getItem("mailUsuario");
}

//MENU HAMBURGUESA
mostrarMenu()
{
  this.estadoMenu = !this.estadoMenu;
}

//BOTON RUTA AL LOGIN COMPONENT
log_button()
{
  this.router.navigate(['login']);
}

chat()
{
  this.router.navigate(['chat']);
}

}
