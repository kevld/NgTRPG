import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CharacterState } from '../../states/character.state';
import { UserState } from '../../states/user.state';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddBaseStatsAction, AddMagicStatsAction, AddWandAction, CreateCharacterAction, GetCharacterByUserAction } from '../../actions/character.actions';
import { IAddBaseStats } from '../../models/iaddbasestats';
import { IAddMagicStats } from '../../models/iaddmagicstats';
import { IWandStats } from '../../models/iwandstats';

@Component({
    selector: 'app-create-character',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-character.component.html',
})
export class CreateCharacterComponent implements OnInit {


    private readonly store: Store = inject(Store);
    private readonly router: Router = inject(Router);

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
        heart: new FormControl('0', [Validators.required]),
        wood: new FormControl(''),
        rigidity: new FormControl(''),
        size: new FormControl('')
    });

    ngOnInit(): void {
        const userId: string | undefined = this.store.selectSnapshot(UserState.userId);

        if (!userId)
            this.router.navigateByUrl("manage-user");
        else
            this.store.dispatch(new GetCharacterByUserAction(userId));

        this.isCreated$.subscribe(x => {
            if(x)
                this.router.navigateByUrl("manage-character");
        })
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
            const characterId: number = parseInt(characterStr!);

            const stats: IAddBaseStats = {
                Courage: parseInt(this.formBase.get('courage')?.value!),
                Intelligence: parseInt(this.formBase.get('intelligence')?.value!),
                Loyalty: parseInt(this.formBase.get('loyalty')?.value!),
                Tricking: parseInt(this.formBase.get('tricking')?.value!)
            }

            this.store.dispatch(new AddBaseStatsAction(characterId, stats));
        } else if (finishedStep == 2) {
            const characterStr: string | undefined = this.store.selectSnapshot<number | undefined>(CharacterState.characterId)?.toString();
            const characterId: number = parseInt(characterStr!);

            const stats: IAddMagicStats = {
                PotionMagic: parseInt(this.formMagic.get('potion')?.value!),
                CharmsAndMetamorphosisMagic: parseInt(this.formMagic.get('charms')?.value!),
                AttackAndDefenseMagic: parseInt(this.formMagic.get('atkdef')?.value!),
            }

            this.store.dispatch(new AddMagicStatsAction(characterId, stats));
        } else if (finishedStep == 3) {
            const characterStr: string | undefined = this.store.selectSnapshot<number | undefined>(CharacterState.characterId)?.toString();
            const characterId: number = parseInt(characterStr!);

            const stats: IWandStats = {
                WandHeartType: parseInt(this.formWand.get('heart')?.value!),
                Rigidity: this.formWand.get('rigidity')?.value!,
                Wood: this.formWand.get('wood')?.value!,
                Size: this.formWand.get('size')?.value!
            }

            this.store.dispatch(new AddWandAction(characterId, stats));
        }
    }
}
