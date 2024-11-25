import { IAddBaseStats } from "../models/iaddbasestats";
import { IAddMagicStats } from "../models/iaddmagicstats";
import { IWandStats } from "../models/iwandstats";

export class GetCharacterAction {
    static readonly type = '[Character] GetCharacterAction';
    constructor(public name: string) { }
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