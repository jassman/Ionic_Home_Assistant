import { UsuarioAppI } from './../../model/usuario-app.model';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DeteccionI } from './../../model/deteccion.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiServerService } from './../../services/api-server.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahora-en-casa',
  templateUrl: './ahora-en-casa.page.html',
  styleUrls: ['./ahora-en-casa.page.scss'],
})
export class AhoraEnCasaPage implements OnInit {

  detecciones: DeteccionI[];
  readyData = false;
  timelineChart: GoogleChartInterface = {
    chartType: 'Timeline'
  };
  fechaSeleccionada: Date;
  maxDate: any = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();

  constructor(
    private apiServer: ApiServerService,
    private nativeStorage: NativeStorage
  ) { }

  ngOnInit() {
    this.nativeStorage.getItem('usuario').then((res: UsuarioAppI) => {
      this.apiServer.token = res.token;
      console.log('DeteccionesPage::ngOnInit::nativeStorage::getItem("usuario")::OK: ', res);
      // Obtener habitaciones registradas
      this.getDetecciones();
    }).catch(error => {
      console.error('DeteccionesPage::ngOnInit::nativeStorage.getItem::ERROR: ', error);
    });
  }

  getDetecciones(fIni: number = null, fFin: number = null){
    this.apiServer.getDetecciones(fIni, fFin).subscribe((dRes: DeteccionI[]) => {
      console.log('DeteccionesPage::getDetecciones::OK: ', dRes);
      this.detecciones = dRes;
      if (this.detecciones.length > 0) {
        this.createMetadataChart();
      }
      console.log('DeteccionesPage::getDetecciones::this.detecciones[0].fecha_ini.getDate(): ' + this.detecciones[0].fecha_ini.getDate());
    }, error => {
      console.error('DeteccionesPage::getDetecciones::ERROR: ', error);
    });
  }

  updateChart(){
    const f = new Date(this.fechaSeleccionada);
    console.log('DeteccionesPage::updateChart::OK:' + f.getFullYear());
    const fechaIni = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 0, 0, 0);
    const fechaFin = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 23, 59, 59);
    this.getDetecciones(fechaIni.getTime() / 1000, fechaFin.getTime() / 1000);
  }

  createMetadataChart() {

    const datos: any[] = [];
    datos.push(['Name', 'From', 'To']);
    this.detecciones.forEach(element => {
      datos.push([
        element.nombre,
        element.fecha_ini,
        element.fecha_fin
      ]);
    });

    const unique = [...new Set(this.detecciones.map(item => item.nombre))];
    const paddingHeight = 50;
    const rowHeight = unique.length * 41;
    const chartHeight = rowHeight + paddingHeight;

    this.timelineChart = {
      chartType: 'Timeline',
      dataTable: datos,
      options: {
        width: '100%',
        height: chartHeight,
        hAxis: {
          format: 'HH:MM',
          gridlines: {count: 15}
        }
      }
    };
    console.log('DeteccionesPage::createMetadataChart::this.timelineChart.component:' + this.timelineChart.component);
    if (this.timelineChart.component !== undefined) {
      this.timelineChart.component.draw();
    }
    this.readyData = true;
  }

}
