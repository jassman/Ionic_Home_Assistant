import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperaturahumedadPage } from './temperaturahumedad.page';

const routes: Routes = [
  {
    path: '',
    component: TemperaturahumedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperaturahumedadPageRoutingModule {}
