import { Component } from '@angular/core';
import { PuntajeService } from '../../services/puntaje.service';
import { collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, } from '@angular/router';


@Component({
  selector: 'app-info-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-usuario.component.html',
  styleUrl: './info-usuario.component.css'
})
export class InfoUsuarioComponent {

  public usuario_info : any = [];
  public usuario : string | null = '';
  private sub!:Subscription;
  private sub2!:Subscription;
  public info:any[] = [ { puntaje_general: '', ahorcado: '', mayor_menor:  '', preguntados: '', sudoku: ''} ];
  public partidas: any[] = [];

  constructor(private puntaje : PuntajeService,
              private router: Router
  ){  }

  ngOnInit()
  {
    this.usuario = localStorage.getItem("mailUsuario");
    this.get_puntaje();
    this.get_partidas();
    
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  encuesta()
  {
    console.log(this. info);
    this.router.navigate(['encuesta']);
  }

  get_puntaje()
  {
    if(this.usuario)
    {
      const filtered = this.puntaje.obtener_puntajes(this.usuario);
      const observable = collectionData(filtered); 
      this.sub = observable.subscribe((respuesta: any) => {

        this.info = respuesta;

      });

    }
    else
    {
      console.log("No hay usuario");
    }
  }
  
  get_partidas()
  {
    if(this.usuario)
    {
      const filtered = this.puntaje.obtener_ultimas_partidas(this.usuario);
      const observable = collectionData(filtered); 
      this.sub2 = observable.subscribe((respuesta: any) => {

        this.partidas = respuesta;
        console.log(this.partidas);
      });

    }
    else
    {
      console.log("No hay usuario");
    }
  }
}
