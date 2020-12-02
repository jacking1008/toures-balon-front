import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Auth } from 'src/app/models/auth';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  passwordType: string = "password";
  passwordIcon: string = "eye-off";
  userId: string;

  constructor(
    private formbld: FormBuilder,
    private modalController: ModalController,
    private loginSrv: LoginService,
    private toastController: ToastController
  ) { 
    this.form = this.formbld.group({
      user: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {}

  hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off";
  }

  dismiss() {
    this.modalController.dismiss(this.userId);
  }

  login(){
    debugger
    let auth = new Login();
    auth.userName = this.form.value.user;
    auth.password = this.form.value.password;
    this.loginSrv.auth(auth).subscribe( rta => {
      this.presentToast('¡Bienvenido de nuevo','success');
      this.userId = rta.idUser;
      this.dismiss();
      sessionStorage.setItem('idUser',rta.idUser);
      sessionStorage.setItem('token',rta.token);
    })
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
