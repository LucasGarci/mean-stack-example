import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Rutas
import { routing, appRoutingProviders } from './app.routing';

// Componentes
import { AppComponent } from './app.component';
import { AnunciosComponent } from './components/anuncios.component';
import { AnuncioAddComponent } from './components/anuncio-add.component';
import { AnuncioDetailComponent } from './components/anuncio-detail.component';
import { UserEditComponent } from './components/user-edit.component';
import { AnuncioEditComponent } from './components/anuncio-edit.component';
import { LoginComponent } from './components/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AnunciosComponent,
    AnuncioAddComponent,
    AnuncioEditComponent,
    AnuncioDetailComponent,
    UserEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
