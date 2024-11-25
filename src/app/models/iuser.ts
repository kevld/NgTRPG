import { ICharacter } from "./icharacter";

export interface IUser {
    id: string;
    name: string;
    character?: ICharacter;
}