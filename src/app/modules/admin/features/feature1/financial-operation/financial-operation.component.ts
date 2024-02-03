import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../tranaction-dialog/transaction-dialog.component";

@Component({
  selector: 'app-financial-operation',
  standalone: true,
    imports: [CommonModule, MatButtonModule],
  templateUrl: './financial-operation.component.html',
  styleUrl: './financial-operation.component.css'
})
export class FinancialOperationComponent {

    constructor(public dialog: MatDialog) {}

    openTransactionDialog() {
        this.dialog.open(TransactionDialogComponent, {
            width: '600px',
            height: '500px'
        });
    }
}
