import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HouseType } from '../../enums/housetype';
import { IAddBaseStats } from '../../models/iaddbasestats';
import { IAddMagicStats } from '../../models/iaddmagicstats';
import { ICharacter } from '../../models/ICharacter';
import { IIsCharacterCreated } from '../../models/iischaractercreated';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {
    private http: HttpClient = inject(HttpClient);

    getCharacterByName(name: string): Observable<ICharacter> {
        return this.http.get<ICharacter>(`http://localhost:5277/character/${name}`);
    }

    createCharacter(userId: string, characterName: string): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("name", characterName);

        return this.http.post<ICharacter>(`http://localhost:5277/character/${userId}`, params);
    }

    setHouse(characterId: number, houseType: HouseType): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("houseType", houseType);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/set-house`, params);
    }

    addBaseStats(characterId: number, addBaseStats: IAddBaseStats): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("Courage", addBaseStats.Courage);
        params.append("Intelligence", addBaseStats.Intelligence);
        params.append("Loyalty", addBaseStats.Loyalty);
        params.append("Tricking", addBaseStats.Tricking);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/init-stat/base`, params);
    }

    addMagicStats(characterId: number, addMagicStats: IAddMagicStats): Observable<ICharacter> {
        const params: HttpParams = new HttpParams();
        params.append("AttackAndDefenseMagic", addMagicStats.AttackAndDefenseMagic);
        params.append("CharmsAndMetamorphosisMagic", addMagicStats.CharmsAndMetamorphosisMagic);
        params.append("PotionMagic", addMagicStats.PotionMagic);

        return this.http.put<ICharacter>(`http://localhost:5277/character/${characterId}/init-stat/magic`, params);
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