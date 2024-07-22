import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaveMaestraComponent } from './pages/clave-maestra/listar-claves-maestras/clave-maestra.component';
import { ListarElementosComponent } from './pages/elementos/listar-elementos/listar-elementos.component';

export const routes: Routes = [
  { path: 'clave-maestra', component: ClaveMaestraComponent },
  { path: 'elementos', component: ListarElementosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
