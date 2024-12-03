import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore } from '@ngxs/store';
import { UserState } from './states/user.state';
import { CharacterState } from './states/character.state';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes), provideStore(
            [UserState, CharacterState],
            withNgxsReduxDevtoolsPlugin(),
            withNgxsLoggerPlugin(),
            withNgxsStoragePlugin({
                keys: '*'
        }),
        withNgxsWebSocketPlugin(),
        provideHttpClient())]
};
