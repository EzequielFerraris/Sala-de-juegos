import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  constructor(public auth: Auth,
              private router: Router,
              private firestore: Firestore) 
  {
    
  }
  
  ngOnInit(){ }

  get_user() 
  {
    return this.auth.currentUser;
  }

  log_in(input_mail: string, input_pass: string)
  {
    //LOGIN FIREBASE
    signInWithEmailAndPassword(this.auth, input_mail, input_pass).then((res) => {

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
              this.router.navigate(['home'])}).then(()=> 
                {window.location.reload()});
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

  log_out() : any
  {
    signOut(this.auth).then((res) => {
      localStorage.removeItem('mailUsuario');
      Swal.fire(
        {
          title: 'Salir',
          iconColor: '#FF00C1',
          text: 'Ha salido correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }
      ).then(() => {this.router.navigate(['home'])}).then(()=> 
        {window.location.reload()});
    }).catch((e) => {
      let mensaje = ''; 
        switch(e.code)
        {
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
    });
  }

  registrar(input_mail: string, input_pass: string) 
  {
    if(input_mail.length > 4 && input_pass.length > 2)
    {
      createUserWithEmailAndPassword(this.auth, input_mail, input_pass).then((res) => {
        if(input_mail !== null && input_pass !== null) 
        {
          signInWithEmailAndPassword(this.auth, input_mail, input_pass).then((res) => {
            localStorage.setItem('mailUsuario', input_mail);
            Swal.fire(
              {
                title: '¡Bienvenido ' + input_mail + '!' ,
                text: 'Ha creado un usuario correctamente.',
                icon: 'success',
                iconColor: '#FF00C1',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#00FFEB'
              }).then(() => {
                this.router.navigate(['home'])}).then(()=> 
                  {window.location.reload()});
          }).catch((e) => {
            Swal.fire(
              {
                title: 'Error',
                text: e.mensaje,
                icon: 'error',
                iconColor: '#FF00C1',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#00FFEB'
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
          case "auth/weak-password":
            mensaje = "Contraseña demasiado débil";
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
            confirmButtonText: 'Ok',
            confirmButtonColor: '#00FFEB'
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
          iconColor: '#FF00C1',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00FFEB'
        });    
    }
  }

  comentar(comentario : string){
    let col = collection(this.firestore, 'chat');
    addDoc(col, { fecha: new Date(), "user": this.auth.currentUser?.email, comment: comentario });
  }

  get_collection()
  {
    let col = collection(this.firestore, 'chat');
    return col;
  }
}
