import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, AsyncPipe, LoginComponent, RegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  private as = inject(AuthService);

  logoPath = "/assets/logo.png";

  isConnected: boolean = false;
  numberOfItem: number = 0;

  user$: Observable<User> = this.as.getProfile();

  ngOnInit() {
    this.as.isConnectedSubject.subscribe({
      next: (data) => {
        this.isConnected = data;
        if (this.isConnected)
          this.user$ = this.as.getProfile();
      }
    });

    this.as.refreshTokens().subscribe({
      error: err => {
        console.log(err);
        this.as.logout(false);
      }
    });
  }

  logout() {
    this.as.logout(true);
  }

  goTo(dest: string) {
    this.router.navigate([dest]);
  }
}
