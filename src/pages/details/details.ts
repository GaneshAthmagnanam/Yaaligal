import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import {HomePage} from '../home/home';
import firebase from 'firebase';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  index:any;
  errorMsg:any;
  loginMethod:number;
  dataValue:any=[];
  age:any;
  amount:number;
  newAmount:number;
  uamount:number;
  name:any;
  pendingmonths:any;
  constructor(public googleplus:GooglePlus,private fb: Facebook,private fireauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    this.loginMethod=this.navParams.get('lMethod');
    this.index=this.navParams.get('itemValue');
    this.show(this.index);
  }
  show(value){
    this.db.list('/Farmerdetails').subscribe(data=>{
    this.dataValue=data[value];
    this.age=this.dataValue['age'];
    this.amount=this.dataValue['loanamount'];
    this.name=this.dataValue['name'];
    this.pendingmonths=this.dataValue['pendingmonths'];
  }) 
  }
  logout(){
    console.log("logout");
    if(this.loginMethod==1){
      this.fireauth.auth.signOut()
      .then(succ=>{
          console.log("logged out from my email");
          this.navCtrl.setRoot(HomePage);
      })
      .catch(err=>{
          alert("failed");
      })
    }
    if(this.loginMethod==2){
      this.googleplus.logout()
      .then((response) => {
            console.log("logged out from fb");
            this.navCtrl.setRoot(HomePage);
        }, (error) => {
            alert(error);
      })
    }
    if(this.loginMethod==3){
      this.fb.logout()
      .then((response) => {
            console.log("logged out from fb");
            this.navCtrl.setRoot(HomePage);
        }, (error) => {
            alert(error);
      })
    }
  
  }
  showx(){
    console.log("showme");
  }
  pay(){
    if(this.uamount && this.uamount > 0){
      this.newAmount=this.amount-this.uamount;
      var res=this.db.list('/Farmerdetails/'+this.index);
      try{
        firebase.database().ref('Farmerdetails/' +this.index).set({
        loanamount:this.newAmount,
        name:this.name,
        age:this.age,
        pendingmonths:this.pendingmonths
        }).then(succ=>{
          this.navCtrl.setRoot('FarmerDetailsPage',{method:this.loginMethod});
        }).catch(error=>{
          this.errorMsg=error['message'];
          console.log("Transaction error"+error);  
        })
        
      }
      catch(error){
        this.errorMsg="Kindly specify valid amount in rupees";
        console.log("Transaction error"+error);  
      }
   }
   else{
     this.errorMsg="Kindly specify valid amount in rupees";
   }
  }

}
