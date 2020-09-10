import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticulasPage } from './particulas.page';

const routes: Routes = [
  {
    path: '',
    component: ParticulasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticulasPageRoutingModule {}
