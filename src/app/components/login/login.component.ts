import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, FloatLabelModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

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

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this._auth.login(this.loginForm.value);

    this.visible = false;
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
