import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PuntajeService } from '../../../../services/puntaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  private url = "https://clientes.api.greenborn.com.ar/public-random-word?c=1";
  public abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", 
                        "I", "J", "K", "L", "M", "N", "Ñ", "O", 
                        "P", "Q", "R", "S", "T", "U", "V", "W", 
                        "X", "Y", "Z"];
  public img = ["https://i.postimg.cc/MpQsRgXJ/0.png",
                  "https://i.postimg.cc/28Jc1Ckx/1.png",
                  "https://i.postimg.cc/7YbtP5k6/2.png",
                  "https://i.postimg.cc/ydPpx9xJ/3.png",
                  "https://i.postimg.cc/7hZs26JK/4.png",
                  "https://i.postimg.cc/d3NWmY8w/5.png",
                  "https://i.postimg.cc/CKpc4JfB/6.png",
                  "https://i.postimg.cc/ZYwDhrX2/7.png"]
                  
  public error : any;
  public palabra : any[];
  public intentos_fallidos = 0;
  public letras_adivinadas : string[];

  constructor(private http : HttpClient,
              private puntaje : PuntajeService
             )
  {
    this.palabra = [];
    this.letras_adivinadas = [];
  }

  ngOnInit()
  {
    this.obtener_palabra();
  }

  obtener_palabra() 
  {
    this.http.get<any[]>(this.url).subscribe(
      {
        next: (data) => { 
          this.palabra = data;
          this.palabra[0] = this.palabra[0].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          this.palabra[0] = this.palabra[0].toUpperCase();
        },
        error: (e) => { console.log(e) }
      }
    );
  }

  check(letra : string, event : any)
  {
    event.target.disabled = true;
    
    if(this.palabra[0].includes(letra))
    {
        this.letras_adivinadas.push(letra)
        
        let victoria = true;
        
        let arr = this.palabra[0].split("");

        for(let i = 0; i < arr.length; i++)
        {
          if(!this.letras_adivinadas.includes(arr[i]))
            {
              console.log(arr);
              victoria = false;
              break;
            }
        }

        if(victoria)
        {
          Swal.fire(
            {
              title: 'VICTORIA',
              text: '¡Has escapado con 200 monedas de oro!',
              icon: 'success',
              iconColor: '#3b82f6',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#3b82f6',
              background: '#ccb99a',
              color: "#3b82f6",
            }).then(() => 
            { 
              this.puntaje.guardar_puntaje(200, [200,0,0,0]).then(()=> 
                {
                  this.puntaje.guardar_partida_jugada('VICTORIA', 200).then(() =>
                  {
                    window.location.reload()
                  })
                })
            });
        }
    }
    else
    {
      this.intentos_fallidos += 1;
      if(this.intentos_fallidos == 7)
      {
        Swal.fire(
          {
            title: 'DERROTA',
            text: 'El Sheriff se lleva la victoria esta vez',
            icon: 'error',
            iconColor: '#f2573c',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#f2573c',
            background: '#ccb99a',
            color: "#f2573c",
          }).then(() => 
            {
              this.puntaje.guardar_partida_jugada('DERROTA', 0).then(() =>
                {
                  window.location.reload()
                })
            });
         
      }
    }

  }
}
