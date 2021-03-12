import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

  constructor(private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private navCtrl: NavController,) { }

  ngOnInit() {
  }

  async openToast() {  
    const toast = await this.toastCtrl.create({  
      message: 'The file is getting ready to be downloaded',   
      duration: 2000  
    });  
    
    toast.present();  
     toast.onDidDismiss().then((val) => {  
       console.log('Toast Dismissed');   
     });  
  }  
  
}
