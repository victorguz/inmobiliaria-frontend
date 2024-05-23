import { Injectable } from '@angular/core';
import { database } from './database.service';
import {
  EstadisticaProyecto,
  Proyecto,
} from '../interfaces/proyecto.interface';
import {
  FormStyle,
  TranslationWidth,
  getLocaleMonthNames,
} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  constructor() {}

  obtenerTodos() {
    return database.proyectos.toArray();
  }
  async calcularEstadisticas(): Promise<EstadisticaProyecto[]> {
    const result = await this.obtenerTodos();
    const mapped = result.map((val) => {
      return {
        mes: this.obtenerMesEnEspanol(val.fecha),
        cantidad: 1,
        total: val.valor,
      };
    });

    return mapped;
  }

  obtenerConId(id: string) {
    return database.proyectos.where({ id }).toArray();
  }

  crear(body: Proyecto) {
    return database.proyectos.add({ ...body, id: Date.now() + '' });
  }

  async actualizar(id: string, body: Proyecto) {
    await database.proyectos.update(id, body);
  }

  async eliminar(id: string) {
    await database.proyectos.delete(id);
  }

  obtenerMesEnEspanol(fecha: Date) {
    const meses = [
      'ENERO',
      'FEBRERO',
      'MARZO',
      'ABRIL',
      'MAYO',
      'JUNIO',
      'JULIO',
      'AGOSTO',
      'SEPTIEMBRE',
      'OCTUBRE',
      'NOVIEMBRE',
      'DICIEMBRE',
    ];

    const indiceMes = fecha.getMonth();
    return meses[indiceMes];
  }
}
