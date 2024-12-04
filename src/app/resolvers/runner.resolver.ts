import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Runner } from '../models/runner.model';
import { RunnerService } from '../services/runner.service';

export const runnerResolver: ResolveFn<Runner> = (route, state) => {
  const rs = inject(RunnerService);
  const router = inject(Router);
  const id : number = route.params['id'];
  return rs.getById(id).pipe(
    catchError(() => {
      router.navigate(['error']);
      return EMPTY;
    })
  );
};
