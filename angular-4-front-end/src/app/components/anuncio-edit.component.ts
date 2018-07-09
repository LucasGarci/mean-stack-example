import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AnuncioService } from '../services/anuncio.service';
import { Anuncio } from '../models/anuncio';
import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';

@Component({
	selector: 'anuncio-edit',
	templateUrl: '../views/editAnuncio.html',
	providers: [AnuncioService, UploadService]


})
export class AnuncioEditComponent {
	public titulo: string;
	public anuncio: Anuncio;
	public resultUpload;
	public is_edit;
	public url;

	constructor(
		private _anuncioService: AnuncioService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _uploadService: UploadService
	) {
		this.titulo = 'Editar anuncio';
		this.anuncio = new Anuncio(1, '', '', 1, '', '', '', false);
		this.is_edit = true;
		this.url = GLOBAL.url;
	}

	ngOnInit() {
		console.log(this.titulo + " cargado");
		if (localStorage.getItem("rolSesion") == "user" || localStorage.getItem("rolSesion") == "admin") {
			this.getAnuncio();
		} else {
			console.log("No hay usuario logueado")
			this._router.navigate(['']);
		}
	}

	onSubmit() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._anuncioService.editAnuncio(id, this.anuncio).subscribe(
				response => {
					if (!response.anuncio) {
						console.log("NO HAY RESPUESTA DE ANUNCIO obtenemos...");
						console.log(response);
					} else {
						console.log('¡El anuncio se ha actualizado correctamente!');
						if (!this.filesToUpload) {
							// Redirigir
							this._router.navigate(['/anuncios']);
						} else {
							// Subir la imagen del anuncio
							this._uploadService.makeFileRequest(this.url + 'upload-image-anuncio/' + id, [], this.filesToUpload, 'image').then(
								(result) => {
									this._router.navigate(['/anuncios', response.anuncio]);
								},
								(error) => {
									console.log(error);
								}
							);
						}
					}
				},
				error => {
					var errorMessage = <any>error;
					if (errorMessage != null) {
						var body = JSON.parse(error._body);
						console.log(body.message);
						console.log(error);
					}
				}
			);
		});
	}

	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}


	updateAnuncio() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._anuncioService.editAnuncio(id, this.anuncio).subscribe(
				response => {
					if (response.anuncio) {
						this._router.navigate(['/detalles', id]);
					} else {
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

	salir() {
		localStorage.clear();
		this._router.navigate(['']);
		this._router.navigate([window.location.reload()]);
	}

	getAnuncio() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._anuncioService.getAnuncio(id).subscribe(
				response => {
					if (response.anuncio) {
						this.anuncio = response.anuncio;
					} else {
						this._router.navigate(['/anuncios']);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}

}