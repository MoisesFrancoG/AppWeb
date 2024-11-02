import { Component, OnInit } from '@angular/core';
import { Inquilino } from '../models/inquilino';
import { InquilinoService } from '../inquilino.service';
import { Propiedad } from '../../propiedades/models/propiedad';
import { PropiedadService } from '../../propiedades/propiedad.service';

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
      console.log(response);
    });
  }

  agregarInquilino() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.nuevoInquilino.FechaRegistro = `${dd}-${mm}-${yyyy}`;
    this.inquilinoService.agregarInquilino(this.nuevoInquilino)
      .subscribe((response) => {
        console.log('Inquilino agregado: ', response);
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
