import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-information-dialog',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './information-dialog.component.html',
    styleUrl: './information-dialog.component.scss'
})
export class InformationDialogComponent {


    displayPee : boolean = false;
    constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
                public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    onClose() {
        this.dialogRef.close();
    }
}
