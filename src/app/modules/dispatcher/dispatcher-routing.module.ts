import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DispatcherComponent} from './dispatcher.component';
import {ClientComponent} from './client/client.component';
import {ListCommandeComponent} from './commandes/list-commande/list-commande.component';
import {CreateCommandeComponent} from './commandes/create-commande/create-commande.component';
import {ListProduitComponent} from './produit/list-produit/list-produit.component';
import {CreateProduitComponent} from './produit/create-produit/create-produit.component';
import {ListUserComponent} from './utilisateur/list-user/list-user.component';
import {CreateUserComponent} from './utilisateur/create-user/create-user.component';
import {CreateDriverComponent} from './chauffeur/create-driver/create-driver.component';
import {ListDriverComponent} from './chauffeur/list-driver/list-driver.component';
import {ListTruckComponent} from './camion/list-truck/list-truck.component';
import {CreateTruckComponent} from './camion/create-truck/create-truck.component';
import {CreateTankComponent} from './citerne/create-tank/create-tank.component';
import {ListTankComponent} from './citerne/list-tank/list-tank.component';
import {CreateLoadComponent} from './chargement/create-load/create-load.component';
import {ListLoadComponent} from './chargement/list-load/list-load.component';
import {CreateClientComponent} from './client/create-client/create-client.component';
import {ListClientComponent} from './client/list-client/list-client.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'client',
        children: [
          {
            path: 'new',
            component: CreateClientComponent,
          },
          {
            path: 'list',
            component: ListClientComponent,
          },
        ]
      },
      {
        path: 'command/list',
        component: ListCommandeComponent,
      },
      {
        path: 'command/new',
        component: CreateCommandeComponent,
      },
      {
        path: 'product/list',
        component: ListProduitComponent,
      },
      {
        path: 'product/new',
        component: CreateProduitComponent,
      },
      {
        path: 'user/list',
        component: ListUserComponent,
      },
       {
        path: 'user/new',
        component: CreateUserComponent,
      },
      {
        path: 'driver/new',
        component: CreateDriverComponent,
      },
      {
        path: 'driver/list',
        component: ListDriverComponent,
      },
      {
        path: 'truck/list',
        component: ListTruckComponent,
      },
      {
        path: 'truck/new',
        component: CreateTruckComponent,
      },
      {
        path: 'tank/list',
        component: ListTankComponent,
      },
      {
        path: 'tank/new',
        component: CreateTankComponent,
      },
      {
        path: 'travel-load/list',
        component: ListLoadComponent,
      },
      {
        path: 'travel-load/new',
        component: CreateLoadComponent,
      },
      {path: '', redirectTo: 'client', pathMatch: 'full'},
      {path: '**', redirectTo: 'client', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DispatcherRoutingModule {}
