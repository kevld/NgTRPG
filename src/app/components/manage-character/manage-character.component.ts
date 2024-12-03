import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter } from '../../models/icharacter';
import { Store } from '@ngxs/store';
import { CharacterState } from '../../states/character.state';
import { CommonModule } from '@angular/common';
import { SpellComponent } from '../spell/spell.component';
import { SelectHouseAction } from '../../actions/character.actions';
import { WandHeartType } from '../../enums/wandhardtype';
import { GetCharacterByUserIdAction } from '../../actions/user.actions';
import { UserState } from '../../states/user.state';

@Component({
    selector: 'app-manage-character',
    standalone: true,
    imports: [CommonModule, SpellComponent],
    templateUrl: './manage-character.component.html',
    styleUrl: './manage-character.component.scss',
})
export class ManageCharacterComponent implements OnInit {
    private readonly store: Store = inject(Store);

    selectedHouse: number = 0;

    basePointsToAdd: number = 0;
    magicPointsToAdd: number = 0;

    character$: Observable<ICharacter | undefined> = this.store.select<
        ICharacter | undefined
    >(CharacterState.character);

    ngOnInit(): void {
        const userId = this.store.selectSnapshot(UserState.userId);
        this.store.dispatch(new GetCharacterByUserIdAction(userId!));
    }

    onSelectChange(event: Event): void {
        this.selectedHouse = parseInt(
            (event.target as HTMLSelectElement).value
        );
    }

    saveHouse(): void {
        const characterId = this.store.selectSnapshot<number | undefined>(
            CharacterState.characterId
        );

        if (this.selectedHouse != 0 && characterId) {
            this.store.dispatch(
                new SelectHouseAction(characterId, this.selectedHouse)
            );
        }
    }

    displayHouse(houseType: number): string {
        switch (houseType) {
            case 1:
                return 'Gryffondor';
            case 2:
                return 'Poufsouffle';
            case 3:
                return 'Serdaigle';
            case 4:
                return 'Serpentard';
            default:
                return 'Segpa';
        }
    }

    displayWandHeart(wandhardtype: WandHeartType): string {
        switch (wandhardtype) {
            case WandHeartType.Phoenix:
                return 'Plûme de phoenix. Bonus en attaque/défence, malus en potions';
            case WandHeartType.Dragon:
                return 'Ventricule de dragon. Bonus en sortilèges/métamorphose, malus en attaque/défense';
            case WandHeartType.Unicorn:
                return 'Crin de licorne. Bonus en potions, malus en sortilèges/métamorphose.';
            default:
                return 'Baguette sans coeur';
        }
    }
}
