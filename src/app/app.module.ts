import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/_services/auth.service';
import { environment } from 'src/environments/environment';
// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import {ChartsModule} from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {DispatcherComponent} from './modules/dispatcher/dispatcher.component';
import {ClientComponent} from './modules/dispatcher/client/client.component';
import {CreateCommandeComponent} from './modules/dispatcher/commandes/create-commande/create-commande.component';
import {ListCommandeComponent} from './modules/dispatcher/commandes/list-commande/list-commande.component';
import {CreateProduitComponent} from './modules/dispatcher/produit/create-produit/create-produit.component';
import {ListProduitComponent} from './modules/dispatcher/produit/list-produit/list-produit.component';
import {CreateUserComponent} from './modules/dispatcher/utilisateur/create-user/create-user.component';
import {ListUserComponent} from './modules/dispatcher/utilisateur/list-user/list-user.component';
import {CreateDriverComponent} from './modules/dispatcher/chauffeur/create-driver/create-driver.component';
import {ListDriverComponent} from './modules/dispatcher/chauffeur/list-driver/list-driver.component';
import {ListTruckComponent} from './modules/dispatcher/camion/list-truck/list-truck.component';
import {CreateTruckComponent} from './modules/dispatcher/camion/create-truck/create-truck.component';
import {CreateTankComponent} from './modules/dispatcher/citerne/create-tank/create-tank.component';
import {ListTankComponent} from './modules/dispatcher/citerne/list-tank/list-tank.component';
import {ListLoadComponent} from './modules/dispatcher/chargement/list-load/list-load.component';
import {CreateLoadComponent} from './modules/dispatcher/chargement/create-load/create-load.component';
import {ListClientComponent} from './modules/dispatcher/client/list-client/list-client.component';
import {CreateClientComponent} from './modules/dispatcher/client/create-client/create-client.component';
import {ModalClientComponent} from './modules/dispatcher/client/modal-client/modal-client.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ModalProduitComponent} from './modules/dispatcher/produit/modal-produit/modal-produit.component';
import {ModalChauffeurComponent} from './modules/dispatcher/chauffeur/modal-chauffeur/modal-chauffeur.component';
import {ModalCiterneComponent} from './modules/dispatcher/citerne/modal-citerne/modal-citerne.component';
import {ModalUserComponent} from './modules/dispatcher/utilisateur/modal-user/modal-user.component';
import {ModalCamionComponent} from './modules/dispatcher/camion/modal-camion/modal-camion.component';
import {ModalChargementComponent} from './modules/dispatcher/chargement/modal-chargement/modal-chargement.component';
import {ModalCommandeComponent} from './modules/dispatcher/commandes/modal-commande/modal-commande.component';
import {MatInputModule} from '@angular/material/input';
// import { TrackingComponent } from './modules/tracking/tracking.component';
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}


@NgModule({
  declarations: [AppComponent, DispatcherComponent,
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
    ModalClientComponent,
      ModalProduitComponent,
      ModalChauffeurComponent,
      ModalCiterneComponent,
      ModalUserComponent,
      ModalCommandeComponent,
      ModalCamionComponent,
      ModalChargementComponent,
      ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        SplashScreenModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        HttpClientModule,
        HighlightModule,
        ClipboardModule,
        ChartsModule,
        // #fake-start#
        environment.isMockEnabled
            ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
                passThruUnknownUrl: true,
                dataEncapsulation: false,
            })
            : [],
        // #fake-end#
        AppRoutingModule,
        InlineSVGModule.forRoot(),
        NgbModule,
        MatIconModule,
        MatSlideToggleModule,
        MatInputModule,
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          json: () => import('highlight.js/lib/languages/json')
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
