import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../propiedad.service';
import { Propiedad } from '../models/propiedad';
import { Propietario } from '../../propietarios/models/propietario';
import { PropietarioService } from '../../propietarios/propietario.service';

@Component({
  selector: 'app-registrar-propiedad',
  templateUrl: './registrar-propiedad.component.html',
})
export class RegistrarPropiedadComponent implements OnInit {
  propietarios: Propietario[] = [];
  nuevaPropiedad: Propiedad = {
    idPropiedad: 0,
    Direccion: '',
    TipoPropiedad: '',
    PrecioPeriodo: 0,
    PeriodoRenta: '',
    Capacidad: 0,
    Disponibilidad: '',
    IdPropietario: 0,
  };

  constructor(
    private propiedadService: PropiedadService,
    private propService: PropietarioService
  ) {}

  ngOnInit(): void {
    this.propService.obtenerPropietarios().subscribe((response) => {
      this.propietarios = response;
      console.log(response);
    });
  }

  agregarPropiedad() {
    this.propiedadService.agregarPropiedad(this.nuevaPropiedad).subscribe(
      (response) => {
        console.log('Propiedad agregada:', response);
        this.nuevaPropiedad = {
          idPropiedad: 0,
          Direccion: '',
          TipoPropiedad: '',
          PrecioPeriodo: 0,
          PeriodoRenta: '',
          Capacidad: 0,
          Disponibilidad: '',
          IdPropietario: 0,
        };
      },
      (error) => console.error('Error al agregar propiedad:', error)
    );
  }
}
