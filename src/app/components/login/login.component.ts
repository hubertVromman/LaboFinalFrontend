import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, FloatLabelModule, FormErrorComponent, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {

  private messageService = inject(MessageService);

  loginForm: FormGroup;

  visible: boolean = false;

  constructor(private _auth: AuthService, private fb: FormBuilder, private _router: Router, private _ar: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    _auth.mustOpenLogin.subscribe({
      next: () => this.showDialog()
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this._auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Connexion réussie', detail: '', life: 3000 });
        this.visible = false;
      },
      error : data => {
        this.messageService.add({ severity: 'info', summary: 'Connexion échouée', detail: data.error, life: 3000 });
      }
    });

  }

  showDialog() {
    Object.values(this.loginForm.controls).forEach(element => {
      element.markAsPristine();
      element.markAsUntouched();
    });
    this.visible = true;
  }

  ouvrirRegister() {
    this.visible = false;
    this._auth.mustOpenRegister.next(true);
  }

  getControl(ctrl: string[]): FormControl {
    return this.loginForm.get(ctrl) as FormControl;
  }
}
