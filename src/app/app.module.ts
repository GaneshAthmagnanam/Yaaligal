import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { MyApp } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import {ShareService} from '../pages/holder'

 var config = {
    apiKey: "AIzaSyDcxLnjSsyd4uzKr64zrG3opZ6suFbYHhY",
    authDomain: "save-farmer.firebaseapp.com",
    databaseURL: "https://save-farmer.firebaseio.com",
    projectId: "save-farmer",
    storageBucket: "save-farmer.appspot.com",
    messagingSenderId: "776150611911"
  };
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    Facebook,
    Camera,
    ShareService
  ]
})
export class AppModule {}
