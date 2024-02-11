import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppInformationService} from "../../../../../core/service/app-information.service";
import {Observable} from "rxjs";
import {AppInformation} from "../../../../../core/model/app-information";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {FinancialOperationComponent} from "../component/financial-operation/financial-operation.component";

@Component({
    selector: 'feature1',
    templateUrl: './operations.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe,
        FinancialOperationComponent
    ],
})
export class OperationsComponent implements OnInit {

    app: Observable<AppInformation>;

    constructor(private readonly appInformation: AppInformationService) {
    }

    ngOnInit(): void {
        this.app = this.appInformation.getAppInformation();
    }
}
