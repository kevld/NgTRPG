import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateUserAction } from '../../actions/user.actions';
import { Observable } from 'rxjs';
import { UserState } from '../../states/user.state';
import { CommonModule } from '@angular/common';
import { ICharacter } from '../../models/icharacter';
import { CharacterState } from '../../states/character.state';
import { IUser } from '../../models/iuser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manage-user',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './manage-user.component.html',
    styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent implements OnInit {

    private readonly store: Store = inject(Store);
    private readonly router: Router = inject(Router);

    userId$: Observable<string | undefined> = this.store.select(UserState.userId);

    formName = new FormGroup({
        name: new FormControl(''),
    });

    createUser(): void {
        const username = this.formName.get('name')?.value ?? "";
        if (username && username != "")
            this.store.dispatch(new CreateUserAction(username));
    }

    ngOnInit(): void {
        this.userId$.subscribe(x => {
            
            if (x && x != "")
                this.router.navigateByUrl("/create-character");
        });
    }
}
