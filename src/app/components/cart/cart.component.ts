import { Component, Input, OnInit } from '@angular/core';
import { CurrencyFormat } from 'src/app/global/currency-format';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  @Input() cartInfo: Cart[] = [];

  reducer = (accumulator, currentValue) => accumulator + currentValue;

  constructor() { }

  ngOnInit() {
    debugger
    if(this.cartInfo == undefined) this.cartInfo = [];
  }

  getFormattedPrice(value: number){
    return CurrencyFormat.convertFormatting('USD', value);
  }

  getSubtotal(){
    if(this.cartInfo != undefined && this.cartInfo.length > 0){
      return CurrencyFormat.convertFormatting('USD',this.cartInfo.map( r => { return r.unitPrice * r.quantity } ).reduce(this.reducer));
    }

  }

}