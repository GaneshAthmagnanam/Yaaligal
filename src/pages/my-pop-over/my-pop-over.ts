import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {HomePage} from '../home/home';
import { GooglePlus } from '@ionic-native/google-plus';
/**
 * Generated class for the MyPopOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-pop-over',
  templateUrl: 'my-pop-over.html',
})
export class MyPopOverPage {
name:any;
image:any;
email:any;
authMethod:number;
  constructor(public googleplus:GooglePlus,private fb: Facebook,private fireauth:AngularFireAuth,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.name=this.navParams.get('name');
    this.image=this.navParams.get('image');
    this.email=this.navParams.get('email');
    this.authMethod=this.navParams.get('method');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPopOverPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  profile(){
    this.navCtrl.push('ProfilePage',{name:this.name,image:this.image,email:this.email,method:this.authMethod});
  }
  logout(){
    console.log("logout");
    if(this.authMethod==1){
      this.fireauth.auth.signOut()
      .then(succ=>{
          this.viewCtrl.dismiss();
          console.log("logged out from my email");
          this.navCtrl.setRoot(HomePage);
      })
      .catch(err=>{
          alert("failed");
      })
    }
    else if(this.authMethod==2){
      this.googleplus.logout()
      .then((response) => {
            this.viewCtrl.dismiss();
            console.log("logged out from fb");
            this.navCtrl.setRoot(HomePage);
        }, (error) => {
            alert(error);
      })
    }
    else if(this.authMethod==3){
      this.fb.logout()
      .then((response) => {
            this.viewCtrl.dismiss();
            console.log("logged out from fb");
            this.navCtrl.setRoot(HomePage);
        }, (error) => {
            alert(error);
      })
    }
    else{
      this.navCtrl.setRoot(HomePage);
    }
  
  }
}
