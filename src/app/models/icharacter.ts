import { HouseType } from "../enums/housetype";
import { ISpell } from "./ispell";
import { IUser } from "./iuser";
import { IWandStats } from "./iwandstats";

export interface ICharacter {
    id: number;
    name: string;
    year: number;
    lifePoints: number;
    maxLifePoints: number;
    house: HouseType;
    courage: number;
    intelligence: number;
    loyalty: number;
    tricking: number;
    potionMagic: number;
    charmsAndMetamorphosisMagic: number;
    attackAndDefenseMagic: number;
    objects: string[];
    unlockedSpells: ISpell[];
    user: IUser;
    userId: string;
    wand: IWandStats
}
