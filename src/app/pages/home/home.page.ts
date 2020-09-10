import { StorageDataService } from './../../services/storage-data.service';
import { UsuarioAppI } from './../../model/usuario-app.model';
import { ApiAuthService } from './../../services/api-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private usuario: UsuarioAppI = {}; // Usuario aplicacion

  constructor(
    private apiAuth: ApiAuthService,
    private storageData: StorageDataService 
  ) {}

  ngOnInit() {
    this.apiAuth.getToken().subscribe((res) => {
      console.log("HomePage::ngOnInit::apiAuth.getToken()::Respuesta: " + JSON.stringify(res));
      this.usuario.token = res;
      this.storageData.setUser(this.usuario);
    }, (error) => {
      console.error("HomePage::ngOnInit::apiAuth.getToken()::Error: " + error);
    });
  }

}
