import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  cartInfo: Cart;

  constructor() { }

  ngOnInit() {
    this.cartInfo = new Cart();
    this.cartInfo.shipping = 0;
    this.cartInfo.eventList = JSON.parse(sessionStorage.getItem('cart'));
    this.cartInfo.subtotal = this.cartInfo.eventList.map( e => { return e.price * e.quantity }).reduce((a,b) => a +b);
    this.cartInfo.total = this.cartInfo.subtotal + this.cartInfo.shipping;
  }

  getPrice(event){
    console.log(event);
    debugger
    this.cartInfo.shipping = event.value;
    this.cartInfo.total = this.cartInfo.subtotal + this.cartInfo.shipping;
  }

}
