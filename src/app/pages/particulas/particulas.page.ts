import { ParticulasAireI } from './../../model/particulasAire.model';
import { UsuarioAppI } from './../../model/usuario-app.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiServerService } from './../../services/api-server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-particulas',
  templateUrl: './particulas.page.html',
  styleUrls: ['./particulas.page.scss'],
})
export class ParticulasPage implements OnInit {

  particulas: ParticulasAireI[] = [];

  constructor(
    private apiServer: ApiServerService,
    private nativeStorage: NativeStorage,
  ) { }

  ngOnInit() {
    this.nativeStorage.getItem('usuario').then((res: UsuarioAppI) => {
      this.apiServer.token = res.token;
      console.log('ParticulasPage::ngOnInit::nativeStorage::getItem("usuario")::OK: ', res);
      // Obtener habitaciones registradas
      this.getParticulas();
    }).catch(error => {
      console.error('DeteccionesPage::ngOnInit::nativeStorage.getItem::ERROR: ', error);
    });
  }

  getParticulas(){
    this.apiServer.getParticulasAire().subscribe((dPar: ParticulasAireI[]) => {
      console.log('ParticulasPage::getParticulas::OK: ', dPar);
      this.particulas = dPar;
    }, error => {
      console.error('ParticulasPage::getParticulas::ERROR: ', error);
    });
  }

}
