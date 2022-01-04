import { Component, OnInit } from '@angular/core';
import {CiterneService} from '../../citerne/services';
import {ChauffeurService} from '../../chauffeur/services/chauffeur-service.service';
import {CommandeService} from '../../commandes/services';
import {CamionService} from '../../camion/services/camion-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CommandeModel} from '../../commandes/models/commande.model';
import {ConvoiModel} from '../models/convoi.model';
import {ConvoiService} from '../services/convoi.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-load',
  templateUrl: './create-load.component.html',
  styleUrls: ['./create-load.component.scss']
})
export class CreateLoadComponent implements OnInit {
  loadForm!: FormGroup;
  citerneArray = [];
  chauffeurArray = [];
  submitted = false;
  commandeArray = Array<CommandeModel>();
  localisationArray = [];
  camionArray = [];
  chargementArray = Array<ConvoiModel>();

  constructor(
      private chargementService: ConvoiService,
      private citerneService: CiterneService,
      private chauffeurService: ChauffeurService,
      private commandeService: CommandeService,
      private camionService: CamionService,
      private modalService: NgbModal,
      private router: Router,
      private formBuilder: FormBuilder) { }



  ngOnInit(): void {

    this.loadForm = this.formBuilder.group({
      chauffeur: ['', Validators.required],
      camion: ['', Validators.required],
      citerne: ['', Validators.required],
      commande: ['', Validators.required],
      dateHeureDebutDechargementEffective: ['', Validators.required],
      dateHeureFinDechargementEffective: ['', Validators.required],

    });

    this.listCiterne();
    this.listChauffeur();
    this.listCommande();
    this.listLocalisaton();
    this.listCamion();
    this.chargementList();
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
  listLocalisaton(){

  }
  listCamion(){
    this.camionService.getCamionList().subscribe(res => {
      this.camionArray = res;
    });
  }
  onSubmit(){
     const data = {
      adresseDepart: {id: this.loadForm.get('origine')?.value},
      adresseDestination: {id: this.loadForm.get('destination')?.value },
      chauffeur: {id: this.loadForm.get('chauffeur')?.value},
      camion: {id: this.loadForm.get('camion')?.value},
      citerne: {id: this.loadForm.get('citerne')?.value},
      commande: {id: this.loadForm.get('commande')?.value},
      dateDepart: this.loadForm.get('date')?.value,
      dateHeureDebutDechargementEffective: this.loadForm.get('dateHeureDebutDechargementEffective')?.value,
      dateHeureFinDechargementEffective: this.loadForm.get('dateHeureFinDechargementEffective')?.value

    };
     this.chargementService.createConvoi(data).subscribe(res => {
      console.log(res);
      this.chargementList();
    });
     this.submitted = true;
  }

  chargementList(){
    this.chargementService.getConvoiList().subscribe(res => {
      console.log('chargementArray', res);
      this.chargementArray = res;
      console.log(res);

    });
  }
  displayList() {
    this.router.navigate(['/dispatcher/travel-load/list']);
  }

}
