import { NgClass } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [NgClass],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {

  public descripcion : string = "Soy alumno regular de la Tecnicatura Universitaria en Programación de la Universidad Tecnológica Nacional y un gran entusiasta del desarrollo back-end. " 
                                + "Esta aplicación fue desarrollada en el contexto de la materia Laboratorio IV de dicha carrera, y tiene como objeto mostrar los conceptos centrales del desarrollo de Single Page Applications con Angular.";
                              
  public descripcion_juego : string = "Además de tres juegos obligatorios, la cátedra solicitaba la incorporación de un juego a elección del estudiante. En mi caso elegí implementar el SUDOKU, que si bien parece un juego sencillo, es sumamente complejo de recrear. "
                                        + "Sus reglas son pocas y concretas: en una grilla de 81 celdas, se deben llenar los casilleros con números del 1 al 9, de modo que no se repitan ni en las columnas, ni en las filas ni ni en las subdivisiones internas de 3X3. "
                                        + "El juego cuenta además con un botón para marcar los ingresos equivocados por parte del usuario, a cambio de puntos, y un botón para ver la solución y abandonar la partida. Cuenta además con cuatro niveles de dificultad.";

                                
}
