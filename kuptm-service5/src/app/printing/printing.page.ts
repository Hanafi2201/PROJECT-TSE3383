import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-printing',
  templateUrl: './printing.page.html',
  styleUrls: ['./printing.page.scss'],
})
export class PrintingPage implements OnInit {
  location = 'uploads/';
  
  post = {} as Post;
  barStatus = false;
  errorMessage = '';
  imageUploads = [];
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    
  ) { }

  ngOnInit() {
  }

  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
    
  }

  async storeImage(imageData: any) {
    try {
      const imageName = this.imageName();
      return new Promise((resolve, reject) => {
        const pictureRef = this.angularFireStorage.ref(this.location + imageName);
        pictureRef
          .put(imageData)
          .then(function () {
            pictureRef.getDownloadURL().subscribe((url: any) => {
              resolve(url);
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (e) {}
  }

  uploadPhoto(event) {
    this.barStatus = true;
    this.storeImage(event.target.files[0]).then(
      (res: any) => {
        if (res) {
          console.log(res);
          this.imageUploads.unshift(res);
          this.barStatus = false;
        } 
      },
      (error: any) => {
        this.errorMessage = 'File size exceeded. Maximum file size is 10 MB'
        this.barStatus = false;
      }
    );
  }

  

  async createPost(post: Post){
        if(this.formValidation()) {
        //show loader
        let loader = this.loadingCtrl.create({
        message: "Please wait..."
        });
        (await loader).present();


    try{
          
            await this.firestore.collection("printing").add(post);
            
            
            
            
            
            
          } catch(e){
            this.showToast(e);
          }
          //dismiss loader
          (await loader).dismiss();
      
          //redirect to home page
          this.navCtrl.navigateRoot("printing");
          }
        }
        
        formValidation(){
          if(!this.post.id){
                this.showToast("Enter ID");
                return false;
              }
          if(!this.post.quantity){
            this.showToast("Enter quantity");
            return false;
          }
      
          if(!this.post.colour){
            this.showToast("Enter colour");
            return false;
          }
      
          if(!this.post.side){
            this.showToast("Enter side");
            return false;
          }
      
          if(!this.post.time){
            this.showToast("Enter time");
            return false;
          }
  
          
           this.showToast("FILE UPLOADED");
          return true;
        
        }
      
      
        showToast (message:string){
          this.toastCtrl.create({
            message: message,
            duration: 3000
          })
          .then(toastData => toastData.present());
        }

}
