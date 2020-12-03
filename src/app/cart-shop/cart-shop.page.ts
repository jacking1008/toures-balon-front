import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyFormat } from '../global/currency-format';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-shop',
  templateUrl: './cart-shop.page.html',
  styleUrls: ['./cart-shop.page.scss'],
})
export class CartShopPage implements OnInit {

  cartItems : Cart[];
  reducer = (accumulator, currentValue) => accumulator + currentValue;

  constructor(
    private cartSrv :CartService,
    private router: Router
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

  deleteCart(item:Cart){
    let sessionId = sessionStorage.getItem('idUser');
    this.cartSrv.delete(sessionId,item.idProduct).subscribe( () => {
        this.getCart();
        document.getElementById('my_cart').innerHTML = this.cartItems.length.toString();
      }
    );
  }

  modifyCart(item:Cart, value:string){
    item.quantity = parseInt(value);
    let sessionId = sessionStorage.getItem('idUser');
    this.cartSrv.modify(sessionId, item).subscribe( () => {
      this.getCart();
      document.getElementById('my_cart').innerHTML = this.cartItems.length.toString();
    });
  }

  getFormattedPrice(value:number){
    return CurrencyFormat.convertFormatting('USD',value);
  }

  getSubtotal(){
    return CurrencyFormat.convertFormatting('USD',this.cartItems.map( r => { return r.unitPrice * r.quantity } ).reduce(this.reducer));
  }

  reservar(){
    sessionStorage.setItem('to-pay',JSON.stringify(this.cartItems));
    this.router.navigate(['/payment']);
  }

}
