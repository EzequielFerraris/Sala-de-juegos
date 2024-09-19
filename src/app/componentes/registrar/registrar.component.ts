import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  public input_mail = "";
  public input_pass = "";

  constructor(private authService : AuthService)
  {
  }

  registrar() 
  {
    this.authService.registrar(this.input_mail, this.input_pass);
  }

}
