import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import {HomePage} from '../home/home';
//import {DetailsPage} from '../details/details';
/**
 * Generated class for the FarmerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-farmer-details',
  templateUrl: 'farmer-details.html',
})
export class FarmerDetailsPage {
  Fdetails:any=[];
  authMethod:number;
  constructor(public googleplus:GooglePlus,private fb: Facebook,private fireauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    this.authMethod=this.navParams.get('method');
    this.db.list('/Farmerdetails').subscribe(data=>{
    this.Fdetails=data;
    })  
}
  farmerDetails(value){
    this.navCtrl.push('DetailsPage',{itemValue:value,lMethod:this.authMethod});
  }
  logout(){
    console.log("logout");
    if(this.authMethod==1){
      this.fireauth.auth.signOut()
      .then(succ=>{
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
            console.log("logged out from fb");
            this.navCtrl.setRoot(HomePage);
        }, (error) => {
            alert(error);
      })
    }
    else if(this.authMethod==3){
      this.fb.logout()
      .then((response) => {
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
  ionViewDidLoad() {
    
  }

}
