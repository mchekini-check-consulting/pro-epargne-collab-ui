import { AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../../tranaction-dialog/transaction-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { CollaboratorAccountService } from 'app/core/service/collaborator-account.service';
import { CollaboratorAccount } from 'app/core/model/collaborator_account.model';

@Component({
  selector: 'app-financial-operation',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './financial-operation.component.html',
  styleUrl: './financial-operation.component.css'
})
export class FinancialOperationComponent implements OnInit{

    accounts: CollaboratorAccount[] = []
    totalAmont:number = 0

    constructor(public dialog: MatDialog, private accountService:CollaboratorAccountService) {}
  

    openTransactionDialog() {
        this.dialog.open(TransactionDialogComponent, {
            width: '600px',
            height: '600px'
        });
    }

    onDia
    cardTest() {
        console.log("Test click on card")
    }

    ngOnInit(){
      
      this.accountService.getCollaboratorAccounts().subscribe(response=>{
     
        if(response.hasOwnProperty("data")){
          
          this.accounts = response['data']
          this.accounts.forEach(account=>this.totalAmont+=account.amount)
        }
      })
    }
    
}
