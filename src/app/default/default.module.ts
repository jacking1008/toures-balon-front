import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultPageRoutingModule } from './default-routing.module';

import { DefaultPage } from './default.page';
import { CardComponent } from '../components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultPageRoutingModule
  ],
  declarations: [
    DefaultPage,
    CardComponent
  ]
})
export class DefaultPageModule {}
