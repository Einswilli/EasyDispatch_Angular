import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {ConvoiModel} from '../models/convoi.model';
import {MatTableDataSource} from '@angular/material/table';
import {ConvoiService} from '../services/convoi.service';
import {ModalCiterneComponent} from '../../citerne/modal-citerne/modal-citerne.component';
import {ModalChargementComponent} from '../modal-chargement/modal-chargement.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-load',
  templateUrl: './list-load.component.html',
  styleUrls: ['./list-load.component.scss']
})
export class ListLoadComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'adresseDepart',
    'adresseDestination',
    'chauffeur',
    'camion',
    'citerne',
    'commande',
    'dateDepart',
    'dateHeureDebutDechargementEffective',
    'dateHeureFinDechargementEffective',
    'action',
  ];

  constructor(private modalService: NgbModal,
              private router: Router,
              private convoiService: ConvoiService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  convoiArray = Array<ConvoiModel>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.listConvoi();
  }
  listConvoi(){
    this.convoiService.getConvoiList().subscribe(res => {
      this.convoiArray = res;
      console.log(this.convoiArray);
      const ELEMENT_DATA: ConvoiModel[] = this.convoiArray;
      this.dataSource = new MatTableDataSource<ConvoiModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  openFormModal(convoi: any) {
    const modalRef = this.modalService.open(ModalChargementComponent);
    modalRef.componentInstance.convoi = convoi;
    modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }
  displayForm() {
    this.router.navigate(['/dispatcher/travel-load/new']);
  }

  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }
}
