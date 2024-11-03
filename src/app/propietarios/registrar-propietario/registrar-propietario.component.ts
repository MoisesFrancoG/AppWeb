import { Component } from '@angular/core';
import { PropietarioService } from '../propietario.service';
import { Propietario } from '../models/propietario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-propietario',
  templateUrl: './registrar-propietario.component.html',
  styleUrl: './registrar-propietario.component.css'
})
export class RegistrarPropietarioComponent {
  nuevoPropietario: Propietario = {
    idPropietario: 0,
    Nombre: '',
    Email: '',
    Telefono: '',
    NumeroPropiedades: 0,
    FechaRegistro: '',
  };

  constructor(private propietarioService: PropietarioService) {}

  soloNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) { // solo números (0-9)
      event.preventDefault();
    }
  }
  
  agregarPropietario() {
    if (!this.nuevoPropietario.Nombre || !this.nuevoPropietario.Email || !this.nuevoPropietario.Telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos obligatorios antes de agregar el propietario.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if(this.nuevoPropietario.Telefono.length <10) {
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
    this.nuevoPropietario.FechaRegistro = `${dd}-${mm}-${yyyy}`;
    
    this.propietarioService.agregarPropietario(this.nuevoPropietario).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Propietario agregado',
          text: 'El propietario ha sido agregado exitosamente',
          confirmButtonText: 'Aceptar'
        });
      
        this.nuevoPropietario = {
          idPropietario: 0,
          Nombre: '',
          Email: '',
          Telefono: '',
          NumeroPropiedades: 0,
          FechaRegistro: '',
        };
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar propietario',
          text: `Error: ${error.message || 'Error desconocido'}`,
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al agregar propietario:', error);
      }
    );
  }
}
