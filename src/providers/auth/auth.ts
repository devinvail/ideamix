import { Injectable, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { App } from 'ionic-angular';
import { UserProvider } from '../user/user';
import { DataProvider } from '../data/data';
import { SERVER_ADDRESS } from '../../config/constants';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

    constructor(private http: Http, private userProvider: UserProvider, private dataProvider: DataProvider, private appCtrl: App, private zone: NgZone) {
        console.log('Hello AuthProvider Provider');
    }

    authenticate(credentials){

        return this.http.post('http://localhost:8080/' + 'auth/login', credentials).map(res => res.json());

    }

    logout(){

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.userProvider.currentUser.token + ':' + this.userProvider.currentUser.password);

        this.http.post(SERVER_ADDRESS + 'auth/logout', {}, {headers: headers}).subscribe((res) => {});

        this.dataProvider.db.destroy().then((res) => {

            this.dataProvider.db = null;
            this.userProvider.saveUserData(null);
            this.appCtrl.getRootNav().setRoot('LoginPage');

        }, (err) => {
            console.log("could not destroy db");
        });

    }

    register(details){

        return this.http.post(SERVER_ADDRESS + 'auth/register', details).map(res => res.json());

    }

    validateUsername(username){

        return this.http.get(SERVER_ADDRESS + 'auth/validate-username/' + username).map(res => res.json());

    }

    validateEmail(email){

        let encodedEmail = encodeURIComponent(email);

        return this.http.get(SERVER_ADDRESS + 'auth/validate-email/' + encodedEmail).map(res => res.json());

    }

}