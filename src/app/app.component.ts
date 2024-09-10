import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./componentes/home/home.component";
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars as fasBars } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NgClass, FontAwesomeModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo: string = 'sala_de_juegos';
  estadoMenu: boolean = false;
  logged: boolean = false;

  constructor(private router: Router, library: FaIconLibrary, )
  {
    library.addIcons(fasBars);
  }

  mostrarMenu()
  {
    this.estadoMenu = !this.estadoMenu;
  }

  log_button()
  {
    this.router.navigate(['login']);
  }

  log_out_mensaje()
  {
    Swal.fire(
      {
        title: 'Salir',
        text: 'Has salido correctamente.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
  }
}
