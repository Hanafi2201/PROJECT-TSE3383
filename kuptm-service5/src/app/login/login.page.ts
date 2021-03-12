import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { User } from '../models/user.mode';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async login(user: User){
        if(this.formValidation()) {
        //show loader
        let loader = this.loadingCtrl.create({
          message: "Please wait..."
        });
        (await loader).present();
        
        try {
          await this.afAuth
          .signInWithEmailAndPassword(user.email, user.password)
          .then (data => {
              console.log(data);
    
          //redirect to home page
          this.navCtrl.navigateRoot("main");
          })
        } catch (e) {
          this.showToast(e);
        }
       
        //dismis loader
        (await loader).dismiss();
        }
      }
      
      formValidation(){
        if(!this.user.email){
          this.showToast("Enter email");
          return false;
        }
    
        if(!this.user.password){
          this.showToast("Enter password");
          return false;
        }
    
        return true;
      }
    
      showToast (message:string){
        this.toastCtrl.create({
          message: message,
          duration: 3000
        }).then(toastData => toastData.present());

      }
    getUser(){
      const userData = localStorage.getItem('user');
      return JSON.parse(userData);
    }

    logout() {
      this.afAuth.signOut();
      localStorage.setItem('user', null);
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    }

}
