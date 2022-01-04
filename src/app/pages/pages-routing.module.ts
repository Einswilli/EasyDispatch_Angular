import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

// @ts-ignore
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
     /* {
        path: 'dispatcher',
        loadChildren: () =>
            import('../modules/dispatcher/dispatcher-routing.module').then((m) => m.DispatcherRoutingModule),
      },*/
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: 'ecommerce',
        loadChildren: () =>
          import('../modules/e-commerce/e-commerce.module').then(
            (m) => m.ECommerceModule
          ),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'ngbootstrap',
        loadChildren: () =>
          import('../modules/ngbootstrap/ngbootstrap.module').then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: 'wizards',
        loadChildren: () =>
          import('../modules/wizards/wizards.module').then(
            (m) => m.WizardsModule
          ),
      },
      {
        path: 'material',
        loadChildren: () =>
          import('../modules/material/material.module').then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
      {
        path: 'dispatcher',
        loadChildren: () =>
            import('../modules/dispatcher/dispatcher-routing.module').then((m) => m.DispatcherRoutingModule),
      },
    {
        path: 'tracking',
        loadChildren: () =>
            import('../modules/tracking/tracking-routing.module').then((m) => m.TrackingRoutingModule),
      },
    {
        path: 'facturation',
        loadChildren: () =>
            import('../modules/facturation/facturation-routing.module').then((m) => m.FacturationRoutingModule),
      },
    {
        path: 'RH',
        loadChildren: () =>
            import('../modules/rh/rh-routing.module').then((rh) => rh.RhRoutingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
