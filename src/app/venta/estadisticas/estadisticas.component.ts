import { Component } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import {
  EstadisticaProyecto,
  Proyecto,
} from '../../interfaces/proyecto.interface';
import { SharedModule } from '../../shared/shared.module';
import { GenericTableColumn } from '../../interfaces/generic-table.interfaces';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss',
})
export class EstadisticasComponent {
  items: EstadisticaProyecto[] = [];
  columns: GenericTableColumn<EstadisticaProyecto>[] = [
    {
      name: 'mes',
      title: 'MES',
    },
    {
      name: 'cantidad',
      title: 'CANTIDAD DE INMUEBLES',
    },
    {
      name: 'total',
      title: 'TOTAL DE VENTA',
    },
  ];
  constructor(private poyectosService: ProyectosService) {
    this.calcularEstadisticas();
  }

  async calcularEstadisticas() {
    this.items = await this.poyectosService.calcularEstadisticas();
  }
}
