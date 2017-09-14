import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email:any;
  password:any;
  errorMsg:String;
  loginMethod:number;
  constructor(private fb: Facebook,public navCtrl: NavController, public googleplus:GooglePlus,private fireauth:AngularFireAuth) {

  }
  async login(){
    try{
      const result =await this.fireauth.auth.signInWithEmailAndPassword(this.email,this.password);
      this.loginMethod=1;
      this.navCtrl.setRoot('FarmerDetailsPage',{method:this.loginMethod});
      }
    catch(error){
      console.log(error);
      this.errorMsg="Invalid Login details";
      console.log(this.errorMsg);
    }
    
    
  }
  register(){
    this.navCtrl.push('RegisterPage');
  }
  
  loginGoogle(){
    this.googleplus.login({
      'webClientId':'776150611911-a3e9jut5rl0u09mk8hsmuqsbeodkmd0u.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc=>{
        this.loginMethod=2;
        this.navCtrl.setRoot('FarmerDetailsPage',{method:this.loginMethod});
      }).catch(ns=>{
        console.log("Login Failed");
        })
      },error=>{
        console.log("Login Failed in promise");
      })
  }
  loginFB(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) =>{ 
        this.loginMethod=3;
        this.navCtrl.setRoot('FarmerDetailsPage',{method:this.loginMethod});
      })
      .catch(e => {
        console.log('Error logging into Facebook', e)
      });
  }
 logout(value){
    if(value==3){
    this.fb.logout().then((response) => {
        alert(JSON.stringify(response));
        this.navCtrl.setRoot(HomePage);
        }, (error) => {
        alert(error);
      })
    }
  }
}