import { Component, OnInit } from '@angular/core';
import { LoginPage } from './../../login/login.page';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
userProfileData:any;
  constructor(private Login: LoginPage) { }

  ngOnInit() {
    this.userProfileData = this.Login.getUser();
  }

  logoutAction() {
    this.Login.logout();
  }

}
