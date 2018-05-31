export class Materia {

    constructor(
        public grupo: string,
        public materia: string,        
        public catedratico: string,
        public year: number,
        public alumnos?: any,
        public _id?: string
    ) { }

}