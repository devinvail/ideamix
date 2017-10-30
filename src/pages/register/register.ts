import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { DataProvider } from '../../providers/data/data';

@IonicPage({
    defaultHistory: ['LoginPage']
})
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    registerForm: any;
    loading: any;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private authProvider: AuthProvider, private userProvider: UserProvider, private dataProvider: DataProvider, private loadingCtrl: LoadingController) {

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
            email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    createAccount(): void {

        if(this.registerForm.valid){

            this.presentLoading();

            this.authProvider.register(this.registerForm.value).subscribe((res) => {

                if(typeof(res.token) != 'undefined'){

                    this.dataProvider.initDatabase(res.userDBs.hangz);
                    this.userProvider.saveUserData(res);

                    this.navCtrl.setRoot('HomePage');

                }

                this.loading.dismiss();

            }, (err) => {
                this.loading.dismiss();
            });

        }

    }

    presentLoading(): void {

        this.loading = this.loadingCtrl.create({
            content: 'Creating Account...'
        });

        this.loading.present();

    }

}