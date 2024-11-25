import { Injectable, inject } from "@angular/core";
import { Action, select, Selector, State, StateContext } from "@ngxs/store";
import { ICharacter } from "../models/icharacter";
import { CharacterService } from "../services/character/character.service";
import { AddBaseStatsAction, AddMagicStatsAction, CreateCharacterAction, SetCharacterIdAction } from "../actions/character.actions";
import { Observable, tap } from "rxjs";

export class CharacterStateModel {
    character?: ICharacter;
    isCreated?: boolean;
    currentStep?: number;
    characterId?: number;
}

@State<CharacterStateModel>({
    name: 'characterState',
    defaults: {
        character: undefined,
        isCreated: false,
        currentStep: 0,
        characterId: undefined
    }
})
@Injectable()
export class CharacterState {

    private readonly characterService: CharacterService = inject(CharacterService);

    @Selector()
    static character(state: CharacterStateModel): ICharacter | undefined {
        return state.character;
    }

    @Selector()
    static isCreated(state: CharacterStateModel): boolean {
        return state.isCreated ?? false;
    }

    @Selector()
    static characterId(state: CharacterStateModel): number | undefined {
        return state.characterId;
    }

    @Selector()
    static currentStep(state: CharacterStateModel): number {
        return state.currentStep ?? 0;
    }

    @Action(SetCharacterIdAction)
    setCharacterIdAction({ patchState }: StateContext<CharacterStateModel>, { id }: SetCharacterIdAction): void {
        patchState({
            characterId: id
        });
    }

    @Action(CreateCharacterAction)
    createUser({ patchState }: StateContext<CharacterStateModel>, { userId, name }: CreateCharacterAction): Observable<ICharacter> {
        return this.characterService.createCharacter(userId, name).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x,
                    characterId: x.id
                });
            })
        );
    }

    @Action(AddBaseStatsAction)
    addBaseStatsAction({patchState}: StateContext<CharacterStateModel>, { id, stats }: AddBaseStatsAction): Observable<ICharacter> {
        return this.characterService.addBaseStats(id, stats).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x
                })
            })
        );
    }

    @Action(AddMagicStatsAction)
    addMagicStatsAction({patchState}: StateContext<CharacterStateModel>, { id, stats }: AddMagicStatsAction): Observable<ICharacter> {
        return this.characterService.addMagicStats(id, stats).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x
                })
            })
        );
    }
}