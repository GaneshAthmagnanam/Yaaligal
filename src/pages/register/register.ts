import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HomePage } from '../home/home';
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
  imgSuccessMsg: String = "";
  name: any = "";
  errorMsg: any;
  public base64Image: any = 'assets/noImage.png';
  passwordMismatchMessage: String;

  constructor(public camera: Camera, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private fireauth: AngularFireAuth) {

    console.log("username is " + this.name)
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSuccessMsg = "Image Uploaded Successfully";
    }, (err) => {
      // Handle error
      this.base64Image = '/assets/noImage.png';
      this.imgSuccessMsg = "Failed to upload";
      // alert(err);
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
            this.navCtrl.setRoot(HomePage);
          }).catch(error => {
            this.passwordMismatchMessage = "";
            this.nameErrorMsg = "";
            this.errorMsg = error['message'];
            console.log(error);
          })

        }
        catch (error) {
          this.passwordMismatchMessage = "";
          this.nameErrorMsg = "";
          this.errorMsg = error['message'];
          console.log(error);
        }
      }
      else {
        this.errorMsg = "";
        this.nameErrorMsg = "";
        this.passwordMismatchMessage = "Password and Verify Password are not same";
        console.log("error is" + this.passwordMismatchMessage)
      }
    }
    else {
      this.errorMsg = "";
      this.passwordMismatchMessage = "";
      this.nameErrorMsg = "Please enter a valid Username";
    }
  }

}
