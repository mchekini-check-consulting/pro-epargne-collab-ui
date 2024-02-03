import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../../tranaction-dialog/transaction-dialog.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-financial-operation',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './financial-operation.component.html',
  styleUrl: './financial-operation.component.css'
})
export class FinancialOperationComponent {

    constructor(public dialog: MatDialog) {}

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
}
