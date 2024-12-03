import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {
    CreateUserAction,
    GetCharacterByUserIdAction,
} from '../actions/user.actions';
import { UserService } from '../services/user/user.service';
import { Observable, tap } from 'rxjs';
import { IUser } from '../models/iuser';
import {
    SetCharacterAction,
    SetCharacterIdAction,
} from '../actions/character.actions';
import { ICharacter } from '../models/icharacter';

export class UserStateModel {
    username?: string;
    isConnected?: boolean;
    user?: IUser;
    characterId?: number;
}

@State<UserStateModel>({
    name: 'userState',
    defaults: {
        username: undefined,
        isConnected: false,
        user: undefined,
        characterId: undefined,
    },
})
@Injectable()
export class UserState {
    private readonly userService: UserService = inject(UserService);
    private readonly store: Store = inject(Store);

    @Selector()
    static username(state: UserStateModel): string | undefined {
        return state.username;
    }

    @Selector()
    static userId(state: UserStateModel): string | undefined {
        return state.user?.id;
    }

    @Selector()
    static user(state: UserStateModel): IUser | undefined {
        return state.user;
    }

    @Action(CreateUserAction)
    createUser(
        { patchState }: StateContext<UserStateModel>,
        { name }: CreateUserAction
    ): Observable<IUser> {
        return this.userService.createUser(name).pipe(
            tap((x: IUser) => {
                patchState({
                    isConnected: true,
                    user: x,
                });
            })
        );
    }

    @Action(GetCharacterByUserIdAction)
    getCharacterByUserId(
        { patchState }: StateContext<UserStateModel>,
        { userId }: GetCharacterByUserIdAction
    ): Observable<ICharacter> {
        return this.userService.getCharacterByUserId(userId).pipe(
            tap((x: ICharacter) => {
                patchState({
                    characterId: x.id,
                });
                if (x && x.id != 0) {
                    this.store.dispatch(new SetCharacterIdAction(x.id));
                    this.store.dispatch(new SetCharacterAction(x));
                }
            })
        );
    }
}
