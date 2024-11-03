import { Component, OnInit } from '@angular/core';
import { Inquilino } from '../models/inquilino';
import { InquilinoService } from '../inquilino.service';
import Swal from 'sweetalert2';

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

  obtenerInquilinos() : void{
    this.inquilinoService.obtenerInquilinos().subscribe(
      response => {
        this.inquilinos = response
      }
    )
  }

  soloNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) { // solo números (0-9)
      event.preventDefault();
    }
  }

  seleccionarInquilino(inquilino: Inquilino) : void {
    this.inquilinoSeleccionado = {...inquilino}
  }
  cancelarEdicion() : void{
    this.inquilinoSeleccionado = null
  }

  actualizarInquilino() : void{
    if(this.inquilinoSeleccionado) {
      if(!this.inquilinoSeleccionado.Nombre || !this.inquilinoSeleccionado.Email || !this.inquilinoSeleccionado.Telefono) {
        Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos obligatorios antes de actualizar el inquilino.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
      if(this.inquilinoSeleccionado.Telefono.length < 10) {
        Swal.fire({
          icon: 'error',
          title: 'Numero telefonico Incompleto',
          text: 'Por favor, ingresa un numero valido.',
          confirmButtonText: 'Aceptar'
        });
        return;
      }
      this.inquilinoService.actualizarInquilino(this.inquilinoSeleccionado.idInquilino,this.inquilinoSeleccionado).subscribe(
        () => {
          this.obtenerInquilinos()
          this.cancelarEdicion()
        },
        error => console.error("Error al actualizar: " , error)
      )
    }
  }

  eliminarInquilino(id: number) : void{
    Swal.fire({
      title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inquilinoService.eliminarInquilino(id).subscribe(
          () => {
            this.inquilinos = this.inquilinos.filter(user => user.idInquilino !== id);
          },
          error => console.error('Error al eliminar inquilino:', error)
        );
      }
    })
  }
}
