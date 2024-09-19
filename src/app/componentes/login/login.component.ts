import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; 
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SweetAlert2Module, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() enviarUsuario = new EventEmitter<string>();
  public input_mail: string = "";
  public input_pass: string = "";

  constructor(private authService : AuthService){}

  //BOTON DE AUTOCOMPLETADO
  autocompletar()
  {
    this.input_mail = "usuario@prueba.com";
    this.input_pass = "123qwe";
  }

  //FUNCION LOGIN
  login()
  {
    this.authService.log_in(this.input_mail, this.input_pass);
  }
  
}
