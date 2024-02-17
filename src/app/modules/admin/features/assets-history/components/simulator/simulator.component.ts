import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseCardComponent } from '../../../../../../../@fuse/components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetsHistoryService } from 'app/core/service/assets-history.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
    AssetLabelOptionModel,
    AssetsModel,
} from 'app/core/model/assets.model';

@Component({
    selector: 'app-simulator',
    standalone: true,
    templateUrl: './simulator.component.html',
    styleUrl: './simulator.component.scss',
    imports: [
        CommonModule,
        FuseCardComponent,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
})
export class SimulatorComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<SimulatorComponent>,
        private formBuilder: FormBuilder,
        private assetService: AssetsHistoryService
    ) { }

    regex: RegExp = /^(0\.\d+|[1-9]\d*(\.\d+)?)$/;

    assets: AssetsModel[];
    years: string[];
    assetLabels: AssetLabelOptionModel[] = [];

    simulatorForm = this.formBuilder.group({
        asset: ['', Validators.required],
        assetYear: ['', Validators.required],
        initialCapital: [
            '',
            [Validators.required, Validators.pattern(this.regex)],
        ],

        finalCapital: [0],
    });

    ngOnInit(): void {
        this.assetService.getAssetsHistory().subscribe((response: any) => {
            this.assets = response.data;
            this.years = Object.keys(response.data[0].assetYearsData).reverse();

            response.data.forEach((item) => {
                this.assetLabels.push({
                    label: item.supportLabel,
                    value: item.assetYearsData,
                });
            });
        });
    }

    onSimulate(): void {
        if (this.simulatorForm.valid && this.simulatorForm.dirty) {
            let result: number = Number(
                this.simulatorForm.value.initialCapital
            );

            this.years.map((item) => {
                if (
                    Number(item) >= Number(this.simulatorForm.value.assetYear)
                ) {
                    result =
                        result *
                        (1 + Number(this.simulatorForm.value.asset[item]));
                }
            });

            this.simulatorForm.controls.finalCapital.setValue(
                Math.round(result * 100) / 100
            );
        }
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    resetSimulatorForm() {
        this.simulatorForm.reset();
    }
}
