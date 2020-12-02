import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  session: boolean = false;

  constructor(
    public loginController : ModalController,
    private toastController: ToastController) { }

  ngOnInit() {}

  async presentLoginModal() {
    const modal = await this.loginController.create({
      component: LoginComponent
    });
    modal.onDidDismiss().then( e => {
      if(e.data != undefined){
        this.session = true;
      }
    })
    return await modal.present();
  }

  validateSession(){
    let user = sessionStorage.getItem('userId');
    let token = sessionStorage.getItem('token');
    if( user != undefined && user != null && 
        token != undefined && token != null ){
          this.session = true;
    }
  }

  logOut(){
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    this.session = false;
    this.presentToast('Gracias, vuelve pronto!','success');
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

}
