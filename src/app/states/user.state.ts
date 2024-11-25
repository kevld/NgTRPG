import { inject, Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { CreateUserAction, GetCharacterIdByUserIdAction } from "../actions/user.actions";
import { UserService } from "../services/user/user.service";
import { Observable, tap } from "rxjs";
import { IUser } from "../models/iuser";
import { SetCharacterIdAction } from "../actions/character.actions";

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
        characterId: undefined
    }
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
    createUser({ patchState }: StateContext<UserStateModel>, { name }: CreateUserAction): Observable<IUser> {
        return this.userService.createUser(name).pipe(
            tap((x: IUser) => {
                patchState({
                    isConnected: true,
                    user: x
                });
            })
        );
    }

    @Action(GetCharacterIdByUserIdAction)
    getCharacterIdByUserId({ patchState }: StateContext<UserStateModel>, { userId }: GetCharacterIdByUserIdAction): Observable<number> {
        return this.userService.getCharacterIdByUserId(userId).pipe(
            tap((x: number) => {
                patchState({
                    characterId: x
                });
                if (x && x != 0)
                    this.store.dispatch(new SetCharacterIdAction(x));
            })
        )
    }
}