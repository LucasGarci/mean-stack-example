import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import * as shajs from 'sha.js';
import { Usuario } from '../models/usuario';
import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';

@Component({
    selector: 'usuario-edit',
    templateUrl: '../views/perfil.html',
    providers: [UsuarioService, UploadService]
})
export class UserEditComponent {
    public titulo: string;
    public usuario: Usuario;
    public filesToUpload;
    public resultUpload;
    public is_edit;
    public url;

    constructor(
        private _usuarioService: UsuarioService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Editar usuario';
        this.usuario = new Usuario('', '', '', '', '', '', '');
        this.is_edit = true;
        this.url = GLOBAL.url;
    }

    ngOnInit() {

        if (localStorage.getItem("rolSesion") == "user" || localStorage.getItem("rolSesion") == "admin") {
            console.log(this.titulo + " cargado");
            this.getPerfil();
        } else {
            console.log("No hay usuario logueado")
            this._router.navigate(['']);
        }
    }

    onSubmit() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._usuarioService.editUsuario(this.usuario).subscribe(
				response => {
					if (!response.usuario) {
						console.log("NO HAY RESPUESTA DE ANUNCIO obtenemos...");
						console.log(response);
					} else {
						console.log('¡El usuario se ha actualizado correctamente!');
						if (!this.filesToUpload) {
                            // Recargar
                            console.log('No hay ficheros');
							window.location.reload();
						} else {
                            // Subir la imagen del usuario
                            console.log('Subiendo fichero');
							this._uploadService.makeFileRequest(this.url + 'upload-image-usuario/' + localStorage.getItem('usuarioSesion'), [], this.filesToUpload, 'image').then(
								(result) => {
                                    window.location.reload();
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

    salir() {
        localStorage.clear();
        this._router.navigate(['']);
        this._router.navigate([window.location.reload()]);
      }

    updateUsuario() {
        this._route.params.forEach((params: Params) => {
            if (this.usuario.newpass != '' && this.usuario.newpass != null) {
                this.usuario.pass = shajs('sha256').update(this.usuario.newpass).digest('hex');
            }
            console.log('El usuario to update es...');
            console.log('usuario del frontend: ');
            console.log(this.usuario);
            this._usuarioService.editUsuario(this.usuario).subscribe(
                response => {
                    if (response.usuario) {
                        window.location.reload();
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

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    getPerfil() {
        this._usuarioService.getPerfil().subscribe(
			result => {
				if (!result.message) {
					this.usuario=result.usuario;
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
}