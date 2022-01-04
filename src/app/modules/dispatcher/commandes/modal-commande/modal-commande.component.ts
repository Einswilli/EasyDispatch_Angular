import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommandeService} from '../services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientService} from '../../client/services';
import {ProductService} from '../../produit/services';

@Component({
  selector: 'app-modal-commande',
  templateUrl: './modal-commande.component.html',
  styleUrls: ['./modal-commande.component.scss']
})
export class ModalCommandeComponent implements OnInit {
  commande: any;
  submitted = false;
  createCommandeForm !: FormGroup;
  clientArrayExp: any;
  clientArrayDest: any;
  productArray: any;
  panelNum: number = 1;

  type_silo = [
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
              public activeModal: NgbActiveModal,
              private clientService: ClientService,
              private produitService: ProductService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCommandeForm = new FormGroup({
      reference: new FormControl(this.commande.reference, [Validators.required]),
      expediteur: new FormControl(this.commande.clientExpediteur, [Validators.required]),
      destinateur: new FormControl(this.commande.clientDestinataire, [Validators.required]),
      qte_normal_expedie: new FormControl(this.commande.qte_normal_expedie, [Validators.required]),
      qte_degel_expedie: new FormControl(this.commande.qte_degel_expedie, [Validators.required]),
      temps_chargement_prevu: new FormControl(this.commande.temps_chargement_prevu),
      distance_expediteur_destinataire: new FormControl(this.commande.distance_expediteur_destinataire, [Validators.required]),
      prix_chauffeur: new FormControl(this.commande.prix_chauffeur, [Validators.required]),
      prix_voiturier: new FormControl(this.commande.prix_voiturier, [Validators.required]),
      date_chargement_prevu: new FormControl(this.commande.date_chargement_prevu),
      date_dechargement_prevu: new FormControl(this.commande.date_dechargement_prevu),
      heure_chargement_prevu: new FormControl(this.commande.heure_chargement_prevu),
      heure_dechargement_prevu: new FormControl(this.commande.heure_dechargement_prevu),
      produit: new FormControl(this.commande.produit, [Validators.required]),
      type_silo_chargement: new FormControl(this.commande.id_type_silo_chargement, [Validators.required]),
      type_silo_dechargement: new FormControl(this.commande.id_type_silo_dechargement, [Validators.required]),
    });

    this.listClientExp();
    this.listClientDest();
    this.listProduct();
  }

  isValid(){
    console.log(this.createCommandeForm.valid);
  }
  updateCommande(){
    var data = {
      reference: this.createCommandeForm.get('reference')?.value,
      clientExpediteur:  this.createCommandeForm.get('expediteur')?.value,
      clientDestinataire: this.createCommandeForm.get('destinateur')?.value,
      qte_normal_expedie: this.createCommandeForm.get('qte_normal_expedie')?.value ,
      qte_degel_expedie:  this.createCommandeForm.get('qte_degel_expedie')?.value ,
      temps_chargement_prevu: this.createCommandeForm.get('temps_chargement_prevu')?.value ,
      distance_expediteur_destinataire: this.createCommandeForm.get('distance_expediteur_destinataire')?.value ,
      prix_chauffeur: this.createCommandeForm.get('prix_chauffeur')?.value ,
      prix_voiturier: this.createCommandeForm.get('prix_voiturier')?.value ,
      date_chargement_prevu: this.createCommandeForm.get('date_chargement_prevu')?.value ,
      date_dechargement_prevu: this.createCommandeForm.get('date_dechargement_prevu')?.value ,
      heure_chargement_prevu: this.createCommandeForm.get('heure_chargement_prevu')?.value ,
      heure_dechargement_prevu: this.createCommandeForm.get('heure_dechargement_prevu')?.value ,
      produit: this.createCommandeForm.get('produit')?.value ,
      id_Type_silo_chargement: this.createCommandeForm.get('type_silo_chargement')?.value ,
      id_Type_silo_dechargement:  this.createCommandeForm.get('type_silo_dechargement')?.value ,
    };

    this.commandeService.updateCommande(this.commande.id, data).subscribe(res => {
      console.log(res);
    });
    this.submitted = true;
    //this.activeModal.close();
  }
  listClientExp(){
    this.clientService.getClientByType('EXPEDITEUR').subscribe(res => {
      this.clientArrayExp = res;
      console.log(this.clientArrayExp);
    });
  }

  listClientDest(){
    this.clientService.getClientByType('DESTINATAIRE').subscribe(res => {
      this.clientArrayDest = res;
      console.log(this.clientArrayDest);

    });
  }
  listProduct(){
    this.produitService.getProductList().subscribe(res => {
      this.productArray = res;
      console.log(res);

    });
  }

  next() {
    if (this.panelNum < 5){
      this.panelNum++;
    }
    else{
      this.panelNum = 1;
    }
  }

  prev() {
    if (this.panelNum > 1){
      this.panelNum--;
    }
    else{
      this.panelNum = 5;
    }
  }
}
