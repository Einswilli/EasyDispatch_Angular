import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {CamionModel} from '../models/camion.model';
import {ChauffeurService} from '../../chauffeur/services/chauffeur-service.service';
import {ChauffeurModel} from '../../chauffeur/models/chauffeur.model';
import {CamionService} from '../services/camion-service.service';


@Component({
  selector: 'app-modald',
  templateUrl: './modald.component.html',
  styleUrls: ['./modald.component.scss']
})
export class ModaldComponent implements OnInit {
  camion = new CamionModel();
  createCamionForm!: FormGroup;
  chauffeurArray = Array<ChauffeurModel>();
  submitted = false;
  years= Array<number>();
  constructor(public activeModal: NgbActiveModal, private camionService: CamionService, private chauffeurService: ChauffeurService) { }

  ngOnInit(): void {
    this.createCamionForm = new FormGroup({
      marque: new FormControl(this.camion.marque),
      model: new FormControl(this.camion.model),
      matricule: new FormControl(this.camion.matricule),
      couleur: new FormControl(this.camion.couleur),
      fabric: new FormControl(this.camion.anneFabrication),
      poids: new FormControl(this.camion.poids),
      puissance: new FormControl(this.camion.puissance),
      entretien: new FormControl(this.camion.dateEntretien),
      chauffeur: new FormControl('',[]),
      dispo: new FormControl(this.camion.disponible),
      isReady: new FormControl(this.camion.pret)
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
    };
    this.camionService.updateCamion(this.camion.id, data).subscribe(res=>{
      console.log(res);

    });
    this.submitted = true;
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
