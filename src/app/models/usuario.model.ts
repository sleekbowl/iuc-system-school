
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public matricula?: any,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public calle?: string,
        public colonia? :string,
        public municipio? :string,
        public estado? :string,
        public pais? :string,
        public cp?: string,
        public fechaNacimiento? : Date,
        public tipoSangre? : string,
        public telefonoPersonal? : string,
        public telefonoTutor? : string,
        public seguro? : string,
        public sexo?: string,
        public _id?: string
    ) { }

}


