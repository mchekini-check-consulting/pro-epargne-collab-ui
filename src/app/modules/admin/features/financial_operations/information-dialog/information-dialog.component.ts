import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TransactionModel} from "../../../../../core/model/transaction.model";

@Component({
  selector: 'app-information-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information-dialog.component.html',
  styleUrl: './information-dialog.component.scss'
})
export class InformationDialogComponent implements OnInit{


    displayPee : boolean = false;
    constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
                public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: TransactionModel,
                ) {}

    ngOnInit(): void {
        console.log(typeof this.data.planType);
    }
}
