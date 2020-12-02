import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.page.html',
  styleUrls: ['./cart-shop.page.scss'],
})
export class CartShopPage implements OnInit {

  cartItems : Cart[];

  constructor(
    private cartSrv :CartService
  ) { }

  ngOnInit() {
    this.getCart();
  }

  getCart(){
    let sessionId = sessionStorage.getItem('idUser');
    this.cartSrv.search(sessionId).subscribe( rta => {
      this.cartItems = rta;
    })
  }



}
