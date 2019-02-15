import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

    tab1Root: string = 'NoticesPage';
    tab2Root: string = 'ChatPage';

    constructor() {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage with test');
    }

}
