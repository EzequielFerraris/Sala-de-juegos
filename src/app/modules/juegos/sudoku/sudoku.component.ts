import { Component } from '@angular/core';
import { getSudoku } from 'sudoku-gen';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';
import { PuntajeService } from '../../../services/puntaje.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.css'
})
export class SudokuComponent {
  public sudoku_actual : any;
  public board : any = [[], [], [], [], [], [], [], [], []];
  public original : any = [];
  private tabla_solucion : any = [[], [], [], [], [], [], [], [], []];
  public dificultad_menu : boolean;
  public puntos = 0;

  constructor(private puntaje : PuntajeService)
  {
    this.dificultad_menu = true;
  }

  ngOnInit(){}

  generar_sudoku(dificultad: Difficulty)
  {
    //OBTENER EL TABLERO A JUGAR
    this.sudoku_actual = getSudoku(dificultad);
    //OBTENER LOS PUNTOS
    switch(dificultad)
    {
      case 'easy':
        this.puntos = 200;
      break;
      case 'medium':
        this.puntos = 300;
      break;
      case 'hard':
        this.puntos = 500;
      break;
      case 'expert':
        this.puntos = 700;
      break;
    }

    //TRANSFORMARLO EN UN ARRAY Y CAMBIAR LOS - POR 0
    let transicion = this.sudoku_actual.puzzle.replaceAll("-", "0").split("");
    //PARSEAR A ENTEROS
    transicion = transicion.map(function (x : string) { return parseInt(x, 10); });

    //REACOMODAR EN UN ARRAY DE ARRAYS
    for(let i = 0; i < 9; i++)
    {
      this.board[i] = transicion.slice((i * 9), (i + 1) * 9);
    }

    //OBTENER UNA COPIA DEL TABLERO INICIAL
    this.original = structuredClone(this.board);

    //CREA LA TABLA SOLUCION
    this.generar_tabla_solucion();

    //OCULTAR EL MENÚ DE ELECCIÓN DE DIFICULTAD
    this.dificultad_menu = !this.dificultad_menu;

  }

  //CREA LA TABLA SOLUCION EN EL MISMO FORMATO QUE LA TABLA DE JUEGO
  generar_tabla_solucion()
  {
    //TRANSFORMAR LA SOLUCIÓN A ARRAY DE ARRAYS
    let solucion = this.sudoku_actual.solution.split("");
    solucion = solucion.map(function (x : string) { return parseInt(x, 10); });

    //CAMBIAR EL TABLERO POR LA SOLUCIÓN
    for(let i = 0; i < 9; i++)
    {
      this.tabla_solucion[i] = solucion.slice((i * 9), (i + 1) * 9);
    }
  }
  
  //MUESTRA LA SOLUCION PERO TERMINA LA PARTIDA
  mostrar_solucion()
  {
    //TRANSFORMAR LA SOLUCIÓN A ARRAY DE ARRAYS
    let solucion = this.sudoku_actual.solution.split("");
    solucion = solucion.map(function (x : string) { return parseInt(x, 10); });

    //CAMBIAR EL TABLERO POR LA SOLUCIÓN
    for(let i = 0; i < 9; i++)
    {
      this.board[i] = solucion.slice((i * 9), (i + 1) * 9);
    }
    //TIMER
    setTimeout(() => {
      //TERMINAR EL JUEGO
      Swal.fire(
      {
        title: 'GAME OVER',
        text: "¡Vuelve a intentarlo hasta que lo consigas!",
        icon: 'success',
        iconColor: '#cd1f1c',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#cd1f1c',
        background: '#dedee0',
        color: "#cd1f1c",
      }).then(()=> 
        {
          this.puntaje.guardar_partida_jugada('DERROTA', 0).then(() =>
            {
              window.location.reload()
            })
        });
    }, 5000);
  }

  //ACTUALIZA UN VALOR DE LA TABLA
  actualizar_board(value : number, rowIndex: number, colIndex : number) 
  {
    this.board[rowIndex][colIndex] = value;
    console.log(this.board);
    console.log(this.tabla_solucion);
  }

  //CAPTURA EL EVENTO DE CAMBIAR UN VALOR EN UNO DE LOS INPUTS
  onChange(event : Event, rowIndex : number, colIndex: number)
  {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    if(value > 0 && value < 10)
    {
      this.actualizar_board(value, rowIndex, colIndex);
      this.chequear_victoria();
    }
    else
    {
      (event.target as HTMLInputElement).valueAsNumber = NaN;
    }
    
  }

  //SE FIJA SI LAS CONDICIONES DE VICTORIA SE CUMPLEN
  chequear_victoria()
  {
    let respuesta = this.board.toString().replaceAll(",", "");
    if(respuesta === this.sudoku_actual.solution)
    {
      Swal.fire(
        {
          title: '¡VICTORIA!',
          text: 'Has resuelto el puzzle. Tus puntos se acreditarán en tu cuenta.',
          icon: 'success',
          iconColor: '#dedee0',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#cd1f1c',
          background: '#cd1f1c',
          color: "#dedee0",
        }).then(() => 
          { 
            this.puntaje.guardar_puntaje(this.puntos, [0,0,0,this.puntos]).then(() => 
            {
              this.puntaje.guardar_partida_jugada('VICTORIA', this.puntos).then(() =>
              {
                window.location.reload()
              })
            })
          });
    }
  }

  //SE FIJA SI LAS CONDICIONES DE DERROTA SE CUMPLEN
  derrota_por_puntos()
  {
    if(this.puntos == 0)
    {
      Swal.fire(
        {
          title: 'GAME OVER',
          text: "No te quedan más puntos ¡Vuelve a intentarlo hasta que lo consigas!",
          icon: 'success',
          iconColor: '#cd1f1c',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#cd1f1c',
          background: '#dedee0',
          color: "#cd1f1c",
        }).then(()=> 
          {
            this.puntaje.guardar_partida_jugada('DERROTA', 0).then(() =>
            {
              window.location.reload()
            })
          });
    }
  }

  //PERMITE COMPARAR LA TABLA DE JUEGO CON LA SOLUCION A CAMBIO DE PUNTOS
  chequear_errores()
  {
    //COMPARA LAS GRILLAS DE JUEGO Y SOLUCIÓN Y MARCA LOS NÚMEROS QUE NO CORRESPONDEN CON LA SOLUCIÓN 
    for(let row = 0; row < 9; row++)
    {
      for(let col = 0; col < 9; col++)
      {
        if(this.board[row][col] !== 0)
        {
          if(this.board[row][col] !== this.tabla_solucion[row][col])
          {
            let cell = <HTMLInputElement>document.getElementById('id_' + row.toString() + '_' + col.toString());
            cell.classList.add('!bg-l-o-naranja');
          }
        }    
      }
    }
    //TIEMPO
    setTimeout(() => { 
      //REVIERTE EL EFECTO
    for(let row = 0; row < 9; row++)
      {
        for(let col = 0; col < 9; col++)
        {
          if(this.board[row][col] !== 0)
          {
            if(this.board[row][col] !== this.tabla_solucion[row][col])
            {
              let cell = <HTMLInputElement>document.getElementById('id_' + row.toString() + '_' + col.toString());
              cell.classList.remove('!bg-l-o-naranja');
            }
          }    
        }
      }
    }, 1000);

    //RESTAR PUNTOS
    this.puntos -= 25;
    //CHEQUEA SI SE PERDIÓ
    this.derrota_por_puntos()
  }

  //MARCA SI UNA CELDA VIENE CON NUMERO POR DEFECTO O SI ES MODIFICABLE POR EL USUARIO
  es_original(row : number, col : number)
  {
    return this.original[row][col] !== 0;
  }

  //MUESTRA U OCULTA EL MENU DE DIFICULTAD
  menu()
  {
    this.dificultad_menu = !this.dificultad_menu;
  }

  reglas()
  {
    let reglas = "Bienvenido a Japón. Aquí debes utilizar tu sabiduría ancestral para llenar los casilleros con números del 1 al 9, de modo que no se repitan ni en las columnas, ni en las filas ni ni en las subdivisiones internas de 3X3." +
                  " Si logras descifrar el desafío, ganarás una recompensa que será mayor dependiendo del nivel de dificultad. Si llegas a un punto en el que sientes que no puedes avanzar, puedes utilizar el botón 'MOSTRAR ERRORES' para que te muestre los números equivocados, a cambio de 25 puntos. " +
                  "Si deseas abandonar la partida, pero quieres ver el resultado, presiona el botón 'SOLUCIÓN'. Recuerda que al elegir esta opción podrás ver por unos segundos la respuesta, pero perderás la partida.";
    Swal.fire(
    {
      title: 'REGLAS',
      text: reglas,
      icon: 'question',
      iconColor: '#ffffff',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#cd1f1c',
      background: '#0b1b39',
      color: "#ffffff",
    });
  }
}
