import { Component, OnInit, Input } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { CurrencyFormat } from 'src/app/global/currency-format';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() public information : Product;
  star = "100%";

  constructor() { }

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


}
