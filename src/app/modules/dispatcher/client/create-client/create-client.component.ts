import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Client} from '../models/client-model';
import {ModalClientComponent} from '../modal-client/modal-client.component';
import {faUserPlus, faSortAmountDown, faSortAmountUp, faDonate, faList, faUserEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  createClientForm!: FormGroup;
  client: Client = new Client();
  submitted = false;
  unsubmitted = !this.submitted;
  displayClientPayerinput = false;

  clientTypes: any = ['DESTINATAIRE', 'EXPEDITEUR', 'PAYEUR'];
  clientPayerList = [];
  clients!: Client[];
  clientArrayExp = Array<Client>();
  clientArrayDest = Array<Client>();
  clientArrayPay = Array<Client>();

  displayedColumns: string[] = [
    'id',
    'clientName',
    'clientAdresseComplete',
    'clientPhoneNumber',
    'action',
  ];
  // tslint:disable-next-line:prettier
  dataSource: any;
  faDonate = faDonate;
  faSortAmountUp = faSortAmountUp;
  faSortAmountDown = faSortAmountDown;
  faUserplus = faUserPlus;
  faList = faList;
  faUserEdit = faUserEdit;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private clientservice: ClientService,
      private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.createClientForm = this.formBuilder.group({
      clientName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\s]*$')]],
      clientPhoneNumber: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      clientAdresseComplete: ['', Validators.required],
      clientAdresseMunicipalNumber: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      clientAdresseStreetName: ['', Validators.required],
      clientAdresseCity: ['', Validators.required],
      clientAdresseCountry: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*@gmail.com')]],
      // clientType: ['', Validators.required],
    });
    // this.getClientPayeur();
    // this.listClientExp();
    // this.listClientDest();
    this.getListClient();

  }

  public doFilter = (value: any) => {
    this.dataSource.filter = value?.target.valuetrim().toLocaleLowerCase();
  }

  clientPayeurChange(e: any) {
    console.log('INSIDE EVENT', e.target.value);
    if (e.target.value === '1: DESTINATAIRE') {
      this.displayClientPayerinput = true;
    } else {
      this.displayClientPayerinput = false;
    }
  }

  clientExpediteurChange(e: any) {
    console.log('INSIDE EVENT', e.target.value);
    if (e.target.value === '1: DESTINATAIRE') {
      this.displayClientPayerinput = true;
    } else {
      this.displayClientPayerinput = false;
    }
  }

  clientDestinataireChange(e: any) {
    console.log('INSIDE EVENT', e.target.value);
    if (e.target.value === '1: DESTINATAIRE') {
      this.displayClientPayerinput = true;
    } else {
      this.displayClientPayerinput = false;
    }
  }

  newEmployee(): void {
    this.submitted = false;
    this.client = new Client();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.createClientForm.controls;
  }

  createClient() {
    // stop here if form is invalid
    // if (this.createClientForm.invalid) {
    // return;
    // }

    this.client = new Client();

    (this.client.clientName = this.f.clientName.value);
    (this.client.clientAdresseMunicipalNumber = this.f.clientAdresseMunicipalNumber.value);
    (this.client.clientAdresseStreetName = this.f.clientAdresseStreetName.value);
    (this.client.clientAdresseCity = this.f.clientAdresseCity.value);
    (this.client.clientAdresseCountry = this.f.clientAdresseCountry.value);
    this.client.clientAdresseComplete = this.f.clientAdresseComplete.value;
    (this.client.clientPhoneNumber = this.f.clientPhoneNumber.value);
    (this.client.clientEmail = this.f.clientEmail.value);
        // (this.client.clientType = this.f.clientType.value),
        // (this.client.idClientPayer = this.f.idClientPayer.value);
        // (this.client.clientPayeur = this.f.clientPayeur.value),
        // (this.client.clientExpediteur = this.f.clientExpediteur.value),
        // (this.client.clientDestinataire = this.f.clientDestinataire.value);

    this.clientservice.createClient(this.client).subscribe(
        data => {
          console.log(data);
          this.submitted = true;
          this.getListClient();
          // there is no Error then we reset the form
          this.createClientForm.reset();
          this.displayClientList();
        },
        error => {
          this.submitted = false;
          alert(error);
        }
    );
    this.client = new Client();
    // this.displayClientList();
  }

  onSubmit() {
    // Create and save a new client if form is valid

    if (this.createClientForm.valid){
      // then Cool the form is valid
      this.createClient();
    }else{
      alert('Non!');
      this.submitted = false;
    }
    // this.submitted = true;
  }

  displayClientList() {
    this.router.navigate(['/dispatcher/client/list']);
  }

  getListClient() {
    this.clientservice.getClientsList().subscribe(data => {
      this.clients = data;
      console.log(this.clients);
    });
  }

  // getClientPayeur() {
  //   this.clientservice.getClientsList().subscribe(res => {
  //     this.clientArrayPay = res;
  //     this.clientArrayPay = this.clientArrayPay.filter(
  //         client => client.clientPayeur === 'OUI'
  //     );
  //     const ELEMENT_DATA: Client[] = this.clientArrayPay;
  //     this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  //     this.dataSource.paginator = this.paginator;
  //   });

  //   // const ELEMENT_DATA: Client[] = this.clientArrayPay;
  //   // this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  // }

  // listClientExp() {
  //   this.clientservice.getClientsList().subscribe(res => {
  //     this.clientArrayExp = res;
  //     this.clientArrayExp = this.clientArrayExp.filter(
  //         client => client.clientExpediteur === 'OUI'
  //     );
  //     const ELEMENT_DATA: Client[] = this.clientArrayExp;
  //     this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  // listClientDest() {
  //   this.clientservice.getClientsList().subscribe(res => {
  //     this.clientArrayDest = res;
  //     this.clientArrayDest = this.clientArrayDest.filter(
  //         client => client.clientDestinataire === 'OUI'
  //     );
  //     const ELEMENT_DATA: Client[] = this.clientArrayDest;
  //     this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

}
