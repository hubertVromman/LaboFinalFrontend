import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { environment } from '../../../environment';
import { ObjectsWithPagination } from '../models/objects-with-pagination.model';
import { RaceService } from '../services/race.service';

export const racesResolver: ResolveFn<ObjectsWithPagination> = (route, state) => {
  const rs = inject(RaceService);
  const router = inject(Router);

  let page, limit;

  if (route.url[0].toString() == 'home') {
    page = 1;
    limit = 10;
  } else {
    const paginatorOptions = environment.paginatorOptions;

    page = route.queryParams['page'] ?? 1;
    page = parseInt(page);
    limit = route.queryParams['limit'] ?? paginatorOptions[0];
    limit = parseInt(limit);
  }

  return rs.getByDate(page - 1, limit).pipe(
    catchError((e) => {
      console.log(e);
      router.navigate(['error']);
      return EMPTY;
    })
  );
};
