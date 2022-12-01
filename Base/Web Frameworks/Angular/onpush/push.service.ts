import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { IndexedDbService } from './indexeddb-service';

@Injectable({
    providedIn: 'root',
})
export class PushService {
    token: string = null;

    constructor(
        private afMessaging: AngularFireMessaging,
        private idbService: IndexedDbService
    ) {}

    requestPermission$() {
        return this.afMessaging.requestToken.pipe(
            tap(
                async (token) =>
                    await this.idbService.saveData({
                        folder: 'PushNotifications',
                        fileName: 'Token',
                        fileData: token,
                    })
            )
        );
    }

    getMessages$() {
        return this.afMessaging.messages;
    }

    async deleteToken() {
        if (this.token) {
            this.afMessaging.deleteToken(this.token);
            this.token = null;
            await this.idbService.deleteFile('/PushNotifications/Token');
        }
    }
}
