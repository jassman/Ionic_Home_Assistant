import { TemperaturaHumedadDataI } from './../../model/temperatura-humedad-data.model';
import { TemperaturaHumedadI } from './../../model/temperatura-humedad.model';
import { HabitacionI } from './../../model/habitacion.model';
import { UsuarioAppI } from './../../model/usuario-app.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiServerService } from './../../services/api-server.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ChartDataSets, ChartOptions, Chart, TimeUnit } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { stringify } from 'querystring';


@Component({
  selector: 'app-temperaturahumedad',
  templateUrl: './temperaturahumedad.page.html',
  styleUrls: ['./temperaturahumedad.page.scss'],
})
export class TemperaturahumedadPage implements OnInit {

  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  habitaciones: HabitacionI[] = []; // Array de habitaciones registradas
  registrosTH: TemperaturaHumedadI[] = []; // Array de las ultimas temperaturas y humedades
  registrosTHData: TemperaturaHumedadDataI[] = []; // Array de resumen de temperaturas y humedaddes
  habitacionSeleccionada: number; // Habitacion seleccionada
  tipoSeleccionTH: any[] = [
    {id: 0, nombre: 'Hoy', url: ''},
    {id: 1, nombre: 'Por dia', url: 'dia'},
    {id: 2, nombre: 'Por mes', url: 'mes'}
  ]; // Tipos de rango de seleccion de temeperatura y humedad
  rangoSeleccionado = 0;

  lineChart: Chart; // Objeto grafico
  lineChartData: ChartDataSets[] = []; // Datos del grafico
  lineChartLabels: Label[] = []; // Labels para los datos

  constructor(
    private apiServer: ApiServerService,
    private nativeStorage: NativeStorage
    ) { }

  ngOnInit() {
    this.nativeStorage.getItem('usuario').then((res: UsuarioAppI) => {
      this.apiServer.token = res.token;
      // Obtener habitaciones registradas
      this.apiServer.getHabitaciones().subscribe((hRes: HabitacionI[]) => {
        console.log('TemperaturahumedadPage::ngOnInit::getHabitaciones::OK: ', hRes);
        this.habitaciones = hRes;
        if (this.habitaciones.length > 0){
          this.habitacionSeleccionada = this.habitaciones[0].id;
        }
      }, error => {
        console.error('TemperaturahumedadPage::ngOnInit::apiServer.getHabitaciones::ERROR: ', error);
      });
      // Obtener datos temperatura y humedad
      this.apiServer.getTemperaturaHumedad(0).subscribe(thRes => {
        console.log('TemperaturahumedadPage::ngOnInit::getTemperaturaHumedad::OK: ', thRes);
        this.registrosTH = thRes;
        this.createMetadataChart();
      }, error => {
        console.error('TemperaturahumedadPage::ngOnInit::apiServer.getTemperaturaHumedad::ERROR: ', error);
      });

    }).catch(error => {
      console.error('TemperaturahumedadPage::ngOnInit::nativeStorage.getItem::ERROR: ', error);
    });
  }

  public updateChart(){
    console.log('Rango Seleccionado: ' + this.rangoSeleccionado);
    console.log('Habitacion seleccionada: ' + this.habitacionSeleccionada);
    if (this.rangoSeleccionado === 0){
      this.apiServer.getTemperaturaHumedad(this.habitacionSeleccionada).subscribe(thRes => {
        console.log('TemperaturahumedadPage::updateChart::getTemperaturaHumedad::OK: ', thRes);
        this.registrosTH = thRes;
        this.createMetadataChart();
      }, error => {
        console.error('TemperaturahumedadPage::updateChart::apiServer.getTemperaturaHumedad::ERROR: ', error);
      });
    }else{
      this.apiServer.getTemperaturaHumedadData(this.habitacionSeleccionada, this.tipoSeleccionTH[this.rangoSeleccionado].url)
      .subscribe(thDataRes => {
        console.log('TemperaturahumedadPage::updateChart::getTemperaturaHumedadData::OK: ', thDataRes);
        this.registrosTHData = thDataRes;
        this.createMetadataChart();
      }, error => {
        console.error('TemperaturahumedadPage::updateChart::getTemperaturaHumedadData::ERROR: ', error);
      });
    }
  }

  createMetadataChart() {
    const labs: Date[] = []; // Array de labels (x)
    let unit_: TimeUnit;
    let formatDate: string;
    let tooltipFormat_: string;

    if (this.rangoSeleccionado === 0){
      unit_ = 'minute';
      formatDate = 'HH:mm';
      tooltipFormat_ = 'll HH:mm';
      const datosTemp: number[] = []; // Array de valores (y)
      const datosHum: number[] = []; // Array de valores (y)
      // Rellena los arrays con los datos capturados del servidor
      this.registrosTH.slice(0, 23).forEach(element => {
        datosTemp.push(element.temperatura);
        datosHum.push(element.humedad);
        labs.push(element.fecha);
      });
      // Datos rellenos para el chart
      this.lineChartData = [
        {
          type: 'line',
          data: datosTemp,
          label: 'Temperatura º',
          pointRadius: 0,
          borderColor: '#DF2F29',
          backgroundColor: '#DF2F29',
          fill: false
        },
        {
          type: 'line',
          data: datosHum,
          pointRadius: 0,
          label: 'Humedad %',
          borderColor: '#1E4DAB',
          backgroundColor: '#1E4DAB',
          fill: false
        },
      ];

    } else {

      if (this.rangoSeleccionado === 1){
        unit_ = 'day';
        formatDate = 'DD MM';
        tooltipFormat_ = 'll';
      } else if (this.rangoSeleccionado === 2){
        unit_ = 'month';
        formatDate = 'MM YY';
        tooltipFormat_ = 'll';
      }

      const mediaTemp: number[] = []; // Array de valores (y)
      const maxTemp: number[] = []; // Array de valores (y)
      const minTemp: number[] = []; // Array de valores (y)
      const mediaHum: number[] = []; // Array de valores (y)
      const maxHum: number[] = []; // Array de valores (y)
      const minHum: number[] = []; // Array de valores (y)
      // Rellena los arrays con los datos capturados del servidor
      this.registrosTHData.forEach(element => {
        mediaTemp.push(element.media_temp);
        maxTemp.push(element.max_temp);
        minTemp.push(element.min_temp);
        mediaHum.push(element.media_hum);
        maxHum.push(element.max_hum);
        minHum.push(element.min_hum);
        labs.push(element.fecha);
      });
      // Datos rellenos para el chart
      this.lineChartData = [
        {
          type: 'line',
          data: mediaTemp,
          label: 'Media º',
          pointRadius: 0,
          borderColor: '#DF2F29',
          backgroundColor: '#DF2F29',
          fill: false
        },
        {
          type: 'line',
          data: maxTemp,
          label: 'Max º',
          pointRadius: 0,
          borderColor: '#FA1010',
          backgroundColor: '#FA1010',
          fill: false
        },
        {
          type: 'line',
          data: minTemp,
          label: 'Min º',
          pointRadius: 0,
          borderColor: '#F14343',
          backgroundColor: '#F14343',
          fill: false
        },
        {
          type: 'line',
          data: mediaHum,
          label: 'Media %',
          pointRadius: 0,
          borderColor: '#1E4DAB',
          backgroundColor: '#1E4DAB',
          fill: false,
          hidden: true,
        },
        {
          type: 'line',
          data: maxHum,
          label: 'Max %',
          pointRadius: 0,
          borderColor: '#09204D',
          backgroundColor: '#09204D',
          fill: false,
          hidden: true,
        },
        {
          type: 'line',
          data: minHum,
          pointRadius: 0,
          label: 'Min %',
          borderColor: '#3071F0',
          backgroundColor: '#3071F0',
          fill: false,
          hidden: true,
        },
      ];
    }

    // Creacion del chart
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      // type: 'line',
      data: {
        labels: labs,
        datasets: this.lineChartData
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              tooltipFormat: tooltipFormat_,
              unit: unit_,
              displayFormats: {
                minute: formatDate
              }
            }
          }],
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    });
  }

}
