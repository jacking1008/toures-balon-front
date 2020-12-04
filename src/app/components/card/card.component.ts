import { Component, OnInit, Input } from '@angular/core';
import { CurrencyFormat } from 'src/app/global/currency-format';
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
    let item = new Cart();
    item.idProduct = this.information.id_product.toString();
    item.name = this.information.title;
    item.image = this.information.image;
    item.quantity = 1;
    item.unitPrice = this.information.price;
    item.idProvider = this.information.id_provider != undefined ? this.information.id_provider.toString() : null;

    let sessionId =  sessionStorage.getItem('idUser');
    let addressIp = sessionStorage.getItem('ip-address');
    let data = sessionId != null && sessionId != undefined ? sessionId : addressIp;
    this.cartSrv.modify(data, item).subscribe( () => {
      this.cartSrv.search(data).subscribe( rta => {
        document.getElementById('my_cart').innerHTML = rta.length.toString();
      });
    });
  
  }

  detailed(){
    sessionStorage.setItem('item-to-detail',JSON.stringify(this.information));
  }

}
