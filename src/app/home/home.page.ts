import { Component, Host, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CardComponent } from '../components/card/card.component';
import { LoginComponent } from '../components/login/login.component';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public cart: number;

  constructor(
    private cartSrv: CartService
  ) {
  }

  ngOnInit() {
    debugger
    let sessionId = sessionStorage.getItem('idUser');
    this.cartSrv.search(sessionId).subscribe( rta => {
      this.cart = rta.length;
    })
  }

}
