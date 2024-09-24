import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados/preguntados.component';
import { BlackJackComponent } from './blackJack/black-jack/black-jack.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AhorcadoComponent, MayorMenorComponent, PreguntadosComponent, BlackJackComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ],
  exports: [AhorcadoComponent],
})
export class JuegosModule { }
