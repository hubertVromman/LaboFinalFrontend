import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, AsyncPipe, LoginComponent, RegisterComponent, AutoCompleteModule, FormsModule, IconFieldModule, InputIconModule],
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

  search: string = "";

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

  // getControl(ctrl: string[]): FormControl {
  //   return this.raceForm.get(ctrl) as FormControl;
  // }

  complete(event: AutoCompleteCompleteEvent) {
    // this.filteredLocalities = this.localities.filter((l: Locality) =>
    //   l.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0
    // );
  }
}
