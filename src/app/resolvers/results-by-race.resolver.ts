import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { environment } from '../../../environment';
import { ObjectsWithPagination } from '../models/objects-with-pagination.model';
import { ResultService } from '../services/result.service';

export const resultsByRaceResolver: ResolveFn<ObjectsWithPagination> = (route, state) => {
  const rs = inject(ResultService);
  const router = inject(Router);
  const id : number = route.params['id'];

  const paginatorOptions = environment.paginatorOptions;

  let page = route.queryParams['page'] ?? 1;
  page = parseInt(page);
  let limit = route.queryParams['limit'] ?? paginatorOptions[0];
  limit = parseInt(limit);

  return rs.getByRaceId(id, (page - 1) * limit, limit).pipe(
    catchError(e => {
      console.log(e);
      router.navigate(['error']);
      return EMPTY;
    })
  );
};
