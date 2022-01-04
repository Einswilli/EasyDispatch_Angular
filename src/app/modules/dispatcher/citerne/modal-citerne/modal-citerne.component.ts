import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../models/citerne.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CiterneService} from '../services';

@Component({
  selector: 'app-modal-citerne',
  templateUrl: './modal-citerne.component.html',
  styleUrls: ['./modal-citerne.component.scss']
})
export class ModalCiterneComponent implements OnInit {
  createCiterneForm!: FormGroup;
  submitted = false;
  citerne : any;
  years = Array<number>();
  citerneArray = Array<CiterneModel>();

  constructor(public activeModal: NgbActiveModal, private citerneService: CiterneService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCiterneForm = new FormGroup({
      assetId: new FormControl(this.citerne.assetId, [Validators.required, Validators.minLength(5)]),
      description: new FormControl(this.citerne.description, [Validators.required, Validators.minLength(5)]),
      manufacture: new FormControl(this.citerne.manufacture, [Validators.required, Validators.minLength(5)]),
      marque: new FormControl(this.citerne.marque, [Validators.required, Validators.minLength(3)]),
      modele: new FormControl(this.citerne.modele, [Validators.required, Validators.minLength(5)]),
      matricule: new FormControl(this.citerne.matricule, [Validators.required, Validators.minLength(3)]),
      nbreCompartiment: new FormControl(this.citerne.nbreCompartiment, [Validators.required, Validators.min(0)]),
      serialNumber: new FormControl(this.citerne.serialNumber, [Validators.required, Validators.minLength(4)]),
      capacitePied: new FormControl(this.citerne.capacitePied, [Validators.required, Validators.min(10)]),
      anneFabrication: new FormControl(this.citerne.anneFabrication, [Validators.required, Validators.min(1950)]),
      poids: new FormControl(this.citerne.poids, [Validators.required, Validators.min(10)]),
      puissance: new FormControl(this.citerne.puissance, [Validators.required, Validators.min(10)]),
      entretien: new FormControl(this.citerne.dateEntretien, Validators.required),
      
      isVaccum: new FormControl(this.citerne.isVaccum, Validators.required),
      isCertificated: new FormControl(this.citerne.isCertificated, Validators.required),
      isBackCharge: new FormControl(this.citerne.isBackCharge, Validators.required),
      dispo: new FormControl(this.citerne.dispo, Validators.required),
      isAutoVireur: new FormControl(this.citerne.isAutoVireur, Validators.required),
  
    });
    this.generateYears();
  }

  updateCiterne(){
    var data = {
      assetId: this.createCiterneForm.get('assetId')?.value,
      marque: this.createCiterneForm.get('marque')?.value,
      modele: this.createCiterneForm.get('modele')?.value,
      matricule: this.createCiterneForm.get('matricule')?.value,
      anneFabrication: this.createCiterneForm.get('anneFabrication')?.value,
      poids: this.createCiterneForm.get('poids')?.value,
      puissance: this.createCiterneForm.get('puissance')?.value,
      entretien: this.createCiterneForm.get('entretien').value,
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
    this.citerneService.updateCiterne(this.citerne.id, data).subscribe(res => {
      console.log(res);
    });
    this.submitted = true;
    location.reload();
  }
  generateYears(){
    const currentYears = new Date().getFullYear();
    console.log(currentYears);

    for (let index = 1950; index <= currentYears; index++) {
      this.years.push(index);
    }
  }

}
