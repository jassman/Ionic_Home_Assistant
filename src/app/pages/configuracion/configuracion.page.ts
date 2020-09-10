import { UsuarioAppI } from './../../model/usuario-app.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  notificacionesActivas: boolean;
  usuario: UsuarioAppI = {};

  constructor(private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.nativeStorage.getItem('usuario').then((res: UsuarioAppI) => {
      console.log('ConfiguracionPage::ngOnInit::nativeStorage::getItem("usuario")::OK: ', res);
      this.usuario = res;
      this.notificacionesActivas = true;
    }).catch(error => {
      console.error('HabitacionesPage::ngOnInit::nativeStorage.getItem::ERROR: ', error);
    });
  }

}
