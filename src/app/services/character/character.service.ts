import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HouseType } from '../../enums/housetype';
import { IAddBaseStats } from '../../models/iaddbasestats';
import { IAddMagicStats } from '../../models/iaddmagicstats';
import { ICharacter } from '../../models/icharacter';
import { IIsCharacterCreated } from '../../models/iischaractercreated';
import { IWandStats } from '../../models/iwandstats';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private http: HttpClient = inject(HttpClient);

    getCharacterByUserId(userId: string): Observable<ICharacter> {
        return this.http.get<ICharacter>(`http://localhost:5277/character/user/${userId}`);
    }

    createCharacter(userId: string, characterName: string): Observable<ICharacter> {
        return this.http.post<ICharacter>(`http://localhost:5277/character/${userId}`, JSON.stringify(characterName), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    setHouse(characterId: number, houseType: number): Observable<ICharacter> {

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/set-house`, JSON.stringify(houseType), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    addBaseStats(characterId: number, addBaseStats: IAddBaseStats): Observable<ICharacter> {
        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/init-stat/base`, addBaseStats);
    }

    addMagicStats(characterId: number, addMagicStats: IAddMagicStats): Observable<ICharacter> {
        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/init-stat/magic`, addMagicStats);
    }

    addWandStats(characterId: number, addWandStats: IWandStats): Observable<ICharacter> {
        return this.http.post<ICharacter>(`http://localhost:5277/character/${characterId}/wand/add`,
            addWandStats
        );
    }

    unlockSpell(characterId: number, spellId: number): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("spellId", spellId);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/unlock-spell`, params);
    }

    addStat(characterId: number, statName: string): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("statName", statName);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/add-stat`, params);
    }

    addLifePoints(characterId: number, amount: number): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("amount", amount);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/add-lp`, params);
    }

    addObjectToInventory(characterId: number, objectName: string): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("objectName", objectName);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/object/add`, params);
    }

    useObjectFromInventory(characterId: number, objectName: string): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("objectName", objectName);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/object/use`, params);
    }

    isCharacterCreated(characterId: number): Observable<IIsCharacterCreated> {
        return this.http.get<IIsCharacterCreated>(`http://localhost:5277/character/${characterId}/created`);
    }
}
