import { delay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../../citerne/models/citerne.model';
import {CiterneService} from '../../citerne/services';
import {CamionService} from '../services/camion-service.service';
import {ChauffeurService} from '../../chauffeur/services/chauffeur-service.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.scss']
})
export class CreateTruckComponent implements OnInit {
  chauffeurArray = [];
  camionForm!: FormGroup;
  citerneArray = Array<CiterneModel>();
  years = Array<number>();
  isHidden = true;
  hiddenButton = true;
  submitted2 = false;
  submitted: any;
  closeResult = '';

  constructor(private formBuilder: FormBuilder,
              private  camionService: CamionService,
              private modalService: NgbModal,
              private  chauffeurService: ChauffeurService,
              private router: Router) {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.camionForm = this.formBuilder.group({
      assetId: ['',  [Validators.required, Validators.minLength(3)]],
      marque: ['', [Validators.required, Validators.minLength(3)]],
      model: ['', [Validators.required, Validators.minLength(3)]],
      matricule: ['', [Validators.required, Validators.minLength(3)]],
      couleur: ['',  [Validators.required, Validators.minLength(3)]],
      fabric: ['', Validators.required],
      poids: ['',  [Validators.required, Validators.min(10)]],
      puissance: ['', [Validators.required, Validators.min(3)]],
      entretien: ['',  [Validators.required, Validators.minLength(3)]],
      chauffeur: ['',  [Validators.required]],
      dispo: ['', Validators.required],
      isReady: ['',Validators.required],
      description: ['',  [Validators.required, Validators.minLength(3)]],
      manufacture: ['', [Validators.required, Validators.minLength(3)]],
      serialNumber: ['',  [Validators.required, Validators.minLength(3)]],
      isUsDot: ['', Validators.required],
    });

    this.generateYears();
    this.listChauffeur();

  }


  
  onSubmit(value:any) {
    const data = {
      marque: this.camionForm.get('marque')?.value,
      model: this.camionForm.get('model')?.value,
      matricule: this.camionForm.get('matricule')?.value,
      couleur: this.camionForm.get('couleur')?.value,
      anneFabrication: this.camionForm.get('fabric')?.value,
      poids: this.camionForm.get('poids')?.value,
      puissance: this.camionForm.get('puissance')?.value,
      dateEntretien: this.camionForm.get('entretien')?.value,
      disponible: this.camionForm.get('dispo')?.value,
      pret: this.camionForm.get('isReady')?.value,
      chauffeur: {id: this.camionForm.get('chauffeur')?.value} ,
      assetId: this.camionForm.get('assetId')?.value,
      description: this.camionForm.get('description')?.value,
      manufacture: this.camionForm.get('manufacture')?.value,
      serialNumber: this.camionForm.get('serialNumber')?.value,
      isUsDot: this.camionForm.get('isUsDot')?.value,
    };

    this.camionService.createCamion(data).subscribe(res => res);
    this.submitted2 = true;
    this.camionForm.reset();
  }

  listChauffeur(){
    this.chauffeurService.getChauffeurList().subscribe(res => {
      this.chauffeurArray = res;
      console.log(this.chauffeurArray);
    });
  }
  generateYears(){
    const currentYears = new Date().getFullYear();
    console.log(currentYears);

    for (let index = 1950; index <= currentYears; index++) {
      this.years.push(index);
    }
  }
  displayList(){
    this.router.navigate(['dispatcher/truck/list']);
  }
}
