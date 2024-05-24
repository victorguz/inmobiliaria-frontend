export interface Proyecto {
  id: string;
  descripcion: string;
  latitud: string;
  longitud: string;
  fecha: Date;
  valor: number;
}

export interface EstadisticaProyecto {
  mes:string;
  cantidad: number;
  total: any;
}
