import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { AnunciosComponent } from './components/anuncios.component';
import { AnuncioAddComponent } from './components/anuncio-add.component';
import { AnuncioDetailComponent } from './components/anuncio-detail.component';
import { AnuncioEditComponent } from './components/anuncio-edit.component';
import { UserEditComponent } from './components/user-edit.component';
import { LoginComponent } from './components/login.component';


const appRoutes: Routes = [
	{ path: 'anuncios', component: AnunciosComponent },
	{ path: 'anuncio-add', component: AnuncioAddComponent },
	{ path: 'detalles/:id', component: AnuncioDetailComponent },
	{ path: 'editar-anuncio/:id', component: AnuncioEditComponent },
	{ path: 'perfil', component: UserEditComponent },
	{ path: '', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);