import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private valid_user: string = "user123";
  private valid_pass: string = "123";
  public input_mail: string = "";
  public input_pass: string = "";

  campo_respuesta(campo: number): void
  {
    switch(campo)
    {
      case 1:
        Swal.fire(
          {
            title: '¡Bienvenido!',
            text: 'Ha ingresado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
      break;
      case 2:
        Swal.fire(
        {
          title: 'Error',
          text: 'Usuario y/o password incorrectos.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });    
      break;
      case 3:
        Swal.fire(
          {
            title: 'Error',
            text: 'Falta uno de los campos requeridos.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
      break;
    }
  }


  login(): void
  {

    if(this.input_mail == "" || this.input_pass =="")
    {
      this.campo_respuesta(3);
    }
    else
    {
      if(this.input_mail == this.valid_user && this.input_pass == this.valid_pass)
      {
        this.campo_respuesta(1);
      }
      else
      {
        this.campo_respuesta(2);
      }
    }
  }

  

}
