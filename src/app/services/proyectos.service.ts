import { Injectable } from '@angular/core';
import { database } from './database.service';
import { Proyecto } from '../interfaces/proyecto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  constructor() {}

  getAll(id: string) {
    return database.proyectos.where({ id }).toArray();
  }

  getById(id: string) {
    return database.proyectos.where({ id }).toArray();
  }

  create(body: Proyecto) {
    return database.proyectos.add({ ...body, id: Date.now() + '' });
  }

  async update(id: string, body: Proyecto) {
    await database.proyectos.update(id, body);
  }

  async delete(id: string) {
    await database.proyectos.delete(id);
  }
}
