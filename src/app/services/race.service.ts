import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { RaceForm } from '../models/race-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private client = inject(HttpClient);
  
  url: string = environment.apiUrl;
  
  create(r: FormData): Observable<number> {
    return this.client.post<number>(`${this.url}/Race`, r);
  }
}
