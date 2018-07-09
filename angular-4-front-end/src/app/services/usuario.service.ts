import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../models/usuario';
import { GLOBAL } from './global';

@Injectable()

export class UsuarioService {
	public url: string;

	constructor(
		public _http: Http
	) {
		this.url = GLOBAL.url;
	}

	getUsuarios() {
		return this._http.get(this.url + 'usuarios').map(res => res.json());
	}

	getPerfil() {
		let json = ('{"' + '_id":"' + localStorage.getItem('usuarioSesion') + '"}');
		let params = json;
		console.log('usuario service parmas is...');
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.post(this.url + 'perfil', params, { headers: headers }).map(res => res.json());
	}


	addUsuario(usuario: Usuario) {

		let params = usuario;
		let headers = new Headers({ 'Content-Type': 'application/json' });

		console.log('FrontEnd addUser service params...');
		console.log(params);
		return this._http.post(this.url + 'register', params, { headers: headers }).map(res => res.json());
	}

	editUsuario(usuario: Usuario) {
		let params = JSON.stringify(usuario);
		console.log(params);
		let headers = new Headers({ 'Content-Type': 'application/json' });

		return this._http.put(this.url + 'update-usuario/' , params, { headers: headers }).map(res => res.json());
	}

	deleteUsuario(id) {
		return this._http.get(this.url + 'deleteUser/' + id).map(res => res.json());
	}

	getUsuario(user_to_login) {
		let json = JSON.stringify(user_to_login);
		let params = json;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.post(this.url + 'login', params, { headers: headers }).map(res => res.json());
	}
}
