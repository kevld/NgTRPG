import { Injectable, inject } from "@angular/core";
import { Action, actionMatcher, select, Selector, State, StateContext, Store } from "@ngxs/store";
import { ICharacter } from "../models/icharacter";
import { CharacterService } from "../services/character/character.service";
import { AddBaseStatsAction, AddMagicStatsAction, AddWandAction, CreateCharacterAction, GetCharacterByUserAction, IsCharacterCreatedAction, SelectHouseAction, SetCharacterAction, SetCharacterIdAction } from "../actions/character.actions";
import { Observable, tap } from "rxjs";
import { IIsCharacterCreated } from "../models/iischaractercreated";

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
    private readonly store: Store = inject(Store);


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

    @Action(GetCharacterByUserAction)
    getCharacterByUserAction({ patchState }: StateContext<CharacterStateModel>, { userId }: GetCharacterByUserAction): Observable<ICharacter> {
        return this.characterService.getCharacterByUserId(userId).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x,
                    characterId: x?.id
                });

                if (x?.id)
                    this.store.dispatch(new IsCharacterCreatedAction(x.id));
            })
        );
    }

    @Action(SetCharacterIdAction)
    setCharacterIdAction({ patchState }: StateContext<CharacterStateModel>, { id }: SetCharacterIdAction): void {
        patchState({
            characterId: id
        });
    }

    @Action(CreateCharacterAction)
    createCharacter({ patchState }: StateContext<CharacterStateModel>, { userId, name }: CreateCharacterAction): Observable<ICharacter> {
        return this.characterService.createCharacter(userId, name).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x,
                    characterId: x.id
                });
                this.store.dispatch(new IsCharacterCreatedAction(x.id));
            })
        );
    }

    @Action(AddBaseStatsAction)
    addBaseStatsAction({ patchState }: StateContext<CharacterStateModel>, { id, stats }: AddBaseStatsAction): Observable<ICharacter> {
        return this.characterService.addBaseStats(id, stats).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x
                });
                this.store.dispatch(new IsCharacterCreatedAction(x.id));
            })
        );
    }

    @Action(AddMagicStatsAction)
    addMagicStatsAction({ patchState }: StateContext<CharacterStateModel>, { id, stats }: AddMagicStatsAction): Observable<ICharacter> {
        return this.characterService.addMagicStats(id, stats).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x
                });
                this.store.dispatch(new IsCharacterCreatedAction(x.id));
            })
        );
    }

    @Action(AddWandAction)
    addMWandStatsAction({ patchState }: StateContext<CharacterStateModel>, { id, stats }: AddWandAction): Observable<ICharacter> {
        return this.characterService.addWandStats(id, stats).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x
                });
                this.store.dispatch(new IsCharacterCreatedAction(x.id));
            })
        );
    }

    @Action(IsCharacterCreatedAction)
    isCharacterCreatedAction({ patchState }: StateContext<CharacterStateModel>, { id }: IsCharacterCreatedAction): Observable<IIsCharacterCreated> {
        return this.characterService.isCharacterCreated(id).pipe(
            tap((x: IIsCharacterCreated) => {
                patchState({
                    isCreated: x.isCreated,
                    currentStep: x.currentStep
                });
            })
        );
    }

    @Action(SelectHouseAction)
    selectHouseAction({ patchState }: StateContext<CharacterStateModel>, { characterId, selectedHouse }: SelectHouseAction): Observable<ICharacter> {
        return this.characterService.setHouse(characterId, selectedHouse).pipe(
            tap((x: ICharacter) => {
                patchState({
                    character: x
                })
            })
        );
    }

    @Action(SetCharacterAction)
    setCharacterAction({patchState}: StateContext<CharacterStateModel>, {character}: SetCharacterAction): void {
        patchState({
            character: character,
            characterId: character.id
        })

    }
}
