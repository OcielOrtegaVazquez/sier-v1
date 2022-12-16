export interface VacacionesTableExcel {
    vacionesTable: Vacaciones[];
}


export interface Vacaciones {
    id: string,
    fecIni: string,
    estatusReg: string,
    fechRegistro: string,
    descripcion: string,
    periodo: string,
    anio: string,
    username: string,
    nombre: string,
    u_admin: string,
    color: string,
    fecFin: string
}

