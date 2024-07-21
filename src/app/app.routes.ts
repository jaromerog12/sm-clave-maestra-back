import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaveMaestraComponent } from './pages/clave-maestra/listar-claves-maestras/clave-maestra.component';

export const routes: Routes = [
  {path: 'clave-maestra', component: ClaveMaestraComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }