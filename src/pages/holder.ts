export class ShareService {  
  
    name: any;
    image: any;
    email:any;
    constructor() {
        
    }
  
    setUserName(name) {
        this.name = name;
    }
    setUserImage(image) {
        this.image = image;
    }
    setUserEmail(email) {
        this.email = email;
    }
    getUserName() {
        return this.name;
    }  
    getUserImage() {
        return this.image;
    }  
    getUserEmail() {
        return this.email;
    }   
}