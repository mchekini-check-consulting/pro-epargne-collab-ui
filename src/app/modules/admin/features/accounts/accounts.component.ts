import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountService } from 'app/core/service/account.service';
import { Subject, takeUntil } from 'rxjs';

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
export class AccountsComponent implements OnInit, OnDestroy {
    private accountService = inject(AccountService);
    private snackBar: MatSnackBar = inject(MatSnackBar);
    private formBuilder = inject(FormBuilder);
    private _unsubscribeAll: Subject<any> = new Subject<any>();
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
            tooltip:
                "La gestion déléguée est prise en charge par des experts financiers. Ils prendront les décisions d'investissement à votre place, basées sur une approche professionnelle.",
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

        this.accountService.getUserAccounts().subscribe();
        this.accountService.accounts$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((accounts) => {
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
                accounts.forEach((account) => {
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

    handleManagementModeChange($event: MatRadioChange, managementMode: string) {
        if ($event.value === 'DELEGATED') {
            this.form.addControl(
                `${managementMode}RiskLevel`,
                new FormControl('', Validators.required)
            );
        } else if ($event.value === 'FREE') {
            this.form.removeControl(`${managementMode}RiskLevel`);
        }
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
        if (this.form.valid && this.form.dirty) {
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
        } else {
            this.snackBar.open("Aucune modification n'a été apportée", null, {
                duration: 3 * 1000,
            });
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
