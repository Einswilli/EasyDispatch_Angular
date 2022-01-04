import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChauffeurModel } from '../models/chauffeur.model';
import { ChauffeurService } from '../services/chauffeur-service.service';

@Component({
  selector: 'app-modaldd',
  templateUrl: './modaldd.component.html',
  styleUrls: ['./modaldd.component.scss']
})
export class ModalddComponent implements OnInit {
  chauffeur = new ChauffeurModel;
  submitted = false;
  createChauffeurForm!: FormGroup;

  statuts = [
    {
      id: 1,
      statut: "Permanent"
    },
    {
      id: 2,
      statut: "Temporaire"
    },
  ];

  constructor(private chauffeurService: ChauffeurService, public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
    this.createChauffeurForm = new FormGroup({
      nomChauffeur: new FormControl(this.chauffeur.nomChauffeur,[Validators.required,Validators.minLength(3)]),
      prenomChauffeur: new FormControl(this.chauffeur.prenomChauffeur,[Validators.required,Validators.minLength(3)]),
      date_embauche: new FormControl(this.chauffeur.date_embauche,[Validators.required]),
      date_depart: new FormControl(this.chauffeur.date_depart,[Validators.required]),
      statut: new FormControl(this.chauffeur.statut,[Validators.required]),
      lundi: new FormControl(this.chauffeur.jour[0],[Validators.required]),
      mardi: new FormControl(this.chauffeur.jour[1],[Validators.required]),
      mercredi: new FormControl(this.chauffeur.jour[2],[Validators.required]),
      jeudi: new FormControl(this.chauffeur.jour[3],[Validators.required]),
      vendredi: new FormControl(this.chauffeur.jour[4],[Validators.required]),
      samedi: new FormControl(this.chauffeur.jour[5],[Validators.required]),
      dimanche: new FormControl(this.chauffeur.jour[6],[Validators.required]),
    });
  }
  updateChauffeur(){
    var data = {
      nomChauffeur: this.createChauffeurForm.get('nomChauffeur')?.value,
      prenomChauffeur: this.createChauffeurForm.get('prenomChauffeur')?.value,
      date_embauche: this.createChauffeurForm.get('date_embauche')?.value,
      date_depart: this.createChauffeurForm.get('date_depart')?.value,
      statut: this.createChauffeurForm.get('statut')?.value,
     jour: [
          this.createChauffeurForm.get('lundi').value ? "lundi":"",
          this.createChauffeurForm.get('mardi').value ? "mardi":"",
          this.createChauffeurForm.get('mercredi').value ? "mercredi":"",
          this.createChauffeurForm.get('jeudi').value ? "jeudi":"",
          this.createChauffeurForm.get('vendredi').value ? "vendredi":"",
          this.createChauffeurForm.get('samedi').value ? "samedi":"",
          this.createChauffeurForm.get('dimanche').value ? "dimanche":"",]
    };
    this.chauffeurService.updateChauffeur(this.chauffeur.id, data).subscribe(res => {
      console.log(res);

    });
    this.submitted = true;
  }

}
