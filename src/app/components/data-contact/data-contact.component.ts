import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';
import { PayComponent } from '../pay/pay.component';

@Component({
  selector: 'app-data-contact',
  templateUrl: './data-contact.component.html',
  styleUrls: ['./data-contact.component.scss'],
})
export class DataContactComponent implements OnInit {

  shipping: String;
  shopList: Shop[];
  shopDirr: Shop;
  formShipping: FormGroup;
  passwordType: string = "password";
  passwordIcon: string = "eye-off";
  user: any = "";
  password: any = "";

  @Output() change = new EventEmitter();

  @Output() doPay = new EventEmitter();

  constructor(
    private formbld: FormBuilder,
    private shopSrv: ShopService,
    private toastController: ToastController
  ) {
    this.formShipping = this.formbld.group({
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      address: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postalCode: ["", [Validators.required]]
    });

  }

  ngOnInit() {
    this.shopList = this.shopSrv.cargarData();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off";
  }

  onSelectChange(selectedValue: any) {
    this.shopDirr = this.shopList.find( e => e.id == selectedValue.target.value);
  }

  pay(){
      this.doPay.emit();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Debes llenar todos los campos del formulario.',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

}
