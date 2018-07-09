import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AnuncioService } from '../services/anuncio.service';
import { Anuncio } from '../models/anuncio';
import { GLOBAL } from '../services/global';

@Component({
	selector: 'anuncio-add',
	templateUrl: '../views/addAnuncio.html',
	providers: [AnuncioService]
})
export class AnuncioAddComponent {
	public anuncio: Anuncio;
	public filesToUpload;
	public resultUpload;
	public anuncioId: String;

	constructor(
		private _anuncioService: AnuncioService,
		private _route: ActivatedRoute,
		private _router: Router
	) {
		this.anuncio = new Anuncio(0, '', '', 0, '', '', '', false);
	}

	ngOnInit() {
		console.log('anuncio-add.component.ts cargado...');
		if (localStorage.getItem("rolSesion") == "user" || localStorage.getItem("rolSesion") == "admin") {
		} else {
			console.log("No hay usuario logueado")
			this._router.navigate(['']);
		}
	}

	onSubmit() {
		console.log('submit anuncio: ' + this.anuncio);
		console.log(this.filesToUpload);
		this.saveAnuncio();
	}

	salir() {
		localStorage.clear();
		this._router.navigate(['']);
		this._router.navigate([window.location.reload()]);
	}

	saveAnuncio() {
		this.anuncio.autor = localStorage.getItem('usuarioSesion');
		this._anuncioService.addAnuncio(this.anuncio).subscribe(
			response => {
				if (response.anuncio) {
					this.anuncioId = response.anuncio._id;
					//	this.saveImage();
					this._router.navigate(['/anuncios']);
				} else {
					console.log(response);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}