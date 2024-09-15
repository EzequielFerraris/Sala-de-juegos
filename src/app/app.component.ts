import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./componentes/home/home.component";
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars as fasBars } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
import { Auth, signOut, onAuthStateChanged } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NgClass, FontAwesomeModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //MENU HAMBURGUESA
  estadoMenu: boolean = false;

  //LOCAL STORAGE
  public mailUsuario: any;

  constructor(private router: Router, 
                library: FaIconLibrary, 
                public auth: Auth)
  {
    library.addIcons(fasBars);
    
  }

  ngOnInit() 
  {
    onAuthStateChanged(this.auth, (user) => {
      if (localStorage.getItem('mailUsuario'))
        {
          this.mailUsuario = localStorage.getItem('mailUsuario');
          
        }
        else
        {
          this.mailUsuario = "";
        }
    } );

    if (localStorage.getItem('mailUsuario'))
    {
      this.mailUsuario = localStorage.getItem('mailUsuario');
      
    }
    else
    {
      this.mailUsuario = "";
    }
  }

  //MENU HAMBURGUESA
  mostrarMenu()
  {
    this.estadoMenu = !this.estadoMenu;
  }

  log_out()
  {
    signOut(this.auth).then((res) => {
      localStorage.removeItem('mailUsuario');
      Swal.fire(
        {
          title: 'Salir',
          text: 'Ha salido correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      this.ngOnInit();
      this.router.navigate(['home']);
    }).catch((e) => {
      let mensaje = ''; 
        switch(e.code)
        {
          default:
            mensaje = e.code;
          break;
        }
        Swal.fire(
          {
            title: 'Error',
            text: mensaje,
            icon: 'error',
            confirmButtonText: 'Ok'
          }); 
    });
  }
  
  //BOTON RUTA AL LOGIN COMPONENT
  log_button()
  {
    this.router.navigate(['login']);
  }
}
