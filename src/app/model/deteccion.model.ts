
export interface DeteccionI {
    id?: number;
    nombre?: string;
    mac?: string;
    fecha_ini?: Date;
    fecha_fin?: Date;
    rssi?: number;
    rssi_min?: number;
    rssi_max?: number;
    canal?: number;
    ncanales?: number;
    repeticiones?: number;
    conocido?: number;
}
