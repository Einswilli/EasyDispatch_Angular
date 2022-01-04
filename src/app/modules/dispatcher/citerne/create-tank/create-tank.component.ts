import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../models/citerne.model';
import {CiterneService} from '../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-tank',
  templateUrl: './create-tank.component.html',
  styleUrls: ['./create-tank.component.scss']
})
export class CreateTankComponent implements OnInit {
  citerneForm!: FormGroup;
  citerneArray = Array<CiterneModel>();
  years = Array<number>();
  isHidden = true;
  hiddenButton = true;
  submitted2 = false;
  submitted: any;

  constructor(private formBuilder: FormBuilder, private  citerneService: CiterneService, private router: Router) {
  }

  ngOnInit() {
this.citerneForm = this.formBuilder.group({
    assetId: ['', [Validators.required, Validators.minLength(5)]],
    description: ['',[Validators.required, Validators.minLength(5)]],
    manufacture: ['', [Validators.required, Validators.minLength(5)]],
    marque: ['', [Validators.required, Validators.minLength(3)]],
    model: ['', [Validators.required, Validators.minLength(5)]],
    matricule: ['', [Validators.required, Validators.minLength(3)]],
    nbreCompartiment: ['', [Validators.required, Validators.min(0)]],
    serialNumber: ['', [Validators.required, Validators.minLength(4)]],
    capacitePied: ['',[Validators.required, Validators.min(10)]],
    fabric: ['', [Validators.required, Validators.min(1950)]],
    poids: ['', [Validators.required, Validators.min(10)]],
    puissance: ['', [Validators.required, Validators.min(10)]],
    entretien: ['', [Validators.required]],

    isVaccum: ['',Validators.required],
    isCertificated: ['',Validators.required],
    isBackCharge: ['',Validators.required],
    dispo: ['',Validators.required],
    isAutoVireur: ['',Validators.required],
    
  });
  this.generateYears();
  }

onSubmit() {
    const data = {
      marque: this.citerneForm.get('marque')?.value,
      modele: this.citerneForm.get('model')?.value,
      matricule: this.citerneForm.get('matricule')?.value,
      anneFabrication: this.citerneForm.get('fabric')?.value,
      poids: this.citerneForm.get('poids')?.value,
      dispo: this.citerneForm.get('poids')?.value,
      isReady: this.citerneForm.get('poids')?.value,
      puissance: this.citerneForm.get('puissance')?.value,
      dateEntretien: this.citerneForm.get('entretien')?.value,
      assetId: this.citerneForm.get('assetId')?.value,
      description: this.citerneForm.get('description')?.value,
      manufacture: this.citerneForm.get('manufacture')?.value,
      serialNumber: this.citerneForm.get('serialNumber')?.value,
      capacitePied: this.citerneForm.get('capacitePied')?.value,
      isAutoVireur: this.citerneForm.get('isAutoVireur')?.value,
      isVaccum: this.citerneForm.get('isVaccum')?.value,
      isCertificated: this.citerneForm.get('isCertificated')?.value,
      isBackCharge: this.citerneForm.get('isBackCharge')?.value,
      nbreCompartiment: this.citerneForm.get('nbreCompartiment')?.value
    };

    this.citerneService.createCiterne(data).subscribe(res => {
      console.log(res);
    });
    this.submitted2 = true;
    this.citerneForm.reset();
  }

  open(mode: String) {
    const container = document.getElementById('main-container-add-tank');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addTankModal');
    }
    container.appendChild(button);
    button.click();

  }

    displayList() {
        this.router.navigate(['/dispatcher/tank/list']);
    }

    generateYears(){
      const currentYears = new Date().getFullYear();
      console.log(currentYears);
  
      for (let index = 1950; index <= currentYears; index++) {
        this.years.push(index);
      }
    }
}
