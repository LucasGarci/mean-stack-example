import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AnuncioService } from '../services/anuncio.service';
import { Anuncio } from '../models/anuncio';
import { Comentario } from '../models/comentario';

@Component({
	selector: 'anuncio-detail',
	templateUrl: '../views/comentarios.html',
	providers: [AnuncioService]
})

export class AnuncioDetailComponent {

	public anuncio: Anuncio;
	public comentarios: Comentario[];
	public comentario: Comentario;


	constructor(
		private _anuncioService: AnuncioService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		console.log('anuncio-detail.component.ts cargado...')
		if (localStorage.getItem("rolSesion") == "user" || localStorage.getItem("rolSesion") == "admin") {
			this.comentario = new Comentario(0, 0, '', '');
			this.getAnuncio();
		} else {
			console.log("No hay usuario logueado")
			this._router.navigate(['']);
		}
	}

	onSubmit() {
		this.saveComentario();
	}

	newComent() {

	}

	salir() {
		localStorage.clear();
		this._router.navigate(['']);
		window.location.reload();
	}

	saveComentario() {
		this._route.params.forEach((params: Params) => {
			let id2 = params['id'];
			this.comentario.autor = localStorage.getItem("usuarioSesion");
			console.log("comentario.autor es: "+ this.comentario.autor);
			this.comentario.anuncio = id2;
			console.log("comentario.anuncios es: "+ this.comentario.anuncio);
			this._anuncioService.addComentario(this.comentario).subscribe(
				response => {
					if (!response.message) {
						console.log('El comentario a añadir es... ')
						console.log(this.comentario);
						console.log(response);
						window.location.reload();
					} else {
						console.log('response' + response.message);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	getComentariosDe(id) {
		this._anuncioService.getComentariosDe(id).subscribe(
			result => {
				if (result.message) {
					console.log('Mal: '+result);
				} else {
					this.comentarios = result.comentarios;
					console.log('Comentarios:');
					console.log(result.comentarios.toString);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getAnuncio() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._anuncioService.getAnuncio(id).subscribe(
				response => {
					if (response.anuncio) {
						this.anuncio = response.anuncio;
						this.getComentariosDe(response.anuncio._id);
						console.log(this.anuncio)
					} else {
						this._router.navigate(['/anuncios'])
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}
}