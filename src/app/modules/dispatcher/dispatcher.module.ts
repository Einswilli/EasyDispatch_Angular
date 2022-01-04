import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatcherComponent } from './dispatcher.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';
import {CRUDTableModule} from '../../_metronic/shared/crud-table';
import {NgbDatepickerModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { ClientComponent } from './client/client.component';
import { CreateCommandeComponent } from './commandes/create-commande/create-commande.component';
import { ListCommandeComponent } from './commandes/list-commande/list-commande.component';
import { CreateProduitComponent } from './produit/create-produit/create-produit.component';
import { ListProduitComponent } from './produit/list-produit/list-produit.component';
import { CreateUserComponent } from './utilisateur/create-user/create-user.component';
import { ListUserComponent } from './utilisateur/list-user/list-user.component';
import { CreateDriverComponent } from './chauffeur/create-driver/create-driver.component';
import { ListDriverComponent } from './chauffeur/list-driver/list-driver.component';
import { ListTruckComponent } from './camion/list-truck/list-truck.component';
import { CreateTruckComponent } from './camion/create-truck/create-truck.component';
import { CreateTankComponent } from './citerne/create-tank/create-tank.component';
import { ListTankComponent } from './citerne/list-tank/list-tank.component';
import { ListLoadComponent } from './chargement/list-load/list-load.component';
import { CreateLoadComponent } from './chargement/create-load/create-load.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { ModalClientComponent } from './client/modal-client/modal-client.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserModule} from '@angular/platform-browser';
import {MatSortModule} from '@angular/material/sort';
import { ModalProduitComponent } from './produit/modal-produit/modal-produit.component';
import { ModalChauffeurComponent } from './chauffeur/modal-chauffeur/modal-chauffeur.component';
import { ModalCiterneComponent } from './citerne/modal-citerne/modal-citerne.component';
import { ModalUserComponent } from './utilisateur/modal-user/modal-user.component';
import { ModalCamionComponent } from './camion/modal-camion/modal-camion.component';
import { ModalChargementComponent } from './chargement/modal-chargement/modal-chargement.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { ClientDeleteConfirmationComponent } from './client/client-delete-confirmation/client-delete-confirmation.component';



@NgModule({
  declarations: [
     /* DispatcherComponent,
      ClientComponent,
      CreateCommandeComponent,
      ListCommandeComponent,
      CreateProduitComponent,
      ListProduitComponent,
      CreateUserComponent,
      ListUserComponent,
      CreateDriverComponent,
      ListDriverComponent,
      ListTruckComponent,
      CreateTruckComponent,
      CreateTankComponent,
      ListTankComponent,
      ListLoadComponent,
      CreateLoadComponent,
      ListClientComponent,
      CreateClientComponent,
      ModalClientComponent*/
 /* ModalProduitComponent,
     ModalChauffeurComponent,
     ModalCiterneComponent,
     ModalUserComponent,
     ModalCamionComponent,
     ModalChargementComponent*/ClientDetailComponent,
     ClientDeleteConfirmationComponent],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserModule,
        ReactiveFormsModule
    ],

})
export class DispatcherModule { }
