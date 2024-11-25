import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CharacterState } from '../../states/character.state';
import { UserState } from '../../states/user.state';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddBaseStatsAction, AddMagicStatsAction, AddWandAction, CreateCharacterAction } from '../../actions/character.actions';
import { IAddBaseStats } from '../../models/iaddbasestats';
import { IAddMagicStats } from '../../models/iaddmagicstats';
import { IWandStats } from '../../models/iwandstats';

@Component({
    selector: 'app-create-character',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-character.component.html',
    styleUrl: './create-character.component.scss'
})
export class CreateCharacterComponent implements OnInit {


    private store: Store = inject(Store);
    private router: Router = inject(Router);

    isCreated$: Observable<boolean> = this.store.select<boolean>(CharacterState.isCreated);
    currentStep$: Observable<number> = this.store.select<number>(CharacterState.currentStep);

    formName = new FormGroup({
        name: new FormControl(''),
    });

    formBase = new FormGroup({
        courage: new FormControl(''),
        intelligence: new FormControl(''),
        loyalty: new FormControl(''),
        tricking: new FormControl('')
    });

    formMagic = new FormGroup({
        potion: new FormControl(''),
        charms: new FormControl(''),
        atkdef: new FormControl('')
    });

    formWand = new FormGroup({
        heart: new FormControl(''),
        wood: new FormControl(''),
        rigidity: new FormControl(''),
        size: new FormControl('')
    });

    ngOnInit(): void {
        if (!this.store.selectSnapshot(UserState.userId))
            this.router.navigateByUrl("manage-user");
    }

    nextStep(finishedStep: number) {
        if (finishedStep == 0) {
            const name: string = this.formName.get('name')?.value as string;
            const userId: string = this.store.selectSnapshot(UserState.userId) as string;
            if (userId && userId != "" && name && name != "") {
                this.store.dispatch(new CreateCharacterAction(userId, name));
            }
        } else if (finishedStep == 1) {
            const characterStr: string | undefined = this.store.selectSnapshot<number | undefined>(CharacterState.characterId)?.toString();
            const characterId: number = parseInt(characterStr ?? "0");

            const stats: IAddBaseStats = {
                Courage: this.formName.get('courage')?.value ?? 0,
                Intelligence: this.formName.get('intelligence')?.value ?? 0,
                Loyalty: this.formName.get('loyalty')?.value ?? 0,
                Tricking: this.formName.get('tricking')?.value ?? 0
            }

            this.store.dispatch(new AddBaseStatsAction(characterId, stats));
        } else if (finishedStep == 2) {
            const characterStr: string | undefined = this.store.selectSnapshot<number | undefined>(CharacterState.characterId)?.toString();
            const characterId: number = parseInt(characterStr ?? "0");

            const stats: IAddMagicStats = {
                PotionMagic: this.formName.get('potion')?.value ?? 0,
                CharmsAndMetamorphosisMagic: this.formName.get('charms')?.value ?? 0,
                AttackAndDefenseMagic: this.formName.get('atkdef')?.value ?? 0,
            }

            this.store.dispatch(new AddMagicStatsAction(characterId, stats));
        } else if (finishedStep == 3) {
            const characterStr: string | undefined = this.store.selectSnapshot<number | undefined>(CharacterState.characterId)?.toString();
            const characterId: number = parseInt(characterStr ?? "0");

            const stats: IWandStats = {
                WandHeartType: this.formName.get('heart')?.value ?? 0,
                Rigidity: this.formName.get('rigidity')?.value ?? "",
                Wood: this.formName.get('wood')?.value ?? "",
                Size: this.formName.get('size')?.value ?? ""
            }

            this.store.dispatch(new AddWandAction(characterId, stats));
        }
    }
}
