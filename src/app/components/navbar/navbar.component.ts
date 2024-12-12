import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { RaceService } from '../../services/race.service';
import { RunnerService } from '../../services/runner.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, AsyncPipe, LoginComponent, RegisterComponent, AutoCompleteModule, FormsModule, IconFieldModule, InputIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  private as = inject(AuthService);
  private ras = inject(RaceService);
  private rus = inject(RunnerService);

  @ViewChild('searchField') searchField!: AutoComplete;

  logoPath = "/assets/logo.png";

  isConnected: boolean = false;
  numberOfItem: number = 0;

  user$: Observable<User> = this.as.getProfile();

  search: string = "";
  suggestions: any[] = [];

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

  async complete(event: AutoCompleteCompleteEvent) {
    let races = await firstValueFrom(this.ras.search(event.query));
    let runners = await firstValueFrom(this.rus.search(event.query));
    this.suggestions = [...races, ...runners];
  }

  onSelect(event: AutoCompleteSelectEvent) {
    if ('raceId' in event.value)
      this.router.navigate(['race', event.value.raceId]);
    else if ('runnerId' in event.value)
      this.router.navigate(['runner', event.value.runnerId]);
    this.search = "";
    this.suggestions = [];
    // this.searchField.rootEl.firstChild.firstChild.blur();
    setTimeout(() => this.searchField.rootEl.firstChild.firstChild.blur(), 50)
  }

  getLabel(item: any) {
    if ('raceName' in item)
      return `🏁 ${item.raceName} ${item.distance}km ${item.startDate.getFullYear()}`;
    else if ('lastname' in item)
      return `${item.gender == 'F' ? '🏃‍♀️': '🏃'}  ${item.lastname} ${item.firstname}`;
    return ''
  }
}
