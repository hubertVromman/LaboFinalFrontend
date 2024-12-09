import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Result } from '../models/result.model';
import { ResultService } from '../services/result.service';

export const resultsByRaceResolver: ResolveFn<Result> = (route, state) => {
  const rs = inject(ResultService);
  const router = inject(Router);
  const id : number = route.params['id'];
  console.log(id)
  rs.getByRaceId(id).subscribe(e => console.log(e))
  return rs.getByRaceId(id).pipe(
    catchError(e => {
      console.log(e);
      router.navigate(['error']);
      return EMPTY;
    })
  );
};
