import {Component, OnInit, ViewChild} from '@angular/core';
import {CommandeModel} from '../models/commande.model';
import {CommandeService} from '../services';
import {ClientService} from '../../client/services';
import {ProductService} from '../../produit/services';
import {ProduitModel} from '../../produit/models/produit.model';
import {Client} from '../../client/models/client-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalCommandeComponent} from '../modal-commande/modal-commande.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import { CommandDetailsComponent } from '../command-details/command-details.component';
import { CommandDeleteConfirmationComponent } from '../command-delete-confirmation/command-delete-confirmation.component';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

  commandeArray = Array<CommandeModel>();
  clientArrayExp = Array<Client>();
  clientArrayDest = Array<Client>();
  typeSiloArrayCharg = Array<CommandeModel>();
  typeSiloArrayDecharg = Array<CommandeModel>();
  productArray = Array<ProduitModel>();
  isHidden = true;
  dataSource: any;

  displayedColumns: string[] = [
    'reference',
    'clientExpediteur',
    'clientDestinataire',
    'produit',
    'date_chargement_prevu',
    'date_dechargement_prevu',
    'prix_chauffeur',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private commandeService: CommandeService,
              private clientService: ClientService,
              private productService: ProductService,
              private modalService: NgbModal, private router: Router) { }
  ngOnInit(): void {
    this.listClientExp();
    this.listClientDest();
    this.listProduct();
    this.listCommande();
    console.log(this.dataSource);
  }

  openFormModal(commande: CommandeModel) {
    const modalRef = this.modalService.open(ModalCommandeComponent);
    modalRef.componentInstance.commande = commande;
    modalRef.result.then((result) => {
      console.log('result = > ', result);
    }).catch((error) => {
      console.log('error = > ', error);
    });
  }

  openDetailsModal(command:any){
    //opening a selected client details view as a modal...
    const mod=this.modalService.open(CommandDetailsComponent);
    mod.componentInstance.command=command;
    mod.result
    .then(result=>{
      //then cool it works!
      console.log(result);
    })
    .catch(err=>{
      //then we got an error!
      //alert(err);//('détails Client introuvable!');
      console.log(err);
    });
  }
  openDeleteConfirmationModal(command:any){ 
    //opens a confirmation popup before deleting a given command...
    const mod=this.modalService.open(CommandDeleteConfirmationComponent);
    mod.componentInstance.name=command.reference;
    mod.componentInstance.code=command.id;
    mod.result
    .then(res=>{
      //then cool it works!
      alert('Succes!');
    })
    .catch(err=>{
      //we got an error!
      //alert(err);//('impossible de supprimer cette commande!')
    });
  }

  listCommande(){
    this.commandeService.getCommandeList().subscribe(res => {
      this.commandeArray = res;
      console.log( this.commandeArray);
      const ELEMENT_DATA: CommandeModel[] = this.commandeArray;
      this.dataSource = new MatTableDataSource<CommandeModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCommand(commandid:number){
    //we delete a command by a given ID..
    this.commandeService.deleteCommande(commandid);
    alert('Commande supprimée avec succes!');
  }

  listClientExp(){
    this.clientService.getClientByType('EXPEDITEUR').subscribe(res => {
      this.clientArrayExp = res;
    });
  }

  listClientDest(){
    this.clientService.getClientByType('DESTINATAIRE').subscribe(res => {
      this.clientArrayDest = res;
    });
  }
  listProduct(){
    this.productService.getProductList().subscribe(res => {
      this.productArray = res;
    });
  }


  displayForm() {
    this.router.navigate(['/dispatcher/command/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }
}
