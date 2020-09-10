import { UsuarioAppI } from './../model/usuario-app.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  constructor(private nativeStorage: NativeStorage) { }

  public setUser(usuario: UsuarioAppI) {
    this.nativeStorage.setItem('usuario', {
      usuario: usuario.nombre, 
      password: usuario.password, 
      token: usuario.token}).then(
        data => {
          console.log("StorageDataService::setUser::OK: " + data)
        },
        error => {
          console.error("StorageDataService::setUser:ERROR: " + error)
        }
      );
  }

  public getItem(item: string) {
    return this.nativeStorage.getItem(item);
  }

  public getKeys(){
    return this.nativeStorage.keys();
  }

}
