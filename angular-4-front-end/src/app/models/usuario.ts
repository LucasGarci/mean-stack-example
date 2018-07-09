export class Usuario{
	constructor(
        public nombre: string,
        public apellido: string,
        public mail: string,
        public pass: string,
        public newpass: string,
		public rol: string,
		public imagen: string
	){}
}