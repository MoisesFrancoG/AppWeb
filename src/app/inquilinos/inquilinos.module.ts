import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarInquilinoComponent } from './registrar-inquilino/registrar-inquilino.component';
import { ListarInquilinosComponent } from './listar-inquilinos/listar-inquilinos.component';



@NgModule({
  declarations: [
    RegistrarInquilinoComponent,
    ListarInquilinosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InquilinosModule { }
