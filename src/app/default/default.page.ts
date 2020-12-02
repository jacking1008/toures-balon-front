import { Component, OnInit } from '@angular/core';
import { ChangeCards } from '../global/change-cards';
import { CardInfo } from '../models/card-info';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {

  products: Product[];

  constructor(
    private productSrv : ProductService
  ) { }

  ngOnInit() {
    this.productSrv.search("").subscribe( rta => {
      this.products = rta;
    })
  }

}
