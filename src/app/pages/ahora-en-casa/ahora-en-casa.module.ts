import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhoraEnCasaPageRoutingModule } from './ahora-en-casa-routing.module';

import { AhoraEnCasaPage } from './ahora-en-casa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhoraEnCasaPageRoutingModule,
    Ng2GoogleChartsModule
  ],
  declarations: [AhoraEnCasaPage]
})
export class AhoraEnCasaPageModule {}
