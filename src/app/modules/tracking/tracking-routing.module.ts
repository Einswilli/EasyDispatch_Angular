import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateClientComponent} from '../dispatcher/client/create-client/create-client.component';
import {ListClientComponent} from '../dispatcher/client/list-client/list-client.component';
import {ListCommandeComponent} from '../dispatcher/commandes/list-commande/list-commande.component';
import {CreateCommandeComponent} from '../dispatcher/commandes/create-commande/create-commande.component';
import {ListProduitComponent} from '../dispatcher/produit/list-produit/list-produit.component';
import {CreateProduitComponent} from '../dispatcher/produit/create-produit/create-produit.component';
import {ListUserComponent} from '../dispatcher/utilisateur/list-user/list-user.component';
import {CreateUserComponent} from '../dispatcher/utilisateur/create-user/create-user.component';
import {CreateDriverComponent} from '../dispatcher/chauffeur/create-driver/create-driver.component';
import {ListDriverComponent} from '../dispatcher/chauffeur/list-driver/list-driver.component';
import {ListTruckComponent} from '../dispatcher/camion/list-truck/list-truck.component';
import {CreateTruckComponent} from '../dispatcher/camion/create-truck/create-truck.component';
import {ListTankComponent} from '../dispatcher/citerne/list-tank/list-tank.component';
import {CreateTankComponent} from '../dispatcher/citerne/create-tank/create-tank.component';
import {ListLoadComponent} from '../dispatcher/chargement/list-load/list-load.component';
import {CreateLoadComponent} from '../dispatcher/chargement/create-load/create-load.component';
import {TrackingComponent} from './tracking.component';


const routes: Routes = [
  {
    path: '',
    component: TrackingComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TrackingRoutingModule { }
