import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  public img = ["https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F0.png?alt=media&token=6457c85b-a7f1-40a3-ae09-1fa953e61be7",
                "https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F1.png?alt=media&token=62b04bf9-804e-474a-880a-6ce4fc5c435a",
                "https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F3.png?alt=media&token=a1eb73ac-5e28-4874-9df7-09101d6b07bb",
                "https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F4.png?alt=media&token=713cd05c-a134-42ca-aafe-ce4d67ccbafa",
                "https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F5.png?alt=media&token=1bb05f0a-666e-4a49-a2a4-3d4019cbf020",
                "https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F6.png?alt=media&token=9fb3a699-025b-4a6b-a436-1495498f3e15",
                "https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F7.png?alt=media&token=ad48ef0c-fce5-4de8-b463-9758f3bb5ff1",
                "https://firebasestorage.googleapis.com/v0/b/prueba1-7bc74.appspot.com/o/assets%2Fimg%2Fhangman%2F8.png?alt=media&token=156b653a-ab79-43eb-8a8d-8dd680ef128a"
  ]
  public error : any;
  public palabra : any[];
  public intentos_fallidos = 0;
  public letras_adivinadas : string[];

  constructor(private http : HttpClient){
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
              text: '¡Has escapado con todas tus ganancias!',
              icon: 'success',
              iconColor: '#3b82f6',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#3b82f6',
              background: '#ccb99a',
              color: "#3b82f6",
            }).then(()=> {window.location.reload()});
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
          }).then(()=> {window.location.reload()});
         
      }
    }

  }
}
