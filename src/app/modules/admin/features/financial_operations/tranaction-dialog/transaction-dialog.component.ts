import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {InformationDialogComponent} from "../information-dialog/information-dialog.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TransactionModel} from "../../../../../core/model/transaction.model";
import {TransactionService} from "../../../../../core/service/transaction.service";
import {OperationTypeEnum} from "../../../../../core/enum/operation.type.enum";

@Component({
    selector: 'app-transaction-dialog',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule],
    templateUrl: './transaction-dialog.component.html',
    styleUrl: './transaction-dialog.component.scss'
})
export class TransactionDialogComponent {


    isCheckboxChecked: boolean = false;
    enableButton: boolean = false;

    toggle() {
        this.isCheckboxChecked = !this.isCheckboxChecked;
        this.enableButton = !this.transactionForm.value.amount || !this.transactionForm.value.type || !this.isCheckboxChecked;
    }

    transactionModel: TransactionModel = new TransactionModel();

    transactionForm: FormGroup = new FormGroup({
        amount: new FormControl(''),
        type: new FormControl(''),
        comment: new FormControl('')
    });

    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<TransactionDialogComponent>, private transactionService: TransactionService) {
    }


    openInformationDialog() {
        const infoDialog: MatDialogRef<InformationDialogComponent> = this.dialog.open(InformationDialogComponent, {
            width: '600px',
            height: '600px',
            data: {
                amount: this.transactionModel.amount,
                planType: this.transactionModel.planType,
                comment: this.transactionModel.comment,
            },
        })
        this.dialogRef.close();
    }

    sendTransaction() {

        this.transactionModel.operationType = OperationTypeEnum.DEPOSIT;
        this.transactionModel.amount = this.transactionForm.get("amount").value;
        this.transactionModel.planType = this.transactionForm.get("type").value;
        this.transactionModel.comment = this.transactionForm.get("comment").value;

        this.transactionService.sendTransaction(this.transactionModel);

        console.log(this.transactionModel.amount);
        console.log(this.transactionModel.planType);
        console.log(this.transactionModel.comment);
        //Display info
        this.openInformationDialog();
    }
}
