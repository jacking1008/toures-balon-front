import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
  formTicket: FormGroup;
  formShipping: FormGroup;
  passwordType: string = "password";
  passwordIcon: string = "eye-off";
  user: any = "";
  password: any = "";
  prices = [{ id: 'QR', value: 0},
    { id: 'TICKET', value: 5000},
    { id: 'SHIP', value: 12000}]

  @Output() change = new EventEmitter();

  @Output() doPay = new EventEmitter();

  constructor(
    private formbld: FormBuilder,
    private shopSrv: ShopService,
  ) {
    this.formTicket = this.formbld.group({
      tienda: ["", [Validators.required]],
    });
    this.formShipping = this.formbld.group({
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      address: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postalCode: ["", [Validators.required]]
    });

  }

  setShipping(value: String){
    this.shipping = value;
    this.change.emit(this.prices.find( e => e.id === this.shipping));
  }

  ngOnInit() {
    this.shopSrv.cargarData().subscribe( rta => {
      this.shopList = rta;
    });
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

}
