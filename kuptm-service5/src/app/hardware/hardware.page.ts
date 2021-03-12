import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';
import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.page.html',
  styleUrls: ['./hardware.page.scss'],
})
export class HardwarePage implements OnInit {
  post = {} as Post;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async createPost(post: Post){
        if(this.formValidation()) {
        //show loader
        let loader = this.loadingCtrl.create({
        message: "Please wait..."
        });
        (await loader).present();
    
        try{
          
          await this.firestore.collection("hardware_reservation").add(post);
         
          
        } catch(e){
          this.showToast(e);
        }
        //dismiss loader
        (await loader).dismiss();
    
        //redirect to home page
        this.navCtrl.navigateRoot("hardware");
        }
      }

    formValidation(){
      if(!this.post.hardware){
              this.showToast("Choose a hardware you wish to book.");
            return false;
          }
      if(!this.post.id){
              this.showToast("Please enter your student ID.");
            return false;
          }
      if(!this.post.Returntime){
              this.showToast("What time will you return it?");
            return false;
          }
       this.showToast("BOOKING SUCCESSFUL");
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
