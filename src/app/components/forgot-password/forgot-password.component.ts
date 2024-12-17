import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormErrorComponent } from '../form-error/form-error.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { MyMessageService } from '../../services/my-message.service';
import { Router } from '@angular/router';
import { ForgotPasswordForm } from '../../models/forgot-password-form.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelModule, FormErrorComponent, InputTextModule, ButtonModule, CardModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private as = inject(AuthService);
  private messageService = inject(MyMessageService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  onSubmit() {
    if (this.form.invalid) return;

    this.as.forgotPassword(this.form.value as ForgotPasswordForm).subscribe({
      next: () => {
        this.messageService.showMessage({ title: 'Demande envoyée', detail: 'Un email de réinitialisation de mot de passe a été envoyé' });
        this.router.navigate(['home']);
      },
      error: data => {
        this.messageService.showMessage({ severity: 'error', title: 'Demande échouée', detail: data.error });
      }
    });
  }

  getControl(ctrl: string[]): FormControl {
    return this.form.get(ctrl) as FormControl;
  }
}
