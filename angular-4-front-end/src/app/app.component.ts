import { Component } from '@angular/core';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'Productos Angular 4';
  public header_color: string;
  public  logueado: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router) {
    this.header_color = GLOBAL.header_color;
    if (localStorage.getItem("rolSesion") == "user" || localStorage.getItem("rolSesion") == "admin") {
      this.logueado = true;
    } else {
      console.log("No hay usuario logueado")
      this.logueado = false;
    }

  }

  salir() {
    localStorage.clear();
    this._router.navigate(['']);
    this._router.navigate([window.location.reload()]);
  }

}
