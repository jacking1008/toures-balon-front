import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  session: boolean = false;

  constructor(
    public loginController : ModalController,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.validateSession();
  }

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

  async presentRegisterModal() {
    const modal = await this.loginController.create({
      component: SignUpComponent
    });
    return await modal.present();
  }

  validateSession(){
    let user = sessionStorage.getItem('idUser');
    let token = sessionStorage.getItem('token');
    if( user != undefined && user != null && 
        token != undefined && token != null ){
          this.session = true;
    }
  }

  logOut(){
    sessionStorage.removeItem('idUser');
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.session = false;
    this.home();
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

  home(){
    this.router.navigate(['/home/default']);
  }

}
