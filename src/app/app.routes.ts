import { Routes } from '@angular/router';
import { ManageCharacterComponent } from './components/manage-character/manage-character.component';
import { GameMasterComponent } from './components/game-master/game-master.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { CreateCharacterComponent } from './components/create-character/create-character.component';

export const routes: Routes = [
    { path: 'manage-user', component: ManageUserComponent },
    { path: 'create-character', component: CreateCharacterComponent },
    { path: '', component: ManageUserComponent },
    { path: 'manage-character', component: ManageCharacterComponent },
    { path: 'gm', component: GameMasterComponent },
];
