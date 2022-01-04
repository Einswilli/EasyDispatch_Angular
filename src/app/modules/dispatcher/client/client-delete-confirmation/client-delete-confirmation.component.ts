import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client-model';
import { ClientService } from '../services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-delete-confirmation',
  templateUrl: './client-delete-confirmation.component.html',
  styleUrls: ['./client-delete-confirmation.component.scss']
})
export class ClientDeleteConfirmationComponent implements OnInit {

  client=new Client;
  
  constructor(private clientservice:ClientService ,public activemodal:NgbActiveModal, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  deleteClient(){
    this.clientservice.deleteClient(this.client.id).subscribe((data)=>{
      console.log("success");
  });
    //alert(this.clientservice.deleteClient(clientid));//('client supprimé avec succes!'+clientid);
    this.activemodal.dismiss('');
    this.refreshPage();
  }

  refreshPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
    this.router.onSameUrlNavigation='reload';
    this.router.navigate(['/dispatcher/client/list'],{relativeTo:this.route});
  }
}
