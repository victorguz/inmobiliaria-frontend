import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectosService } from '../../services/proyectos.service';
import { DialogService } from '../../services/dialog.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import { Proyecto } from '../../interfaces/proyecto.interface';
@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [SharedModule, LeafletModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
})
export class ProyectosComponent implements AfterViewInit {
  @ViewChild('map') mapElement!: ElementRef;

  form!: FormGroup;
  showForm: boolean = false;
  items: Proyecto[] = [];
  map: any;

  constructor(
    private fb: FormBuilder,
    private poyectosService: ProyectosService,
    private dialogService: DialogService,
    private cdRef: ChangeDetectorRef
  ) {
    this.iniciarFormulario();
  }

  ngAfterViewInit(): void {
    this.iniciarMapa();
    this.obtenerTodos();
    this.cdRef.detectChanges();
  }

  iniciarMapa() {
    this.map = Leaflet.map('map', {
      zoom: 12,
      center: new Leaflet.LatLng(10.96854, -74.78132),
    });
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  iniciarFormulario() {
    this.form = this.fb.nonNullable.group({
      descripcion: ['Descripcion #' + Date.now(), [Validators.required]],
      latitud: [
        '10.96854',
        [Validators.required, Validators.pattern(/^-?\d*[.]?\d+$/)],
      ],
      longitud: [
        '-74.78132',
        [Validators.required, Validators.pattern(/^-?\d*[.]?\d+$/)],
      ],
      fecha: [new Date(), [Validators.required]],
      valor: [Math.random() * 1000000, [Validators.required]],
    });
  }

  async guardar() {
    await this.poyectosService.crear(this.form.getRawValue());
    this.form.reset();
    this.showForm = false;
    this.addLayer(this.form.getRawValue() as Proyecto);
    this.dialogService.showSuccess('Proyecto creado exitosamente.');
  }

  async obtenerTodos() {
    this.items = await this.poyectosService.obtenerTodos();

    this.items
      .filter((item) => Number(item.latitud) && Number(item.longitud))
      .forEach((val) => {

        this.addLayer(val);
      });
  }

  getLayers(): Leaflet.Layer[] {
    return [
      new Leaflet.TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors',
        } as Leaflet.TileLayerOptions
      ),
    ] as Leaflet.Layer[];
  }
  addLayer(item: Proyecto, center: boolean = false) {
    new Leaflet.Marker(
      new Leaflet.LatLng(Number(item.latitud), Number(item.longitud)),
      {
        icon: new Leaflet.Icon({
          iconSize: [50, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/red-marker.svg',
        }),
        title: item.descripcion,
      } as Leaflet.MarkerOptions
    ).addTo(this.map);
    center &&
      this.map.setView([Number(item.latitud), Number(item.longitud)], 15);
  }
}
