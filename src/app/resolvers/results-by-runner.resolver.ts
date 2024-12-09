import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Result } from '../models/result.model';
import { ResultService } from '../services/result.service';

export const resultsByRunnerResolver: ResolveFn<Result> = (route, state) => {
  const rs = inject(ResultService);
  const router = inject(Router);
  const id : number = route.params['id'];
  return rs.getByRunnerId(id).pipe(
    catchError(() => {
      router.navigate(['error']);
      return EMPTY;
    })
  );
};
