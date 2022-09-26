export interface Usuario {
    displayName?: string,
    id?: string,
    mail?: string,
    officeLocation?: string
    username?: string,
    password?: string,
    nombre?: string,
    role?: string,
    u_admin?: string,
    sede?: string,
    subsede?: string,
    cargo?: string,
    value?: string,
    activo?: string,
    titulo_profesional?: string,
    envio_correo?: string
}

export interface Mail {
    value: string
}

export interface OfficeLocation {
    value: string
}

export interface DisplayName {
    value: string
}
