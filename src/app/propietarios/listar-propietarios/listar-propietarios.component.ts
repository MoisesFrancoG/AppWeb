import { Component, OnInit } from '@angular/core';
import { Propietario } from '../models/propietario';
import { PropietarioService } from '../propietario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-propietarios',
  templateUrl: './listar-propietarios.component.html',
  styleUrls: ['./listar-propietarios.component.css']
})
export class ListarPropietariosComponent implements OnInit{
  propietarios: Propietario[] = []
  propietarioSeleccionado: Propietario | null = null

  constructor(private propietarioService: PropietarioService){ }

  ngOnInit(): void {
      this.obtenerPropietarios()
    }
    
    obtenerPropietarios():void {
      this.propietarioService.obtenerPropietarios().subscribe(
        response => {
          this.propietarios = response
        },
        error => console.error("Error al obtener los propietarios: "+error)
      )
    }

    seleccionarPropietario(propietario: Propietario) : void {
      this.propietarioSeleccionado = { ...propietario }; 
    }
  
    cancelarEdicion(): void {
      this.propietarioSeleccionado = null; 
    }

    actualizarPropietario():void {
      if (this.propietarioSeleccionado) {
        this.propietarioService.actualizarPropietario(this.propietarioSeleccionado.idPropietario, this.propietarioSeleccionado).subscribe(
          () => {
            this.obtenerPropietarios();
            this.cancelarEdicion();
          },
          error => console.error('Error al actualizar propietario:', error)
        );
      }
    }
  
    eliminarPropietario(id: number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.propietarioService.eliminarPropietario(id).subscribe(
            () => {
              this.propietarios = this.propietarios.filter(user => user.idPropietario !== id);
              Swal.fire(
                'Eliminado',
                'El propietario ha sido eliminado con éxito.',
                'success'
              );
            },
            error => console.error('Error al eliminar propietario:', error)
          );
        }
      });
    }
}
