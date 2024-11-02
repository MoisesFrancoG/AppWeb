import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPropiedadComponent } from './registrar-propiedad/registrar-propiedad.component';
import { FormsModule } from '@angular/forms';
import { ListarPropiedadesComponent } from './listar-propiedades/listar-propiedades.component';
import { PropiedadesClienteComponent } from './propiedades-cliente/propiedades-cliente.component';



@NgModule({
  declarations: [
    RegistrarPropiedadComponent,
    ListarPropiedadesComponent,
    PropiedadesClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RegistrarPropiedadComponent
  ]
})
export class PropiedadesModule { }
