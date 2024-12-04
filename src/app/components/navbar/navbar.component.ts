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

  isConnected: boolean = false;
  numberOfItem: number = 0;

  user$: Observable<User>;

  constructor() {
    this.user$ = this.as.getProfile();

    this.as.isConnectedSubject.subscribe({
      next: (data) => {
        this.isConnected = data;
        if (this.isConnected)
          this.user$ = this.as.getProfile();
      }
    });

    // this._ps.commandesSubject.subscribe({
    //   next: (data) => {
    //     console.log(data.map(c => c.livreIdQuantite))
    //     this.numberOfItem = data.map(c => Object.keys(c.livreIdQuantite).length)
    //       .reduce((accumulator: number, currentValue: any) => accumulator + currentValue, 0);
    //   }
    // });
  }

  logout() {
    this.as.logout();
  }

  goTo(dest: string) {
    this.router.navigate([dest]);
  }
}
