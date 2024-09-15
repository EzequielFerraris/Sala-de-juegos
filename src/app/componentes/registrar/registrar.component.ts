import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@angular/fire/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  public input_mail = "";
  public input_pass = "";
  public logged_user = "";

  constructor(public auth: Auth, private router: Router)
  {
  }

  registrar() 
  {
    if(this.input_mail.length > 4 && this.input_pass.length > 2)
    {
      createUserWithEmailAndPassword(this.auth, this.input_mail, this.input_pass).then((res) => {
        if(this.input_mail !== null && this.input_pass !== null) 
        {
          signInWithEmailAndPassword(this.auth, this.input_mail, this.input_pass).then((res) => {
            Swal.fire(
              {
                title: '¡Bienvenido ' + this.logged_user + '!' ,
                text: 'Ha creado un usuario correctamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
            this.router.navigate(['home']);
          }).catch((e) => {
            Swal.fire(
              {
                title: 'Error',
                text: e.mensaje,
                icon: 'error',
                confirmButtonText: 'Ok'
              });    
          }
          );
        }
      }).catch((e) => {
        let mensaje = ''; 
        switch(e.code)
        {
          case "auth/invalid-email":
            mensaje = "E-mail inválido";
          break;
          case "auth/email-already-in-use":
            mensaje = "El e-mail ya se encuentra registrado.";
          break;
          default:
            mensaje = e.code;
          break;
        }
        Swal.fire(
          {
            title: 'Error',
            text: mensaje,
            icon: 'error',
            confirmButtonText: 'Ok'
          });    
      })
    }
    else
    {
      Swal.fire(
        {
          title: 'Error',
          text: 'Alguno de los campos no cumple con los requisitos.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });    
    }
  }

}
