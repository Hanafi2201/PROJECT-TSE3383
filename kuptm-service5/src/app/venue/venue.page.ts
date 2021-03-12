import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.mode';
import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.page.html',
  styleUrls: ['./venue.page.scss'],
})
export class VenuePage implements OnInit {
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
          
          await this.firestore.collection("venue_booking").add(post);
         
          
        } catch(e){
          this.showToast(e);
        }
        //dismiss loader
        (await loader).dismiss();
    
        //redirect to home page
        this.navCtrl.navigateRoot("venue");
        }
      }

    formValidation(){
      if(!this.post.venue){
              this.showToast("Choose a venue you want to book.");
            return false;
          }
      if(!this.post.id){
              this.showToast("Please enter your student ID.");
            return false;
          }
      if(!this.post.phone){
              this.showToast("Please enter phone number.");
            return false;
          }
      if(!this.post.Bookingtime){
              this.showToast("Please enter booking date.");
            return false;
          }
      if(!this.post.Returntime){
              this.showToast("Please enter returning date.");
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
