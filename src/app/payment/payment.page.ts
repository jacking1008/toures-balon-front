import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PayComponent } from '../components/pay/pay.component';
import { Cart } from '../models/cart';
import { ProductItem } from '../models/product-item';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  toPay: Cart[];

  constructor( 
    private modalController: ModalController,
  ) { 
    this.toPay = JSON.parse(sessionStorage.getItem('to-pay'));
  }

  ngOnInit() {
    this.toPay = JSON.parse(sessionStorage.getItem('to-pay'));
  }

  getPrice(event){
    //this.cartInfo.shipping = event.value;
    //this.cartInfo.total = this.cartInfo.subtotal + this.cartInfo.shipping;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PayComponent,
      componentProps: {
        value: this.getProductList()
      }
    });
    return await modal.present();
  }

  getProductList(){
    return this.toPay.map( c => {
      return this.getProductItem(c)
     });
  }

  getProductItem(c:Cart){
    let x = new ProductItem();
    x.id = parseInt(c.idProduct);
    x.providerId = parseInt(c.idProvider);
    x.number = c.quantity;
    x.unitValue = c.unitPrice;
    x.total = c.quantity * c.unitPrice;
    return x;
  }

}
