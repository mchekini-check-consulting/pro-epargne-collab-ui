import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {before} from "lodash-es";
import {MatButtonModule} from "@angular/material/button";
import {InformationDialogComponent} from "../information-dialog/information-dialog.component";
import {timeout} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TransactionModel} from "../Transaction.model";
import {TransactionService} from "../transaction.service";

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss'
})
export class TransactionDialogComponent {


    isCheckboxChecked: boolean = false;
    toggle() {
        this.isCheckboxChecked = !this.isCheckboxChecked;
    }

    timeoutToCloseDialog: number =  3000;

    transactionModel : TransactionModel = new TransactionModel();

    transactionForm: FormGroup = new FormGroup({
        amount: new FormControl(''),
        type: new FormControl(''),
        comment: new FormControl('')
    });

    constructor(public dialog:MatDialog ,public dialogRef: MatDialogRef<TransactionDialogComponent>, private transactionService: TransactionService) {}


    openInformationDialog() {
        const infoDialog: MatDialogRef<InformationDialogComponent> = this.dialog.open(InformationDialogComponent, {
            width: '600px',
            height: '500px'
        })
        this.dialogRef.close();

        infoDialog.afterOpened().subscribe(_ => {
            setTimeout(() => {
                infoDialog.close();
            }, this.timeoutToCloseDialog);
        });
    }

    sendTransaction() {

        this.transactionModel.collaboratorId = 0; //TODO Get Collaborator id from a service
        this.transactionModel.amount = this.transactionForm.get("amount").value;
        this.transactionModel.planType = this.transactionForm.get("type").value;
        this.transactionModel.comment = this.transactionForm.get("comment").value;

        this.transactionService.sendTransaction(this.transactionModel);

        //Display info
        this.openInformationDialog();
    }
}
