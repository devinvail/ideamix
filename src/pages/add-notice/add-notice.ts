import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NoticesProvider } from '../../providers/notices/notices';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-add-notice',
  templateUrl: 'add-notice.html',
})
export class AddNoticePage {

    title: string = '';
    message: string = '';
    existingNotice: any = false;
    submitAttempt: boolean = false;

    constructor(private navCtrl: NavController, private navParams: NavParams, private noticesProvider: NoticesProvider, private viewCtrl: ViewController, private userProvider: UserProvider) {

    }

    ionViewDidLoad() {

        if(typeof(this.navParams.get('notice')) !== 'undefined'){
            this.existingNotice = this.navParams.get('notice');
            this.title = this.existingNotice.title;
            this.message = this.existingNotice.message;
        }

    }

    saveNotice(): void {

        if(this.title.length > 0){

            let iso = this.getDateISOString();

            this.noticesProvider.saveNotice({
                doc: this.existingNotice,
                title: this.title,
                message: this.message,
                author: this.userProvider.currentUser.user_id,
                dateCreated: iso,
                dateUpdated: iso
            });

            this.submitAttempt = false;
            this.viewCtrl.dismiss();

        } else {
            this.submitAttempt = true;
        }

    }

    getDateISOString(): string {
        return new Date().toISOString();
    }

    close(): void {
        this.viewCtrl.dismiss();
    }

}