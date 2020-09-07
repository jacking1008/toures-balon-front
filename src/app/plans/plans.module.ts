import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlansPageRoutingModule } from './plans-routing.module';

import { PlansPage } from './plans.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlansPageRoutingModule,
    RouterModule.forChild([{ path: '', component: PlansPage }])
  ],
  declarations: [PlansPage]
})
export class PlansPageModule {}
