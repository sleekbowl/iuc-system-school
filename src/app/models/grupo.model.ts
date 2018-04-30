export class Grupo {

    constructor(
        public nombre: string,
        public tipo: string,        
        public year: number,
        public carrera:string,
        public alumnos?: any,
        public img?: string,
        public _id?: string
    ) { }

}