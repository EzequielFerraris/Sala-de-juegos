import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { faBriefcaseClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  public usuario : any;  

  constructor(private router: Router,)
  {}
  
  ngOnInit(){
    this.usuario = localStorage.getItem("mailUsuario");
  }

  seleccion(juego : string)
  {
    let descripcion = "Un juego";
    let ruta = '';

    switch(juego)
    {
      case 'Ahorcado':
        ruta = 'juegos/ahorcado';
        descripcion = 'Bienvenido al Lejano Oeste, la tierra en la que deberás adivinar palabras en español o morirás en la horca.';
      break;
      case 'Mayor, menor, igual':
        ruta = 'juegos/mayor-menor';
        descripcion = 'Bienvenido al Brasil, donde deberás adivinar el número secreto para no ser enterrado en la arena de la playa.';
      break;
      case 'Sudoku':
        ruta = 'juegos/sudoku';
        descripcion = 'Bienvenido a Japón, el lugar donde solo ganana puntos quienes usan su sabiduría ancestral para descifrar enigmas numéricos.';
      break;
      case 'Preguntados':
        ruta = 'juegos/preguntados';
        descripcion = 'Bienvenido a Irlanda, donde deberás acertar en tu conocimiento geográfico para ganar monedas de oro.';
      break;
    }

    Swal.fire({
      title: juego,
      text: descripcion,
      icon: "warning",
      iconColor: '#FF00C1',
      showCancelButton: true,
      confirmButtonColor: "#FF00C1",
      cancelButtonColor: "#3a0ca3",
      confirmButtonText: "Ir al juego"
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.usuario)
        {
          this.router.navigate([ruta]);
        }
        else
        {
          this.router.navigate(['login']);
        }
      }
    });
  }
}
