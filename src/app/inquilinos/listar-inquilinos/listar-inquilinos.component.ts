import { Component, OnInit } from '@angular/core';
import { Inquilino } from '../models/inquilino';
import { InquilinoService } from '../inquilino.service';

@Component({
  selector: 'app-listar-inquilinos',
  templateUrl: './listar-inquilinos.component.html',
  styleUrl: './listar-inquilinos.component.css'
})
export class ListarInquilinosComponent implements OnInit{
  inquilinos : Inquilino[] = []
  inquilinoSeleccionado: Inquilino | null = null

  constructor(private inquilinoService: InquilinoService) {}

  ngOnInit(): void {
      this.obtenerInquilinos()
  }

  obtenerInquilinos() {
    this.inquilinoService.obtenerInquilinos().subscribe(
      response => {
        this.inquilinos = response
        console.log(response)
      }
    )
  }

  seleccionarInquilino(inquilino: Inquilino) {
    this.inquilinoSeleccionado = {...inquilino}
  }
  cancelarEdicion() {
    this.inquilinoSeleccionado = null
  }

  actualizarInquilino() {
    if(this.inquilinoSeleccionado) {
      this.inquilinoService.actualizarInquilino(this.inquilinoSeleccionado.idInquilino,this.inquilinoSeleccionado).subscribe(
        () => {
          this.obtenerInquilinos()
          this.cancelarEdicion()
        },
        error => console.error("Error al actualizar: " , error)
      )
    }
  }

  eliminarInquilino(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este propietario?')) {
      this.inquilinoService.eliminarInquilino(id).subscribe(
        () => {
          this.inquilinos = this.inquilinos.filter(user => user.idInquilino !== id);
          console.log('Inquilino eliminado');
        },
        error => console.error('Error al eliminar inquilino:', error)
      );
    }
  }
}
