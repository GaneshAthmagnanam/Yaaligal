import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    this.authMethod=this.navParams.get('method');
    this.db.list('/Farmerdetails').subscribe(data=>{
    this.Fdetails=data;
    })  
}
  farmerDetails(value){
    this.navCtrl.push('DetailsPage',{itemValue:value});
  }
  logout(){
    console.log("logout");
    
  }
  ionViewDidLoad() {
    
  }

}
