import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeteccionesPageRoutingModule } from './detecciones-routing.module';

import { DeteccionesPage } from './detecciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeteccionesPageRoutingModule,
    Ng2GoogleChartsModule
  ],
  declarations: [DeteccionesPage]
})
export class DeteccionesPageModule {}
