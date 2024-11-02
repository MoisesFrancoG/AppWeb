import { Component, OnInit } from '@angular/core';
import { Propietario } from '../models/propietario';
import { PropietarioService } from '../propietario.service';

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
    
    obtenerPropietarios() {
      this.propietarioService.obtenerPropietarios().subscribe(
        response => {
          this.propietarios = response
          console.log(response);
        },
        error => console.error("Error al obtener los propietarios: "+error)
      )
    }

    seleccionarPropietario(propietario: Propietario) {
      this.propietarioSeleccionado = { ...propietario }; 
    }
  
    cancelarEdicion() {
      this.propietarioSeleccionado = null; 
    }

    actualizarPropietario() {
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
      if (confirm('¿Estás seguro de que deseas eliminar este propietario?')) {
        this.propietarioService.eliminarPropietario(id).subscribe(
          () => {
            this.propietarios = this.propietarios.filter(user => user.idPropietario !== id);
            console.log('Propietario eliminado');
          },
          error => console.error('Error al eliminar propietario:', error)
        );
      }
    }
}
