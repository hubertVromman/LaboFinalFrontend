import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, RouterModule, DatePipe, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private ar = inject(ActivatedRoute);
  private router = inject(Router);

  races = this.ar.snapshot.data['races'];

  ngOnInit() {
    this.ar.data.subscribe((resolversData) => {
      this.races = resolversData['races'];
    });
  }

  goTo(dest: string) {
    this.router.navigate([dest]);
  }
}
