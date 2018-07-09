import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Anuncio } from '../models/anuncio';
import { Comentario } from '../models/comentario';
import { GLOBAL } from './global';

@Injectable()
export class AnuncioService {
	public url: string;

	constructor(
		public _http: Http
	) {
		this.url = GLOBAL.url;
	}

	getAnuncios() {
		return this._http.get(this.url + 'anuncios').map(res => res.json());
	}

	getAnuncio(id) {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url + 'anuncio/' + id, options).map(res => res.json());
	}

	getComentariosDe(id) {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let options = new RequestOptions({ headers: headers });

		return this._http.get(this.url + 'comentariosde/' + id, options)
			.map(res => res.json());
	}

	addAnuncio(anuncio: Anuncio) {
		let params = JSON.stringify(anuncio);
		let headers = new Headers({ 'Content-Type': 'application/json' });

		return this._http.post(this.url + 'anuncio', params, { headers: headers })
			.map(res => res.json());
	}

	addComentario(comentario: Comentario) {
		let params = JSON.stringify(comentario);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		return this._http.post(this.url + 'comentario', params, { headers: headers }).map(res => res.json());
	}

	editAnuncio(id, anuncio: Anuncio) {
		let params = JSON.stringify(anuncio);
		let headers = new Headers({ 'Content-Type': 'application/json' });

		return this._http.put(this.url + 'anuncio/' + id, params, { headers: headers })
			.map(res => res.json());
	}

	deleteAnuncio(id) {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url + 'anuncio/' + id, options)
			.map(res => res.json());
	}

}