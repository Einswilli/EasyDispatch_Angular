import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientService} from '../services';
import {Client} from '../models/client-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {

  createClientForm!: FormGroup ;
  submitted = false;
  client = new Client();
  constructor(private formBuilder: FormBuilder, private clientService: ClientService, public activeModal: NgbActiveModal,private router:Router, private route:ActivatedRoute ) { }
  clientTypes: any = ['DESTINATAIRE', 'EXPEDITEUR', 'PAYEUR'];
  clientPayerList = [];

  ngOnInit(): void {
    // this.getClientPayeur();
    this.createClientForm = new FormGroup({
      clientName: new FormControl(this.client.clientName, [Validators.required, Validators.pattern('^[a-zA-Z0-9\s]*$')]),
      clientAdresseComplete: new FormControl(this.client.clientAdresseComplete, [Validators.required]),
      clientPhoneNumber: new FormControl(this.client.clientPhoneNumber, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
      // tslint:disable-next-line:max-line-length
      clientAdresseMunicipalNumber: new FormControl(this.client.clientAdresseMunicipalNumber, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]),
      clientAdresseStreetName: new FormControl(this.client.clientAdresseStreetName, [Validators.required]),
      clientAdresseCity: new FormControl(this.client.clientAdresseCity, [Validators.required]),
      clientAdresseCountry: new FormControl(this.client.clientAdresseCountry, [Validators.required]),
      clientEmail: new FormControl(this.client.clientEmail, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*@gmail.com')])
      // clientType: [this.client.clientType],
      // idClientPayer: ['']
    });

  }
  get f() { return this.createClientForm.controls; }

  udpateClient(){
    const clt = new Client();
    clt.clientName = this.f.clientName.value;
    clt.clientAdresseMunicipalNumber = this.f.clientAdresseMunicipalNumber.value;
    clt.clientAdresseStreetName = this.f.clientAdresseStreetName.value;
    clt.clientAdresseCity = this.f.clientAdresseCity.value;
    clt.clientAdresseCountry = this.f.clientAdresseCountry.value;
    clt.clientAdresseComplete = this.f.clientAdresseComplete.value;
    clt.clientPhoneNumber = this.f.clientPhoneNumber.value;
    clt.clientEmail = this.f.clientEmail.value;
    alert(clt.clientEmail);
    // clt.clientType= this.f.clientType.value,
    // clt.idClientPayer= this.f.idClientPayer.value
    this.clientService.updateClient(this.client.id, clt).subscribe(res => {
      console.log(res);
    });
    this.activeModal.dismiss('');
    this.submitted = true;
    this.refreshPage();
  }

  refreshPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dispatcher/client/list'], {relativeTo: this.route});
  }

  // getClientPayeur(){
    // this.clientService.getClientByType("PAYEUR").subscribe(res => {
      // this.clientPayerList = res;
    // })
  // }

}
