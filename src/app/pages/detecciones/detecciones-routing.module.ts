import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeteccionesPage } from './detecciones.page';

const routes: Routes = [
  {
    path: '',
    component: DeteccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeteccionesPageRoutingModule {}
