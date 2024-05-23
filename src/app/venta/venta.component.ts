import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss',
})
export class VentaComponent {}
