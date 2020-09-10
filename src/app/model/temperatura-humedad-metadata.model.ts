import { TemperaturaHumedadI } from './temperatura-humedad.model';

export interface TemperaturaHumedadMetaDataI {
    media_temp?: number;
    media_hum?: number;
    minima_temp?: TemperaturaHumedadI;
    maxima_temp?: TemperaturaHumedadI;
    minima_hum?: TemperaturaHumedadI;
    maxima_hum?: TemperaturaHumedadI;
}
