import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import firebase from 'firebase';
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
  email: any;
  nameErrorMsg: String;
  password: any;
  cpassword: any;
  successMsg:String="";
  imgSuccessMsg: String = "";
  name: any = "";
  errorMsg: String="";
  public base64Image: any = 'assets/noImage.png';
  passwordMismatchMessage: String="";

  constructor(public camera: Camera, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private fireauth: AngularFireAuth) {

    console.log("username is " + this.name)
    

    
  }
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: 1,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
     // let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.base64Image=imageData;
     //let image=imageData;
     //alert(this.base64Image);
     }, (err) => {
      // Handle error
     });
  }
  
  
  async registerMe() {
    if (/^[a-zA-Z][a-zA-Z ]+$/.test(this.name) && this.name != "") {
      if (this.password == this.cpassword) {
        try {
          await this.fireauth.auth.createUserWithEmailAndPassword(this.email, this.password).then(succ => {

            this.db.list('/userDetails').push({
              username: this.name,
              email: this.email,
              image: this.base64Image
            })
            //this.navCtrl.setRoot(HomePage);
            var user = firebase.auth().currentUser;
            
            try{
            user.sendEmailVerification().then(function() {
            console.log("senttttt");
                  }).catch(err=>{
                    alert(err);
                  })
            this.passwordMismatchMessage = "";
            this.nameErrorMsg = "";
            this.errorMsg = "";
            this.successMsg="!!SUCCESS!! \n \n Verify your email to proceed login, kindly check your email";
            alert(this.successMsg);
            this.name="";
            this.base64Image="";
            this.email="";
            this.password="";
            this.cpassword="";
            }
            catch(error){
            this.passwordMismatchMessage = "";
            this.nameErrorMsg = "";
            this.errorMsg = "Poor Network or contact admin.";
            this.successMsg="";
            alert(error+","+this.errorMsg);
            }
          
            
              
          }).catch(error => {
            this.passwordMismatchMessage = "";
            this.nameErrorMsg = "";
            this.errorMsg = error['message'];
            alert(this.errorMsg);
            console.log(error);
          })

        }
        catch (error) {
          this.passwordMismatchMessage = "";
          this.nameErrorMsg = "";
          
          this.errorMsg = error['message'];
          this.errorMsg=this.errorMsg.substring(this.errorMsg.indexOf('"'));
          alert(this.errorMsg);
          console.log(error);
        }
      }
      else {
        this.errorMsg = "";
        this.nameErrorMsg = "";
        this.passwordMismatchMessage = "Password and Verify Password are not same";
        alert(this.passwordMismatchMessage);
        //console.log("error is" + this.passwordMismatchMessage)
      }
    }
    else {
      this.errorMsg = "";
      this.passwordMismatchMessage = "";
      this.nameErrorMsg = "Please enter a valid Username";
      alert(this.nameErrorMsg);
    }
  }

}
