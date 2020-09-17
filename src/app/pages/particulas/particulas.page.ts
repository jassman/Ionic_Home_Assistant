import { GoogleChartInterface } from 'ng2-google-charts';
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

  readyData = false;
  particulas: ParticulasAireI[] = [];
  timelineChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  };

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
      this.createMetadataChart();
    }, error => {
      console.error('ParticulasPage::getParticulas::ERROR: ', error);
    });
  }

  createMetadataChart() {
    const datos: any[] = [];
    datos.push(['Fecha', 'AQI', 'PM 2.5', 'PM 10']);
    this.particulas.forEach(element => {
      const dia = element.fecha.getDate();
      const mes = element.fecha.getMonth();
      const horas = element.fecha.getHours();
      const minutos = element.fecha.getMinutes();
      const formatMes = mes < 10 ? '0' + mes : mes;
      const formatDia = dia < 10 ? '0' + dia : dia;
      const formatHoras = horas < 10 ? '0' + horas : horas;
      const formatMinutos = minutos < 10 ? '0' + minutos : minutos;

      datos.push([
        formatDia + '/' + formatMes + ' ' + formatHoras + ':' + formatMinutos,
        element.aqi,
        element.pm25,
        element.pm10
      ]);
    });

    this.timelineChart = {
      chartType: 'ColumnChart',
      dataTable: datos,
      options: {
        width: '100%',
        title: 'Particulas polvo',
        animation: {
          duration: 1000,
          easing: 'out',
          startup: true
        }
      }
    };
    console.log(this.timelineChart.component);
    if (this.timelineChart.component !== undefined) {
      this.timelineChart.component.draw();
    }
    this.readyData = true;
  }

}
