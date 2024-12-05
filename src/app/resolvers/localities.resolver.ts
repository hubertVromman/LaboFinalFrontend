import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Locality } from '../models/locality';
import { LocalityService } from '../services/locality.service';

export const localitiesResolver: ResolveFn<Locality> = (route, state) => {
  const ls = inject(LocalityService);
  return ls.getAll();
};
