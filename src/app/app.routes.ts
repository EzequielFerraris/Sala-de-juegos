import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistrarComponent },
    { path: 'juegos',
        loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
    },
    { path: '**', component: PageNotFoundComponent },
];
