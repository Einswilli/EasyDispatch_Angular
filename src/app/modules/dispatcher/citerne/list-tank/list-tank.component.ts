import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CiterneService} from '../services';
import {CiterneModel} from '../models/citerne.model';
import {ModalCiterneComponent} from '../modal-citerne/modal-citerne.component';
import {Router} from '@angular/router';
import { DetailsCiterneComponent } from '../details-citerne/details-citerne.component';

@Component({
  selector: 'app-list-tank',
  templateUrl: './list-tank.component.html',
  styleUrls: ['./list-tank.component.scss']
})
export class ListTankComponent implements OnInit {
  Location: any;
  citerne1: CiterneModel;
  closeResult: string;

  constructor(private modalService: NgbModal, private citerneService: CiterneService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  citerneArray = Array<CiterneModel>();

  displayedColumns: string[] = [
    'id',
    'assetId',
    'description',
    'matricule',
    'serialNumber',
    'action'
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.lisCiterne();
  }

  lisCiterne(){
    this.citerneService.getCiterneList().subscribe(res => {
      this.citerneArray = res;
      console.log(this.citerneArray);
      const ELEMENT_DATA: CiterneModel[] = this.citerneArray;
      this.dataSource = new MatTableDataSource<CiterneModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  openFormModal(citerne: any, id: string) {
    this.citerne1 = citerne;
    if(id === 'update'){
      const modalRef = this.modalService.open(ModalCiterneComponent);
      modalRef.componentInstance.citerne = citerne;
      modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
        console.log(error);
        });
    }
    else if(id === 'details'){
      const modalRef = this.modalService.open(DetailsCiterneComponent);
      modalRef.componentInstance.citerne = citerne;
      modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
    
  }

  displayForm() {
    this.router.navigate(['/dispatcher/tank/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }

  public onOpenModal(citerne: CiterneModel, mode: String){
    this.citerne1 = citerne;
    const container = document.getElementById('main-container-list-tank');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteTankModal');
    }
    container.appendChild(button);
    button.click();
  }

  deleteCiterne(){
    this.citerneService.deleteCiterne(this.citerne1.id).subscribe(res=>{
      console.log(res);
    });

    location.reload();
  }
}
