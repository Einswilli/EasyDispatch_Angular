import { Component, OnInit } from '@angular/core';
import { CommandeModel } from '../models/commande.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-command-details',
  templateUrl: './command-details.component.html',
  styleUrls: ['./command-details.component.scss']
})
export class CommandDetailsComponent implements OnInit {

  command=new CommandeModel;
  constructor(public activemodal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}
