import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { ObjectsWithPagination } from '../models/objects-with-pagination.model';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private client = inject(HttpClient);

  url: string = environment.apiUrl;

  create(r: FormData): Observable<number> {
    return this.client.post<number>(`${this.url}/Race`, r);
  }

  getById(id: number) {
    return this.client.get<Race>(`${this.url}/Race/${id}`);
  }

  getByDate(offset = 0, limit = 10) {
    return this.client.get<ObjectsWithPagination>(`${this.url}/Race/ByDate?offset=${offset}&limit=${limit}`);
  }

  search(query: string) {
    return this.client.get<Race[]>(`${this.url}/Race/Search/${query}`);
  }
}
