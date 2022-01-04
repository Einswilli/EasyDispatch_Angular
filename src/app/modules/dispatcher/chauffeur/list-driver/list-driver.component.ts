import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../produit/services';
import {MatPaginator} from '@angular/material/paginator';
import {ProduitModel} from '../../produit/models/produit.model';
import {MatTableDataSource} from '@angular/material/table';
import {ChauffeurService} from '../services/chauffeur-service.service';
import {ChauffeurModel} from '../models/chauffeur.model';
import {ModalClientComponent} from '../../client/modal-client/modal-client.component';
import {ModalChauffeurComponent} from '../modal-chauffeur/modal-chauffeur.component';
import {Router} from '@angular/router';
import { ModalddComponent } from '../modaldd/modaldd.component';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.scss']
})
export class ListDriverComponent implements OnInit {
  ChauffeurService: any;
  chauffeur1:ChauffeurModel;
  closeResult: string;


  constructor(private modalService: NgbModal, private driverService: ChauffeurService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  driverArray = Array<ChauffeurModel>();

  displayedColumns: string[] = [
    'id',
    'prenomChauffeur',
    'nomChauffeur',
    'statut',
    'contact',
    'action',
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.listChauffeur();
  }

  listChauffeur(){
    this.driverService.getChauffeurList().subscribe(res => {
      this.driverArray = res;
      console.log(this.driverArray);
      const ELEMENT_DATA: ChauffeurModel[] = this.driverArray;
      this.dataSource = new MatTableDataSource<ChauffeurModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  openFormModal(content,chauffeur: any,id:number) {
    this.chauffeur1=chauffeur;
    if(id==3){
      const modalRef = this.modalService.open(ModalChauffeurComponent);
      modalRef.componentInstance.chauffeur = chauffeur;
      modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
      }else if(id==2){
        const modalRef = this.modalService.open(ModalddComponent);
        modalRef.componentInstance.chauffeur = chauffeur;
        modalRef.result
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.log(error);
          });
      }else if(id==1){
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
  }
  DeleteChauffeur(){
    this.driverService.deleteChauffeur(this.chauffeur1.id).subscribe(res=>{
      console.log(res);
    });

    location.reload();
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
  
  displayForm() {
    this.router.navigate(['/dispatcher/driver/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }
}
