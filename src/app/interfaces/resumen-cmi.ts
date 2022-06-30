export interface ResumenCMI {
    Num: number;
    Vista: string;
    Fecha_Ini: string;
    Fecha_Fin: string;
    NMes1: string;
    TMes1: string;
    NMes2: string,
    TMes2: string;
    NMes3: string;
    TMes3: string;
    Total: number;
}

export interface ValidaDatos {
    id: number;
    Tabla: string;
    Fecha_Ini: string;
    Fecha_Fin: string;
    Error_Datos: number;
    Campos_Null: number;
}


