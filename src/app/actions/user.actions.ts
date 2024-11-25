export class CreateUserAction {
    static readonly type = '[User] CreateUserAction';
    constructor(public name: string) { }
}

export class GetCharacterIdByUserIdAction {
    static readonly type = '[User] GetCharacterIdByUserIdAction';
    constructor(public userId: string) { }
}