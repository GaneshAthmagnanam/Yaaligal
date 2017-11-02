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
  newArray = [];
  flag: number = 0;
  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.db.list('/userTransaction').subscribe(data => {
      // this.contributorsDetails.push([data[0].userName, data[0].userImage,data[0].userEmail])
      for (var i = 0; i < data.length; i++) {
        this.contributorsDetails.push([data[i].userName, data[i].userImage, data[i].userEmail])
      }
      for(var x=0;x<this.contributorsDetails.length;x++){
        for(var y=x+1;y<this.contributorsDetails.length;y++){
          if(this.contributorsDetails[x][2]==this.contributorsDetails[y][2]){
            this.contributorsDetails.splice(x,2);
          }
        }
      }


      /*this.filteredArray = this.contributorsDetails;
      for (var l = 0; l < this.contributorsDetails.length; l++) {
        for (var m = 0; m < this.filteredArray.length; m++) {
          if (this.contributorsDetails[l][2] == this.filteredArray[m][2]) {
            if (this.flag == 0) {
              console.log("timesx" + m+"flag value is"+this.flag);
              ++this.flag;
              this.newArray.push([this.filteredArray[m][0], this.filteredArray[m][1], this.filteredArray[m][2]])
            }
          }
        }
        
      }*/







    })
    console.log(this.contributorsDetails.length);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OverallContributorsPage');
  }

}
