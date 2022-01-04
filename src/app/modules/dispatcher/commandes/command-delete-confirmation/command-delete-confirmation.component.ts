import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-command-delete-confirmation',
  templateUrl: './command-delete-confirmation.component.html',
  styleUrls: ['./command-delete-confirmation.component.scss']
})
export class CommandDeleteConfirmationComponent implements OnInit {

  name:number=0; //command reference
  code:number=0; //command ID

  constructor(private commandeService: CommandeService,public activemodal:NgbActiveModal, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  deleteCommand(){
    //we delete a command by a given ID..
    this.commandeService.deleteCommande(this.code).subscribe((data)=>{
      console.log("success");
    });
    this.activemodal.dismiss('');
    this.refreshPage();
  }
  
  refreshPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
    this.router.onSameUrlNavigation='reload';
    this.router.navigate(['/dispatcher/command/list'],{relativeTo:this.route});
  }

}
