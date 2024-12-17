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
import { MyMessageService } from '../../services/my-message.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, FloatLabelModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {

  private messageService = inject(MyMessageService);

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
      next: data => {
        const accessToken : any = jwtDecode(data.accessToken);
        const connectedMessage = `Connecté en temps que ${accessToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname']} ${accessToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}`;
        this.messageService.showMessage({ title: 'Connexion réussie', detail: connectedMessage });
        this.visible = false;
      },
      error : data => {
        this.messageService.showMessage({ severity: 'error', title: 'Connexion échouée', detail: data.error });
        // this.messageService.add({ severity: 'info', summary: 'Connexion échouée', detail: data.error, life: 3000 });
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

  forgotPassword() {
    this.visible = false;
    this._router.navigate(['forgotPassword']);
  }

  getControl(ctrl: string[]): FormControl {
    return this.loginForm.get(ctrl) as FormControl;
  }
}
