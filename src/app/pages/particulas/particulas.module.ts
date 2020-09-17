import { Ng2GoogleChartsModule } from 'ng2-google-charts';
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
    ParticulasPageRoutingModule,
    Ng2GoogleChartsModule
  ],
  declarations: [ParticulasPage]
})
export class ParticulasPageModule {}
