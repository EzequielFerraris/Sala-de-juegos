import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { InfoUsuarioComponent } from './componentes/info-usuario/info-usuario.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistrarComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'juegos',
        loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    },
    { path: 'usuario-perfil', component: InfoUsuarioComponent },
    { path: 'encuesta', component: EncuestaComponent },
    { path: '**', component: PageNotFoundComponent },
];
