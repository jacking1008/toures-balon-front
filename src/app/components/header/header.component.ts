import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public loginController : ModalController) { }

  ngOnInit() {}

  async presentLoginModal() {
    const modal = await this.loginController.create({
      component: LoginComponent
    });
    return await modal.present();
  }

}
