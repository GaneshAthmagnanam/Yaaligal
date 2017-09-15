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
  nameErrorMsg:String;
  password:any;
  cpassword:any;
  name:any="";
  errorMsg:any;
  passwordMismatchMessage:String;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fireauth:AngularFireAuth) {
    console.log("username is "+this.name)
  }

  ionViewDidLoad() {
    
  }
  async registerMe(){
   if(/^[a-zA-Z][a-zA-Z ]+$/.test(this.name) && this.name!=""){ 
    if(this.password==this.cpassword){
        try{
            await this.fireauth.auth.createUserWithEmailAndPassword(this.email,this.password).then(succ=>{
            this.navCtrl.goToRoot(HomePage);
            }).catch(error=>{
            this.passwordMismatchMessage="";
            this.nameErrorMsg="";
            this.errorMsg=error['message'];
            console.log(error);
          })
          
        }
        catch(error){
          this.passwordMismatchMessage="";
          this.nameErrorMsg="";
          this.errorMsg=error['message'];
          console.log(error);
        }
    }
    else{
      this.errorMsg="";
      this.nameErrorMsg="";
      this.passwordMismatchMessage="Password and Verify Password are not same";
      console.log("error is"+this.passwordMismatchMessage)
    }
   }
   else{
      this.errorMsg="";
      this.passwordMismatchMessage="";
      this.nameErrorMsg="Please enter a valid Username";
   }
  }

}
