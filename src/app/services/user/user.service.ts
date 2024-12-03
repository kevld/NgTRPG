import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/iuser';
import { ICharacter } from '../../models/icharacter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http: HttpClient = inject(HttpClient);

  createUser(name: string): Observable<IUser> {
    return this.http.post<IUser>("http://localhost:5277/user", JSON.stringify(name), {
        headers: { 'Content-Type': 'application/json' }
    });
  }

  getCharacterByUserId(userId: string): Observable<ICharacter> {
    return this.http.get<ICharacter>(`http://localhost:5277/user/${userId}/character`);
  }
}
