import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { DataContactComponent } from '../components/data-contact/data-contact.component';
import { CartComponent } from '../components/cart/cart.component';
import { HeaderComponent } from '../components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentPageRoutingModule
  ],
  declarations: [
    HeaderComponent,
    PaymentPage,
    DataContactComponent,
    CartComponent
  ]
})
export class PaymentPageModule {}
