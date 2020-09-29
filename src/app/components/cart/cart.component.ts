import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  @Input() cartInfo: Cart;

  constructor() { }

  ngOnInit() {
    if(this.cartInfo == undefined) this.cartInfo = new Cart();
  }

}