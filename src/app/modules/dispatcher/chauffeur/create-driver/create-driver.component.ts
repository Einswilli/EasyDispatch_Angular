import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../produit/services';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChauffeurService} from '../services/chauffeur-service.service';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss']
})
export class CreateDriverComponent implements OnInit {
  statuts = [
   
    {
      id: 1,
      statut: 'Permanent'
    },
    {
      id: 2,
      statut: 'Temporaire'
    },
  ];

  driverForm!: FormGroup;
  submitted = false;
  closeResult: string;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private chauffeurService: ChauffeurService,
      private modalService: NgbModal
  ) {}

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
    this.driverForm = this.formBuilder.group({
      nomChauffeur: ['', [Validators.required,Validators.minLength(3)]],
      prenomChauffeur: ['', [Validators.required,Validators.minLength(3)]],
      date_embauche: ['', Validators.required],
      date_depart: ['', Validators.required],
      contact:['',Validators.required],
      statut:['',Validators.required],
      lundi:[false,Validators.required],
      mardi:[false,Validators.required],
      mercredi:[false,Validators.required],
      jeudi:[false,Validators.required],
      vendredi:[false,Validators.required],
      samedi:[false,Validators.required],
      dimanche:[false,Validators.required],
    });
  }

  onSubmit(value:any){
    const data = {
      nomChauffeur: this.driverForm.get('nomChauffeur')?.value,
      prenomChauffeur: this.driverForm.get('prenomChauffeur')?.value,
      date_embauche: this.driverForm.get('date_embauche')?.value,
      date_depart: this.driverForm.get('date_depart')?.value,
      statut: this.driverForm.get('statut')?.value,
      contact: this.driverForm.get('contact')?.value,
      jour:[
              this.driverForm.get('lundi')?.value ? "lundi":"",
              this.driverForm.get('mardi')?.value ? "mardi":"",
              this.driverForm.get('mercredi')?.value ? "mercredi":"",
              this.driverForm.get('jeudi')?.value ? "jeudi":"",
              this.driverForm.get('vendredi')?.value ? "vendredi":"",
              this.driverForm.get('samedi')?.value ? "samedi":"",
              this.driverForm.get('dimanche')?.value ? "dimanche":"",
      ],
    };
    this.chauffeurService.createChauffeur(data).subscribe(res =>{
      console.log(res);
    });
    this.submitted = true;
    
    this.driverForm.reset();
  }
 displayDriverList(){
    this.router.navigate(['dispatcher/driver/list']);
 }
}
