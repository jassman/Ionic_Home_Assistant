import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionPage } from './configuracion.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPage
  },
  {
    path: 'habitaciones',
    loadChildren: () => import('./../habitaciones/habitaciones.module').then( m => m.HabitacionesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionPageRoutingModule {}
