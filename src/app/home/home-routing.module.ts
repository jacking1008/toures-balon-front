import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'default',
        loadChildren: () => import('../default/default.module').then( m => m.DefaultPageModule)
      },
      {
        path: 'cart-shop',
        loadChildren: () => import('../cart-shop/cart-shop.module').then( m => m.CartShopPageModule)
      },
      {
        path: 'detail',
        loadChildren: () => import('../detail/detail.module').then( m => m.DetailPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
