import { TemperaturaHumedadMetaDataI } from './../../model/temperatura-humedad-metadata.model';
import { UsuarioAppI } from './../../model/usuario-app.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiServerService } from './../../services/api-server.service';
import { Component, OnInit, ViewChild, Input, OnChanges  } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-slider-temperatura',
  templateUrl: './slider-temperatura.component.html',
  styleUrls: ['./slider-temperatura.component.scss'],
})
export class SliderTemperaturaComponent implements OnInit, OnChanges {

  @Input() token?: string;
  @Input() habitacion?: number;
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  slider: any;
  thMetaData: TemperaturaHumedadMetaDataI;

  sliderOpts = {
    initialSlide: 1,
    slidesPerView: 1.3,
    loop: true,
    centeredSlides: true,
    spaceBetween: 20,
    pagination: true,
    pager: true,
  };

  constructor(
    private apiServer: ApiServerService,
    private nativeStorage: NativeStorage
  ) {}

  ngOnChanges() {
    if (this.habitacion) {
      console.log('ngOnChanges', this.habitacion);
      this.nativeStorage.getItem('usuario').then((res: UsuarioAppI) => {
        this.apiServer.token = res.token;
        this.apiServer.getTemperaturaHumedadMetaData(this.habitacion).subscribe((thRes: TemperaturaHumedadMetaDataI) => {
          console.log('SliderTemperaturaComponent::ngOnInit::getTemperaturaHumedadMetaData::OK: ', thRes);
          this.thMetaData = thRes;
          this.createSlider();
        }, error => {
          console.error('SliderTemperaturaComponent::ngOnInit::apiServer.getTemperaturaHumedadMetaData::ERROR: ', error);
        });
      }).catch(error => {
        console.error('SliderTemperaturaComponent::ngOnInit::nativeStorage.getItem::ERROR: ', error);
      });
    }
  }

  ngOnInit() { }

  createSlider(){
    this.slider =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          valor1: this.thMetaData.media_temp,
          valor2: this.thMetaData.media_hum,
          titulo: 'Medias'
        },
        {
          valor1: this.thMetaData.maxima_temp.temperatura,
          fecha1: this.thMetaData.maxima_temp.fecha,
          valor2: this.thMetaData.maxima_hum.humedad,
          fecha2: this.thMetaData.maxima_hum.fecha,
          titulo: 'Máximos'
        },
        {
          valor1: this.thMetaData.minima_temp.temperatura,
          fecha1: this.thMetaData.minima_temp.fecha,
          valor2: this.thMetaData.minima_hum.humedad,
          fecha2: this.thMetaData.minima_hum.fecha,
          titulo: 'Mínimos'
        }
      ]
    };
  }

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  // Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

}
