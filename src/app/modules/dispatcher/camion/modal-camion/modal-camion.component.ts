import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CamionModel} from '../models/camion.model';
import {ChauffeurService} from '../../chauffeur/services/chauffeur-service.service';
import {ChauffeurModel} from '../../chauffeur/models/chauffeur.model';
import {CamionService} from '../services/camion-service.service';

@Component({
  selector: 'app-modal-camion',
  templateUrl: './modal-camion.component.html',
  styleUrls: ['./modal-camion.component.scss']
})
export class ModalCamionComponent implements OnInit {
  camion = new CamionModel();
  createCamionForm!: FormGroup;
  chauffeurArray = Array<ChauffeurModel>();
  submitted = false;
  years= Array<number>();
  constructor(public activeModal: NgbActiveModal, private camionService: CamionService, private chauffeurService: ChauffeurService) { }
  ngOnInit(): void {
    this.createCamionForm = new FormGroup({
      marque: new FormControl(this.camion.marque,[Validators.required,Validators.minLength(3)]),
      model: new FormControl(this.camion.model,[Validators.required,Validators.minLength(3)]),
      matricule: new FormControl(this.camion.matricule,[Validators.required,Validators.minLength(3)]),
      couleur: new FormControl(this.camion.couleur,[Validators.required,Validators.minLength(3)]),
      fabric: new FormControl(this.camion.anneFabrication,[Validators.required,Validators.minLength(3)]),
      poids: new FormControl(this.camion.poids,[Validators.required,Validators.min(10)]),
      puissance: new FormControl(this.camion.puissance,[Validators.required,Validators.min(0)]),
      entretien: new FormControl(this.camion.dateEntretien,Validators.required),
      chauffeur: new FormControl('',[]),
      dispo: new FormControl(this.camion.disponible,[]),
      isReady: new FormControl(this.camion.pret,[]),
      assetId: new FormControl(this.camion.assetId,Validators.required),
      description: new FormControl(this.camion.description,[Validators.required, Validators.minLength(3)]),
      manufacture:new FormControl(this.camion.manufacture,[Validators.required, Validators.minLength(3)]),
      serialNumber: new FormControl(this.camion.serialNumber,[Validators.required, Validators.minLength(3)]),
      isUsDot: new FormControl(this.camion.isUsDot,[]),
    });
    
    this.listChauffeur();
    this.generateYears();
  }
  updateCamion(){
    var data = {
      marque: this.createCamionForm.get('marque')?.value,
      model: this.createCamionForm.get('model')?.value,
      matricule: this.createCamionForm.get('matricule')?.value,
      couleur: this.createCamionForm.get('couleur')?.value,
      anneFabrication: this.createCamionForm.get('fabric')?.value,
      poids: this.createCamionForm.get('poids')?.value,
      puissance: this.createCamionForm.get('puissance')?.value,
      dateEntretien: this.createCamionForm.get('entretien')?.value,
      disponible: this.createCamionForm.get('dispo')?.value,
      pret: this.createCamionForm.get('isReady')?.value,
      chauffeur: {id: this.createCamionForm.get('chauffeur')?.value} ,
      assetId: this.createCamionForm.get('assetId')?.value,
      description: this.createCamionForm.get('description')?.value,
      manufacture: this.createCamionForm.get('manufacture')?.value,
      serialNumber: this.createCamionForm.get('serialNumber')?.value,
      isUsDot: this.createCamionForm.get('isUsDot')?.value,
    };
    this.camionService.updateCamion(this.camion.id, data).subscribe(res=>{
      console.log(res);

    });
    this.submitted = true;
    location.reload();
  }
  listChauffeur(){
    this.chauffeurService.getChauffeurList().subscribe(res =>{
      this.chauffeurArray = res;
      console.log(this.chauffeurArray);
    })
  }

  generateYears(){
    let currentYears = new Date().getFullYear();
    console.log(currentYears);

    for (let index = 1950; index <= currentYears; index++) {
      this.years.push(index)
    }
  }
}
