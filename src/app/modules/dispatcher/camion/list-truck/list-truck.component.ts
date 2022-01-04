import { Location } from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CiterneService} from '../../citerne/services';
import {MatPaginator} from '@angular/material/paginator';
import {CiterneModel} from '../../citerne/models/citerne.model';
import {MatTableDataSource} from '@angular/material/table';
import {CamionService} from '../services/camion-service.service';
import {CamionModel} from '../models/camion.model';
import {ModalClientComponent} from '../../client/modal-client/modal-client.component';
import {ModalCamionComponent} from '../modal-camion/modal-camion.component';
import {Router} from '@angular/router';
import { ModaldComponent } from '../modald/modald.component';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.scss']
})
export class ListTruckComponent implements OnInit {
  Location: any;
  camion1:CamionModel;
  closeResult: string;


  constructor(private modalService: NgbModal, private camionService: CamionService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  camionArray = Array<CamionModel>();

  displayedColumns: string[] = [
    'assetId',
    'disponible',
    'puissance',
    'pret',
    'marque',
    'matricule',
    'action'
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.lisCiterne();
  }

  lisCiterne(){
    this.camionService.getCamionList().subscribe(res => {
      this.camionArray = res;
      console.log(this.camionArray);
      const ELEMENT_DATA: CamionModel[] = this.camionArray;
      this.dataSource = new MatTableDataSource<CamionModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  openFormModal(content,camion: any,id:number) {
    this.camion1=camion;
    if(id==1){
    const modalRef = this.modalService.open(ModalCamionComponent);
    modalRef.componentInstance.camion = camion;
    modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }else if(id==3){
      const modalRef = this.modalService.open(ModaldComponent);
    modalRef.componentInstance.camion = camion;
    modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }else if(id==2){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      //this.camionService.deleteCamion(camion.id).subscribe(res=>{
      //  console.log(res);
     // });
     // location.reload();
    }
}
DeleteCamion(){
  this.camionService.deleteCamion(this.camion1.id).subscribe(res=>{
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


  displayForm(){
    this.router.navigate(['dispatcher/truck/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }
}
