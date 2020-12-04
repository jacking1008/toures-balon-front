import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {Router } from '@angular/router';
import { CurrencyFormat } from '../global/currency-format';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { Item } from '../models/item';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  star = "100%";
  form: FormGroup;

  product: Product;
  items: Item[];
  icons = [{ name: 'title', trad: 'Nombre', icon: 'albums-outline'},
          { name: 'description', trad: 'Descripción', icon: 'barcode-outline'},
          { name: 'price', trad: 'Valor U.', icon: 'logo-usd'},
          { name: 'capacity', trad: 'Capacidad', icon: 'people-circle-outline'},
          { name: 'city', trad: 'Ciudad', icon: 'map-outline'},
          { name: 'date', trad: 'Fecha', icon: 'calendar-outline'},
          { name: 'place', trad: 'Lugar', icon: 'pin-outline'},
          { name: 'from', trad: 'Desde', icon: 'airplane-outline'},
          { name: 'to', trad: 'Hasta', icon: 'airplane-outline'},
          { name: 'luggage_type', trad: 'Equipaje', icon: 'bag-outline'},
          { name: 'stopover', trad: 'Paradas', icon: 'stopwatch-outline'},
          { name: 'guests', trad: 'Huespedes', icon: 'people-outline'},
          { name: 'host_description', trad: 'Desc. Host', icon: 'code-outline'},];


  constructor(
    public modalController: ModalController,
    private formbld: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { 
    this.form = this.formbld.group({
      locality: ["", [Validators.required]],
      quantity: ["", [Validators.required, Validators.maxLength(2)]]
    });
  }

  ngOnInit() {
    this.product = JSON.parse(sessionStorage.getItem('item-to-detail'));
    console.log(this.product);
    this.items = this.getItems(this.product);
    this.star = this.getStarRating(this.product.user_rating);
    debugger
  }

  getStarRating(rate:number){
    let stringNumberArray = (rate*100/5).toString().split(".");
    let finalNumber = stringNumberArray[0];
    if(stringNumberArray[1] != undefined && stringNumberArray[1] != "0"){
      finalNumber += stringNumberArray[1].charAt(0);
    }
    return finalNumber + "%";
  }

  order(){
    let sessionId = sessionStorage.getItem('idUser');
    let token = sessionStorage.getItem('token');
    if( sessionId != undefined && sessionId != null && token != undefined && token != null){
      sessionStorage.setItem('to-pay',JSON.stringify([this.getCart()]));
      this.router.navigate(['/payment']);
    } else{
      this.presentToast('No eres usuario registrado','warning');
    }
  }

  getFormattedPrice(value:number){
    return CurrencyFormat.convertFormatting('USD', value);
  }

  getCart(){
    let cart = new Cart();
    cart.idProduct = this.product.id_product.toString();
    cart.idProvider = this.product.id_provider;
    cart.image = this.product.image;
    cart.name = this.product.title;
    cart.quantity = 1;
    cart.unitPrice = this.product.price;
    return cart;
  }

  getItems(product: any){
    let x = [];
    Object.keys(product).forEach( k => {
      let xTemp = product[k];
      if( typeof xTemp === 'object' ){
        Array.prototype.push.apply(x,this.getItems(xTemp));
      }
      let yTemp = this.icons.find( e => e.name == k );
      if(yTemp != null && yTemp != undefined){
        let itemTemp = new Item();
        itemTemp.name = yTemp.trad;
        itemTemp.icon = yTemp.icon;
        itemTemp.value = xTemp;
        if ( k === 'price'){
          itemTemp.value = CurrencyFormat.convertFormatting('USD',xTemp);
        }
        x.push(itemTemp); 
      }
    } )
    return x;
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
