import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
})
export class ProyectosComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.fb.nonNullable.group({
      descripcion: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
    });
  }
}
