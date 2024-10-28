import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados/preguntados.component';
import { SudokuComponent } from './sudoku/sudoku.component';


const routes: Routes = [
  {
    path: 'ahorcado',
    component : AhorcadoComponent
  },
  {
    path: 'mayor-menor',
    component : MayorMenorComponent
  },
  {
    path: 'preguntados',
    component : PreguntadosComponent
  },
  {
    path: 'sudoku',
    component : SudokuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
