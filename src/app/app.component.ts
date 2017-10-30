import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { HomePage} from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = 'LoginPage';

    constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private dataProvider: DataProvider, public zone: NgZone) {
        this.initializeApp();
    }

    initializeApp() {

        this.platform.ready().then(() => {

            this.zone.runOutsideAngular(() => {
                this.dataProvider.initDatabase('http://127.0.0.1:5984/hangz');
            });

            this.statusBar.styleDefault();
            this.splashScreen.hide();

        });

    }

}