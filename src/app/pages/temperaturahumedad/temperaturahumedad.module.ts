import { SliderTemperaturaComponent } from './../../components/slider-temperatura/slider-temperatura.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperaturahumedadPageRoutingModule } from './temperaturahumedad-routing.module';

import { TemperaturahumedadPage } from './temperaturahumedad.page';

import { ChartsModule } from 'ng2-charts';

import 'chartjs-plugin-zoom';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemperaturahumedadPageRoutingModule,
    ChartsModule
  ],
  declarations: [TemperaturahumedadPage, SliderTemperaturaComponent],
  entryComponents: [SliderTemperaturaComponent]
})
export class TemperaturahumedadPageModule {}
