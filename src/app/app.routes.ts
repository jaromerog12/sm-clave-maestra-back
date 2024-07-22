import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaveMaestraComponent } from './pages/clave-maestra/listar-claves-maestras/listar-clave-maestra.component';
import { ListarElementosComponent } from './pages/elementos/listar-elementos/listar-elementos.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'clave-maestra', component: ClaveMaestraComponent },
  { path: 'elementos', component: ListarElementosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
