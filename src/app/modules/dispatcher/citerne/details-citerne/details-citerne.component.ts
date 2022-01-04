import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../models/citerne.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CiterneService} from '../services/citerne.service';

@Component({
  selector: 'app-details-citerne',
  templateUrl: './details-citerne.component.html',
  styleUrls: ['./details-citerne.component.scss']
})
export class DetailsCiterneComponent implements OnInit {

  citerne = new CiterneModel;
  createCiterneForm!: FormGroup;
  submitted = false;
  
  years = Array<number>();

  constructor(public activeModal: NgbActiveModal, private citerneService: CiterneService) { }

  ngOnInit(): void {
    this.createCiterneForm = new FormGroup({
      assetId: new FormControl(this.citerne.assetId),
      marque: new FormControl(this.citerne.marque),
      modele: new FormControl(this.citerne.modele),
      matricule: new FormControl(this.citerne.matricule),
      fabric: new FormControl(this.citerne.anneFabrication),
      poids: new FormControl(this.citerne.poids),
      puissance: new FormControl(this.citerne.puissance),
      entretien: new FormControl(this.citerne.dateEntretien),
      dispo: new FormControl(this.citerne.dispo),
      description: new FormControl(this.citerne.description),
      manufacture: new FormControl(this.citerne.manufacture),
      serialNumber: new FormControl(this.citerne.serialNumber),
      isAutoVireur: new FormControl(this.citerne.isAutoVireur),
      isVaccum: new FormControl(this.citerne.isVaccum),
      isCertificated: new FormControl(this.citerne.isCertificated),
      isBackCharge: new FormControl(this.citerne.isBackCharge),
      nbreCompartiment: new FormControl(this.citerne.nbreCompartiment),
      capacitePied: new FormControl(this.citerne.capacitePied)
    });
    this.generateYears();
  }

  updateCiterne(){
    var data = {
      assetId: this.createCiterneForm.get('assetId')?.value,
      marque: this.createCiterneForm.get('marque')?.value,
      modele: this.createCiterneForm.get('modele')?.value,
      matricule: this.createCiterneForm.get('matricule')?.value,
      fabric: this.createCiterneForm.get('fabric')?.value,
      poids: this.createCiterneForm.get('poids')?.value,
      puissance: this.createCiterneForm.get('puissance')?.value,
      entretien: this.createCiterneForm.get('entretien')?.value,
      dispo: this.createCiterneForm.get('dispo')?.value,
      description: this.createCiterneForm.get('description')?.value,
      manufacture: this.createCiterneForm.get('manufacture')?.value,
      serialNumber: this.createCiterneForm.get('serialNumber')?.value,
      isAutoVireur: this.createCiterneForm.get('isAutoVireur')?.value,
      isVaccum: this.createCiterneForm.get('isVaccum')?.value,
      isCertificated: this.createCiterneForm.get('isCertificated')?.value,
      isBackCharge: this.createCiterneForm.get('isBackCharge')?.value,
      nbreCompartiment: this.createCiterneForm.get('nbreCompartiment')?.value,
      capacitePied: this.createCiterneForm.get('capacitePied')?.value
    };
    this.citerneService.updateCiterne(this.citerne.id, data).subscribe(res=>{
      console.log(res);
    });
    this.submitted = true;
  }

  
  generateYears(){
    let currentYears = new Date().getFullYear();
    console.log(currentYears);

    for (let index = 1950; index <= currentYears; index++) {
      this.years.push(index)
    }
  }

}
