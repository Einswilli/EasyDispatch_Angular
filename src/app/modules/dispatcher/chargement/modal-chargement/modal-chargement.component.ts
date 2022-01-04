import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CiterneService} from '../../citerne/services';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CommandeModel} from '../../commandes/models/commande.model';
import {ConvoiModel} from '../models/convoi.model';
import {ConvoiService} from '../services/convoi.service';
import {ChauffeurService} from '../../chauffeur/services/chauffeur-service.service';
import {CommandeService} from '../../commandes/services';
import {CamionService} from '../../camion/services/camion-service.service';
import {CamionModel} from '../../camion/models/camion.model';
import {ChauffeurModel} from '../../chauffeur/models/chauffeur.model';
import {CiterneModel} from '../../citerne/models/citerne.model';

@Component({
  selector: 'app-modal-chargement',
  templateUrl: './modal-chargement.component.html',
  styleUrls: ['./modal-chargement.component.scss']
})
export class ModalChargementComponent implements OnInit {
  createChargementForm!: FormGroup;
  citerneArray = Array<CiterneModel>();
  chargement = new ConvoiModel();
  chauffeurArray = Array<ChauffeurModel>();
  commandeArray = Array<CommandeModel>();
  submitted = false;
  camionArray = Array<CamionModel>();
  chargementArray = Array<ConvoiModel>();
  constructor(public activeModal: NgbActiveModal,
              private convoiService: ConvoiService,
              private citerneService: CiterneService,
              private chauffeurService: ChauffeurService,
              private commandeService: CommandeService,
              private camionService: CamionService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createChargementForm = new FormGroup({
      chauffeur: new FormControl(this.chargement.chauffeur),
      camion: new FormControl(this.chargement.camion),
      citerne: new FormControl(this.chargement.citerne),
      commande: new FormControl(this.chargement.commande),
      dateHeureDebutDechargementEffective: new FormControl(this.chargement.dateHeureDebutDechargementEffective),
      dateHeureFinDechargementEffective: new FormControl(this.chargement.dateHeureFinDechargementEffective)
    });
    this.listChargment();
    this.listCiterne();
    this.listChauffeur();
    this.listCommande();
    this.listCamion();
  }
  listChargment(){
    this.convoiService.getConvoiList().subscribe(res => {
      this.chargementArray = res;
      console.log(this.chargementArray);
    });
  }
  listCiterne(){
    this.citerneService.getCiterneList().subscribe(res => {
      this.citerneArray = res;
      console.log(res);
    });
  }

  listChauffeur(){
    this.chauffeurService.getChauffeurList().subscribe(res => {
      this.chauffeurArray = res;
    });
  }
  listCommande(){
    this.commandeService.getCommandeList().subscribe(res => {
      this.commandeArray = res;
    });
  }
  listCamion(){
    this.camionService.getCamionList().subscribe(res => {
      this.camionArray = res;
    });
  }
  updtateChargement() {
    const data = {
      chauffeur: this.createChargementForm.get('chauffeur')?.value,
      camion: this.createChargementForm.get('camion')?.value,
      citerne: this.createChargementForm.get('citerne')?.value,
      commande: this.createChargementForm.get('commande')?.value,
      dateHeureDebutDechargementEffective: this.createChargementForm.get('dateHeureDebutDechargementEffective')?.value,
      dateHeureFinDechargementEffective: this.createChargementForm.get('dateHeureFinDechargementEffective')?.value,
    };
    this.convoiService.updateConvoi(this.chargement.id, data).subscribe(res => {
      this.listChargment();
    });
    this.submitted = true;
  }
}
