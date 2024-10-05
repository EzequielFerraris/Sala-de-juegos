import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncuestasService } from '../../services/encuestas.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  form!: FormGroup;

  constructor(private encuestasService : EncuestasService,
              private router: Router
  ){}

  ngOnInit() 
  {
    this.form = new FormGroup({
      nombre: new FormControl("", [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
      apellido: new FormControl("", [Validators.pattern('^[a-zA-Z]+$'), Validators.required]),
      edad: new FormControl("", [Validators.min(18), Validators.required]),
      area: new FormControl("", [Validators.pattern('^[0-9]{3}$'), Validators.required]),
      celular: new FormControl("", [Validators.pattern('^[0-9]{6,10}$'), Validators.required]),
      opinion: new FormControl("", [Validators.maxLength(255), Validators.required]),
      subscribir: new FormControl(true, Validators.required),
      tipo_juego_preferido: new FormControl("", Validators.required)
    });
  }
  
  enviar()
  {
    this.form.markAllAsTouched();
    this.encuestasService.guardar_encuesta(this.form.value).then(() =>{
      //ALERTA + REDIRECT + RELOAD 
      Swal.fire(
        {
          title: '¡Muchas gracias por responder!',
          text: 'Hemos guardado tu respuesta. En caso de que desees cambiarla, siempre puedes volver a realizar la encuesta',
          icon: 'success',
          iconColor: '#FF00C1',
          confirmButtonText: "<p style='color:#000000'> Ok </p>",
          confirmButtonColor: '#00FFEB',
          background: '#FFFFFF'
        }).then(() => {
            this.router.navigate(['usuario-perfil'])}).then(()=> 
            {window.location.reload()});
    });
    
  }
}
