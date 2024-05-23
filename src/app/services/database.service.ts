import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Proyecto } from '../interfaces/proyecto.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  public proyectos!: Table<Proyecto, string>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      proyectos: '++id',
    });
  }
}

export const database = new DatabaseService();
