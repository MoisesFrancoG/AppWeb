import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../models/propiedad';
import { PropiedadService } from '../propiedad.service';
import { Propietario } from '../../propietarios/models/propietario';
import { PropietarioService } from '../../propietarios/propietario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propiedades-cliente',
  templateUrl: './propiedades-cliente.component.html',
  styleUrl: './propiedades-cliente.component.css'
})
export class PropiedadesClienteComponent implements OnInit{
  propiedades: Propiedad[] = []
  constructor(private propService : PropiedadService, private propietarioService: PropietarioService) { }

  ngOnInit(): void {
      this.propService.obtenerPropiedades().subscribe(
        response => {
          this.propiedades = response.filter(p => p.Disponibilidad === 'Disponible')
          console.log(this.propiedades)
        }
      )
  }

  obtenerPropietario(idPropietario: number) :void {
    this.propietarioService.obtenerPropietarioPorId(idPropietario).subscribe(
      (propietario: Propietario) => {
        Swal.fire({
          title: "Informacion del Propietario",
          html: ` <p>Nombre: ${propietario.Nombre}</p>
                  <p>Email: ${propietario.Email}</p>
                  <p>Telefono: ${propietario.Telefono}</p>`,
          icon: "info",
          confirmButtonText: "Cerrar"
        })
      }
    )
  }
}
