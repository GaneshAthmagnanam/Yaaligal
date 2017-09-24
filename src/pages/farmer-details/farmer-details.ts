import { Component, ViewChild } from '@angular/core';
import { Nav,IonicPage, NavController, ModalController,PopoverController ,NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import {HomePage} from '../home/home';
import {ShareService} from '../holder'
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
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  Fdetails:any=[];
  authMethod:number;
  uname:any;
  uimage:any;
  uemailAddress:any;
  loggedUserName:any;
  loggedUserImage:any;
  mailIdentifier:any;
  fbData:any;
  private rootPage;
  constructor(private shareService: ShareService,public modalCtrl: ModalController,public popoverCtrl: PopoverController ,public googleplus:GooglePlus,private fb: Facebook,private fireauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public db: AngularFireDatabase) {
    this.authMethod=this.navParams.get('method');
    this.pages = [
      { title: 'Home', component: 'FarmerDetailsPage' },
      { title: 'My Profile', component: 'ProfilePage' },
      { title: 'Farmers Details', component: 'FarmerFullDetailsPage' },
      { title: 'My Transactions', component: 'MyTransactionsPage' },
      { title: 'Benifitted Farmers', component: 'BenefittedFarmersPage' },
      { title: 'Contributors List', component: 'ContributorsPage' },
     { title: 'Logout', component: 'LogoutPage' }
    ];
    //alert(this.fbData.email);
    console.log("ethukkuuuuuuuuuuuuuuu"+this.authMethod+this.mailIdentifier);
    if(this.authMethod==1){
      this.mailIdentifier=this.navParams.get('mailId');
      console.log("ethukkuuuhfjfhjdhdjghdjghdjghuuuuuuuuuuuu"+this.authMethod);
      this.db.list('/userDetails').subscribe(data=>{
      console.log("2222"+data.length);
      for(var i=0;i<data.length;i++){
        if(this.mailIdentifier==data[i].email){
          this.loggedUserName=data[i].username;
          this.loggedUserImage=data[i].image;
          console.log(this.loggedUserName+this.loggedUserImage+this.mailIdentifier);
        }
      }
    })
  }
  if(3==this.authMethod || 2==this.authMethod){
      this.fbData=this.navParams.get('data');
      this.loggedUserName=this.fbData.uName;
      this.loggedUserImage=this.fbData.image;
      this.mailIdentifier=this.fbData.email;
      //this.mailIdentifier=this.navParams.get('mailId');
      console.log("ethukkuuuhfjfhjdhdjghdjghdjghuuuuuuuuuuuu"+this.authMethod);
     
    }
    this.shareService.setUserName(this.loggedUserName);
    this.shareService.setUserImage(this.loggedUserImage)
    this.shareService.setUserEmail(this.mailIdentifier)
    this.db.list('/Farmerdetails').subscribe(data=>{
    this.Fdetails=data;
    
    })  
}
  showContributors(index){
      let contibutorModal = this.modalCtrl.create('ContributorsPage',{user:this.mailIdentifier,method:this.authMethod,farmerIdentifier:this.Fdetails[index].uid});
      contibutorModal.present();
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //console.log("enaaaaaaaaaa"+this.service.getUserName);
    this.nav.setRoot(page.component);
    console.log(page.component);
    //this.navCtrl.setRoot(page.component);
    if(page.component=='ProfilePage'){
    this.profile();
    }
    else if (page.component == 'ContributorsPage') {
      //this.showContributors();
      this.overallContribution();
    }
    else if (page.component == 'MyTransactionsPage') {
      //this.showContributors();
    }
    else if (page.component == 'FarmerFullDetailsPage') {
      //this.showContributors();
    }
    else if (page.component == 'BenefittedFarmersPage') {
      //this.showContributors();
    }

  }
   overallContribution(){
    this.navCtrl.push('OverallContributorsPage',{});
    //this.dismiss();
  }
  profile(){
    this.navCtrl.push('ProfilePage',{name:this.loggedUserName,image:this.loggedUserImage,email:this.mailIdentifier,method:this.authMethod});
    //this.dismiss();
  }
  presentProfileModal(myEvent) {
    console.log("inside modal");
    let popover = this.popoverCtrl.create('MyPopOverPage',{method:this.authMethod,name:this.loggedUserName,image:this.loggedUserImage,email:this.mailIdentifier});
    popover.present({
      ev: myEvent
    });
 }
  farmerDetails(value){
    if(1==this.authMethod){
      this.navCtrl.push('DetailsPage',{itemValue:value,lMethod:this.authMethod,name:this.loggedUserName,image:this.loggedUserImage,email:this.mailIdentifier});
    }
    else if(3==this.authMethod || 2==this.authMethod){
      this.navCtrl.push('DetailsPage',{fbdataDetails:this.fbData,itemValue:value,lMethod:this.authMethod,name:this.loggedUserName,image:this.loggedUserImage,email:this.mailIdentifier});
    }
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
  

}
