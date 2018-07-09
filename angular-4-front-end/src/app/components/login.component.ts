import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import * as shajs from 'sha.js';
import { debug } from 'util';
import { AppComponent } from '../app.component';

@Component({
	selector: '',
	templateUrl: '../views/login.html',
	providers: [UsuarioService]
})

export class LoginComponent {

	public usuario: Usuario;
	public alertRegister;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,

	) { }

	ngOnInit() {
		if (localStorage.getItem("rolSesion") == "user" || localStorage.getItem("rolSesion") == "admin") {
			this._router.navigate(['/anuncios']);
		}
		console.log('usuarios.component.ts cargado');
		this.usuario = new Usuario('', '', '', '', '', 'user', 'user.png');
	}

	onSubmit() {
		this._usuarioService.getUsuario(this.usuario).subscribe(
			result => {
				console.log('user: '+result.usuario);
				console.log('mensaje: '+result.message);
				if (!result.message) {
					if (result.usuario.pass == shajs('sha256').update(this.usuario.pass).digest('hex')) {
						console.log('Entramos en el segundo if');
						console.log('USUARIO LOGUEADO')
						this.usuario = result.usuario;
						this._router.navigate(['/anuncios']);
						localStorage.setItem("rolSesion", this.usuario.rol);
						console.log("rolSesion: " + localStorage.getItem("rolSesion"));
						localStorage.setItem("usuarioSesion", result.usuario._id);
						console.log("usuarioSesion: " + localStorage.getItem("usuarioSesion"));
					} else {
						this._router.navigate(['']);
					}
					console.log('usuario devuelto...')
					console.log(result.usuario);
				} else {
					console.log('Error:' + result.usuario.pass);
					this._router.navigate(['']);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	onSaveUser() {
		this.saveUsuario();
	}

	salir() {
		localStorage.clear();
		this._router.navigate(['']);
		window.location.reload();
	}
	/*
		saveUsuario() {
			this.usuario.pass=shajs('sha256').update(this.usuario.pass).digest('hex');
			this._usuarioService.addUsuario(this.usuario).subscribe(
				response => {
					console.log(response);
					if (response.usuario) {
						this._router.navigate(['']);
					} else {
						console.log(response);
					}
				},
				error => {
					
					this._router.navigate([window.location.reload()]);
					console.log(<any>error);
				}
			);
		}
		*/
	saveUsuario() {
		this.usuario.pass = shajs('sha256').update(this.usuario.pass).digest('hex');
		console.log(this.usuario);
		this._usuarioService.addUsuario(this.usuario).subscribe(
			response => {	
				window.location.reload();
				console.log(response);
			},
			error => {
				var errorMessage = <any>error;

				if (errorMessage != null) {
					var body = JSON.parse(error._body);
					this.alertRegister = body.message;
					console.log(error);
				}
			}
		);
	}
}
