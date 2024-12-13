import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, ToggleSwitchModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private as = inject(AuthService);

  user$: Observable<User> = this.as.getProfile();

  onChange(e: ToggleSwitchChangeEvent) {
    this.as.changeAnonymous(e.checked).subscribe((data) => console.log(data));
  }
}
