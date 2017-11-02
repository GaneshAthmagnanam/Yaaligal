import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the OverallContributorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overall-contributors',
  templateUrl: 'overall-contributors.html',
})
export class OverallContributorsPage {
  contributorsDetails = [];
  filteredArray = [];
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.db.list('/userTransaction').subscribe(data => {
      // this.contributorsDetails.push([data[0].userName, data[0].userImage,data[0].userEmail])
      for (var i = 0; i < data.length; i++) {
        
        /*if(this.contributorsDetails.length==0){*/
        this.contributorsDetails.push([data[i].userName, data[i].userImage,data[i].userEmail])
     // }
      /*else{
        for(var j=0; j<this.contributorsDetails.length;j++){
        if(data[i].userEmail != this.contributorsDetails[j][2]){
          
        this.contributorsDetails.push([data[i].userName, data[i].userImage,data[i].userEmail])
      }
      
        }
      }*/
      
      }
      
      /*for (var i = 0; i < data.length; i++) {
        for(var j=0; j<this.contributorsDetails.length;j++){
        if(data[i].userEmail!=this.contributorsDetails[j][2]){
          
        this.filteredArray.push([data[j].userName, data[j].userImage,data[j].userEmail])
      }
      
        }
      }*/
      
    })
    console.log("@@@"+this.contributorsDetails.length);
    //console.log("filtered"+this.filteredArray.length);
    //this.contributorsDetails.filter((item, index,) => index > 2 )
    //const uniqueNames = Array.from(new Set(this.contributorsDetails));
    //console.log(uniqueNames);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverallContributorsPage');
  }

}
