import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http: HttpClient = inject(HttpClient);

  createUser(name: string): Observable<IUser> {
      return this.http.post<IUser>("http://localhost:5277/users", name);
  }

  getCharacterIdByUserId(userId: string): Observable<number> {
    return this.http.get<number>(`http://localhost:5277/users/${userId}/character`);
  }
}
