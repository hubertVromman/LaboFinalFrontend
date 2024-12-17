import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MyMessageService } from '../../services/my-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ResetPasswordForm } from '../../models/reset-password-form.model';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputTextModule, FloatLabelModule, ButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private as = inject(AuthService);
  private messageService = inject(MyMessageService);
  private router = inject(Router);
  private ar = inject(ActivatedRoute);

  form = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    passwordConfirmation: new FormControl(null, [Validators.required]),
  }, {
    validators: [passwordMatchValidator],
  } as AbstractControlOptions);

  onSubmit() {
    if (this.form.invalid) return;

    const dataToSend: ResetPasswordForm = {
      newPassword: this.form.value.password!,
      resetPasswordCode: this.ar.snapshot.queryParams['ResetPasswordCode'],
      userId: this.ar.snapshot.queryParams['UserId'],
    }

    this.as.resetPassword(dataToSend).subscribe({
      next: () => {
        this.messageService.showMessage({ title: 'Demande réussie', detail: 'Mot de passe a été réinitialisé, vous à présent pouvez vous connecter' });
        this.router.navigate(['home']);
      },
      error: data => {
        this.messageService.showMessage({ severity: 'error', title: 'Demande échouée', detail: data.error });
      }
    });
  }

  checkPasswordMatch() {
    this.form.get('passwordConfirmation')?.updateValueAndValidity();
  }

  getControl(ctrl: string[]): FormControl {
    return this.form.get(ctrl) as FormControl;
  }
}

function passwordMatchValidator (control: AbstractControl): ValidationErrors | null {

  const password = control.get('password');
  const confirmPassword = control.get('passwordConfirmation');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
      // Appliquer l'erreur sur le champ spécifique
      confirmPassword.setErrors({ 'passwordMatch': true });

      // Erreur sur le formulaire entier
      return { 'passwordMatch': true };
  }
  return null;
}