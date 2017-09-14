import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {HomePage} from '../home/home';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email:any;
  password:any;
  cpassword:any;
  name:any;
  passwordMismatchMessage:String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fireauth:AngularFireAuth) {
    console.log("username is "+this.name)
  }

  ionViewDidLoad() {
    
  }
  async registerMe(){
   if(this.password==this.cpassword){
      try{
          const result=await this.fireauth.auth.createUserWithEmailAndPassword(this.email,this.password);
          this.navCtrl.goToRoot(HomePage);
      }
      catch(error){
          console.log("result is "+error);
      }
   }
  else{
      this.passwordMismatchMessage="Password and Confirm Password are not same";
      console.log("error is"+this.passwordMismatchMessage)
    }
  }

}
