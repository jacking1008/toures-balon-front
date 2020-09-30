import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PayComponent } from '../components/pay/pay.component';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  cartInfo: Cart;

  constructor( 
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.cartInfo = new Cart();
    this.cartInfo.shipping = 0;
    this.cartInfo.eventList = JSON.parse(sessionStorage.getItem('cart'));
    this.cartInfo.subtotal = this.cartInfo.eventList.map( e => { return e.price * e.quantity }).reduce((a,b) => a +b);
    this.cartInfo.total = this.cartInfo.subtotal + this.cartInfo.shipping;
  }

  getPrice(event){
    this.cartInfo.shipping = event.value;
    this.cartInfo.total = this.cartInfo.subtotal + this.cartInfo.shipping;
  }

  async presentModal() {
    debugger
    const modal = await this.modalController.create({
      component: PayComponent,
      componentProps: {
        value: this.cartInfo.total
      }
    });
    return await modal.present();
  }

}
