import { Component, OnInit } from '@angular/core';
import {CommandeModel} from '../models/commande.model';
import {CommandeService} from '../services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../client/services';
import {ProductService} from '../../produit/services';
import {ProduitModel} from '../../produit/models/produit.model';
import {Client} from '../../client/models/client-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalCommandeComponent} from '../modal-commande/modal-commande.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-commande',
  templateUrl: './create-commande.component.html',
  styleUrls: ['./create-commande.component.scss']
})
export class CreateCommandeComponent implements OnInit {

  commandeArray = Array<CommandeModel>();
  submitted = false;
  clientArrayExp = Array<Client>();
  clientArrayDest = Array<Client>();
  typeSiloArrayCharg = Array<CommandeModel>();
  typeSiloArrayDecharg = Array<CommandeModel>();
  productArray = Array<ProduitModel>();



  typeSilo = [
    {
      id: 1,
      libelle_type_silo: 'Aluminium'
    },
    {
      id: 2,
      libelle_type_silo: 'Acier'
    },
  ];

  constructor(private commandeService: CommandeService,
              private clientService: ClientService,
              private productService: ProductService,
              private modalService: NgbModal, private router: Router) { }

  createCommandeForm = new FormGroup({
    reference: new FormControl('', [Validators.required]),
    expediteur: new FormControl('', [Validators.required]),
    destinateur: new FormControl('', [Validators.required]),
    qte_normal_expedie: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9.]*$')]),
    qte_degel_expedie: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9.]*$')]),
    temp_chargement_prevu: new FormControl('', [Validators.required]),
    distance_expediteur_destinataire: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9.]*$')]),
    prix_chauffeur: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9.]*$')]),
    prix_voiturier: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9.]*$')]),
    date_chargement_prevu: new FormControl('', [Validators.required]),
    date_dechargement_prevu: new FormControl('', [Validators.required]),
    // heure_chargement_prevu: new FormControl('',[Validators.required]),
    // heure_dechargement_prevu: new FormControl('',[Validators.required]),
    produit: new FormControl('', [Validators.required]),
    type_silo_chargement: new FormControl('', [Validators.required]),
    type_silo_dechargement: new FormControl('', [Validators.required]),
  });

  onSubmit(){
    var tsc;
    var tsd;
    if (this.createCommandeForm.get('type_silo_chargement')?.value === 1){
      tsc = this.typeSilo[0];
      alert(tsc.libelle_type_silo);
    }else{
      tsc = this.typeSilo[1];
      alert(tsc.libelle_type_silo);
    }
    if (this.createCommandeForm.get('type_silo_echargement')?.value === 1){
      tsd = this.typeSilo[0];
      alert(tsd.libelle_type_silo);
    }else{
      tsd = this.typeSilo[1];
      alert(tsd.libelle_type_silo);
    }
    var pg = this.createCommandeForm.get('produit')?.value;
    var p = {
      id: pg.id,
      designation: pg.designation,
      description: pg.description
    };

    const data = {
      reference: this.createCommandeForm.get('reference')?.value,
      clientExpediteur: this.createCommandeForm.get('expediteur')?.value ,
      clientDestinataire: this.createCommandeForm.get('destinateur')?.value ,
      qte_normal_expedie: this.createCommandeForm.get('qte_normal_expedie')?.value ,
      qte_degel_expedie:  this.createCommandeForm.get('qte_degel_expedie')?.value ,
      temp_chargement_prevu: this.createCommandeForm.get('temp_chargement_prevu')?.value ,
      distance_expediteur_destinataire: this.createCommandeForm.get('distance_expediteur_destinataire')?.value ,
      prix_chauffeur: this.createCommandeForm.get('prix_chauffeur')?.value ,
      prix_voiturier: this.createCommandeForm.get('prix_voiturier')?.value ,
      date_chargement_prevu: this.createCommandeForm.get('date_chargement_prevu')?.value ,
      date_dechargement_prevu: this.createCommandeForm.get('date_dechargement_prevu')?.value ,
      // heure_chargement_prevu: this.createCommandeForm.get('heure_chargement_prevu')?.value ,
      // heure_dechargement_prevu: this.createCommandeForm.get('heure_dechargement_prevu')?.value ,
      produit: p, // this.createCommandeForm.get('produit')?.value ,
      id_Type_silo_chargement: tsc.libelle_type_silo, // this.createCommandeForm.get('type_silo_chargement')?.value ,
      id_Type_silo_dechargement: tsd.libelle_type_silo, // this.createCommandeForm.get('type_silo_dechargement')?.value ,
    };



    this.commandeService.createCommande(data).subscribe(res => {
      console.log(res);
      this.listCommande();
    });
    this.submitted = true;
    this.createCommandeForm.reset();
  }
  displayCommandList() {
    this.router.navigate(['/dispatcher/command/list']);
  }

  ngOnInit(): void {
    this.listClientExp();
    this.listClientDest();
    this.listProduct();
    this.listCommande();
  }

 /* openFormModal(commande: CommandeModel) {
    const modalRef = this.modalService.open(ModalCommandeComponent);
    modalRef.componentInstance.commande = commande;
    modalRef.result.then((result) => {
      console.log('result = > ',result);
    }).catch((error) => {
      console.log('error = > ',error);
    });
  }*/

  listCommande(){
    this.commandeService.getCommandeList().subscribe(res => {
      this.commandeArray = res;
      console.log( this.commandeArray);
    });
  }

  listClientExp(){
    this.clientService.getClientsList().subscribe(res => {
      this.clientArrayExp = res;
    });
  }

  listClientDest(){
    this.clientService.getClientsList().subscribe(res => {
      this.clientArrayDest = res;
    });
  }
  listProduct(){
    this.productService.getProductList().subscribe(res => {
      this.productArray = res;
    });
  }

}
