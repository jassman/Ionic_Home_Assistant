import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabitacionesPageRoutingModule } from './habitaciones-routing.module';

import { HabitacionesPage } from './habitaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitacionesPageRoutingModule
  ],
  declarations: [HabitacionesPage]
})
export class HabitacionesPageModule {}
