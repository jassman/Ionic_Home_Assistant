import { ParticulasAireI } from './../model/particulasAire.model';
import { DeteccionDispositivoI } from './../model/deteccion-dispositivo.model';
import { DeteccionI } from './../model/deteccion.model';
import { TemperaturaHumedadMetaDataI } from './../model/temperatura-humedad-metadata.model';
import { TemperaturaHumedadDataI } from './../model/temperatura-humedad-data.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HabitacionI } from './../model/habitacion.model';
import { UsuarioAppI } from './../model/usuario-app.model';
import { TemperaturaHumedadI } from './../model/temperatura-humedad.model';


@Injectable({
  providedIn: 'root'
})
export class ApiServerService {

  token: string = '';
  miCabecera: HttpHeaders;
  options: any;


  apiURL = 'https://192.168.1.44/apiapp/api/v1/';

  constructor(
    private nativeStorage: NativeStorage,
    private http: HttpClient
    ) {
      this.miCabecera = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '  + this.token);
      /*
      if(!this.checkToken()){
        this.nativeStorage.getItem("usuario").then((res: UsuarioAppI) => {
          this.token = res.token;
          this.miCabecera = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set("Authorization", "Bearer " + this.token);
        }).catch(error => {
          console.error('ApiServerService::constructor:: ', error);
        });
      }
      */
  }

  private checkToken(): boolean {
    return (this.token.length > 0);
  }

  /**
   * HABITACIONES
   */
  getHabitaciones(): Observable<HabitacionI[]>{
    const h: HabitacionI[] = [];
    return this.http.get(this.apiURL + 'habitacion/', {headers: this.miCabecera}).pipe(
      map(results => {
        results['results'].forEach(element => {
          h.push(element);
        });
        return h;
      })
    );
  }

  addHabitacion(h: HabitacionI): Observable<any>{
    return this.http.post(this.apiURL + 'habitacion/',
      {nombre: h.nombre, metros_cuadrados: h.metros_cuadrados},
      {headers: this.miCabecera});
  }

  updateHabitacion(h: HabitacionI): Observable<any>{
    return this.http.patch(this.apiURL + 'habitacion/' + h.id + '/', h, {headers: this.miCabecera});
  }

  deleteHabitacion(id: number): Observable<any>{
    return this.http.delete(this.apiURL + 'habitacion/' + id + '/', {headers: this.miCabecera});
  }


  /**
   * TEMPERATURA Y HUMEDAD
   */
  getTemperaturaHumedad(idHabitacion: number): Observable<TemperaturaHumedadI[]>{
    const th: TemperaturaHumedadI[] = [];
    return this.http.get(this.apiURL + 'iotTempHum/', {headers: this.miCabecera}).pipe(
      map(results => {
        results['results'].forEach(element => {
          const zone = element.fecha.split('+');
          element['fecha'] = new Date(element['fecha']);
          const y: number = +zone[1].substring(1, 2);
          element['fecha'].setHours(element['fecha'].getHours() + y);
          th.push(element);
          // console.log(element);
        });
        return th;
      })
    );
  }

  getTemperaturaHumedadData(idHabitacion: number, tipo: string): Observable<TemperaturaHumedadDataI[]>{
    const thDatas: TemperaturaHumedadDataI[] = [];
    let t = '';
    if (tipo === 'dia'){ t = 'dia'; } else if (tipo === 'mes'){ t = 'mes'; }

    return this.http.get(this.apiURL + 'iotTempHum/' + t + '/', {headers: this.miCabecera}).pipe(
      map(results => {
        results['response'].forEach(element => {
          let from = element['fecha'].split('-');
          if (t === 'dia') {
            element['fecha'] = new Date(from[0], from[1] - 1, from[2]);
          } else if (t === 'mes') {
            element['fecha'] = new Date(from[0], from[1] - 1, 1);
          }
          thDatas.push(element);
        });
        return thDatas;
      })
    );
  }

  getTemperaturaHumedadMetaData(idHabitacion: number): Observable<TemperaturaHumedadMetaDataI>{
    return this.http.get(this.apiURL + 'iotTempHum/metadata/', {headers: this.miCabecera}).pipe(
      map(result => {
        result['media_temp'] = result["media_temp"]['temperatura__avg'];
        result['media_hum'] = result["media_hum"]['humedad__avg'];
        return result;
      })
    );
  }

  getDetecciones(tIni?: number, tFin?: number): Observable<DeteccionI[]>{
    const detecciones: DeteccionI[] = [];
    let filtro = '';

    if (tIni != null && tFin != null){
      filtro = '?t_ini=' + tIni + '&t_fin=' + tFin;
    } else {
      const today = new Date();
      today.setDate(today.getDate() - 1);
      const dateIni = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      const dateFin = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
      console.log(dateIni.getTime(), dateFin.getTime());
      filtro = '?t_ini=' + dateIni.getTime() / 1000 + '&t_fin=' + dateFin.getTime() / 1000;
    }

    return this.http.get(this.apiURL + 'detectWifi/getRangos/' + filtro, {headers: this.miCabecera}).pipe(
      map(result => {
        result['results'].forEach(element => {
          element['fecha_ini'] = new Date(element['fecha_ini'] * 1000);
          element['fecha_fin'] = new Date(element['fecha_fin'] * 1000);
          detecciones.push(element);
        });
        return detecciones;
      })
    );
  }

  getDeteccionesInHomeNow(): Observable<DeteccionDispositivoI[]>{
    const detecciones: DeteccionDispositivoI[] = [];
    return this.http.get(this.apiURL + 'detectWifi/getDispositivosNow/', {headers: this.miCabecera}).pipe(
      map(result => {
        result['response']['estan'].forEach(element => {
          element['last_detect'] = new Date(element['last_detect'] * 1000);
          detecciones.push(element);
        });
        return detecciones;
      })
    );
  }

  getParticulasAire(): Observable<ParticulasAireI[]>{
    const particulas: ParticulasAireI[] = [];
    return this.http.get(this.apiURL + 'particulasAire/', {headers: this.miCabecera}).pipe(
      map(result => {
        result['results'].forEach(element => {
          element['fecha'] = new Date(element['fecha'] * 1000);
          particulas.push(element);
        });
        return particulas;
      })
    );
  }

}
