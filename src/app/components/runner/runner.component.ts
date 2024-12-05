import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Runner } from '../../models/runner.model';

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [],
  templateUrl: './runner.component.html',
  styleUrl: './runner.component.scss'
})
export class RunnerComponent {

  private ar = inject(ActivatedRoute);
  private router = inject(Router);

  runner: Runner = this.ar.snapshot.data['runner'];
  // results: Result[] = this.ar.snapshot.data['results'];

  // ngOnInit() {
  //   if (this.runner == undefined) {
  //     this.router.navigate(['error']);
  //   }
  // }
}
