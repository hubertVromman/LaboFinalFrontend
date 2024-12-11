import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { environment } from '../../../environment';
import { Pagination } from '../models/pagination.model';

export const paginationResolver: ResolveFn<Pagination> = (route, state) => {

  const paginatorOptions = environment.paginatorOptions;

  let page = route.queryParams['page'] ?? 1;
  page = parseInt(page);
  let limit = route.queryParams['limit'] ?? paginatorOptions[0];
  limit = parseInt(limit);

  const first = (page - 1) * limit;

  if (!paginatorOptions.includes(limit) || page < 1) {
    if (!paginatorOptions.includes(limit))
      limit = paginatorOptions[0];
    if (page < 1)
      page = 1;
    inject(Router).navigate(route.url.map(urlSegment => urlSegment.toString()), { queryParams: { 'page': page, 'limit': limit } });
  }
  return {
    page,
    limit,
    first
  }
};
