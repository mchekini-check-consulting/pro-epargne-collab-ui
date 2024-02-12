import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {CollaboratorAccountService} from 'app/core/service/collaborator-account.service';
import {CollaboratorAccount} from 'app/core/model/collaborator_account.model';
import {Router} from "@angular/router";
import {TransactionDialogComponent} from "../component/tranaction-dialog/transaction-dialog.component";

@Component({
    selector: 'app-financial-operation',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
    templateUrl: './financial-operation.component.html',
    styleUrl: './financial-operation.component.css'
})
export class FinancialOperationComponent implements OnInit {

    accounts: CollaboratorAccount[] = []
    totalAmount: number = 0

    constructor(public dialog: MatDialog, private router: Router, private accountService: CollaboratorAccountService) {
    }


    openTransactionDialog() {
        this.dialog.open(TransactionDialogComponent, {
            width: '600px',
            height: '600px'
        });
    }


    navigateToHistory(): void {
        this.router.navigate(['/features/history']);
    }

    ngOnInit() {

        this.accountService.getCollaboratorAccounts().subscribe(response => {

            if (response.hasOwnProperty("data")) {

                this.accounts = response['data']
                this.accounts.forEach(account => this.totalAmount += account.amount)
            }
        })
    }

}
