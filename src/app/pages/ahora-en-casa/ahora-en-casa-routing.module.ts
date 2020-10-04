import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhoraEnCasaPage } from './ahora-en-casa.page';

const routes: Routes = [
  {
    path: '',
    component: AhoraEnCasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AhoraEnCasaPageRoutingModule {}
