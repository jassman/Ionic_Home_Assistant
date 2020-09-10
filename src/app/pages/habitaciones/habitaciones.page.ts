import { UsuarioAppI } from './../../model/usuario-app.model';
import { HabitacionI } from './../../model/habitacion.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiServerService } from './../../services/api-server.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
})
export class HabitacionesPage implements OnInit {

  habitaciones: HabitacionI[] = []; // Array de habitaciones registradas

  constructor(
    private apiServer: ApiServerService,
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    public loadingController: LoadingController,
    @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.nativeStorage.getItem('usuario').then((res: UsuarioAppI) => {
      this.apiServer.token = res.token;
      console.log('HabitacionesPage::ngOnInit::nativeStorage::getItem("usuario")::OK: ', res);
      // Obtener habitaciones registradas
      this.actualizaHabitaciones();
    }).catch(error => {
      console.error('HabitacionesPage::ngOnInit::nativeStorage.getItem::ERROR: ', error);
    });
  }

  /**
   *
   * @param hab Habitacion que debe actualizar
   * @description Actuzaliza una habitacion del servidor
   */
  updateHabitacion(hab: HabitacionI){
    console.log('HabitacionesPage::updateHabitacion::HabitacionI: ', hab);
    this.apiServer.updateHabitacion(hab).subscribe((res: HabitacionI[]) => {
      console.log('HabitacionesPage::updateHabitacion::OK: ', res);
      this.actualizaHabitaciones();
    }, error => {
      console.error('HabitacionesPage::updateHabitacion::ERROR: ', error);
    });
  }

  /**
   *
   * @param id Id de la habitacion
   * @description Elimina la habitacion con el id seleccionado del servidor
   */
  async deleteHabitacion(id: number){
    console.log('HabitacionesPage::deleteHabitacion::id: ', id);

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: '¿Seguro que quieres eliminar la habitacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si, seguro',
          handler: () => {
            console.log('Confirm Okay');
            this.apiServer.deleteHabitacion(id).subscribe((hRes: any) => {
              console.log('HabitacionesPage::deleteHabitacion::OK: ', hRes);
              this.actualizaHabitaciones();
            }, error => {
              console.error('HabitacionesPage::deleteHabitacion::ERROR: ', error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * @description Muestra una ventana para crear una nueva habitacion
   */
  async showAlertCreateHabitacion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Crear habitación',
      inputs: [
        {
          name: 'nombre',
          id: 'nombre-hab-id',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'mcuadrados',
          type: 'number',
          placeholder: 'Metros cuadrados',
          min: 1,
          max: 200
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            console.log('Confirm Ok', alertData.nombre, alertData.mcuadrados);
            const hab: HabitacionI = {};
            hab.nombre = alertData.nombre;
            hab.metros_cuadrados = alertData.mcuadrados;
            this.apiServer.addHabitacion(hab).subscribe((hRes: any) => {
              console.log('HabitacionesPage::showAlertCreateHabitacion::addHabitacion::OK: ', hRes);
              this.actualizaHabitaciones();
            }, error => {
              console.error('HabitacionesPage::showAlertCreateHabitacion::addHabitacion::ERROR: ', error);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 
   * @param ev Propiedad del elemento que genera este evento
   * @param id Id de la habitacion
   * @description Cambia la propiedad de poder clickar el boton
   */
  enableUpdate(ev, id: number){
    console.log('HabitacionesPage::enableUpdate: ', ev, id);
    document.getElementById('btn-update-' + id).setAttribute('disabled', 'false');
  }

  /**
   * @description Actualiza las habitaciones registradas en el servidor
   */
  actualizaHabitaciones(){
    this.showLoader();
    this.apiServer.getHabitaciones().subscribe((hRes: HabitacionI[]) => {
      console.log('HabitacionesPage::actualizaHabitaciones::OK: ', hRes);
      this.habitaciones = hRes;
      this.hideLoader();
    }, error => {
      console.error('HabitacionesPage::actualizaHabitaciones::ERROR: ', error);
      this.hideLoader();
    });
  }

  showLoader() {
    this.loadingController.create({
      message: 'Cargando...'
    }).then((res) => {
      res.present();
    });

  }

  hideLoader() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });

  }

}
