import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { ObjectsWithPagination } from '../models/objects-with-pagination.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private client = inject(HttpClient);

  url: string = environment.apiUrl;

  getByRunnerId(id: number) {
    return this.client.get<Result>(`${this.url}/Result/ByRunner/${id}`);
  }

  getByRaceId(id: number, offset: number, limit: number) {
    return this.client.get<ObjectsWithPagination>(`${this.url}/Result/ByRace/${id}?offset=${offset}&limit=${limit}`);
  }
}
