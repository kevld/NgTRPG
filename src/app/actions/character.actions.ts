import { IAddBaseStats } from "../models/iaddbasestats";
import { IAddMagicStats } from "../models/iaddmagicstats";
import { ICharacter } from "../models/icharacter";
import { IWandStats } from "../models/iwandstats";

export class GetCharacterByUserAction {
    static readonly type = '[Character] GetCharacterByUserAction';
    constructor(public userId: string) { }
}

export class CreateCharacterAction {
    static readonly type = '[Character] CreateCharacterAction';
    constructor(public userId: string, public name: string) { }
}

export class SetCharacterIdAction {
    static readonly type = '[Character] SetCharacterIdAction';
    constructor(public id: number) { }
}

export class AddBaseStatsAction {
    static readonly type = '[Character] AddBaseStatsAction';
    constructor(public id: number, public stats: IAddBaseStats) { }
}

export class AddMagicStatsAction {
    static readonly type = '[Character] AddMagicStatsAction';
    constructor(public id: number, public stats: IAddMagicStats) { }
}

export class AddWandAction {
    static readonly type = '[Character] AddWandAction';
    constructor(public id: number, public stats: IWandStats) { }
}

export class IsCharacterCreatedAction {
    static readonly type = '[Character] IsCharacterCreatedAction';
    constructor(public id: number) { }
}

export class SelectHouseAction {
    static readonly type = '[Character] SelectHouseAction';
    constructor(public characterId: number, public selectedHouse: number) { }
}

export class SetCharacterAction {
    static readonly type = '[Character] SetCharacterAction';
    constructor(public character: ICharacter) { }
}
