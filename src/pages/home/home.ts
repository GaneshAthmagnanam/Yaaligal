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
  errorMsg:String='';
  errorMsg1:String='';
  fbUserData:any;
  errorMsg2:String='';
  loginMethod:number;
  constructor(private fb: Facebook,public navCtrl: NavController, public googleplus:GooglePlus,private fireauth:AngularFireAuth) {

  }
  async login(){
    this.errorMsg="";
    this.errorMsg1="";
    this.errorMsg2="";
    try{
        
        const result =await this.fireauth.auth.signInWithEmailAndPassword(this.email,this.password).then(succ=>{
        this.loginMethod=1;
        //this.fireauth.auth.signInWithRedirect
        console.log(this.fireauth.auth.currentUser.displayName);
        this.navCtrl.setRoot('FarmerDetailsPage',{method:this.loginMethod,mailId:this.email});
      }).catch(error=>{
        this.errorMsg="";
        this.errorMsg=error['message'];
        console.log(error);
      })
      
      }
    catch(error){
      this.errorMsg="";
      //console.log(error['message']);
      this.errorMsg=error['message'];
      console.log(error);
    }
    
    
  }
  register(){
    this.navCtrl.push('RegisterPage');
  }
  
  loginGoogle(){
    this.errorMsg="";
    this.errorMsg1="";
    this.errorMsg2="";
    this.googleplus.login({
      'webClientId':'776150611911-a3e9jut5rl0u09mk8hsmuqsbeodkmd0u.apps.googleusercontent.com',
      'offline':true
    }).then(res=>{
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(suc=>{
        this.loginMethod=2;
        //firebase.auth().
        this.navCtrl.setRoot('FarmerDetailsPage',{method:this.loginMethod});
      }).catch(ns=>{
        this.errorMsg1="";
        this.errorMsg1=ns['message'];
        console.log("Login Failed");
        })
      },error=>{
        this.errorMsg1="";
        this.errorMsg1=error['message'];
        console.log("Login Failed in promise");
      })
  }
  loginFB(){
    this.errorMsg="";
    this.errorMsg1="";
    this.errorMsg2="";
    try{
      
      this.fb.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) =>{ 
          this.loginMethod=3;
          this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile=>{
          this.fbUserData={email:profile['email'],firstName:profile['first_name'],image:profile['picture_large']['data']['url'],uName:profile['name'],id:profile['id']}
          this.navCtrl.setRoot('FarmerDetailsPage',{method:this.loginMethod,data:this.fbUserData});
        }).catch(e=>{
          this.errorMsg2="";
          this.errorMsg2=e['message'];
          console.log('Error logging into Facebook', e);
        })
        }).catch(e => {
          this.errorMsg2="";
          this.errorMsg2=e['message'];
          console.log('Error logging into Facebook', e)
        });
      }
    catch(error){
      this.errorMsg2="";
        this.errorMsg2=error['message'];
        console.log('Error logging into Facebook', error)
      }
  }
  resetPwd(){
      this.navCtrl.push('ResetpasswordPage');
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