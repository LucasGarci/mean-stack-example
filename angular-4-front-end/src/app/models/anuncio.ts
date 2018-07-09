export class Anuncio{
	constructor(
        public id: number,
        public titulo: string,
        public cuerpo: string,
        public precio: number,
        public categoria: string,
        public autor: string,
        public imagen: string,
        public showable: boolean
	){}
}