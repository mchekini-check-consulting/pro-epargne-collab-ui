import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { NgModel } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-accounts',
    standalone: true,
    imports: [CommonModule, MatRadioModule, MatSelectModule],
    templateUrl: './accounts.component.html',
    styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
    peeMode: string;
    perecoMode: string;

    peeRiskLevel: string;
    perecoRiskLevel: string;

    managementModes: { key: string; value: string }[] = [
        { key: 'FREE', value: 'Libre' },
        { key: 'DELEGATED', value: 'Déléguée' },
    ];
    riskLevels: { key: string; value: string }[] = [
        { key: 'PRUDENT', value: 'Prudent' },
        { key: 'BALANCED', value: 'Equilibre' },
        { key: 'DYNAMIC', value: 'Dynamique' },
    ];

    handleManagementModes(e, mode: 'pee' | 'pereco') {
        switch (mode) {
            case 'pee': {
                this.peeMode = e.value;
                break;
            }
            case 'pereco': {
                this.perecoMode = e.value;
                break;
            }
        }
    }

    handleRiskLevel(e, mode: 'pee' | 'pereco') {
        switch (mode) {
            case 'pee': {
                this.peeRiskLevel = e.value;
                break;
            }
            case 'pereco': {
                this.perecoRiskLevel = e.value;
                break;
            }
        }
    }
}
