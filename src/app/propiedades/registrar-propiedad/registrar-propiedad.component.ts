import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../propiedad.service';
import { Propiedad } from '../models/propiedad';
import { Propietario } from '../../propietarios/models/propietario';
import { PropietarioService } from '../../propietarios/propietario.service';
import Swal from 'sweetalert2';

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
    });
  }

  soloNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) { // solo números (0-9)
      event.preventDefault();
    }
  }

  agregarPropiedad() {
    if (
      !this.nuevaPropiedad.Direccion ||
      !this.nuevaPropiedad.TipoPropiedad ||
      !this.nuevaPropiedad.PeriodoRenta ||
      !this.nuevaPropiedad.Disponibilidad ||
      this.nuevaPropiedad.Capacidad <= 0 ||
      this.nuevaPropiedad.PrecioPeriodo <= 0 ||
      this.nuevaPropiedad.IdPropietario <= 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos obligatorios antes de agregar la propiedad.',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
    this.propiedadService.agregarPropiedad(this.nuevaPropiedad).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Propiedad agregada',
          text: 'La propiedad ha sido agregada exitosamente',
          confirmButtonText: 'Aceptar'
        });
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
