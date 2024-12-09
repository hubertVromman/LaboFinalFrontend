import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Race } from '../models/race.model';
import { RaceService } from '../services/race.service';

export const raceResolver: ResolveFn<Race> = (route, state) => {
  const rs = inject(RaceService);
  const router = inject(Router);
  const id : number = route.params['id'];
  return rs.getById(id).pipe(
    catchError((e, o) => {
      router.navigate(['error']);
      return EMPTY;
    })
  );
};
