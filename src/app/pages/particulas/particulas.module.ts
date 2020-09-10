import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParticulasPageRoutingModule } from './particulas-routing.module';

import { ParticulasPage } from './particulas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParticulasPageRoutingModule
  ],
  declarations: [ParticulasPage]
})
export class ParticulasPageModule {}
