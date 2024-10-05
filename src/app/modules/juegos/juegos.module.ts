import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados/preguntados.component';
import { FormsModule } from '@angular/forms';
import { SudokuComponent } from './sudoku/sudoku.component';


@NgModule({
  declarations: [AhorcadoComponent, MayorMenorComponent, PreguntadosComponent, SudokuComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ],
  exports: [AhorcadoComponent],
})
export class JuegosModule { }
