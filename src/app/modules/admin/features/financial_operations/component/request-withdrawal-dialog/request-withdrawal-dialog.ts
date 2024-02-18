import {Component, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RequestWithdrawalModel} from "../../../../../../core/model/request-withdrawal-model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RequestWithdrawalService} from "../../../../../../core/service/request-withdrawal.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-request-dialog',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatIconModule],
    templateUrl: './request-withdrawal-dialog.html',
    styleUrl: './request-withdrawal-dialog.css'
})
export class RequestWithdrawalDialogComponent {
    @ViewChild('fileInput')
    fileInput;

    file: File | null = null;

    @ViewChild('fileInputreco')
    fileInputreco;

    filereco: File | null = null;

    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RequestWithdrawalDialogComponent>,
                private requestWithdrawalService: RequestWithdrawalService, private formBuilder: FormBuilder) {
    }


    requestWithdrawalModel: RequestWithdrawalModel = new RequestWithdrawalModel();

    requestSent = false;

    raisonPee: string[] = [
        "Mariage",
        "Conclusion d'un Pacs",
        "Naissance (ou adoption) d'un enfant, à partir du 3e",
        "Divorce, séparation, dissolution d'un Pacs, avec la garde d'au moins un enfant",
        "Violence conjugale",
        "Invalidité (salarié, son époux(se) ou partenaire de Pacs, ses enfants)",
        "Décès (salarié, son époux(se) ou partenaire de Pacs)",
        "Rupture du contrat de travail (licenciement, démission, départ à la retraite avant l'expiration du délai de 5 ans), cessation de son activité par l'entrepreneur individuel, fin du mandat social, perte du statut de conjoint collaborateur ou de conjoint associé",
        "Surendettement",
        "Création ou reprise d'entreprise (par le salarié, son époux(se) ou partenaire de Pacs, ses enfants)",
        "Installation en vue de l'exercice d'une autre profession non salariée",
        "Acquisition de parts sociales d'une société coopérative de production (SCOP)",
        "Acquisition d'une résidence principale (ou travaux d'agrandissement ou remise en état suite à catastrophe naturelle)"
    ];
    raisonPereco: string[] = [
        "Invalidité (salarié, son époux(se) ou partenaire de Pacs, ses enfants)",
        "Décès (salarié, son époux(se) ou partenaire de Pacs)",
        "Acquisition d'une résidence principale (ou remise en état suite à catastrophe naturelle)",
        "Surendettement du salarié",
        "Expiration des droits du salarié à l'assurance chômage"
    ];


    requestForm: FormGroup = new FormGroup({
        amount: new FormControl(''),
        typeAccount: new FormControl(''),
        reasonUnblockingPee: new FormControl(''),
        reasonUnblockingPereco: new FormControl(''),
        rib: new FormControl(''),

    });

    ngOnInit() {
        this.requestForm = this.formBuilder.group({
            typeAccount: [''],
            reasonUnblockingPee: new FormControl(''),
            reasonUnblockingPereco: new FormControl(''),
            PEE: [''],
            PERECO: ['']
        });
    }

    validateForm() {
        let dataToSend = [];
        if (this.requestForm.controls.PEE.value) {
            const obj1Pee=
            {
                typeAccount: 'PEE',
                reasonUnblocking:this.requestForm.controls.reasonUnblockingPee.value.join(";"),
            }
            dataToSend.push(obj1Pee)
        }

        if (this.requestForm.controls.PERECO.value) {
            const obj1Per=
            {
                typeAccount: 'PERECO',
                reasonUnblocking:this.requestForm.controls.reasonUnblockingPereco.value.join(";"),
            }
            dataToSend.push(obj1Per)
        }
        console.log(dataToSend)
        this.send(dataToSend)
    }

    send(data){
        this.requestWithdrawalService.sendRequestWithdrawal(data, this.file, this.filereco)
    }

    close(){
        this.dialogRef.close();
    }

    onClickFileInputButton(): void {
        this.fileInput.nativeElement.click();
    }

    onChangeFileInput(): void {
        const files: { [key: string]: File } = this.fileInput.nativeElement.files;
        this.file = files[0];
    }

    onClickFileInputButtonreco(): void {
        this.fileInputreco.nativeElement.click();
    }

    onChangeFileInputreco(): void {
        const files: { [key: string]: File } = this.fileInputreco.nativeElement.files;
        this.filereco = files[0];
    }





}
