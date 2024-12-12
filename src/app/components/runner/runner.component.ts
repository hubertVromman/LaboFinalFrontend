import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Result } from '../../models/result.model';
import { Runner } from '../../models/runner.model';
import { YearPipe } from '../../pipes/year.pipe';

@Component({
  selector: 'app-runner',
  standalone: true,
  imports: [RouterModule, TableModule, YearPipe, ButtonModule, RouterModule],
  templateUrl: './runner.component.html',
  styleUrl: './runner.component.scss'
})
export class RunnerComponent {

  private ar = inject(ActivatedRoute);
  // private router = inject(Router);

  runner: Runner = this.ar.snapshot.data['runner'];
  results: Result[] = this.ar.snapshot.data['results'];

  ngOnInit() {
    this.ar.data.subscribe((resolversData) => {
      this.runner = resolversData['runner'];
      this.results = resolversData['results'];
    });
  }

  // goTo(dest: string) {
  //   this.router.navigate([dest])
  // }
}
