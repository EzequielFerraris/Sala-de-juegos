import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; 
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SweetAlert2Module, CommonModule, AppComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() enviarUsuario = new EventEmitter<string>();
  public input_mail: string = "";
  public input_pass: string = "";

  constructor(public auth: Auth, 
              private router: Router,
              private firestore: Firestore){ }

  //BOTON DE AUTOCOMPLETADO
  autocompletar()
  {
    this.input_mail = "usuario@prueba.com";
    this.input_pass = "123qwe";
  }

  //FUNCION LOGIN
  login()
  {
    //LOGIN FIREBASE
    signInWithEmailAndPassword(this.auth, this.input_mail, this.input_pass).then((res) => {

      if(res.user.email !== null) 
      {

        //CAPTURAR EL LOG DEL USUARIO
        let col = collection(this.firestore, 'logs');
        addDoc(col, {fecha: new Date(), user: res.user.email});

        //GUARDO USUARIO EN LOCAL STORAGE PARA EVITAR EL DELAY DE FIREBASE
        localStorage.setItem('mailUsuario', res.user.email);

        //ALERTA + REDIRECT + RELOAD 
        Swal.fire(
          {
            title: '¡Bienvenido ' + res.user.email + '!',
            text: 'Ha ingresado correctamente.',
            icon: 'success',
            iconColor: '#FF00C1',
            confirmButtonText: "<p style='color:#000000'> Ok </p>",
            confirmButtonColor: '#00FFEB',
            background: '#FFFFFF'
          }).then(() => {
              this.router.navigate(['home']).then(()=> 
                {window.location.reload()})});
      }
    }).catch((e) => { 
      //TOMA EL MENSAJE DE ERROR
      let mensaje = ''; 
        switch(e.code)
        {
          case "auth/invalid-credential":
            mensaje = "Usuario o contraseña incorrecta.";
          break;
          case "auth/invalid-email":
            mensaje = "Correo electrónico inválido.";
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
            iconColor: '#FF00C1',
            confirmButtonText: "<p style='color:#000000'> Ok </p>",
            confirmButtonColor: '#00FFEB',
            background: '#FFFFFF'
          });    
    });

  }
  
}
