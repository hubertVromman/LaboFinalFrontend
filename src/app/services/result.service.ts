import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
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

  getByRaceId(id: number) {
    return this.client.get<Result>(`${this.url}/Result/ByRace/${id}`);
  }
}
