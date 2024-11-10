import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPropiedadComponent } from './registrar-propiedad/registrar-propiedad.component';
import { FormsModule } from '@angular/forms';
import { ListarPropiedadesComponent } from './listar-propiedades/listar-propiedades.component';
import { PropiedadesClienteComponent } from './propiedades-cliente/propiedades-cliente.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    RegistrarPropiedadComponent,
    ListarPropiedadesComponent,
    PropiedadesClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  exports: [
    RegistrarPropiedadComponent,
    ListarPropiedadesComponent,
    PropiedadesClienteComponent
  ]
})
export class PropiedadesModule { }
