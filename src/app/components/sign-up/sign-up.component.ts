import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Client } from 'src/app/models/client';
import { User } from 'src/app/models/user';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  passwordType: string = "password";
  passwordIcon: string = "eye-off";

  constructor(
    private formbld: FormBuilder,
    private modalController: ModalController,
    private clientSrv: ClientService,
    private toastController: ToastController
  ) { 
    this.form = this.formbld.group({
      idClient: ["", [Validators.required]],
      email: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      age: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {}

  hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off";
  }

  dismiss() {
    this.modalController.dismiss();
  }

  register(){
    let client = new Client();
    client.idClient = this.form.value.idClient;
    client.firstName = this.form.value.firstName;
    client.lastName = this.form.value.lastName;
    client.age = this.form.value.age;
    client.gender = this.form.value.gender;
    client.userType = "PRUEBA";
    client.email = this.form.value.email;
    let user = new User();
    user.idClient = client.idClient;
    user.idUser = 0;
    user.username = this.form.value.username;
    user.password = this.form.value.password;
    this.clientSrv.create(client,user).subscribe( rta => {
      this.presentToast('¡Bienvenido a Toures Balón. Inicia Sesión!','success');
      this.dismiss();
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
