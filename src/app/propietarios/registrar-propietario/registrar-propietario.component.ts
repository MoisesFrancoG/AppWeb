import { Component } from '@angular/core';
import { PropietarioService } from '../propietario.service';
import { Propietario } from '../models/propietario';

@Component({
  selector: 'app-registrar-propietario',
  templateUrl: './registrar-propietario.component.html',
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

  agregarPropietario() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.nuevoPropietario.FechaRegistro = `${dd}-${mm}-${yyyy}`;
    this.propietarioService.agregarPropietario(this.nuevoPropietario).subscribe(
      (response) => {
        console.log('Propietario agregado:', response);
        this.nuevoPropietario = {
          idPropietario: 0,
          Nombre: '',
          Email: '',
          Telefono: '',
          NumeroPropiedades: 0,
          FechaRegistro: '',
        };
      },
      (error) => console.error('Error al agregar propietario:', error)
    );
  }
}
