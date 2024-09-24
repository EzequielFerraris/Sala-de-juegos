import { Component } from '@angular/core';
import { baraja } from './baraja';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  public carta_actual: any[];
  private carta_nueva: any[];;
  public apuesta : number;
  public puntos : number = 10;
  public mazo : any[];
  public esperando = true;

  constructor()
  {
    this.carta_actual = ["https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fcartas_espa%C3%B1olas%2Freverso.png?alt=media&token=b834902b-c80d-477b-813e-809748ac7260"];
    this.carta_nueva = [];
    this.apuesta = 1;
    this.mazo = Object.values(baraja);
  }

  comenzar()
  {
    this.carta_actual = this.obtener_carta();
    this.esperando = false;
  }

  obtener_carta()
  {
    let numero = Math.floor(Math.random() * this.mazo.length);

    let carta = this.mazo[numero];

    this.mazo.splice(numero, 1);

    return carta;
  }

  jugar(eleccion : string)
  {
    this.carta_nueva = this.obtener_carta();

    switch(eleccion)
    {
      case 'mayor':
        if(this.carta_actual[1] < this.carta_nueva[1])
        {
          this.correcto();
        }
        else
        {
          this.incorrecto();
        }
      break;
      case 'igual':
        if(this.carta_actual[1] == this.carta_nueva[1])
        {
          this.correcto();
        }
        else
        {
          this.incorrecto();
        }
      break;
      case 'menor':
        if(this.carta_actual[1] > this.carta_nueva[1])
        {
          this.correcto();
        }
        else
        {
          this.incorrecto();
        }
      break;
    }
    console.log(this.apuesta);
    this.carta_actual = this.carta_nueva;
    this.carta_nueva = [];

  }

  correcto()
  {
    this.puntos += this.apuesta * 2;
    if(this.puntos > 30)
    {
      Swal.fire(
        {
          title: '¡VICTORIA!',
          text: 'Tus puntos se acreditarán en tu cuenta.',
          icon: 'success',
          iconColor: '#256fa2',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#256fa2',
          background: '#f7c548',
          color: "#256fa2",
        }).then(()=> {window.location.reload()});
    }
    else
    {
      Swal.fire(
        {
          title: 'BUENA SUERTE',
          text: '¡Acertaste! La suerte te sonríe.',
          icon: 'success',
          iconColor: '#256fa2',
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          background: '#a1c828',
          color: "#256fa2",
        });
    } 
  }

  incorrecto()
  {
    this.puntos -= this.apuesta;
    if(this.puntos <= 0)
    {
      Swal.fire(
        {
          title: 'GAME OVER',
          text: '¡Te has quedado sin puntos! Vuelve cuando tengas más.',
          icon: 'error',
          iconColor: '#f7c548',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#f7c548',
          background: '#F2573C',
          color: "#f7c548",
        }).then(()=> {window.location.reload()});
    }
    else
    {
      Swal.fire(
        {
          title: 'MALA SUERTE',
          text: '¡Intentalo nuevamente!',
          icon: 'error',
          iconColor: '#F2573C',
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          background: '#f7c548',
          color: "#F2573C",
        });
    }
    
  }

  reglas()
  {
    let reglas = "La partida comienza en cuanto presionas el botón 'Comenzar'. " + 
                  "En cada ronda debes intentar adivinar si la carta siguiente es mayor, menor o igual a la que aparece en la pantalla. " +
                  "Cuentas con una cantidad inicial de puntos para apostar. " +
                  "En cada ronda puedes elegir cuántos de esos puntos arriesgar. Si el resultado es positivo, ganarás el doble de lo apostado. " +
                  "Sin embargo, si pierdes, esos puntos se deducirán de tu total. " + "Pierdes la partida si pierdes todos tus puntos. " +
                  "¡Si logras llegar a 50 puntos o más, ganas la partida y todos los puntos ganados hasta ese momento! "

    Swal.fire(
      {
        title: 'REGLAS',
        text: reglas,
        color: "#256fa2",
        icon: 'question',
        iconColor: '#F2573C',
        background: '#e9d1aa',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#F2573C'
      });
  }


}
