import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrarPropietarioComponent } from './propietarios/registrar-propietario/registrar-propietario.component';
import { ListarPropietariosComponent } from './propietarios/listar-propietarios/listar-propietarios.component';
import { RegistrarInquilinoComponent } from './inquilinos/registrar-inquilino/registrar-inquilino.component';
import { ListarInquilinosComponent } from './inquilinos/listar-inquilinos/listar-inquilinos.component';
import { RegistrarPropiedadComponent } from './propiedades/registrar-propiedad/registrar-propiedad.component';
import { ListarPropiedadesComponent } from './propiedades/listar-propiedades/listar-propiedades.component';
const routes: Routes = [
  { path : '', component: HomeComponent},
  { path : 'registrar_propietarios', component: RegistrarPropietarioComponent},
  { path : 'listar_propietarios', component : ListarPropietariosComponent},
  { path : 'registrar_inquilino', component: RegistrarInquilinoComponent},
  { path : 'listar_inquilinos', component : ListarInquilinosComponent},
  { path : 'registrar_prop', component : RegistrarPropiedadComponent},
  {path : 'listar_prop', component : ListarPropiedadesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
