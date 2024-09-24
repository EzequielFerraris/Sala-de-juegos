import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFaceDizzy } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'  
})
export class HomeComponent {
  public usuario : any;

  constructor(library: FaIconLibrary,
            public authService : AuthService,
  )
  {
    library.addIcons(faFaceDizzy, faQuestion, faPlusMinus, faHeart)
  }

  ngOnInit(){
    this.usuario = localStorage.getItem("mailUsuario");
  }


  
}
