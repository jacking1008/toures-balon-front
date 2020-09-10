import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  passwordType: string = "password";
  passwordIcon: string = "eye-off";
  user: any = "";
  password: any = "";

  constructor(
    private formbld: FormBuilder,
    private modalController: ModalController
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
    this.modalController.dismiss();
  }

}
