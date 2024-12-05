import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private client = inject(HttpClient);

  url: string = environment.apiUrl;

  getAll() : Observable<User> {
    return this.client.get<User>(`${this.url}/User`);
  }
}
