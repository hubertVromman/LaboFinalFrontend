import { Component, inject } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormErrorComponent } from "../form-error/form-error.component";
import { MyMessageService } from '../../services/my-message.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, FormErrorComponent, FloatLabelModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {

  private messageService = inject(MyMessageService);

  registerForm: FormGroup;

  visible: boolean = false;

  constructor(private _auth: AuthService, private fb: FormBuilder, private _router: Router, private _ar: ActivatedRoute) {
    this.registerForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, { validators: [Validators.required, Validators.email], asyncValidators: [this.existingEmailValidator()] }],
      password: [null, [Validators.required]],
      passwordConfirmation: [null, [Validators.required]],
    }, {
      validators: [passwordMatchValidator],
      asyncValidators: [this.existingNameValidator()]
    } as AbstractControlOptions);

    this._auth.mustOpenRegister.subscribe({
      next: () => this.showDialog()
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this._auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.messageService.showMessage({ title: 'Inscription réussie', detail: 'Veuillez activer votre compte grace au lien que vous allez recevoir par email' });
        this.visible = false;
      },
      error: data => {
        this.messageService.showMessage({ severity: 'error', title: 'Inscription échouée', detail: data.error });
      }
    });
  }

  showDialog() {
    Object.values(this.registerForm.controls).forEach(element => {
      element.markAsPristine();
      element.markAsUntouched();
    });
    this.visible = true;
  }

  checkPasswordMatch() {
    this.registerForm.get('passwordConfirmation')?.updateValueAndValidity();
  }

  ouvrirLogin() {
    this.visible = false;
    this._auth.openLogin();
  }

  getControl(ctrl: string[]): FormControl {
    return this.registerForm.get(ctrl) as FormControl;
  }

  existingEmailValidator() {
    return (control:AbstractControl) : Observable<ValidationErrors | null> => {
      const value = control.value;

      if (!value) {
          return of(null);
      }

      return this._auth.checkEmail(value).pipe(
        map(() => {
          return { 'errorMessage': 'L\'email existe déjà.' } as ValidationErrors
        }),
        catchError(() => {
          return of(null)
        })
      )
    }
  }

  existingNameValidator() {
    return (control:AbstractControl) : Observable<ValidationErrors | null> => {

      const firstname = control.get('firstname');
      const lastname = control.get('lastname');

      if (firstname?.value == null || lastname?.value == null) {
        return of(null);
      }

      return this._auth.checkName(firstname.value, lastname.value).pipe(
        map(() => {
          const error = { 'errorMessage': 'Le nom existe déjà.' }
          lastname.setErrors(error);
          return error as ValidationErrors;
        }),
        catchError(() => {
          return of(null)
        })
      )
    }
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
