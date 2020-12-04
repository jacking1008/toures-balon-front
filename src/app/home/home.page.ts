import { Component, Host, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CardComponent } from '../components/card/card.component';
import { LoginComponent } from '../components/login/login.component';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { IpService } from '../services/ip.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public cart: number;

  constructor(
    private cartSrv: CartService,
    private ipSrv: IpService,
  ) {
  }

  ngOnInit() {
    let sessionId = this.validateData();
    this.cartSrv.search(sessionId).subscribe( rta => {
      this.cart = rta.length;
    })
    this.ipSrv.getCurrentIp().subscribe( rta => {
      sessionStorage.setItem('ip-address',rta.ip);
    })
  }

  validateCart(){
    return this.cart <= 0;
  }

  validateData(){
    let sessionId = sessionStorage.getItem('idUser');
    let addressIp = sessionStorage.getItem('ip-address');
    return sessionId != null && sessionId != undefined ? sessionId : addressIp;
  }

}
