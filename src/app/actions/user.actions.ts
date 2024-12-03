export class CreateUserAction {
    static readonly type = '[User] CreateUserAction';
    constructor(public name: string) { }
}

export class GetCharacterByUserIdAction {
    static readonly type = '[User] GetCharacterByUserIdAction';
    constructor(public userId: string) { }
}
