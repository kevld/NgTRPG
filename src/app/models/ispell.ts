import { SpellType } from "../enums/spelltype";

export interface ISpell {
    id: number;
    description: string;
    year: number;
    type: SpellType;
    name: string;
}