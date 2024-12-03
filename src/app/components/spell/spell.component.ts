import { Component, Input, OnInit } from '@angular/core';
import { ISpell } from '../../models/ispell';
import { SpellType } from '../../enums/spelltype';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faFlask,
    faHandSparkles,
    faQuestion,
    faSkull,
    faWandSparkles,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-spell',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './spell.component.html',
})
export class SpellComponent implements OnInit {
    @Input() spell!: ISpell;

    icon?: IconDefinition;

    ngOnInit(): void {
        switch (this.spell.type) {
            case SpellType.PotionMagic:
                this.icon = faFlask;
                break;
            case SpellType.CharmsAndMetamorphosisMagic:
                this.icon = faWandSparkles;
                break;
            case SpellType.AttackAndDefense:
                this.icon = faHandSparkles;
                break;
            case SpellType.Unforgiven:
                this.icon = faSkull;
                break;
            default:
                this.icon = faQuestion;
                break;
        }
    }
}
