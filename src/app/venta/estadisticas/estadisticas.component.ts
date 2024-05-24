import { Component } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import {
  EstadisticaProyecto,
  Proyecto,
} from '../../interfaces/proyecto.interface';
import { SharedModule } from '../../shared/shared.module';
import { GenericTableColumn } from '../../interfaces/generic-table.interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [SharedModule],
  providers: [ProyectosService, CurrencyPipe],
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
      render: (item) => this.currencyPipe.transform(item.total) ?? '0',
    },
  ];
  constructor(
    private poyectosService: ProyectosService,
    private currencyPipe: CurrencyPipe
  ) {
    this.calcularEstadisticas();
  }

  async calcularEstadisticas() {
    this.items = await this.poyectosService.calcularEstadisticas();
  }
}
