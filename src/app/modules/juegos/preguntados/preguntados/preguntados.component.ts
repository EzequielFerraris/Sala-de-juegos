import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { BanderasService } from '../../../../services/banderas.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  public paises! : any[];
  public puntaje = 0;
  public bandera_actual : string = "";
  public pais_actual : any;
  public paises_usados_id : number[] = [];
  public texto_pregunta = "";
  public opciones_respuesta : string[] = [];
  private respuesta_correcta = "";
  public indice! : number;
  

  constructor(private banderas : BanderasService)
  {
  }

  ngOnInit()
  {
    this.banderas.obtener_paises().subscribe(
      {
        next: (paises) => { 
          this.paises = paises;
          this.elegir_un_pais();
        },
        error: (e) => { console.log(e) }
      });
  }

  elegir_un_pais()
  {
    while(true)
    {
      this.indice = Math.floor(Math.random() * this.paises.length);
      if(!this.paises_usados_id.includes(this.indice))
      {
        break;
      }
    }
    this.pais_actual = this.paises[this.indice];
    this.bandera_actual = this.pais_actual.flags.png;
    this.paises_usados_id.push(this.indice);
    this.opciones_respuesta = [];
    this.elegir_pregunta();
  }

  elegir_pregunta()
  {
    let tipo_pregunta = Math.floor(Math.random() * 2 + 1);;

    switch (tipo_pregunta)
    {
      case 1:
        this.pregunta_bandera_pais();
      break;
      case 2:
        this.pregunta_bandera_pais();
      break;
    }
  }

  pregunta_bandera_pais()
  {
    this.texto_pregunta = "¿A qué país corresponde la siguiente bandera?";
    this.respuesta_correcta = this.pais_actual.translations.spa.official;
    this.opciones_respuesta.push(this.respuesta_correcta);
    let otras = 0;
    while(otras < 3)
    {
      let indice = Math.floor(Math.random() * this.paises.length);
      if(this.opciones_respuesta.includes(this.paises[indice].translations.spa.official))
      {
        continue;
      }
      else
      {
        this.opciones_respuesta.push(this.paises[indice].translations.spa.official);
      }
      otras++;
    }
    this.opciones_respuesta = this.mezclar_array(this.opciones_respuesta);
  }

  elegir_respuesta(opcion : string)
  {
    if(opcion == this.respuesta_correcta)
    {
      this.puntaje += 20;
      Swal.fire(
      {
        title: 'CORRECTO',
        text: '¡Acertaste! Ganaste 20 puntos.',
        icon: 'success',
        iconColor: '#ffffff',
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        background: '#26813a',
        color: "#ffffff",
      }).then(()=> {this.elegir_un_pais()});
    }
    else
    {
      
      if(this.puntaje > 10)
      {
        this.puntaje -= 10;
      }
      Swal.fire(
        {
          title: 'INCORRECTO',
          text: 'La respuesta correcta era: ' + this.respuesta_correcta,
          icon: 'error',
          iconColor: '#ffffff',
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          background: '#ff7900',
          color: "#ffffff",
        }).then(()=> {this.elegir_un_pais()});   
    }
  }

  mezclar_array<T>(array: T[]): T[] {
    const length = array.length;
    for (let i = length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /*
  pregunta_pais_capital()
  {
    this.texto_pregunta = "¿Cuál es la capital de " + this.pais_actual.translations.spa.official + "?";
    this.respuesta_correcta = this.pais_actual.capital;
    let otras = 0;
    while(otras < 3)
    {

      otras++;
    }
  }
  */
 
  //LOGICA
  //UN PANEL DE BIENVENIDA CON LAS REGLAS Y UN BOTÓN DE COMENZAR
  //UNA VEZ QUE COMENZAMOS APARECE UNA BANDERA Y UNA PREGUNTA CON OPCIONES ALEATORIAS. TAMBIÉN UN CONTADOR DE PUNTOS Y UN BOTÓN DE "RETIRARSE" PARA GANAR LOS PUNTOS.
  //DOS TIPOS DE PREGUNTAS > PAIS DE LA BANDERA Y CAPITAL DEL PAÍS DE LA BANDERA
  //SI SE ELIGE LA OPCIÓN CORRECTA, SE SUMAN 20 PUNTOS
  //SI NO SE ELIGE LA CORRECTA, SE RESTAN 10 PUNTOS

}
