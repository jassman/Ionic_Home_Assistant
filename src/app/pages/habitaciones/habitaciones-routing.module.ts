import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabitacionesPage } from './habitaciones.page';

const routes: Routes = [
  {
    path: '',
    component: HabitacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabitacionesPageRoutingModule {}
