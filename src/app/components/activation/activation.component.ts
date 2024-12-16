import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.scss'
})
export class ActivationComponent {
  private ar = inject(ActivatedRoute);
  private as = inject(AuthService);

  isActivated = "pending";

  ngOnInit() {
    const userId = this.ar.snapshot.queryParams['UserId'];
    const activationCode = this.ar.snapshot.queryParams['ActivationCode']
    this.as.activate(userId, activationCode).subscribe({
      next: () => this.isActivated = "ok",
      error: () => this.isActivated = "not ok"
    });
  }
}
