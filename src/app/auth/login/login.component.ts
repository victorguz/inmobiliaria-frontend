import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: DialogService,
    private router: Router
  ) {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.form = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  iniciar() {
    this.authService.login(this.form.value).subscribe((result) => {
      if (result == 'ok') {
        this.dialog.showSuccess('Usuario autenticado.');
        this.router.navigate(['/compra/proyectos']);
      } else {
        this.dialog.showError(result);
      }
    });
  }
}
