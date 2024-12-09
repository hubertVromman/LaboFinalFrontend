import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Race } from '../../models/race.model';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss'
})
export class RaceComponent {

  private ar = inject(ActivatedRoute);
  // private router = inject(Router);

  race: Race = this.ar.snapshot.data['race'];
  results: Result[] = this.ar.snapshot.data['results'];
}
