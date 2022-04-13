export class Resumen{
    /* Cat Estados */
    id: number;
    cve: string;
    nombre: string;

    /* Cat Unidades  */
    estado: string;
    unidad: string;

    /* Plan Investigacion */
    Equipo: string;
    Funcion: string;
    AMPF: string;
    AMPF_ID: number;
    Rol_AMPF: string;
    Jefe_Inmediato: string;
    Rol_Jefe: string;
    Proyecto: string;
    Actividad_Modelo: string;
    NumCar: string;
    FechaCI: string;
    HoraFechaCI: string;
    numImputados: number;
    Incidencia_del: string;
    Fiscalia: string;
    Fis_iniciales: string;
    Deteido: number;

    /* Plan Diligencia */
    carpetainvestigacion: string;
    NombrePlan: string;
    codigo_ley: string;
    articulo: number;
    fraccion: string;
    clasificacion_juridica_provisional: string;
    elemento_a_acreditar: string;
    referencia_ley: string;
    referencia_art: string;
    Diligencia_id: string;
    objetivo_plan_dsc: string;
    tiempo_ini: string;
    tiempo_res: string;

}