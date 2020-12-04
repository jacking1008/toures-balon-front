import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getCart();
  }

  getCart(){
    let data = this.validateData();
    this.cartSrv.search(data).subscribe( rta => {
      this.cartItems = rta;
    })
  }

  deleteCart(item:Cart){
    let data = this.validateData();
    this.cartSrv.delete(data,item.idProduct).subscribe( () => {
        this.getCart();
        document.getElementById('my_cart').innerHTML = this.cartItems.length.toString();
      }
    );
  }

  modifyCart(item:Cart, value:string){
    item.quantity = parseInt(value);
    let data = this.validateData();
    this.cartSrv.modify(data, item).subscribe( () => {
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
    let sessionId = sessionStorage.getItem('idUser');
    let token = sessionStorage.getItem('token');
    if( sessionId != undefined && sessionId != null && token != undefined && token != null){
      sessionStorage.setItem('to-pay',JSON.stringify(this.cartItems));
      this.router.navigate(['/payment']);
    } else{
      this.presentToast('No eres usuario registrado','warning');
    }
  }

  validateData(){
    let sessionId = sessionStorage.getItem('idUser');
    let addressIp = sessionStorage.getItem('ip-address');
    return sessionId != null && sessionId != undefined ? sessionId : addressIp;
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
