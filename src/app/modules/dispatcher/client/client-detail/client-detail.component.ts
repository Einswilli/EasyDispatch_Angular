import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client-model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  client=new Client;
  constructor(public activemodal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
