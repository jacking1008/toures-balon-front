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
        path: 'plan',
        loadChildren: () => import('../plans/plans.module').then( m => m.PlansPageModule)
      },
      {
        path: 'event',
        loadChildren: () => import('../events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'transport',
        loadChildren: '../plans/plans.module#PlansPageModule'
      },
      {
        path: 'hotel',
        loadChildren: '../plans/plans.module#PlansPageModule'
      },
      {
        path: 'cart',
        loadChildren: '../plans/plans.module#PlansPageModule'
      },
      {
        path: 'detail/:type/:id',
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
