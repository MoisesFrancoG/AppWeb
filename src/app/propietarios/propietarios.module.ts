import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPropietarioComponent } from './registrar-propietario/registrar-propietario.component';
import { ListarPropietariosComponent } from './listar-propietarios/listar-propietarios.component';
import { FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RegistrarPropietarioComponent,
    ListarPropietariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RegistrarPropietarioComponent,
    ListarPropietariosComponent
  ]
})
export class PropietariosModule { }
