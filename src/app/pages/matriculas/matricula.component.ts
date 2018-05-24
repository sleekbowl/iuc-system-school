import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Matricula } from '../../models/matricula.model';
import { MatriculaService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styles: []
})
export class MatriculaComponent implements OnInit {

  matricula: any = new Matricula('', '', '', '', null); 
  tipos = ['Maestro','Alumno','Administrativo','Staff'];
  roles = ['MAESTRO_ROLE', 'ALUMNO_ROLE', 'ADMIN_ROLE'];
  titulos = ['Lic. en Ing. en Sistemas Computacionales','Lic. en Contabilidad','Lic. en Gastronomia']
  tipo:boolean = false;
  id = "";
  usuario:any;

  constructor(
    public _matriculaService: MatriculaService,
    public _usuariolaService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
   
  ) {
    activatedRoute.params.subscribe( params => {

      let id = params['id'];
      this.id = id;
      if ( id !== 'nuevo' ) {
        this.cargarMatricula( id );
      }

    });
  }

  ngOnInit() {
  }

  cargarMatricula( id: string ) {
    this._matriculaService.cargarMatricula( id )
          .subscribe( matricula => {
            console.log( matricula );
            this.matricula = matricula;
          });
  }

  guardarMatricula( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }
    
    this._matriculaService.guardarMatricula( this.matricula )
            .subscribe( id => {

              this.matricula._id = id;

              this.router.navigate(['/matricula', id ]);

            },err =>{
              swal({
                icon: "error",
                title: "La matricula no es valida",
                text: "No cumple con los parametros o ya esta ingresada"
              });
            });

  }
  cambioMatricula( id: string ) {

    // this._hospitalService.obtenerHospital( id )
    //       .subscribe( hospital => this.hospital = hospital );

  }

  cambioTipo( tipo: string ){
    switch (tipo) {
      case 'Maestro':
        this.tipo = true;
        this.matricula.role = "MAESTRO_ROLE";
        break;
    
      case 'Alumno':
        this.tipo = false;
        this.matricula.role = "ALUMNO_ROLE";
        break;

      case 'Administrativo':
        this.tipo = true;
        this.matricula.role = "ADMIN_ROLE";
        break;
    }
  }

}
