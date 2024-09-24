import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { collectionData, orderBy, query, limit } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  public comentario = "";
  private sub!:Subscription;
  public chat:any[] = [];

  constructor(public authService : AuthService,){}

  ngOnInit(){
    this.get_chat();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  comentar()
  {
    this.comentario = this.comentario.trim();
    this.authService.comentar(this.comentario);
  }

  get_chat()
  {
    let col = this.authService.get_collection();

    const filtered = query(col,limit(50),orderBy("fecha"));

    const observable = collectionData(filtered);
  
      this.sub = observable.subscribe((respuesta: any) => {

        this.chat = respuesta;

      });
  }
}
