import {Component, OnInit, ViewChild} from '@angular/core';
import {ProduitModel} from '../models/produit.model';
import {ProductService} from '../services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ModalProduitComponent} from '../modal-produit/modal-produit.component';
import {Router} from '@angular/router';
import { Button } from 'protractor';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {
  ProductService: any;
  produit1 : ProduitModel;
  closeResult: string;


  constructor(private modalService: NgbModal, private productService: ProductService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  productArray = Array<ProduitModel>();

  displayedColumns: string[] = [
    'id',
    'designation',
    'description',
    'action',
  ];
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.listProduct();
  }

  public listProduct(){
    this.productService.getProductList().subscribe(res => {
      this.productArray = res;
      console.log(this.productArray);
      const ELEMENT_DATA: ProduitModel[] = this.productArray;
      this.dataSource = new MatTableDataSource<ProduitModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  openFormModal(produit: any) {
    this.produit1 = produit;
    const modalRef = this.modalService.open(ModalProduitComponent);
    modalRef.componentInstance.produit = produit;
    modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }

  public onOpenModal(produit: any, mode: String){
    this.produit1 = produit;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit'){
      button.setAttribute('data-target', '#editProductModal');
    }
    if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteProductModal');
    }
    container.appendChild(button);
    button.click();
  }

  displayForm() {
    this.router.navigate(['/dispatcher/product/new']);
  }

  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }

  deleteProduit(){
    this.productService.deleteProduct(this.produit1.id).subscribe(res=>{
      console.log(res);
    });

    location.reload();
  }

  
}
