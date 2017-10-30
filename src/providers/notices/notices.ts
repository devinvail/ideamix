import { Injectable, NgZone } from '@angular/core';
import { DataProvider } from '../data/data';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NoticesProvider {

    noticesSubject: BehaviorSubject<Object[]> = new BehaviorSubject([]);

    constructor(private dataProvider: DataProvider, private zone: NgZone){

    }

    init(): void {

        this.emitNotices();

        this.dataProvider.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {

            if(change.doc.type === 'notice' || change.deleted){
                this.emitNotices();
            }

        });

    }

    getNotices(): BehaviorSubject<Object[]> {
        return this.noticesSubject;
    }

    saveNotice(notice): void {

        if(notice.doc){

            let updatedDoc = notice.doc;

            updatedDoc.title = notice.title;
            updatedDoc.message = notice.message;
            updatedDoc.dateUpdated = notice.dateUpdated;

            this.dataProvider.updateDoc(updatedDoc);

        } else {
            this.dataProvider.createDoc({
                title: notice.title,
                message: notice.message,
                author: notice.author,
                dateCreated: notice.dateCreated,
                dateUpdated: notice.dateUpdated,
                type: 'notice'
            });
        }

    }

    deleteNotice(notice): void {
        this.dataProvider.deleteDoc(notice);
    }

    emitNotices(): void {

        this.zone.run(() => {

            let options = {
                include_docs: true,
                descending: true
            };

            this.dataProvider.db.query('notices/by_date_updated', options).then((data) => {

                let notices = data.rows.map(row => {
                    return row.doc;
                });

                this.noticesSubject.next(notices);

            }).catch((err) => {
                console.log(err);
            });

        });

    }

}