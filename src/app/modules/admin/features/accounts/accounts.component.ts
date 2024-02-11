import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { AccountService } from 'app/core/service/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-accounts',
    standalone: true,
    imports: [
        CommonModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTooltipModule,
    ],
    templateUrl: './accounts.component.html',
})
export class AccountsComponent implements OnInit {
    private accountService = inject(AccountService);
    private snackBar: MatSnackBar = inject(MatSnackBar);
    private formBuilder = inject(FormBuilder);
    form: FormGroup;

    managementModes: { key: string; value: string; tooltip?: string }[] = [
        {
            key: 'FREE',
            value: 'Libre',
            tooltip:
                'La gestion libre vous donne le contrôle total sur vos investissements. Vous choisissez les actifs et les fonds selon vos préférences et objectifs financiers.',
        },
        {
            key: 'DELEGATED',
            value: 'Déléguée',
        },
    ];

    riskLevels: { key: string; value: string }[] = [
        { key: 'PRUDENT', value: 'Prudent' },
        { key: 'BALANCED', value: 'Equilibre' },
        { key: 'DYNAMIC', value: 'Dynamique' },
    ];

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            peeMode: ['', Validators.required],
            peeRiskLevel: ['', []],
            perecoMode: ['', Validators.required],
            perecoRiskLevel: ['', []],
        });

        this.accountService.getUserAccounts().subscribe((res) => {
            const response: {
                peeMode: string;
                peeRiskLevel: string;
                perecoMode: string;
                perecoRiskLevel: string;
            } = {
                peeMode: null,
                peeRiskLevel: null,
                perecoMode: null,
                perecoRiskLevel: null,
            };
            res.data.forEach((account) => {
                switch (account.type) {
                    case 'PEE': {
                        response.peeMode = account.managementMode;
                        response.peeRiskLevel = account.riskLevel;
                        break;
                    }
                    case 'PERECO': {
                        response.perecoMode = account.managementMode;
                        response.perecoRiskLevel = account.riskLevel;
                        break;
                    }
                }
            });
            this.form.setValue({
                peeMode: response.peeMode,
                perecoMode: response.perecoMode,
                peeRiskLevel: response.peeRiskLevel,
                perecoRiskLevel: response.perecoRiskLevel,
            });
        });
    }

    updateUserAccountsInvestementDetails() {
        const request: {
            peeManagementMode: string;
            peeRiskLevel: string;
            perecoManagementMode: string;
            perecoRiskLevel: string;
        } = {
            peeManagementMode: this.form.getRawValue().peeMode,
            peeRiskLevel:
                this.form.getRawValue().peeMode === 'DELEGATED'
                    ? this.form.getRawValue().peeRiskLevel
                    : null,
            perecoManagementMode: this.form.getRawValue().perecoMode,
            perecoRiskLevel:
                this.form.getRawValue().perecoMode === 'DELEGATED'
                    ? this.form.getRawValue().perecoRiskLevel
                    : null,
        };
        if (this.form.valid) {
            this.accountService
                .updateUserAccountsInvestementDetails(request)
                .subscribe({
                    next: (value) => {
                        this.snackBar.open(
                            'Vos paramètres ont été mis à jour',
                            null,
                            { duration: 3 * 1000 }
                        );
                    },
                    error: (eerr) => {
                        this.snackBar.open(
                            "Une erreur s'est produite lors du traitement de cette demande",
                            null,
                            { duration: 3 * 1000 }
                        );
                    },
                });
        }
    }
}
