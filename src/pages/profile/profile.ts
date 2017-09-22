import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name:any;
  image:any;
  emailId:any;
  method:number;
  editName:boolean=false;
  public base64Image: any;
  imgSuccessMsg:String="";
  newName:any;
  key:any;
  constructor(public camera: Camera,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
      this.name=this.navParams.get('name');
      this.image=this.navParams.get('image');
      this.emailId=this.navParams.get('email');
      this.method=this.navParams.get('method');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  actionToEditName(){
    this.editName=true;
  }
  actionToRevertName(){
    this.editName=false;
  }
  actionToSaveName(){
    console.log(this.newName);
    this.db.list('/userDetails').subscribe(data=>{
      console.log("2222"+data.length);
      for(var i=0;i<data.length;i++){
        if(this.name==data[i].username && this.emailId==data[i].email){
          this.key=data[i].$key
          console.log("keyyy "+this.key);
        }
        }
      })
    this.db.list('/userDetails').update(this.key,{
      username:this.newName
    })
    this.db.list('/userDetails').subscribe(data=>{
      console.log("2222"+data.length);
      for(var i=0;i<data.length;i++){
        if(this.newName==data[i].username && this.emailId==data[i].email){
          this.name=data[i].username,
          this.image=data[i].image,
          this.emailId=data[i].email
        }
        }
      })
      this.editName=false;

  }
  takePicture(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    this.actionToSavePic(this.base64Image);
    this.imgSuccessMsg="Image Uploaded Successfully";
      }, (err) => {
 // Handle error
    alert("here1");
    this.base64Image ='/assets/farmer.jpg';
    this.actionToSavePic(this.base64Image);
    this.imgSuccessMsg="Failed to upload";
     // alert(err);
    });
  }
  actionToSavePic(imageReceived){
    alert("here2");
    //console.log(this.newName);
    this.db.list('/userDetails').subscribe(data=>{
      console.log("2222"+data.length);
      for(var i=0;i<data.length;i++){
        if(this.emailId==data[i].email){
          this.key=data[i].$key
          console.log("keyyy "+this.key);
        }
        }
      })
    this.db.list('/userDetails').update(this.key,{
      
      image:imageReceived
    })
    alert("here3");
    this.db.list('/userDetails').subscribe(data=>{
      console.log("2222"+data.length);
      for(var i=0;i<data.length;i++){
        if(this.newName==data[i].username && this.emailId==data[i].email){
          this.name=data[i].username,
          this.image=data[i].image,
          this.emailId=data[i].email
        }
        }
      })
  }
}
