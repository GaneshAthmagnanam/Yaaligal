import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{ShareService} from '../pages/holder';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
  providers: [ShareService]   
})
export class MyApp {
 public rootPage: any = HomePage;
    constructor(public service:ShareService,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    }
}

