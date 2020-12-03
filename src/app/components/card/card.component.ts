import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input, Host } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { CurrencyFormat } from 'src/app/global/currency-format';
import { HomePage } from 'src/app/home/home.page';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public information : Product;
  star = "100%";

  constructor(
    private cartSrv :CartService
  ) { }

  ngOnInit() {
    this.star = this.getStarRating(this.information.user_rating);
  }

  getFormatPrice(price:number){
    return CurrencyFormat.convertFormatting('USD', price);
  }

  getStarRating(rate:number){
    let stringNumberArray = (rate*100/5).toString().split(".");
    let finalNumber = stringNumberArray[0];
    if(stringNumberArray[1] != undefined && stringNumberArray[1] != "0"){
      finalNumber += stringNumberArray[1].charAt(0);
    }
    return finalNumber + "%";
  }

  addToCart(){
    debugger
    let item = new Cart();
    item.idProduct = this.information.id_product.toString();
    item.name = this.information.title;
    item.image = this.information.image;
    item.quantity = 1;
    item.unitPrice = this.information.price;
    item.idProvider = this.information.id_provider != undefined ? this.information.id_provider.toString() : null;

    let sessionId = sessionStorage.getItem('idUser');
    this.cartSrv.modify(sessionId, item).subscribe( () => {
      this.cartSrv.search(sessionId).subscribe( rta => {
        document.getElementById('my_cart').innerHTML = rta.length.toString();
      });
    });
  
  }

}
