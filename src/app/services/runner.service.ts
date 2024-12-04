import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Runner } from '../models/runner.model';

@Injectable({
  providedIn: 'root'
})
export class RunnerService {

  private client = inject(HttpClient);

  url: string = environment.apiUrl;

  getById(id: number) : Observable<Runner> {
    return this.client.get<Runner>(`${this.url}/Runner/${id}`);
  }
}
