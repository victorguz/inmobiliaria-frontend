import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.scss'
})
export class CompraComponent {

}
