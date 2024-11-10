import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPropietarioComponent } from './registrar-propietario/registrar-propietario.component';
import { ListarPropietariosComponent } from './listar-propietarios/listar-propietarios.component';
import { FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    RegistrarPropietarioComponent,
    ListarPropietariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  exports: [
    RegistrarPropietarioComponent,
    ListarPropietariosComponent
  ]
})
export class PropietariosModule { }
