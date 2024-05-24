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
    //mapear el arreglo en el nuevo formato
    const mapped = result.map((val) => {
      return {
        mes: this.obtenerMesEnEspanol(val.fecha),
        cantidad: 1,
        total: val.valor,
      };
    });
    // Objeto para almacenar las sumas
    const sumas: { [mes: string]: { cantidad: number; total: number } } = {};

    // Iterar sobre las estadísticas y sumar
    mapped.forEach((estadistica) => {
      const { mes, cantidad, total } = estadistica;
      if (!sumas[mes]) {
        sumas[mes] = { cantidad: 0, total: 0 };
      }
      sumas[mes].cantidad += cantidad;
      sumas[mes].total += total;
    });

    // Construir el nuevo arreglo con las sumas
    const estadisticasFinales: EstadisticaProyecto[] = [];
    for (const mes in sumas) {
      estadisticasFinales.push({
        mes,
        cantidad: sumas[mes].cantidad,
        total: sumas[mes].total,
      });
    }
    return estadisticasFinales;
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
