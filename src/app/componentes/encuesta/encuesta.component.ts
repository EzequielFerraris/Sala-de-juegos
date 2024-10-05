import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  form!: FormGroup;

  ngOnInit() 
  {
    this.form = new FormGroup({
      nombre: new FormControl("", [Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl("", Validators.min(18)),
      mail: new FormControl("", Validators.email),
      clave: new FormControl("", Validators.minLength(4))  
    });
  }
  
  enviar()
  {
    console.log(this.form.value);
  }
}
