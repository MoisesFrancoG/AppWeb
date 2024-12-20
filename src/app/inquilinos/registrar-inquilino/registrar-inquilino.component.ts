import { Component, OnInit } from '@angular/core';
import { Inquilino } from '../models/inquilino';
import { InquilinoService } from '../inquilino.service';
import { Propiedad } from '../../propiedades/models/propiedad';
import { PropiedadService } from '../../propiedades/propiedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-inquilino',
  templateUrl: './registrar-inquilino.component.html',
  styleUrl: './registrar-inquilino.component.css',
})
export class RegistrarInquilinoComponent implements OnInit {
  propiedades: Propiedad[] = [];
  nuevoInquilino: Inquilino = {
    idInquilino: 0,
    Nombre: '',
    Email: '',
    Telefono: '',
    FechaRegistro: '',
    EstanciaRegistrada: 0,
  };

  constructor(
    private inquilinoService: InquilinoService,
    private propService: PropiedadService
  ) {}

  ngOnInit(): void {
    this.propService.obtenerPropiedades().subscribe((response) => {
      this.propiedades = response;
    });
  }

  soloNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      // solo números (0-9)
      event.preventDefault();
    }
  }

  agregarInquilino() {
    if(!this.nuevoInquilino.Nombre || !this.nuevoInquilino.Email || !this.nuevoInquilino.Telefono || this.nuevoInquilino.EstanciaRegistrada <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos obligatorios antes de agregar el inquilino.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(this.nuevoInquilino.Telefono.length < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Numero telefonico Incompleto',
        text: 'Por favor, ingresa un numero valido.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.nuevoInquilino.FechaRegistro = `${dd}-${mm}-${yyyy}`;
    this.inquilinoService
      .agregarInquilino(this.nuevoInquilino)
      .subscribe((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Inquilino agregado',
          text: 'El Inquilino ha sido agregado exitosamente',
          confirmButtonText: 'Aceptar'
        });
        this.nuevoInquilino = {
          idInquilino: 0,
          Nombre: '',
          Email: '',
          Telefono: '',
          FechaRegistro: '',
          EstanciaRegistrada: 0,
        };
      });
  }
}
