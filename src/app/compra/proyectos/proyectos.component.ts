import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectosService } from '../../services/proyectos.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
})
export class ProyectosComponent {
  form!: FormGroup;
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
    const result = await this.poyectosService.create(this.form.getRawValue());
    this.dialogService.showSuccess('Proyecto creado exitosamente.');
  }
}
