import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-information-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './information-dialog.component.html',
  styleUrl: './information-dialog.component.scss'
})
export class InformationDialogComponent {

    constructor(public dialog: MatDialog) {}
}
