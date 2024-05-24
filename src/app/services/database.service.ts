import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Proyecto } from '../interfaces/proyecto.interface';
import { Usuario } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  public proyectos!: Table<Proyecto, string>;
  public usuarios!: Table<Usuario, string>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      proyectos: '++id',
      usuarios: '++id',
    });
  }
}

export const database = new DatabaseService();
