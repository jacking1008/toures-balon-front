import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public loginController : ModalController
  ) {}

  async presentLoginModal() {
    debugger
    const modal = await this.loginController.create({
      component: LoginComponent
    });
    return await modal.present();
  }

}
