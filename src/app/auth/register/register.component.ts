import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: DialogService,
  ) {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  registrar() {
    this.authService.registrar(this.form.value).subscribe((result) => {
      if (result == 'ok') {
        this.dialog.showSuccess('Usuario registrado exitosamente.');
        this.form.reset();
      } else {
        this.dialog.showError(result);
      }
    });
  }
}
