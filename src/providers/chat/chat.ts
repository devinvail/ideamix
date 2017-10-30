import { Injectable, NgZone } from '@angular/core';
import { DataProvider } from '../data/data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChatProvider {

    chatsSubject: BehaviorSubject<Object[]> = new BehaviorSubject([]);

    constructor(public dataProvider: DataProvider, public zone: NgZone){

    }

    init(): void {

        this.emitChats();

        this.dataProvider.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {

            if(change.doc.type === 'chat' || change.deleted){
                this.emitChats();
            }

        });

    }

    getChats(): BehaviorSubject<Object[]> {
        return this.chatsSubject;
    }

    addChat(message): void {

        this.dataProvider.createDoc({
            message: message.message,
            author: message.author,
            dateCreated: message.dateCreated,
            type: 'chat'
        });

    }

    emitChats(): void {

        this.zone.run(() => {

            let options = {
                include_docs: true,
                descending: true
            };

            this.dataProvider.db.query('chats/by_date_created', options).then((data) => {

                let chats = data.rows.map(row => {
                    return row.doc;
                });

                chats.reverse();

                this.chatsSubject.next(chats);

            }).catch((err) => {
                console.log(err);
            });

        });

    }

}