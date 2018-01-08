import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, ModalController, MenuController, PopoverController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../home/home';
import { ShareService } from '../holder'
import firebase from 'firebase';
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
  pages: Array<{ title: string, component: any }>;
  Fdetails: any = [];
  searchQuery:any;
  infiniteScrollFdetails: any = [];
  authMethod: number;
  query: any;
  flag: boolean;
  uname: any;
  uimage: any;
  beforeScroll:any=[];
  uemailAddress: any;
  iVar: number;
  noItems:any;
  loggedUserName: any;
  loggedUserImage: any;
  public countryList: Array<any>;
  //public loadedCountryList:Array<any>;
  public countryRef: firebase.database.Reference;
  mailIdentifier: any;
  backupFdetails: any = [];
  fbData: any;
  private rootPage;
  constructor(menu: MenuController, private shareService: ShareService, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public googleplus: GooglePlus, private fb: Facebook, private fireauth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.authMethod = this.navParams.get('method');
    this.flag=false;
    menu.enable(true);
    this.countryRef = firebase.database().ref('/Farmerdetails');
    //this.nav.setRoot('FarmerDetailsPage');
    //this.navCtrl.getRootNav(nav).setRoot(HomePage); 
    this.pages = [
      { title: 'Home', component: 'FarmerDetailsPage' },
      { title: 'My Profile', component: 'ProfilePage' },
      { title: 'Contribute to Farmers Account', component: 'ContributeFarmersPage' },
      { title: 'Farmers Details', component: 'FarmerFullDetailsPage' },
      { title: 'My Transactions', component: 'MyTransactionsPage' },
      { title: 'Benefited Farmers', component: 'BenefittedFarmersPage' },
      { title: 'Contributors List', component: 'ContributorsPage' },
      { title: 'Contact Us', component: 'ContactmePage' },
      { title: 'Rate SaveFarmer', component: 'FarmerDetailsPage' },
      { title: 'Logout', component: HomePage }
    ];
    //alert(this.pages[2].title);
    console.log("ethukkuuuuuuuuuuuuuuu" + this.authMethod + this.mailIdentifier);
    if (this.authMethod == 1) {
      this.mailIdentifier = this.navParams.get('mailId');
      console.log("ethukkuuuhfjfhjdhdjghdjghdjghuuuuuuuuuuuu" + this.authMethod);
      this.db.list('/userDetails').subscribe(data => {
        console.log("2222" + data.length);
        for (var i = 0; i < data.length; i++) {
          if (this.mailIdentifier == data[i].email) {
            this.loggedUserName = data[i].username;
            this.loggedUserImage = data[i].image;
            //alert(this.loggedUserImage);
            console.log(this.loggedUserName + this.loggedUserImage + this.mailIdentifier);
          }
        }
      })
    }
    if (3 == this.authMethod || 2 == this.authMethod) {
      this.fbData = this.navParams.get('data');
      this.loggedUserName = this.fbData.uName;
      this.loggedUserImage = this.fbData.image;
      this.mailIdentifier = this.fbData.email;
      console.log("ethukkuuuhfjfhjdhdjghdjghdjghuuuuuuuuuuuu" + this.authMethod);

    }
    this.shareService.setUserName(this.loggedUserName);
    this.shareService.setUserImage(this.loggedUserImage)
    this.shareService.setUserEmail(this.mailIdentifier)
    this.db.list('/Farmerdetails').subscribe(data => {

      this.Fdetails = data;
      this.backupFdetails = data;
      for (this.iVar = 0; this.iVar < 8; this.iVar++) {
        //this.items.push( this.items.length );
        this.infiniteScrollFdetails.push(this.Fdetails[this.iVar]);
        
        //this.backupFdetails.push(this.Fdetails[i]);
      }
      this.beforeScroll=this.infiniteScrollFdetails;
    })


    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach(country => {
        countries.push(country.val());
        return false;
      });

      this.countryList = countries;
      this.Fdetails = countries;
    });


  }
  instantDonate(index){
    let contibutorModal = this.modalCtrl.create('InstantpaymentPage', { user: this.mailIdentifier, method: this.authMethod, farmerIdentifier: this.Fdetails[index].uid });
    contibutorModal.present();
  }
  showContributors(index) {
    let contibutorModal = this.modalCtrl.create('ContributorsPage', { user: this.mailIdentifier, method: this.authMethod, farmerIdentifier: this.Fdetails[index].uid });
    contibutorModal.present();
  }
  initializeItems(): void {
    this.countryList = this.Fdetails;
  }
  fetchFarmers(){
    this.db.list('/Farmerdetails').subscribe(data => {
      this.infiniteScrollFdetails=[];
      this.Fdetails = data;
      console.log(this.Fdetails);
      this.backupFdetails = data;
      for (this.iVar = 0; this.iVar < 8; this.iVar++) {
        //this.items.push( this.items.length );
        this.infiniteScrollFdetails.push(this.Fdetails[this.iVar]);

        //this.backupFdetails.push(this.Fdetails[i]);
      }
    })
  }
  doRefresh(refresher) {
    this.flag=false;
    this.searchQuery="";
    
    //this.infiniteScrollFdetails =[];
    //this.infiniteScrollFdetails = this.beforeScroll;
    this.fetchFarmers();
    

   // FarmerDetailsPage obj= new FarmerDetailsPage();
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      console.log(this.infiniteScrollFdetails.length+"@@"+this.Fdetails.length+"@@"+this.backupFdetails.length+"@@"+this.flag)
      refresher.complete();
    }, 2000);
  }

  getItems(searchbar) {
    console.log("serach bar is"+searchbar);
    this.flag = true;
    // Reset items back to all of the items
    this.initializeItems();
    this.countryList = this.backupFdetails;

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    console.log("value of" + "***" + q + "***");
    // if the value is an empty string don't filter the items
    console.log(this.infiniteScrollFdetails.length+"@@@@@"+this.Fdetails.length + "$$$$$$" + this.countryList.length + "@@@@@@" + this.backupFdetails.length)
    if (!q) {
      console.log("inside not of q")
      this.flag = false;
      this.infiniteScrollFdetails =[];
      this.infiniteScrollFdetails = this.beforeScroll;
      return;
    }
    if (q.trim()) {
      if (q.val == "") {
        console.log("inside val")
        this.flag = false;
        this.infiniteScrollFdetails = this.backupFdetails;
      }
    }

    this.countryList = this.countryList.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.countryList.length);
    if (this.countryList.length > 0) {
      this.infiniteScrollFdetails = this.countryList;
    }
    else {
      this.infiniteScrollFdetails = [];
    }
  }
  doInfinite(infiniteScroll) {
    console.log("ddd"+this.flag);
    if(this.flag==false){
    console.log('Begin async operation' + this.infiniteScrollFdetails.length);
    //this.infiniteScrollFdetails=[];
    try{
    setTimeout(() => {
      //var x=this.iVar+10;
      for (this.iVar = this.iVar; this.iVar < this.Fdetails.length; this.iVar++) {
        this.infiniteScrollFdetails.push(this.Fdetails[this.iVar]);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  catch(e){

      console.log('error is'+e);
  }
    }
    else{
      this.noItems="No more items";
      infiniteScroll.complete();
    }
  }

  openPage(page) {
    //var obj=null;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //console.log("enaaaaaaaaaa"+this.service.getUserName);
    this.nav.setRoot(page.component);
    //alert(page.component);
    //this.navCtrl.setRoot(page.component);
    if (page.component == 'ProfilePage') {
      this.profile();
    }
    else if (page.component == 'ContributorsPage') {
      //this.showContributors();
      //this.getItems(obj);
      this.overallContribution();
    }
    else if (page.component == 'ContributeFarmersPage') {
      //this.showContributors();
      //this.getItems(obj);
      this.bulkTransaction();
    }
    else if (page.component == 'ContactmePage') {
      //this.showContributors();
      //this.getItems(obj);
      this.contact();
    }
    else if (page.component == 'MyTransactionsPage') {
      //this.showContributors();
      //this.getItems(obj);
      this.myTransaction();
    }
    else if (page.component == 'FarmerFullDetailsPage') {
      //this.showContributors();
      //this.getItems(obj);
      this.FarmerFullDetailsPage();
    }
    else if (page.component == 'BenefittedFarmersPage') {
      //this.showContributors();
      //this.getItems(obj);
    }
    else if (page.component == HomePage) {
      //alert("1111");
      this.logout();
    }

  }
  FarmerFullDetailsPage() {
    this.navCtrl.push('FarmerFullDetailsPage', { details: this.Fdetails });
  }
  contact(){
    this.navCtrl.push('ContactmePage');
  }
  myTransaction() {
    this.navCtrl.push('MyTransactionsPage', { email: this.mailIdentifier });
  }
  bulkTransaction(){
    this.navCtrl.push('ContributeFarmersPage', { email: this.mailIdentifier });
  }
  overallContribution() {
    this.navCtrl.push('OverallContributorsPage', {});
    //this.dismiss();
  }
  profile() {
    this.navCtrl.push('ProfilePage', { name: this.loggedUserName, image: this.loggedUserImage, email: this.mailIdentifier, method: this.authMethod });
    //this.dismiss();
  }
  presentProfileModal(myEvent) {
    console.log("inside modal");
    let popover = this.popoverCtrl.create('MyPopOverPage', { method: this.authMethod, name: this.loggedUserName, image: this.loggedUserImage, email: this.mailIdentifier });
    popover.present({
      ev: myEvent
    });
  }
  farmerDetails(value) {

    console.log("clciked" + value);
    if (1 == this.authMethod) {
      console.log("clciked inside" + value);
      this.navCtrl.push('DetailsPage', { itemValue: value, lMethod: this.authMethod, name: this.loggedUserName, image: this.loggedUserImage, email: this.mailIdentifier });
    }
    else if (3 == this.authMethod || 2 == this.authMethod) {
      this.navCtrl.push('DetailsPage', { fbdataDetails: this.fbData, itemValue: value, lMethod: this.authMethod, name: this.loggedUserName, image: this.loggedUserImage, email: this.mailIdentifier });
    }
  }
  logout() {
    console.log("logout");
    if (this.authMethod == 1) {
      this.fireauth.auth.signOut()
        .then(succ => {
          console.log("logged out from my email");
          //this.nav.setRoot(page.component);
          this.navCtrl.setRoot(HomePage);
        })
        .catch(err => {
          alert("failed");
        })
    }
    else if (this.authMethod == 2) {
      this.googleplus.logout()
        .then((response) => {
          console.log("logged out from fb");
          this.navCtrl.setRoot(HomePage);
        }, (error) => {
          alert(error);
        })
    }
    else if (this.authMethod == 3) {
      this.fb.logout()
        .then((response) => {
          console.log("logged out from fb");
          this.navCtrl.setRoot(HomePage);
        }, (error) => {
          alert(error);
        })
    }
    else {
      this.navCtrl.setRoot(HomePage);
    }

  }


}
