import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Locality } from '../models/locality';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  private client = inject(HttpClient);

  url: string = environment.apiUrl;

  getAll() : Observable<Locality> {
    return this.client.get<Locality>(`${this.url}/Locality`);
  }
}
