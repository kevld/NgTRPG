import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpell } from '../../models/ispell';

@Injectable({
    providedIn: 'root'
})
export class SpellService {

    private http: HttpClient = inject(HttpClient);

    getSpells(): Observable<ISpell[]> {
        return this.http.get<ISpell[]>("http://localhost:5277/spell");
    }
}
