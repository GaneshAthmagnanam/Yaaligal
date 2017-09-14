import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
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
  dataValue:any=[];
  age:any;
  amount:any;
  newAmount:any;
  uamount:any;
  name:any;
  pendingmonths:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
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
  test(){
    
    console.log("test");
  }
  pay(){
    this.newAmount=this.amount-this.uamount;
    var res=this.db.list('/Farmerdetails/'+this.index);
    try{
    firebase.database().ref('Farmerdetails/' +this.index).set({
    loanamount:this.newAmount,
    name:this.name,
    age:this.age,
    pendingmonths:this.pendingmonths
    });
    this.navCtrl.setRoot('FarmerDetailsPage');
    }
    catch(error){
    console.log("Transaction error");  
    }
  }
  

}
