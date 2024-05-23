import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectosService } from '../../services/proyectos.service';
import { DialogService } from '../../services/dialog.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [SharedModule, LeafletModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
})
export class ProyectosComponent {
  form!: FormGroup;
  showForm: boolean = false;

  options: Leaflet.MapOptions = {
    layers: this.getLayers(),
    zoom: 12,
    center: new Leaflet.LatLng(10.96854, -74.78132),
  };
  constructor(
    private fb: FormBuilder,
    private poyectosService: ProyectosService,
    private dialogService: DialogService
  ) {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.fb.nonNullable.group({
      descripcion: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
      fecha: [new Date(), [Validators.required]],
      valor: [null, [Validators.required]],
    });
  }

  async guardar() {
    await this.poyectosService.crear(this.form.getRawValue());
    this.form.reset();
    this.dialogService.showSuccess('Proyecto creado exitosamente.');
  }
  async obtenerTodos() {
    await this.poyectosService.obtenerTodos();
  }

  getLayers(): Leaflet.Layer[] {
    return [
      new Leaflet.TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
        } as Leaflet.TileLayerOptions
      ),
      ...this.getMarkers(),
    ] as Leaflet.Layer[];
  }

  getMarkers(): Leaflet.Marker[] {
    return [
      new Leaflet.Marker(new Leaflet.LatLng(43.5121264, 16.4700729), {
        icon: new Leaflet.Icon({
          iconSize: [50, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/red-marker.svg',
        }),
        title: 'Workspace',
      } as Leaflet.MarkerOptions),
      new Leaflet.Marker(new Leaflet.LatLng(43.5074826, 16.4390046), {
        icon: new Leaflet.Icon({
          iconSize: [50, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/red-marker.svg',
        }),
        title: 'Riva',
      } as Leaflet.MarkerOptions),
    ] as Leaflet.Marker[];
  }
}
