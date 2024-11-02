import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../propiedad.service';
import { Propiedad } from '../models/propiedad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-propiedades',
  templateUrl: './listar-propiedades.component.html',
  styleUrls: ['./listar-propiedades.component.css']
})
export class ListarPropiedadesComponent implements OnInit {
  propiedades: Propiedad[] = [];

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.obtenerPropiedades();
  }

  obtenerPropiedades(): void {
    this.propiedadService.obtenerPropiedades().subscribe(
      (data: Propiedad[]) => {
        this.propiedades = data;
      },
      error => console.error('Error al obtener propiedades:', error)
    );
  }

  actualizarDisponibilidad(propiedad: Propiedad): void {
    const propiedadActualizada = {
      ...propiedad,
      Disponibilidad: propiedad.Disponibilidad
    };
    this.propiedadService.actualizarPropiedad(propiedad.idPropiedad, propiedadActualizada).subscribe(
      response => console.log('Disponibilidad actualizada:', response),
      error => console.error('Error al actualizar disponibilidad:', error)
    );
  }

  eliminarPropiedad(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.propiedadService.eliminarPropiedad(id).subscribe(
          () => {
            this.propiedades = this.propiedades.filter(p => p.idPropiedad !== id);
          },
          error => console.error('Error al eliminar propiedad:', error)
        );
      }
    })
  }
}
